# Third-party notices — Portfolio application

## Typography

Jacquard 12 and DotGothic16 are distributed under the SIL Open Font License 1.1. The complete notices are in `public/fonts/Jacquard-OFL.txt` and `public/fonts/DotGothic-OFL.txt`. `public/fonts/provenance.json` records the exact reference font binaries and their SHA-256 digests. Original Google Fonts projects: https://github.com/google/fonts/tree/main/ofl/jacquard12 and https://github.com/google/fonts/tree/main/ofl/dotgothic16.

The five portraits and existing project captures were copied from the user's saved portfolio. Project-specific attributions remain in `src/content/projects.ts` and are displayed in each case. Generated SVG architecture illustrations depict the existing pipeline descriptions and are labelled as illustrations. No third-party project archive was imported.

## Design and motion reference

The reference is https://eddy-naboulet.dev/. Its measured fonts, palettes, geometry and animation parameters inform this independent implementation. Its public modules and screenshots were inspected for research; reference JavaScript bundles, Eddy's photographs and original project media are not shipped as this application's assets. Research screenshots live outside `public/`.

Derived portrait geometry was generated from locally substituted user portraits in isolated reference sessions. Input and result hashes are in `public/portraits/geometry-provenance.json`. These numerical image data do not contain Eddy's portrait.

## Dependencies

Installed package versions are pinned in `package-lock.json`; their license files remain in `node_modules`. Installing a package does not grant rights in unrelated reference artwork or project source. The portfolio isolation rules and DJ publishing hold remain unchanged.

The six pixel-cursor grids in `src/content/cursor-grids.json` record the public reference cursor shapes at their two-pixel cell size. The application redraws them for its current palette; the original local research workspace records the research measurement and hotspots.

The diagram coordinate sets and vector-letter grid in `public/diagrams/geometry.json` are visual measurements of the requested public reference. The measurement URL and date are embedded in that data. Labels are adapted to English; the local renderer and content are independent. The export script is retained in the original local research workspace.
