# Eleventh Editorial Pass — Depth and Cross-Novel Continuity Audit

**Current revision date:** November 5, 2026. All work committed directly to the existing `main` branch. This is the successor to the *historical* tenth-pass audit.

## Current manuscript metadata

| Novel | Chapters | Manuscript words | Median words/chapter | Below 1,200 words | Below 700 words |
|---|---:|---:|---:|---:|---:|
| The Shore I Choose | 50 | 57,945 | 1,188.5 | 29 | 0 |
| After Always | 50 | 68,724 | 1,379 | 5 | 0 |
| Jasmine After Rain | 50 | 64,295 | 1,340.5 | 19 | 0 |
| Love & Duty | 50 | 75,450 | 1,505.5 | 0 | 0 |
| What the Armor Leaves Behind | 50 | 75,252 | 1,518.5 | 2 | 0 |
| Stars Between the Strings | 50 | 64,866 | 1,302.5 | 19 | 0 |
| **Total** | **300** | **406,532** | — | **74** | **0** |

The figures are the sum of recorded `word_count` values in each `series.json`, with every series recalculated. There is no claim of equal *literary* quality or word count; 74 chapters still fall under a 1,200-word editorial review line. Some shorter chapters may be intentionally effective. No chapter is now below 700 words.

## Prose changes made in the eleventh pass

| Novel | Revised chapter numbers | Primary improvement |
|---|---|---|
| The Shore I Choose | 33, 34, 37, 45 | Greg–Maui listening, an inspected batch of coastal hardware, fair shelter procedure for Vel, and a consent-based festival program |
| After Always | 31, 32 | Spinner's End repair feasibility, independent choices around home and private history, and sharper Severus–Jasper dialogue |
| Jasmine After Rain | 22, 24, 26, 28, 34 | **Five full rewrites** remove same-scene boilerplate: the chair, the balcony, cold tea, Pai Sho, and a crooked lantern all have different conflicts and consequences |
| Love & Duty | 43, 44 | Katara's independent Southern clinical staff; Sela's local flood records and veto of an unconsulted detour |
| What the Armor Leaves Behind | 42, 43 | Protected correspondence and verified components; Ash's accommodation and paid work explicitly separated |
| Stars Between the Strings | 22, 27, 29, 33 | **Four full rewrites** remove the repeated Greg template: a fundraiser soundcheck, a broken dinner commitment, a road trip and a storage-room discovery become distinct scenes |

These nineteen are **existing chapter slots**, not nineteen additions to the chapter count. Nine source chapters were fully rewritten and ten received targeted original scenes. All six existing chapter-50 endings remain intact, and the same Jasper narrates first-person, openly non-exclusively and without sexually explicit scenes.

## Delivery and validation contract

1. Canonical chapter text lives in `json/<fandom>/<series>/<NN>.json`, where each revised `word_count` is recalculated.
2. Every affected series manifest updates its chapter record and sums all 50 chapters. **All six manifests reconcile.**
3. `js/lanternweald-revisions-pass11-a.js` contains the nine complete rewritten offline reader chapters. `js/lanternweald-revisions-pass11-b.js` contains the other ten full prose overrides. They run in order after all earlier overlays and before `js/app.js`, retaining local file-open compatibility.
4. Existing chapter IDs, linear order, next/previous navigation, reading progress, ratings, consent conditions and six endings are not intentionally changed.
5. A source-level check is not a substitute for an actual visual/accessibility check of the browser or offline reader. The source prose still needs human editorial review for flow, repetition, pronunciation and emotional logic.

## Next editorial priority

Focus next on shorter Maui chapters 38/39/44/46, Iroh chapters 25/27/37 and Greg 23/26/30/32 (plus any other still-formulaic sections) with neighboring-chapter continuity before expansion. Consider sentence-level tightening as important as adding words. Keep the historic sealed lower service passage closed; the unresolved Closed Bells signature must stay unknown, and Ba Sing Se and Beach City remain distinct from the valley.
