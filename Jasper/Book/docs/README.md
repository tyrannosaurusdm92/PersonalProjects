# Jasper's Fanfiction Spot

Six interconnected, linear, non-graphic romantic fanfictions in the original shared world **the Lanternweald**. Jasper is an adult first-person reader-insert; other characters use they/them for Jasper. The source of truth is [the `main/Jasper/Book` directory](https://github.com/tyrannosaurusdm92/PersonalProjects/tree/main/Jasper/Book), not a development branch or an unmerged PR.

## Written chapters — November 5, 2026

| Novel | Romantic pairing | Finished prose chapters | Unwritten to reach 50 |
|---|---|---:|---:|
| The Shore I Choose | Maui / Jasper | **23** | 27 |
| After Always | Severus Snape / Jasper | **47** | 3 |
| Jasmine After Rain | Iroh / Jasper | **47** | 3 |
| Love & Duty | Adult Aang, Katara, Toph / Jasper | **47** | 3 |
| What the Armor Leaves Behind | Paladin Danse / Jasper | **47** | 3 |
| Stars Between the Strings | Greg Universe / Jasper | **47** | 3 |
| **Total** | **Six linked novels** | **258 / 300** | **42** |

**Fourth writing pass:** 18 additional fully written prose chapters—Maui **16–23**, and five other novels **46–47**. The source files, manifests, catalog and offline reader were edited directly on `main` with no newly created branch or PR. Earlier chapters and the floating book cover remain preserved.

**Previously finished batches:** the original library had 210 chapters. The first pass added 6 chapters (Maui 11; other novels 41); the second added 12 (Maui 12–13; others 42–43); the third added 12 (Maui 14–15; others 44–45); the fourth added 18. The six informed relationship-disclosure scenes were added in their corresponding earlier source chapters and in the offline reader patch. The older Maui chapters, especially 1–10, still need a deeper editorial treatment to equalize overall depth. The target of 300 chapters has not been completed.

## Reading the interactive library without a server

Double-click `index.html` in `Jasper/Book`. A **floating interactive 3D book** is the opening screen. Click it or press Enter/Space while focused to open the regular linear reader; choose Back to book cover to return. The reader uses story/chapter selects, Previous/Next and saved on-device progress, **not page-flipping, game choices or interactive romantic branches**. The book art comes from the existing `assets/book-cover.png`. Motion reduction and a fallback for browsers without JavaScript are retained.

Script order in `index.html` is deliberate. Do not load the renderer before the overlays:

1. `js/fanfic-data.js` — original offline 210-chapter base
2. `js/lanternweald-relationship-scenes.js` — early ENM disclosures and world interludes
3. `js/lanternweald-new-chapters.js` — first six new chapters
4. `js/lanternweald-continuations-pass2.js` — second batch of twelve chapters
5. `js/lanternweald-continuations-pass3.js` — third batch of twelve chapters
6. `js/lanternweald-continuations-pass4-maui.js` — fourth-batch Maui chapters 16–23
7. `js/lanternweald-continuations-pass4-others.js` — fourth-batch chapters 46–47 in five novels
8. `js/app.js` — linear chapter renderer and progress storage
9. `js/floating-book.js` — the animated cover gateway, after the reader is initialized

Each new chapter also exists as editable JSON source in `json/<fandom>/<series>/<chapter-number>.json` and is indexed from its `series.json` manifest. The catalog at `json/fandoms.json` matches actual chapter files, not planned outlines.

## Relationship commitments and style

Jasper tells Maui, Severus, Iroh, the adult Aang/Katara/Toph polycule, Danse and Greg that they are **ethically non-monogamous** and **prefer polyamory**, before the respective first romance scenes. Their partners ask questions, set individual boundaries, express complicated feelings, and retain their own lives and cultural contexts. Added chapters follow the prose fingerprint in `json/william-writing-style.json`: first-person emotional honesty, practical sensory details, character-distinct dialogue, warmth, awkward flirtation, repaired conflict and non-graphic fade-to-black intimacy. No sexual act is rendered explicitly.

## Lore and the remaining writing plan

- `docs/LANTERNWEALD_LIVING_WORLD_BIBLE.md`: the central living world bible and five rules of the Threadways
- `docs/LANTERNWEALD_PASS2_CONTINUITY.md`: departures, civic accountability, chemical testing, archival context
- `docs/LANTERNWEALD_PASS3_CONTINUITY.md`: floodplain policy, trade, the Lantern Walk, safety and romance continuity
- `docs/LANTERNWEALD_PASS4_CONTINUITY.md`: sea-glass orchard, Frostturn, second bell, apprenticeship, cultural boundaries, Listening Fair, cross-world events and new recurring residents
- `docs/SIX_NOVELS_FIFTY_CHAPTER_ROADMAP.md`: all 300 planned chapter slots, with written entries clearly marked. **42 chapters remain outline-only**, so they are not available to read.

The Lanternweald is a shared place with limited resources, seasons, civic choices, grief, services, agriculture and accessibility—not a clone of Dreamlight Valley and not a mechanism to force a romance, erase history, or generate effortless happy endings.

## QA scope

Content integrity and reader data were checked at the source level. A full interactive visual browser run is a separate testing step and is not implied by these source checks.
