# Jasper's Fanfiction Spot — Six Novels, 300 Written Chapters

The **Lanternweald** is one connected, original, lived-in setting for six linear fanfiction romance novels. Jasper is the same adult, first-person reader-insert (externally they/them) across all six. They explicitly tell their partners they are **ethically non-monogamous** and **prefer polyamory**. Partners can negotiate privacy, schedules, reassurance and consent without control over anyone else. Romance is sensual but **not sexually explicit**; later intimacy uses private fade-to-black. The narrative style is guided by `json/william-writing-style.json` while preserving each partner's recognizable character voice.

## Final chapter count: November 5, 2026

| Novel | Relationship focus | Written chapters | Approx. manuscript words* |
|---|---|---:|---:|
| The Shore I Choose | Maui / Jasper | **50 / 50** | 49,293 |
| After Always | Severus Snape / Jasper | **50 / 50** | 66,199 |
| Jasmine After Rain | Iroh / Jasper | **50 / 50** | 56,103 |
| Love & Duty | Adult Aang, Katara, Toph / Jasper | **50 / 50** | 72,956 |
| What the Armor Leaves Behind | Danse / Jasper | **50 / 50** | 73,063 |
| Stars Between the Strings | Greg Universe / Jasper | **50 / 50** | 59,746 |
| **Total** | **Six connected novels** | **300 / 300** | **377,360** |

*Manifest word totals are editorial metadata and may differ from an independent re-count after any future line edits. All 300 chapter slots have actual prose content, not stubs or outline text. **Chapter-count parity is achieved; prose-depth parity still warrants editorial revision of older, shorter chapters, especially Maui chapters 1–10.** Word counts and dialogue richness vary across the series; do not claim full length/depth equalization solely from having 50 chapters each.

## Sixth expansion pass

**19 full Maui chapters, 32–50, committed directly to `main` without a new branch or pull request.** This completed the sixth novel. They develop a revisable relationship agreement; Greg and Danse crossovers; public boundaries around private polyamory; archive testimony; a joint bridge maintenance funding agreement; a carefully inspected seventh-scratch maintenance chamber; flood and emergency decisions; a non-heroic community celebration; Jasper's chosen memory exploration; a storm-tested temporary surface water channel; a public archive ledger retaining unresolved evidence; Tomas's voluntary return; and a non-exclusive, tender ending with Maui.

Previous passes added 6 + 12 + 12 + 18 + 23 = 71 prose chapters, bringing the earlier 210-chapter library to 281. Pass six added the final 19, for **300 complete prose chapter files**. All other five novels had already received chapter-50 conclusions in pass five; pass six does not rewrite or erase them.

## How to read

Open **`Jasper/Book/index.html`** directly in a browser. The existing **floating 3D book cover** is the visual entrance. Activate it to reach a **linear** reading interface with story and chapter selectors, Previous/Next controls, a progress meter, and locally saved reading position. Use the Back to book cover control to return. No page-flipping romance mechanics, CYOA branches, game decisions, or internet fetches are required. The floating cover still uses `assets/book-cover.png`.

Script load order is important because each successive JavaScript file adds real complete prose to the in-memory offline library before `js/app.js` renders it:

1. `js/fanfic-data.js` — original 210 chapters
2. `js/lanternweald-relationship-scenes.js` — early ENM/polyamory disclosures and bridges
3. `js/lanternweald-new-chapters.js` — first six added chapters
4. `js/lanternweald-continuations-pass2.js` — second pass
5. `js/lanternweald-continuations-pass3.js` — third pass
6. `js/lanternweald-continuations-pass4-maui.js` — Maui 16–23
7. `js/lanternweald-continuations-pass4-others.js` — five novels 46–47
8. `js/lanternweald-continuations-pass5-maui.js` — Maui 24–31
9. `js/lanternweald-continuations-pass5-others.js` — five novels 48–50
10. `js/lanternweald-continuations-pass6-maui-32-40.js` — Maui 32–40
11. `js/lanternweald-continuations-pass6-maui-41-50.js` — Maui 41–50
12. `js/app.js` — chapter renderer and progress
13. `js/floating-book.js` — animated cover interactions

Each novel also contains `json/<fandom>/<series>/<number>.json` source chapters and a `series.json` manifest recording all 50 IDs, next links, titles, and word counts. `json/fandoms.json` records the six-series catalog. The reader works locally using embedded chapter content, rather than relying on `fetch()` for file:// chapter loading.

## Living world and future editorial work

The Lanternweald's seven original districts share finite resources, schedules, local politics, public services, voluntary Threadway travel, seasonal celebrations, work, culture, and evolving relationships. It is **not** a clone of Dreamlight Valley; the comparison is about an equally rich sense of place, routine, neighbors and discoveries.

- `docs/LANTERNWEALD_LIVING_WORLD_BIBLE.md` — foundational Threadway and district rules
- `docs/LANTERNWEALD_PASS2_CONTINUITY.md` — early linked continuity
- `docs/LANTERNWEALD_PASS3_CONTINUITY.md` — accessibility, costs, grief, consent and privacy
- `docs/LANTERNWEALD_PASS4_CONTINUITY.md` — seasonal customs, skills, bells and garden stewardship
- `docs/LANTERNWEALD_PASS5_CONTINUITY.md` — five novel endings and interdependent infrastructure
- `docs/LANTERNWEALD_PASS6_CONTINUITY.md` — sixth novel completion, civic atlas, open mysteries and future scene anchors
- `json/lanternweald-living-world-registry.json` — structured seven-district and resident continuity registry
- `docs/SIX_NOVELS_FIFTY_CHAPTER_ROADMAP.md` — 300 marked-written beat summaries for editorial navigation

**Depth-parity audit:** `docs/PROSE_DEPTH_PARITY_AUDIT.md` compares all six 50-chapter manifests and identifies shorter passages for targeted scene-level expansion without adding chapter numbers.

**Remaining work is editorial, not missing chapters:** deepening shorter older prose, preserving each character's distinct speech and pace, refining intimate fade-to-black variation, reconciling chronological overlaps, and running a true visual browser usability test. The lower Tideglass **historic underground service passage remains sealed** at these endings; the **temporary surface channel** is what passes storm tests and reopens. Do not flatten that distinction in future revisions.
