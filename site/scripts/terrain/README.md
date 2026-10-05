# Terrain field generator

The home page's terrain is real: the Drakensberg escarpment at Sani Pass. The smooth Lesotho
plateau sits on the left, under the headline, and the escarpment falls away to the right in deep
valleys. The field is a hillshade lit from the north-west, with valley mist pooled in the lowest
ground (derived from elevation, not drawn), 40 m contours with index lines every 200 m, and spot
heights, all in the site's forest green. This folder regenerates it. It is not part of the site
build; the outputs are committed in `site/public/images/terrain-sani-*.webp`.

    cd site/scripts/terrain
    npm install
    node topo.mjs -29.595 29.31 13 2 sani 896 2304
    node compose.mjs sani out ../../../packages/switchback/node_modules/playwright/index.mjs ../../public/fonts/inter-latin-600-normal.woff2

`topo.mjs` writes `sani-shade.png` (the relief), `sani-contours.svg` (about 2.6 MB, too heavy to
ship) and `sani-spots.json`. It reads zoom 13, the deepest level here with one consistent source
(zoom 14 mixes sources and shows tile seams), cuts an 896-pixel window around the centre and
resamples it to 2304 pixels. `compose.mjs` layers the three and captures each hero size with
Playwright: 2880x1800 and 1440x900 for desktop, 780x1688 for phones. It leaves out any spot height
that would sit under the navigation, the headline or the reply card, and encodes WebP at quality
0.72 in the browser. Copy the files from `out/` into `site/public/images/`.

Elevation comes from the AWS Open Data Terrain Tiles (terrarium format,
https://registry.opendata.aws/terrain-tiles/). For this area the source is SRTM and GMTED2010.
Required attribution: SRTM and GMTED2010 terrain data courtesy of the U.S. Geological Survey.
