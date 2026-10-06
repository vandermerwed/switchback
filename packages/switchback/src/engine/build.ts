import type { ValidateFunction } from "ajv";
import { ajv } from "../registry/ajv";
import { type Catalogue, loadCatalogue } from "../registry/catalogue";
import { helpers } from "../shell/helpers";
import { legendStrip, renderDocument, renderPage } from "../shell/page";
import { VERSION } from "../version";
import { article, error, hasErrors, warning } from "./diagnostics";
import { resolveKit } from "./kit";
import { assignPens } from "./pens";
import { alternativesFor, chooseVariant, RENAMED, resolveComponent } from "./resolve";
import { parseSpec } from "./spec";
import { styleChecks } from "./styles";
import { resolvePrompt } from "./template";
import type {
  ComponentMeta,
  Diagnostic,
  KitInput,
  Paper,
  RenderContext,
  Sidecar,
  SidecarPage,
  Spec,
  Substitution,
} from "./types";

export interface BuildOptions {
  profileKit?: KitInput;
  clock?: () => Date;
  cliVersion?: string;
  specPath?: string | null;
  embedFonts?: boolean;
  skipStyleChecks?: boolean;
  catalogue?: Catalogue;
}

export interface BuildResult {
  html: string | null;
  sidecar: Sidecar | null;
  diagnostics: Diagnostic[];
}

const dataValidators = new WeakMap<object, ValidateFunction>();

export function compileData(meta: ComponentMeta): ValidateFunction {
  let validate = dataValidators.get(meta.data);
  if (!validate) {
    validate = ajv.compile(meta.data);
    dataValidators.set(meta.data, validate);
  }
  return validate;
}

export function buildDocument(raw: unknown, opts: BuildOptions = {}): BuildResult {
  const { spec, diagnostics } = parseSpec(raw);
  if (!spec) return { html: null, sidecar: null, diagnostics };

  const cat = opts.catalogue ?? loadCatalogue();
  const roles = cat.registries.roles;
  const { kit, source } = resolveKit({ profile: opts.profileKit, spec: spec.kit });
  const paper: Paper = spec.paper ?? kit.paper;
  const { mapping, unassigned } = assignPens(kit, roles);
  for (const colour of unassigned) {
    diagnostics.push(
      warning(
        "W_UNASSIGNED_PEN",
        `you have ${article(colour)} ${colour} pen with no role`,
        `give it a role with \`switchback profile --set role.<role>=${colour}\`, or add "role" to that pen in the spec's kit`,
      ),
    );
  }

  const styleId = spec.style ?? "sitting";
  const style = cat.registries.styles.find((s) => s.id === styleId);
  if (!style) {
    diagnostics.push(
      error(
        "E_UNKNOWN_STYLE",
        `unknown style "${styleId}"`,
        `use one of: ${cat.registries.styles.map((s) => s.id).join(", ")}`,
        { path: "/style" },
      ),
    );
  }

  const returns = spec.pages
    .filter((p) => resolveComponent(cat, p.component, p.data ?? {})?.base.meta.physical.returns !== false)
    .map((p) => p.id);
  const specInfo = {
    title: spec.title ?? "Workbook",
    subtitle: spec.subtitle ?? "",
    style: styleId,
    round: spec.round ?? 1,
    timebox: spec.timebox ?? "",
    pages: spec.pages,
    returns,
  };
  const pagesHtml: string[] = [];
  const sidecarPages: SidecarPage[] = [];
  const substitutions: Substitution[] = [];
  const css: string[] = [];

  let afterSplit = false;
  spec.pages.forEach((page, i) => {
    const where = { page: page.id, path: `/pages/${i}` };
    const resolved = resolveComponent(cat, page.component, page.data ?? {});
    if (!resolved) {
      const renamed = RENAMED[page.component];
      const componentWhere = { page: page.id, path: `/pages/${i}/component` };
      diagnostics.push(
        renamed
          ? error(
              "E_RENAMED",
              `component "${page.component}" was merged into "${renamed.component}"`,
              `use "component": "${renamed.component}", "variant": "${renamed.variant}" (check its data fields with \`switchback show ${renamed.component}\`)${renamed.note ? ` — ${renamed.note}` : ""}`,
              componentWhere,
            )
          : error(
              "E_UNKNOWN_COMPONENT",
              `unknown component "${page.component}"`,
              "run `switchback list` to see components and presets",
              componentWhere,
            ),
      );
      return;
    }
    const { base, preset, data } = resolved;
    const meta = base.meta;

    const validate = compileData(meta);
    if (!validate(data)) {
      for (const e of validate.errors ?? []) {
        diagnostics.push(
          error(
            "E_DATA_SCHEMA",
            `data${e.instancePath} ${e.message ?? "is invalid"}`,
            `see the data fields with \`switchback show ${meta.id}\``,
            {
              page: page.id,
              path: `/pages/${i}/data${e.instancePath}`,
            },
          ),
        );
      }
      return;
    }

    const choice = chooseVariant(meta, kit, page.variant);
    if (!choice.ok) {
      const alternatives = alternativesFor(cat, meta, kit);
      const message =
        choice.code === "E_UNKNOWN_VARIANT"
          ? `${meta.id} has no variant "${page.variant}"`
          : `${meta.id} needs ${choice.missing.join(", ")}, which this kit does not have`;
      const fix =
        choice.code === "E_UNKNOWN_VARIANT"
          ? `use one of: ${meta.variants.map((v) => v.id).join(", ")}`
          : alternatives.length
            ? `drop it, add the stationery to your profile, or use ${alternatives.join(" / ")}`
            : "drop it, or add the stationery to your profile";
      diagnostics.push(error(choice.code, message, fix, where));
      return;
    }
    if (choice.substituted) {
      const wanted = meta.variants[0]!.id;
      substitutions.push({
        page: page.id,
        component: meta.id,
        wanted,
        used: choice.variant.id,
        missing: choice.missing,
      });
      diagnostics.push(
        warning(
          "W_SUBSTITUTION",
          `${meta.id}: using "${choice.variant.id}" instead of "${wanted}" (missing ${choice.missing.join(", ")})`,
          "add the missing stationery to your profile if you have it",
          where,
        ),
      );
    }

    for (const d of base.checks?.(data, {
      variant: choice.variant.id,
      paper,
      orientation: "portrait",
      pageId: page.id,
    }) ?? [])
      diagnostics.push({ ...d, page: d.page ?? page.id, path: d.path ?? `/pages/${i}` });

    const title = page.title ?? preset?.name ?? meta.name;
    const prompt = page.prompt ?? resolvePrompt(choice.variant.prompt ?? meta.prompt ?? "", data, specInfo);
    const shell = {
      header: meta.shell?.header ?? true,
      prompt: meta.shell?.prompt ?? true,
      legend: (meta.shell?.legend ?? true) && spec.legend_strip !== false,
    };
    const ctx: RenderContext = {
      paper,
      orientation: "portrait",
      variant: choice.variant.id,
      kit,
      pens: mapping,
      roles,
      page: { id: page.id, title },
      spec: specInfo,
      h: helpers,
    };
    if (base.css) css.push(base.css);
    pagesHtml.push(
      renderPage({
        id: page.id,
        component: preset?.id ?? meta.id,
        title,
        prompt,
        notes: page.notes ?? "",
        body: base.render(data, ctx),
        shell,
        legend: legendStrip(
          roles,
          mapping,
          page.id,
          cat.registries.marks,
          styleId === "proof" ? "proof" : "roles",
        ),
        attribution: preset?.footer,
        tag: style?.split_on && afterSplit ? `${preset?.id ?? meta.id} · after the break` : undefined,
      }),
    );
    sidecarPages.push({
      id: page.id,
      component: meta.id,
      preset: preset?.id ?? null,
      variant: choice.variant.id,
      orientation: "portrait",
      title,
      prompt,
      readback: choice.variant.readback ?? meta.readback ?? "",
      data,
      returns: meta.physical.returns !== false,
    });
    if (style?.split_on && meta.id === style.split_on) afterSplit = true;
  });

  if (style && !opts.skipStyleChecks) diagnostics.push(...styleChecks(style, spec, cat));
  if (hasErrors(diagnostics)) return { html: null, sidecar: null, diagnostics };

  const html = renderDocument({
    title: specInfo.title,
    paper,
    pages: pagesHtml,
    componentCss: css,
    embedFonts: opts.embedFonts,
  });
  const sidecar: Sidecar = {
    switchback: 1,
    cli: opts.cliVersion ?? VERSION,
    built_at: (opts.clock ?? (() => new Date()))().toISOString(),
    spec: opts.specPath ?? null,
    title: specInfo.title,
    style: styleId,
    round: specInfo.round,
    paper,
    kit_source: source,
    pens: mapping,
    pages: sidecarPages,
    substitutions,
    warnings: diagnostics.filter((d) => d.level === "warning"),
  };
  return { html, sidecar, diagnostics };
}

export function renderComponent(
  id: string,
  opts: { example?: string; kit?: KitInput; paper?: Paper; embedFonts?: boolean; catalogue?: Catalogue } = {},
): BuildResult {
  const cat = opts.catalogue ?? loadCatalogue();
  const resolved = resolveComponent(cat, id);
  const example =
    resolved && !resolved.preset ? (resolved.base.examples[opts.example ?? "default"] ?? {}) : {};
  const spec: Spec = {
    switchback: 1,
    title: resolved?.preset?.name ?? resolved?.base.meta.name ?? id,
    paper: opts.paper ?? "A4",
    ...(example.kit || opts.kit ? { kit: { ...(opts.kit ?? {}), ...(example.kit ?? {}) } } : {}),
    pages: [
      {
        id: "W1-P1",
        component: id,
        ...(example.variant ? { variant: example.variant } : {}),
        ...(example.title ? { title: example.title } : {}),
        data: example.data ?? {},
      },
    ],
  };
  return buildDocument(spec, {
    catalogue: cat,
    skipStyleChecks: true,
    embedFonts: opts.embedFonts,
    clock: () => new Date(0),
  });
}
