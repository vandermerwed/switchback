"""Generate the outlined README SVGs from the site's Inter font and mark.

Rerun from the repository root with:
  python .github/assets/src/generate-readme-svg.py

Requires fontTools and brotli. The generated SVGs have no font dependency.
"""

from pathlib import Path
import re

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parents[3]
ASSETS = ROOT / ".github" / "assets"
FONT = TTFont(ROOT / "site/public/fonts/inter-latin-600-normal.woff2")
GLYPHS = FONT.getGlyphSet()
CMAP = FONT.getBestCmap()
ADVANCES = FONT["hmtx"].metrics
EM = FONT["head"].unitsPerEm


def clean_path(path):
    return re.sub(r"-?\d+\.\d+", lambda m: f"{float(m.group()):.2f}".rstrip("0").rstrip("."), path)


def lettering(label, x, baseline, size, color, tracking=0):
    scale = size / EM
    paths = []
    for char in label:
        glyph_name = CMAP[ord(char)]
        pen = SVGPathPen(GLYPHS)
        GLYPHS[glyph_name].draw(TransformPen(pen, (scale, 0, 0, -scale, x, baseline)))
        if pen.getCommands():
            paths.append(pen.getCommands())
        x += ADVANCES[glyph_name][0] * scale + tracking
    return f'<path d="{clean_path(" ".join(paths))}" fill="{color}"/>', x


def svg_file(name, width, height, title, body):
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
        f'width="{width}" height="{height}" role="img" aria-labelledby="title">\n'
        f'  <title id="title">{title}</title>\n'
        + "\n".join(f"  {line}" for line in body)
        + "\n</svg>\n"
    )
    (ASSETS / name).write_text(svg, encoding="utf-8")
    print(f"{name}: {len(svg.encode('utf-8'))} bytes")


def lockup(name, color):
    # The site's 256-unit mark, including its cut-out route, is scaled intact.
    body = [
        '<defs><mask id="route" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256">'
        '<rect width="256" height="256" fill="#fff"/>'
        '<path d="M151-20V34C151 45 145 48 135 53L58 88C42 95 43 109 63 112L191 131C216 135 219 150 196 163L80 220C69 225 76 241 76 276" '
        'fill="none" stroke="#000" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>'
        '</mask></defs>',
        f'<g transform="translate(6 9) scale(.19)"><rect width="256" height="256" rx="22" fill="{color}" mask="url(#route)"/></g>',
    ]
    # Inter 600, 0.27em tracking. At this size the 49px mark is about 1.4 cap heights.
    word, end = lettering("SWITCHBACK", 91, 47, 43, color, tracking=11.61)
    body.append(word)
    svg_file(name, round(end + 7), 67, "Switchback", body)


def loop():
    paper = "#f7f9f6"
    trail = "#d1a34b"
    ink = "#173b39"
    body = [
        '<rect width="1000" height="600" rx="20" fill="#173b39"/>',
        '<g fill="none" stroke="#b9d4cc" stroke-width="1.2" opacity=".18">',
        '<path d="M-30 74C75 10 144 28 201 60S304 131 405 90 508 7 607 38 722 120 819 80 954 3 1035 48"/>',
        '<path d="M-31 98C82 30 143 52 196 85S302 154 404 114 518 32 613 63 727 144 825 104 955 28 1036 73"/>',
        '<path d="M-30 122C86 54 144 76 194 109S301 177 403 138 526 56 618 87 733 168 829 129 959 52 1038 98"/>',
        '<path d="M-34 383C70 335 151 342 227 381S350 452 453 417 565 342 669 379 779 465 889 428 966 375 1038 392"/>',
        '<path d="M-34 407C69 359 153 366 224 406S350 476 453 441 569 366 674 403 783 490 893 453 968 399 1038 416"/>',
        '<path d="M-34 431C70 383 153 390 222 430S350 500 453 465 573 390 679 427 788 514 897 478 971 424 1038 440"/>',
        '<path d="M-25 564C97 522 155 515 248 549S406 620 517 561 677 498 775 535 912 615 1034 551"/>',
        '</g>',
        '<path d="M85 158C228 93 410 88 757 143C908 168 902 218 766 232L269 278C125 291 127 342 285 362L770 393C923 404 916 455 759 470L242 505" '
        'fill="none" stroke="#0f2826" stroke-width="19" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>',
        '<path d="M85 158C228 93 410 88 757 143C908 168 902 218 766 232L269 278C125 291 127 342 285 362L770 393C923 404 916 455 759 470L242 505" '
        f'fill="none" stroke="{trail}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>',
        # Short arrowheads show the outbound and return directions on the same trail.
        f'<path d="m700 128 25 12-27 7 M350 272l-26 12 28 6 M705 469l-27 7 25 11" fill="none" stroke="{trail}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
        # One sheet, with the marks labelled in ink; the separate PNG is unmarked renderer output.
        '<g transform="translate(418 172) rotate(-5 100 134)">',
        '<rect x="5" y="7" width="196" height="268" rx="3" fill="#0f2826" opacity=".45"/>',
        '<rect width="196" height="268" rx="3" fill="#fff"/>',
        '<path d="M19 39h156M19 69h148M19 98h148M19 127h148M19 156h148M19 185h148M19 214h148M19 243h148" stroke="#d9ded8" stroke-width="1.6"/>',
        '</g>',
    ]
    for label, x, y, size, color, tracking in [
        ("AGENT MAKES", 65, 70, 31, paper, 1.1),
        ("PAGES", 65, 107, 31, paper, 1.1),
        ("YOU PRINT", 755, 100, 31, paper, 1.1),
        ("THINK IN INK", 63, 240, 31, paper, 1.1),
        ("PHOTOGRAPH", 742, 347, 31, paper, 1.1),
        ("AGENT READS", 63, 551, 31, paper, 1.1),
        ("THE MARKS", 63, 586, 31, paper, 1.1),
        ("ASK Q", 449, 230, 18, "#1f4fbf", 0),
        ("STOP R", 449, 296, 18, "#c0332b", 0),
        ("CRUX", 449, 363, 18, ink, 0),
    ]:
        path, _ = lettering(label, x, y, size, color, tracking)
        body.append(path)
    body.extend([
        '<path d="M443 240c39 10 61 8 99 3" fill="none" stroke="#1f4fbf" stroke-width="3" stroke-linecap="round"/>',
        '<path d="M443 307l81-9" fill="none" stroke="#c0332b" stroke-width="3" stroke-linecap="round"/>',
        '<path d="M444 368h67" fill="none" stroke="#f2d13a" stroke-width="13" stroke-linecap="round" opacity=".55"/>',
    ])
    svg_file("loop.svg", 1000, 600, "The Switchback round trip from agent to paper and back", body)


def loop_mobile():
    paper = "#f7f9f6"
    trail = "#d1a34b"
    body = [
        '<rect width="390" height="650" rx="16" fill="#173b39"/>',
        '<g fill="none" stroke="#b9d4cc" stroke-width="1" opacity=".2">',
        '<path d="M-20 74C78 26 119 29 176 68S281 113 410 45"/>',
        '<path d="M-20 94C78 46 119 49 176 88S281 133 410 65"/>',
        '<path d="M-20 114C78 66 119 69 176 108S281 153 410 85"/>',
        '<path d="M-20 377C82 332 135 341 182 375S279 427 410 358"/>',
        '<path d="M-20 397C82 352 135 361 182 395S279 447 410 378"/>',
        '<path d="M-20 417C82 372 135 381 182 415S279 467 410 398"/>',
        '<path d="M-20 590C77 545 138 563 186 592S292 639 410 579"/>',
        '</g>',
        '<path d="M30 104C133 75 246 83 334 116C371 130 363 165 317 182L70 222C16 232 20 262 75 279L320 318C369 330 365 365 315 390L74 462C20 479 24 516 82 530L219 551" '
        'fill="none" stroke="#0f2826" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>',
        '<path d="M30 104C133 75 246 83 334 116C371 130 363 165 317 182L70 222C16 232 20 262 75 279L320 318C369 330 365 365 315 390L74 462C20 479 24 516 82 530L219 551" '
        f'fill="none" stroke="{trail}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>',
        f'<path d="m285 95 19 13-23 1 M126 206l-23 11 23 5 M178 543l-24 2 18 13" fill="none" stroke="{trail}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>',
        '<g transform="translate(130 272) rotate(-5 63 91)">',
        '<rect x="4" y="5" width="127" height="181" rx="2" fill="#0f2826" opacity=".5"/>',
        '<rect width="127" height="181" rx="2" fill="#fff"/>',
        '<path d="M12 23h103M12 45h103M12 67h103M12 89h103M12 111h103M12 133h103M12 155h103" stroke="#d9ded8" stroke-width="1.4"/>',
        '</g>',
    ]
    for label, x, y, size, color, tracking in [
        ("AGENT MAKES", 20, 37, 22, paper, 0.6),
        ("PAGES", 20, 64, 22, paper, 0.6),
        ("YOU PRINT", 222, 159, 21, paper, 0.5),
        ("THINK IN INK", 20, 252, 21, paper, 0.4),
        ("PHOTOGRAPH", 209, 491, 21, paper, 0.3),
        ("AGENT READS", 20, 596, 22, paper, 0.5),
        ("THE MARKS", 20, 623, 22, paper, 0.5),
        ("ASK Q", 149, 307, 15, "#1f4fbf", 0),
        ("STOP R", 149, 353, 15, "#c0332b", 0),
        ("CRUX", 149, 400, 15, "#173b39", 0),
    ]:
        path, _ = lettering(label, x, y, size, color, tracking)
        body.append(path)
    body.extend([
        '<path d="M146 316l66-5" fill="none" stroke="#1f4fbf" stroke-width="2.5" stroke-linecap="round"/>',
        '<path d="M146 362l67-7" fill="none" stroke="#c0332b" stroke-width="2.5" stroke-linecap="round"/>',
        '<path d="M146 405h56" fill="none" stroke="#f2d13a" stroke-width="10" stroke-linecap="round" opacity=".55"/>',
    ])
    svg_file("loop-mobile.svg", 390, 650, "The Switchback round trip from agent to paper and back", body)


if __name__ == "__main__":
    ASSETS.mkdir(parents=True, exist_ok=True)
    lockup("switchback-light.svg", "#173b39")
    lockup("switchback-dark.svg", "#f7f9f6")
    loop()
    loop_mobile()
