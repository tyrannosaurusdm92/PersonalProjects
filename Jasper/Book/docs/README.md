# Jasper's Fanfiction Spot

Six interconnected, linear, non-graphic romantic fanfictions sharing the **Lanternweald**. Jasper is the adult, first-person reader-insert (they/them). The fiction continues to develop toward **50 meaningful chapters per series**. All prose chapters are real, selectable writing; outlines are not shown as completed chapters.

## What is written now (November 5, 2026)

| Novel | Partner(s) | Finished chapters | Toward 50 |
|---|---|---:|---:|
| The Shore I Choose | Maui | **15** | 35 unwritten |
| After Always | Severus Snape | **45** | 5 unwritten |
| Jasmine After Rain | Iroh | **45** | 5 unwritten |
| Love & Duty | Adult Aang, Katara, Toph | **45** | 5 unwritten |
| What the Armor Leaves Behind | Paladin Danse | **45** | 5 unwritten |
| Stars Between the Strings | Greg Universe | **45** | 5 unwritten |
| **Total** | | **240 / 300** | **60 unwritten** |

Three editorial passes have added **30 fully written chapters**, six direct and informed early relationship conversations, and a comprehensive, connected world-building system. Pass one added six chapters (Maui 11, others 41); pass two added twelve (Maui 12–13, others 42–43); pass three added another twelve (Maui 14–15, others 44–45). The existing earlier prose has been preserved, including the original events and character relationships. Some earlier, shorter chapters still need a separate depth-parity line-edit; no one should mistake this for 300 complete chapters.

## Reading

Double-click **`index.html`** in this directory. The **floating 3D book** is the interactive opening to the library: select the book to enter, and choose Back to book cover to return. The story reader itself remains linear, with previous/next buttons, story/chapter selects, and a progress meter. Its reading position is stored locally in the browser. No branching, choose-your-own-adventure paths, page-flipping mechanics, live server, or connection to a backend are required.

The book gateway uses `css/book.css`, `js/floating-book.js`, and the existing `assets/book-cover.png`. It has keyboard support, reduced-motion accommodations, and an accessible no-JavaScript fallback to the reader.

The reader data load order matters:

1. `js/fanfic-data.js` — original fully offline library (210 chapters)
2. `js/lanternweald-relationship-scenes.js` — six early honest ENM/polyamory disclosures and pre-existing Lanternweald bridges
3. `js/lanternweald-new-chapters.js` — first-pass six prose chapters
4. `js/lanternweald-continuations-pass2.js` — second-pass twelve prose chapters
5. `js/lanternweald-continuations-pass3.js` — third-pass twelve prose chapters
6. `js/app.js` — chapter renderer
7. `js/floating-book.js` — opening book interaction

All new chapters also exist as complete JSON source files in `json/<fandom>/<series>/<chapter-number>.json`. Their `series.json` files link correctly to next chapters, and `json/fandoms.json` mirrors current counts.

## Romance and consent

Each relevant partner is told before romance that Jasper is **ethically non-monogamous** and **prefers polyamory**. Those conversations were written into source JSON and the offline data patch, not merely put in notes. Individuals may consent, ask questions, reconsider, set privacy boundaries, and negotiate time separately; Jasper's romantic commitments do not force anyone else into relationships. Aang/Katara/Toph are written as adults in an explicitly consensual polycule. The writing includes flirtation, teasing, sensual tension and natural non-graphic fade-to-black scenes without explicit sexual descriptions.

## World reference and plot progression

- `docs/LANTERNWEALD_LIVING_WORLD_BIBLE.md`: established seven districts, history, characters, civic systems and magic limits
- `docs/LANTERNWEALD_PASS2_CONTINUITY.md`: freedom of departure, seventh scratch, historical archives, repairing civic harm and shared resources
- `docs/LANTERNWEALD_PASS3_CONTINUITY.md`: dock and drainage work, honest trade, Lantern Walk, public-space accessibility, privacy and romance developments
- `docs/SIX_NOVELS_FIFTY_CHAPTER_ROADMAP.md`: remaining individual chapter arcs, cross-story chronology and quality objectives

**Important:** The 60 remaining chapters are not finished. Their titles and beats in the roadmap are outlines, not reader content. This repo's main branch is the working published source of truth.
