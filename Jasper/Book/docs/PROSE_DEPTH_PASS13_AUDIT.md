# Thirteenth Editorial Pass — Manuscript and Offline Reader Audit

**Status:** Current verified source-level snapshot, November 5, 2026. All changes committed **directly on `main`** in `tyrannosaurusdm92/PersonalProjects`; no new branch or PR. Earlier pass audits are historical snapshots.

## Six 50-chapter novels — current manifest totals

| Novel | Chapters | Recorded words | Median chapter | Shortest | Longest | Chapters under 1,200 |
|---|---:|---:|---:|---:|---:|---:|
| The Shore I Choose | 50 | 68,010 | 1,366.5 | 1,217 | 1,558 | 0 |
| After Always | 50 | 70,489 | 1,397.5 | 1,201 | 1,858 | 0 |
| Jasmine After Rain | 50 | 71,169 | 1,425 | 1,202 | 2,013 | 0 |
| Love & Duty | 50 | 76,256 | 1,506 | 1,379 | 1,980 | 0 |
| What the Armor Leaves Behind | 50 | 76,044 | 1,527.5 | 1,218 | 1,992 | 0 |
| Stars Between the Strings | 50 | 72,269 | 1,466 | 1,202 | 2,008 | 0 |
| **Total** | **300** | **434,237** | — | — | — | **0** |

The previous twelfth-pass snapshot recorded **419,087** words, **300** chapters and **46** chapters below the 1,200-word editorial review guideline. The thirteenth pass added **15,150** recorded words to the same existing manuscripts (net of chronology and repetition cleanup). All six series manifests now reconcile against their 50 chapter entries.

**What the zero means:** all 300 recorded chapter word counts have crossed the **1,200-word length review line**, with the shortest recorded chapter at **1,201 words**. It does **not** prove equal literary quality, equal pacing, identical depth, zero repetition or perfectly reproduced author voice. The series still vary in total length, narrative structure and sentence rhythm. No automatic padding of existing longer chapters was done.

## Existing chapters revised — 46 total

| Novel | Chapter numbers revised this pass | Narrative intent |
|---|---|---|
| The Shore I Choose | 3, 4, 5, 6, 7, 8, 11, 18, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 36, 40, 42 | Chosen name, remembered work, Tideglass ecology, voluntary Māori performance, first invitations, personal memories, safety, intimacy, visitor agency, failed supplies, consent and community aftermath |
| Jasmine After Rain | 22, 23, 24, 26, 28, 30, 31, 34, 35, 44, 45, 46, 47, 50 | The Jasmine Dragon as an actual Ba Sing Se business, labor and wages, grief, Pai Sho, White Lotus boundaries, garden repair, a mint shortage, private longing and chosen affection |
| Stars Between the Strings | 22, 23, 25, 27, 29, 31, 33, 38, 40, 44, 46 | Greg and the Beach City community, accurate publicity, family responsibilities, chosen songs, the winter car wash, travel costs, a private storeroom, shared music, and safe Starwake performances |

The other three novels—**After Always**, **Love & Duty**, and **What the Armor Leaves Behind**—were already entirely above the length review line at the start of this pass. Their 150 existing chapters and endings are preserved; their shared-world consequences are incorporated in the revised shorter novels and living-world lore.

## Reader/source integrity

- Canonical chapter JSON files were edited in their existing `json/<fandom>/<series>/<NN>.json` locations; chapter IDs and chapter numbering remain unchanged.
- Each affected `series.json` has recalculated chapter entries and a matching total word count. All six manifests contain exactly 50 chapters.
- Seven complete offline-reader chapter overlays were created or updated: `js/lanternweald-revisions-pass13-a.js` through `pass13-g.js`. The reader loads them after earlier edits and before `js/app.js`; no additional HTML entry point or new reading route was introduced.
- **46/46 revised chapter texts, titles, chapter numbers and recorded word counts were read back from GitHub and compared against their corresponding pass-13 embedded reader copies; zero mismatches found.**
- The QA pass repaired an early Maui memory scene that temporarily repeated a doorway return, a laundry scene that jumped to tomorrow and back, the order of a customer visiting Iroh before closing, and repeated sandwiches in a Greg newspaper scene. These corrections are also reflected in the embedded reader.
- Iroh's chapter 50 correctly identifies the final shop location as **Ba Sing Se**, rather than conflating it with the Lanternweald's distinct Jasmine Steps.
- **Not tested:** visual rendering, focus order, screen-reader experience, `file://` behavior, in-browser navigation/progress storage, mobile responsiveness or actual reader script execution. Source and manifest parity is not a browser test.

## Tone, ethics and continuity review

- Jasper remains an adult first-person reader-insert; external references use they/them. The stories explicitly disclose their ethical non-monogamy and preference for polyamory; consent is revisable and private details are not public property.
- Partner voices differ intentionally: Maui's grandiosity and growing humility, Iroh's warmth and mischief beneath grief, Greg's humor and fear of rejection, Severus's precise defensiveness, Toph's refusal to be used as a tool, Katara's independent responsibilities, Aang's care, and Danse's hard-won accountability.
- Sensual tension remains **non-explicit** and can lead to a private fade-to-black; no explicit sexual content is required, and a kiss never grants continuing consent.
- The erased Closed Bells keeper remains unknown; the historic lower water passage stays sealed. The inspected upper hatch and the temporary surface channel are **different** structures. People work, travel and make decisions between crossover appearances.
- `docs/LANTERNWEALD_PASS13_CONTINUITY.md` and `json/lanternweald-pass13-social-web.json` separate on-page evidence from folklore and unwritten story seeds.

## What remains editorial, not yet certified

Length parity has reached the 1,200-word floor, but every novel still benefits from a full line-by-line human read for voice fidelity, scene transitions, sensory variety, emotional pacing, consistent spelling of names, and repeated stock phrases. A full chronological timeline across six books would also require scene-level date tagging and review. Do not call the books identical in depth simply because the threshold is now met.
