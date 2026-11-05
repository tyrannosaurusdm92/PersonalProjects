# Jasper's Fanfiction Spot — Six Novels, 300 Written Chapters

The **Lanternweald** is one connected, original, lived-in setting for six linear fanfiction romance novels. Jasper is the same adult, first-person reader-insert (externally they/them) across all six. They explicitly tell their partners they are **ethically non-monogamous** and **prefer polyamory**. Partners can negotiate privacy, schedules, reassurance and consent without control over anyone else. Romance is sensual but **not sexually explicit**; later intimacy uses private fade-to-black. The narrative style is guided by `json/william-writing-style.json` while preserving each partner's recognizable character voice.

## Current manuscripts: November 5, 2026

| Novel | Relationship focus | Written chapters | Approx. manuscript words* |
|---|---|---:|---:|
| The Shore I Choose | Maui / Jasper | **50 / 50** | 57,945 |
| After Always | Severus Snape / Jasper | **50 / 50** | 68,724 |
| Jasmine After Rain | Iroh / Jasper | **50 / 50** | 64,295 |
| Love & Duty | Adult Aang, Katara, Toph / Jasper | **50 / 50** | 75,450 |
| What the Armor Leaves Behind | Danse / Jasper | **50 / 50** | 75,252 |
| Stars Between the Strings | Greg Universe / Jasper | **50 / 50** | 64,866 |
| **Total** | **Six connected novels** | **300 / 300** | **406,532** |

*Manifest word totals are editorial metadata and may differ from an independent re-count after any future line edits. All 300 chapter slots have actual prose content, not stubs or outline text. **Chapter-count parity is complete. The eleventh pass rewrites/expands 19 existing chapters. 74 chapters remain under the 1,200-word editorial review guideline; scene-depth parity is not yet complete.** Word counts and dialogue richness vary across the series; do not claim full length/depth equalization solely from having 50 chapters each.

## Sixth expansion pass

**19 full Maui chapters, 32–50, committed directly to `main` without a new branch or pull request.** This completed the sixth novel. They develop a revisable relationship agreement; Greg and Danse crossovers; public boundaries around private polyamory; archive testimony; a joint bridge maintenance funding agreement; a carefully inspected seventh-scratch maintenance chamber; flood and emergency decisions; a non-heroic community celebration; Jasper's chosen memory exploration; a storm-tested temporary surface water channel; a public archive ledger retaining unresolved evidence; Tomas's voluntary return; and a non-exclusive, tender ending with Maui.

Previous passes added 6 + 12 + 12 + 18 + 23 = 71 prose chapters, bringing the earlier 210-chapter library to 281. Pass six added the final 19, for **300 complete prose chapter files**. All other five novels had already received chapter-50 conclusions in pass five; pass six does not rewrite or erase them.

## Seventh editorial revision pass

**19 chapters revised directly on `main`; the six 50-chapter sequences and their endings remain intact.** This is a prose-depth pass, not a seventh chapter-creation expansion. Five early Maui chapters, four Iroh chapters, four Greg chapters and two each from Severus, Love & Duty and Danse received deeper scenes, actual conversations and more distinct environmental/relationship consequences. The canonical JSON chapters, `series.json` metadata, `json/fandoms.json` totals, and the offline reader now reflect these revisions.

**Historical seventh-pass metadata:** 386,829 words across 300 prose chapters, with 106 below the 1,200-word editorial target. See the eighth-pass status below for updated figures. See `docs/PROSE_DEPTH_PARITY_AUDIT.md` for the refreshed breakdown and `docs/LANTERNWEALD_PASS7_CONTINUITY.md` for strengthened seven-district and homeworld continuity.

## Eighth editorial revision pass

**13 additional existing chapters revised directly on `main`, without a new branch or pull request.** The revised chapters are Maui **2, 7, 9, 10**; Severus **34**; Iroh **31, 35, 40**; Love & Duty **48**; Danse **48**; Greg **25, 31, 40**. Each has deeper dialogue, practical consequences, and stronger lived-world / homeworld boundaries. The source JSON, all six manifests, catalog and offline reader are synchronized. Every novel still has 50 chapters; no endings or earlier ethical non-monogamy disclosures were erased.

**Historical eighth-pass metadata:** **393,108 words** across 300 written chapters, with 10 below 700 words and 99 below the 1,200-word editorial guideline. The ninth-pass status below supersedes these counts. Chapter-count parity is complete. Scene-density parity remains a separate goal, not something solved by a few word-count increases. Read `docs/LANTERNWEALD_PASS8_CONTINUITY.md` and `docs/PROSE_DEPTH_PARITY_AUDIT.md` for the new canon notes and next editing priorities.

## Ninth editorial revision pass

**12 existing chapters revised and published directly on `main` without a new branch or pull request.** Maui **43, 48**; Severus **48**; Iroh **32, 36, 38**; Love & Duty **47**; Danse **47**; Greg **24, 28, 34, 35**. The ninth pass replaces repetitive Iroh and Greg narration with genuine, differentiated scenes; expands community accountability, accessible festivals and civic records; and preserves chosen polyamory, consent and non-explicit intimate fade-to-black. The canonical JSON files, six manifests, catalog, and offline reader all include the updated text.

**Current manuscript metadata:** **399,226 words**, 300 complete chapters, **7 below 700 words** and **87 below 1,200 words**. This is progress, not a claim that every chapter has identical depth. See `docs/LANTERNWEALD_PASS9_CONTINUITY.md` for seasonal district life, homeworld distinctions and interdependent resident systems, and `docs/PROSE_DEPTH_PARITY_AUDIT.md` for current editorial priorities.

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
12. `js/lanternweald-revisions-pass7-a.js` — revised Maui and Iroh prose overrides
13. `js/lanternweald-revisions-pass7-b.js` — revised Severus, Love & Duty, Danse and Greg prose overrides
14. `js/lanternweald-revisions-pass8-a.js` — Maui and Iroh eighth-pass prose revisions
15. `js/lanternweald-revisions-pass8-b.js` — Severus, Love & Duty, Danse and Greg eighth-pass prose revisions
16. `js/lanternweald-revisions-pass9-a.js` — ninth-pass Maui and Iroh text overrides
17. `js/lanternweald-revisions-pass9-b.js` — ninth-pass Severus, Love & Duty, Danse and Greg text overrides
18. `js/app.js` — chapter renderer and progress
19. `js/floating-book.js` — animated cover interactions

Each novel also contains `json/<fandom>/<series>/<number>.json` source chapters and a `series.json` manifest recording all 50 IDs, next links, titles, and word counts. `json/fandoms.json` records the six-series catalog. The reader works locally using embedded chapter content, rather than relying on `fetch()` for file:// chapter loading.

## Living world and future editorial work

The Lanternweald's seven original districts share finite resources, schedules, local politics, public services, voluntary Threadway travel, seasonal celebrations, work, culture, and evolving relationships. It is **not** a clone of Dreamlight Valley; the comparison is about an equally rich sense of place, routine, neighbors and discoveries.

- `docs/LANTERNWEALD_LIVING_WORLD_BIBLE.md` — foundational Threadway and district rules
- `docs/LANTERNWEALD_PASS2_CONTINUITY.md` — early linked continuity
- `docs/LANTERNWEALD_PASS3_CONTINUITY.md` — accessibility, costs, grief, consent and privacy
- `docs/LANTERNWEALD_PASS4_CONTINUITY.md` — seasonal customs, skills, bells and garden stewardship
- `docs/LANTERNWEALD_PASS5_CONTINUITY.md` — five novel endings and interdependent infrastructure
- `docs/LANTERNWEALD_PASS6_CONTINUITY.md` — sixth novel completion, civic atlas, open mysteries and future scene anchors
- `docs/LANTERNWEALD_PASS7_CONTINUITY.md` — strengthened scene logic and new resident details across all six novels
- `docs/LANTERNWEALD_PASS8_CONTINUITY.md` — eighth-pass shared-world consequences, chronology and relationship continuity
- `docs/LANTERNWEALD_PASS9_CONTINUITY.md` — ninth-pass seven-district daily life, seasonal rhythms, evidence corrections and mutual romance consent
- `json/lanternweald-living-world-registry.json` — structured seven-district and resident continuity registry
- `docs/SIX_NOVELS_FIFTY_CHAPTER_ROADMAP.md` — 300 marked-written beat summaries for editorial navigation

**Depth-parity audit:** `docs/PROSE_DEPTH_PARITY_AUDIT.md` compares all six 50-chapter manifests and identifies shorter passages for targeted scene-level expansion without adding chapter numbers.

**Remaining work is editorial, not missing chapters:** deepening shorter older prose, preserving each character's distinct speech and pace, refining intimate fade-to-black variation, reconciling chronological overlaps, and running a true visual browser usability test. The lower Tideglass **historic underground service passage remains sealed** at these endings; the **temporary surface channel** is what passes storm tests and reopens. Do not flatten that distinction in future revisions.


## Tenth editorial pass — November 5, 2026

Fourteen existing chapters revised directly on `main` without a branch or pull request: Maui 36/40/42, Severus 47, Iroh 23/25/27/37, Love & Duty 46, Danse 46, Greg 23/26/30/32. Eight template-heavy chapters received distinct replacement scenes; six others gained practical consequences. Both offline reading overlays are loaded before `js/app.js`, and all 300 chapter IDs and endings remain intact. Canon addendum: `LANTERNWEALD_PASS10_CONTINUITY.md`. Latest source counts and limitations: `PROSE_DEPTH_PASS10_AUDIT.md`.


## Eleventh editorial pass — November 5, 2026

Nineteen chapters revised directly on `main` (no branch or PR): Maui 33/34/37/45; Severus 31/32; Iroh 22/24/26/28/34; Love & Duty 43/44; Danse 42/43; Greg 22/27/29/33. Nine shorter chapters were rewritten with distinct dialogue and structure; ten received consequential scenes. The revised JSON and full offline-reader chapter overlays are synchronized. All six linear novels retain 50 chapters each, Teen-rated non-explicit romantic intimacy, and openly negotiated ethical non-monogamy and preferred polyamory.

Current reference: `PROSE_DEPTH_PASS11_AUDIT.md`. Extended living world: `LANTERNWEALD_PASS11_CONTINUITY.md`. These do not supersede the historical audits of earlier passes, and `file://` reading should still be tested in a real browser before a release.
