# Terrain field generator

The home page's terrain is real: the Drakensberg escarpment around Sani Pass, contoured every
25 m (index lines every 125 m) over a faint hillshade, in the site's forest green. This folder
regenerates it. It is not part of the site build; the outputs are committed in
`site/public/images/terrain-sani-*.webp`.

    cd site/scripts/terrain
    npm install
    node topo.mjs -29.595 29.31 13 2 sani

That writes `sani-shade.png` (hillshade), `sani-contours.svg` (about 3 MB, too heavy to ship)
and `sani.html` (the two layered). The shipped WebP files are screenshots of `sani.html`:
2880x1800 for desktop (stroke widths doubled for the 2x capture, then a 1440x900 downscale) and
780x1688 for phones, saved as WebP at quality 70.

Elevation comes from the AWS Open Data Terrain Tiles (terrarium format,
https://registry.opendata.aws/terrain-tiles/). For this area the source is SRTM and GMTED2010.
Required attribution: SRTM and GMTED2010 terrain data courtesy of the U.S. Geological Survey.
