# Jasper's Fanfiction Spot — the Lanternweald

Six interconnected, **linear** fanfiction novels. Jasper is the same adult, first-person reader-insert (referred to as they/them by others) across all six, with informed, honest ethical non-monogamy and a stated preference for polyamory. Their relationships are independently chosen, regularly negotiated, and never mechanically forced by the Threadways. Romance is playful and sensual, with non-graphic fade-to-black and individual agency. The prose cadence is guided by `json/william-writing-style.json` while preserving character-specific voices.

## Written chapter status — 2026-11-05 (fifth expansion)

| Novel | Relationship focus | Written chapters | Still outlined |
|---|---|---:|---:|
| The Shore I Choose | Maui / Jasper | **31 / 50** | 19 |
| After Always | Severus Snape / Jasper | **50 / 50** | 0 |
| Jasmine After Rain | Iroh / Jasper | **50 / 50** | 0 |
| Love & Duty | Adult Aang / Katara / Toph / Jasper polycule | **50 / 50** | 0 |
| What the Armor Leaves Behind | Danse / Jasper | **50 / 50** | 0 |
| Stars Between the Strings | Greg Universe / Jasper | **50 / 50** | 0 |
| **Total** | **Six linked novels** | **281 / 300** | **19** |

**New in the fifth pass:** 23 **fully written** prose chapters: Maui **24–31**, and the final **48–50** for each of the other five novels. This brings the five other novels to their planned 50-chapter endpoints, while their shared world remains open for future stories. Maui's remaining **32–50** are still **unwritten outlines**, not chapters available in the reader. The historical baseline included shorter chapters, especially Maui 1–10; depth-parity line editing of older prose remains an editorial task even for books with 50 chapter files.

**Previous expansions:** 210 original chapters; pass 1 added 6; pass 2 added 12; pass 3 added 12; pass 4 added 18; pass 5 added 23. All source changes in the last four passes were committed directly to GitHub's existing `main` branch (no new branch/PR). Earlier disclosed ENM/polyamory conversations exist within the source prose and reader patch, not only in documentation.

## Interactive floating book and offline reader

Open `Jasper/Book/index.html` directly in a browser. The opening floating 3D cover uses the existing `assets/book-cover.png`. Activate the book to enter a **linear** reader with story/chapter dropdowns, Previous/Next buttons and local saved progress; use Back to book cover to return. This is not a page-flipping reader or a choose-your-own-adventure game. It requires no local server, and the fallback allows access to the reader if the floating-book enhancement cannot run.

Reader script order, with all chapter content embedded for local `file://` use:

1. `js/fanfic-data.js` — original 210-chapter offline base
2. `js/lanternweald-relationship-scenes.js` — informed ENM/polyamory conversations, existing narrative bridges
3. `js/lanternweald-new-chapters.js` — pass 1, six prose chapters
4. `js/lanternweald-continuations-pass2.js` — pass 2, twelve chapters
5. `js/lanternweald-continuations-pass3.js` — pass 3, twelve chapters
6. `js/lanternweald-continuations-pass4-maui.js` — Maui 16–23
7. `js/lanternweald-continuations-pass4-others.js` — five novels' 46–47
8. `js/lanternweald-continuations-pass5-maui.js` — Maui 24–31
9. `js/lanternweald-continuations-pass5-others.js` — five novels' 48–50
10. `js/app.js` — renderer and saved progress
11. `js/floating-book.js` — floating gateway interactions

The JSON source of each real chapter is at `json/<fandom>/<series>/<chapter-number>.json`. Each `series.json` contains exact chapter count, word counts, IDs, next-chapter links and outlines remaining. `json/fandoms.json` provides the reconciled catalog. The offline reader contains the same complete written chapters as source JSON; it is not necessary to fetch the JSON over a network.

## Connected world and source-of-truth docs

The Lanternweald is a lived-in seven-district world, comparable to a life-simulation setting in its daily variety, but original in geography, Threadway ethics, residents, economy, memory and public responsibilities. Crossovers have concrete consequences: Tideglass storm conditions affect Jasmine Steps drainage and Starwake resonance; Moonroot's damaged records inform safe infrastructure repairs; Brasswatch's generator serves Lanternwell; Riverstone's bridge reopening changes access to homes and deliveries. Residents can disagree, decline invitations, keep secrets, own property, charge fairly and leave.

- `docs/LANTERNWEALD_LIVING_WORLD_BIBLE.md` — immutable Threadway constraints, primary civic and district lore
- `docs/LANTERNWEALD_PASS2_CONTINUITY.md` — departures, early crossover consequences
- `docs/LANTERNWEALD_PASS3_CONTINUITY.md` — accessibility, historical accuracy, shared scarce resources, the Lantern Walk
- `docs/LANTERNWEALD_PASS4_CONTINUITY.md` — Frostturn, orchard trial, second bell, Longlight, apprenticeship, Listening Fair
- `docs/LANTERNWEALD_PASS5_CONTINUITY.md` — closure outcomes in five books, additional community systems, cross-novel chronology, ongoing lower passage inquiry and Maui's remaining arc
- `docs/SIX_NOVELS_FIFTY_CHAPTER_ROADMAP.md` — all 300 original chapter slots, each marked written versus still outlined

Remaining work: **19 full Maui chapters** (32–50), plus an eventual revision for depth parity in older stories. Five novels have a written ending, but **none of the other relationships are erased or converted to exclusivity** to obtain closure.

**Validation scope:** chapter counts, chapter numbering, unique IDs, next links, script load order and source/reader consistency can be checked structurally. This does not assert a full visual browser usability test or professional editorial certification.
