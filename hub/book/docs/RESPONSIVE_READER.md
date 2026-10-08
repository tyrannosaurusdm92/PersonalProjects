# Responsive Reading Pages

The book resizes and paginates against the **actual usable page area**, rather than cutting works at a fixed character or line count. Every original character remains in the supplied content files. When the size changes, the book reflows the writing and keeps the currently selected work in view.

## Reader controls

- **− / +**: reduce or enlarge the book and its page typography.
- **Fit**: restore the book to the available reading area.
- **Drag an edge or corner**: resize the book proportionally from any of eight directions. The corners appear when hovering over the book; they can also receive keyboard focus. Double-click a resize handle to restore Fit.
- **Keyboard**: with a resize handle focused, press arrow keys to change book size. Without focusing a handle, Left/Right turn pages; Ctrl/Cmd with +, −, or 0 changes size.
- **Contents/search**: jump to any of the 33 works.

## Content handling

The writing is never shortened, trimmed, or summarized. Each page draws an exact continuous substring of the original work; the concatenated substrings reconstruct the original content. Parchment texture, cover artwork, page-turn audio, and the fold/curl animation remain in place.

An exceptionally narrow viewport or unbreakable content may produce a scrollable page instead of cutting off the text. Reflow also adjusts the page inset, title, and type sizes to the new geometry. On narrower available reading widths, the spread changes to one page at a time.

## Installation

For the William website, put this `book/` directory into `hub/book/` and keep the existing link in `william.html` pointing to `hub/book/book.html`. No remote libraries, new services, or backend changes are required.
