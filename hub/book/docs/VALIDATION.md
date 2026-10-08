# Reader Validation — Responsive Edition

## Content integrity

- Writing records: **33** (**18** poems, **15** short stories).
- Original writing characters: **184,449**.
- The supplied JSON writing records, embedded library data, cover image, parchment texture, and page-turn WAV are retained unchanged.
- The reader splits each work into exact, contiguous substrings of its original content. Tests reconstruct each work from the rendered page plan and compare the result to the complete original, character for character.

## Display behavior

- Paginate against measured available space for every page, with no fixed character count truncation.
- Recalculate responsive type sizes, titles, padding, contents, and page count after resizing or zooming.
- Support both two-page spreads and single-page narrow layouts.
- Resize from eight edges/corners, or with Zoom − / + / Fit.
- Keep the selected work in view across re-pagination.
- Keep scrollable overflow as a fallback for extraordinary narrow-space cases, rather than hiding writing.
- Preserve cover, index, search, drag-to-turn, paper curl, page-turn sound, and navigation.

The number of pages is **dynamic**: it changes with window dimensions, font metrics, and the reader's size. Consequently a hard-coded page count does not apply.

## Installation

Extract the `book/` folder to the website's `hub/` directory. The reader is at `hub/book/book.html`. Existing `william.html` links require no changes.
