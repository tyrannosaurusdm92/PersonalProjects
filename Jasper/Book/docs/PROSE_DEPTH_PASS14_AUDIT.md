# Fourteenth Editorial Pass — Source QA, Scene Work and Continuity Audit

**Current source-level snapshot:** November 5, 2026. All changes committed to the existing `main` branch of `tyrannosaurusdm92/PersonalProjects`. No new branch or pull request.

## Existing six novels

| Novel | Chapters | Recorded words | Shortest | Median | Longest | Below 1,200 |
|---|---:|---:|---:|---:|---:|---:|
| The Shore I Choose | 50 | 68,720 | 1,217 | 1,371.5 | 1,634 | 0 |
| After Always | 50 | 71,160 | 1,202 | 1,409 | 1,858 | 0 |
| Jasmine After Rain | 50 | 72,105 | 1,202 | 1,451.5 | 2,013 | 0 |
| Love & Duty | 50 | 76,974 | 1,379 | 1,507 | 1,980 | 0 |
| What the Armor Leaves Behind | 50 | 76,795 | 1,281 | 1,530.5 | 1,992 | 0 |
| Stars Between the Strings | 50 | 72,920 | 1,202 | 1,472 | 2,008 | 0 |
| **Total** | **300** | **438,674** | — | — | — | **0** |

The thirteenth pass ended at **434,237** recorded words; the fourteenth pass ends at **438,674**, a net **4,437** word increase after newly written scenes and deliberate removal of repetition. All chapters remain over the previously adopted **1,200-word editorial length review line**. A length floor does not establish equality of literary quality, originality, dialogue or style.

## Fifteen revised existing chapter slots

| Series | Chapter numbers | Work completed |
|---|---|---|
| The Shore I Choose | 33, 45 | Maui and Greg use silence musically without turning it into permission to skip a safety check; Pip's revised festival poster lets Maui admit he likes applause without making an artist responsible for it |
| After Always | 46, 48 | Severus's evidence categories separate observed facts, reported memories and inference; a child's lantern mishap tests whether he can correct a problem without shaming somebody |
| Jasmine After Rain | 20, 21, 43, 48 | Cut redundant repeated ending; rewrote chapter 21 as a distinct Ba Sing Se teahouse scene about Jasper's spare key, Mina's paid staff, damaged stock, war memory and romantic choice; Iroh and Severus catalog military history without making it a convenient moral tale; Iroh and Maui argue, apologize and work together |
| Love & Duty | 46, 48 | Katara, Toph and Aang disagree without becoming three voices in a lecture; Amel's actual hours and Beren's cart route correct Jasper's inadequate water delivery spreadsheet |
| What the Armor Leaves Behind | 44, 48 | Ash tests a lock from the occupant's side; Renn manages critical electrical load while Aster and Danse correct a blocked accessible route |
| Stars Between the Strings | 19, 47, 49 | Removed a repeated goodnight and repaired the apartment-bed chronology; Nola ends Greg's unnecessary overtime after a show; Greg and Danse keep the same low note's artistic and engineering records separate |

**Editorial quality intent:** the new prose gives independent secondary characters agency, deepens sensory scene work, differentiates dialogue and avoids ending every disagreement with a perfectly polished speech. The Iroh 21 rewrite is the substantive full-scene replacement; the other edits are focused chapter additions, cuts or seam repairs. These 15 targeted edits are **not** a line-by-line proofread of all 300 chapters.

## Exact source/reader synchronization

1. Changed canonical chapter JSON bodies in `json/<series>/NN.json`; preserved the original `id`, series slug, chapter number, and title.
2. Recomputed the corresponding `series.json` chapter word counts and six overall manifest totals.
3. Added three complete offline-reader overlays in `js/lanternweald-revisions-pass14-a.js`, `...-b.js` and `...-c.js`. They apply after prior chapter revisions and before `js/app.js` in `index.html`.
4. **All 15 revised chapter titles, IDs, numbers, bodies and recorded word counts were re-read from GitHub and compared exactly with their new offline-reader overlays; 15/15 matched.**
5. All six manuscripts retain exactly 50 chapters; all six series totals reconcile and none contains a recorded sub-1,200-word chapter.

**Not verified:** runtime browser load under `file://`, content search in the app, saved reading progress, mobile rendering, keyboard navigation, screen-reader announcements, or a full literary copyedit. Source integrity is not a substitute for end-to-end testing.

## Shared-world and writer guidance

- `docs/LANTERNWEALD_PASS14_CAUSAL_ATLAS.md` records causality across the seven districts, differentiates actual events from optional future story scenes, and anchors the Closed Bells mystery without inventing the keeper.
- `json/lanternweald-pass14-continuity-ledger.json` identifies five multi-book causal chains, resident ties, scene anchors and non-negotiable geographic rules.
- `docs/VOICE_AND_DIALOGUE_PASS14.md` translates the repository's `json/william-writing-style.json` reference into a writing/editing checklist, not a claim of perfect voice imitation.
- Sensuality remains non-explicit with chosen fades to black. Jasper explicitly states their ethical non-monogamy and preferred polyamory; partner communication can be awkward, vulnerable and sometimes unsuccessful. None of the partner relationships is forced into an exclusive romance or a compulsory polyamorous group.
- The Jasmine Dragon stays a real Ba Sing Se business. Greg's family and business stay connected to Beach City. The historic lower flood passage remains sealed, its erased keeper unproven, and measured upper or surface works are not permission to reopen it.

## Subsequent literary priorities

- A human read-through of all 300 chapters to remove formulaic conclusions, repeated consent phrasing, voice drift and redundant scene beats. (The corrected Iroh 20 and Greg 19 demonstrate why word counts alone weren't enough.)
- A novel-by-novel review of pacing and distinct plot obstacles, not numeric equalization to the longest book.
- A precise cross-novel scene timeline, especially around the public lantern events and tests, before claiming that simultaneous stories share the same day.
- Actual browser and assistive-technology tests for the accumulated offline-reader overlays.
