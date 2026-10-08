# William Saville — Poetry & Short Stories

Open `book.html` in a modern browser. The package is intentionally shallow and Windows-safe.

## Contents

- `book.html` — single entry page
- `js/` — reader engine and embedded library data for direct local opening
- `json/` — all 33 supplied writing JSON records plus `library.json`
- `assets/` — supplied cover, supplied parchment texture, and the page-turn audio asset
- `css/` — book styling and parchment/curl presentation
- `docs/` — project notes, manifest, and audit

## Reader behavior

The old subject-specific compendium system was not carried into this edition. The reader is organized only around the supplied poems and short stories. Page turning uses a heavier 3D fold/curl model with pointer dragging, forward/backward turns, layered fold shadows, page-edge thickness, and a real WAV page-rustle asset.

## Resizing and page fitting

The reader measures the available space and redistributes every poem and story across its pages. Use **−**, **+**, or **Fit**, or drag the book's edges/corners to expand or reduce it. For details see `docs/RESPONSIVE_READER.md`. Full text is retained when pages are resized, and a scrollable page is available as a fallback on exceptionally small displays.

When included in the William website, this folder belongs at `hub/book/`; the page is `hub/book/book.html`.
