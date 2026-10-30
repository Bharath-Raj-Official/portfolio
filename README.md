# Bharath's portfolio

Next.js portfolio prepared for **https://bharath-raj-official.github.io/portfolio/**.
This directory is the repository root. The application uses static HTML, CSS,
JavaScript and local assets; production hosting does not need a Node server.

## Run locally

Use Node.js 22 and npm. In this directory, run:

```sh
npm ci
npm run typecheck
npm test
npm run build
npm run preview
```

Open **http://127.0.0.1:3022/portfolio/**. Build output is in `out/`.
`npm run dev` starts the development server on port 3021, also under `/portfolio/`.
Stop any other application using that port first, or use the static preview.

## Upload to GitHub

1. Upload the **contents** of this directory to the root of
   `Bharath-Raj-Official/portfolio`. Do not upload a containing `github upload`
   directory. Include hidden files, especially `.github/workflows/pages.yml`.
2. Keep `node_modules/`, `.next/`, `out/`, caches and private files out of the
   repository. `.gitignore` lists the generated directories.
3. When ready to publish, set the repository's **Settings → Pages → Source** to
   **GitHub Actions**. Open **Actions → Deploy portfolio to GitHub Pages → Run
   workflow** and select the branch containing these files.
4. The workflow installs dependencies, checks types, runs tests, builds `out/`
   and deploys it. The workflow runs only when manually requested and only in
   `Bharath-Raj-Official/portfolio`.

Preparing this directory does not upload files or change repository settings.
Any agent-assisted upload must use the existing guarded, repository-scoped
publishing workflow. No credentials belong in this directory.

## Hosting details

The build uses `/portfolio` as its fixed base path and emits directory-based
HTML pages. Supported project URLs are prerendered, including their existing
aliases. Query-string project views initialize in the browser. Unknown paths
use the exported `404.html` and its existing interactive game.

Local media, fonts and data are included. External project links open separate
sites. Contact uses email links and browser clipboard features; résumé export
uses the browser print dialog. Existing search-indexing settings are preserved.

The Doom game and its bundled binary are excluded from this upload edition.
See `THIRD-PARTY-NOTICES.md` and the font license files for applicable notices.
This portfolio contains project descriptions and selected presentation assets,
not the underlying project repositories, models, datasets or private documents.
