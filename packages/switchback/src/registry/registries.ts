import catalogueClaims from "../../registry/catalogue.json";
import legend from "../../registry/legend.json";
import practices from "../../registry/practices.json";
import protocols from "../../registry/protocols.json";
import styles from "../../registry/styles.json";
import tags from "../../registry/tags.json";
import type {
  CatalogueClaims,
  Confidence,
  Mark,
  Practice,
  Protocol,
  Role,
  Style,
  Tag,
} from "../engine/types";

export interface Registries {
  roles: Role[];
  marks: Mark[];
  confidence: Confidence[];
  tags: Tag[];
  styles: Style[];
  protocols: Protocol[];
  practices: Practice[];
  catalogueClaims: CatalogueClaims;
}

export function loadRegistries(): Registries {
  return {
    roles: legend.roles as Role[],
    marks: legend.marks as Mark[],
    confidence: legend.confidence as Confidence[],
    tags: tags.tags as Tag[],
    styles: styles.styles as Style[],
    protocols: protocols.protocols as Protocol[],
    practices: practices.practices as Practice[],
    catalogueClaims: catalogueClaims as CatalogueClaims,
  };
}
