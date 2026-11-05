# Twelfth Editorial Pass — Manuscript and Reader Audit

**Updated November 5, 2026.** Supersedes the eleventh-pass snapshot as the current working editorial audit. Changes were pushed directly to the existing `main` branch without a new branch or pull request.

## Manuscript totals (six current `series.json` files)

| Novel | Chapters | Manuscript words | Median/chapter | Under 1,200 words | Under 1,000 words |
|---|---:|---:|---:|---:|---:|
| The Shore I Choose | 50 | 61,235 | 1,229 | 21 | 0 |
| After Always | 50 | 70,489 | 1,397.5 | 0 | 0 |
| Jasmine After Rain | 50 | 66,491 | 1,391.5 | 14 | 6 |
| Love & Duty | 50 | 76,256 | 1,506 | 0 | 0 |
| What the Armor Leaves Behind | 50 | 76,044 | 1,527.5 | 0 | 0 |
| Stars Between the Strings | 50 | 68,572 | 1,365 | 11 | 4 |
| **All six** | **300** | **419,087** | — | **46** | **10** |

These are stored manifest word counts, recalculated for every revised chapter. They are not an independent publisher-grade count. Every manifest has exactly 50 chapters, and its overall word count equals the sum of its chapter entries. **No chapter is below 700 words.** A 1,200-word minimum is a review guideline, not a guarantee of literary value: a shorter precise scene may be better than a longer padded one.

The previous eleventh-pass total was **406,532 words** with **74** chapters below 1,200 words. The twelfth pass totals **419,087 words** with **46** chapters below that line. It adds **12,555** counted words across existing chapters, not new story slots.

## Completed revisions this pass

| Novel | Existing chapter numbers | Result |
|---|---|---|
| The Shore I Choose | 35, 38, 39, 41, 44, 46, 47, 49 | Eight distinctive additions: archive uncertainty, bridge accessibility, private testimony, inspected hatch, tested shelters, memory and chosen return, real storm test, Tomas's visits |
| After Always | 20, 22, 25, 27, 45 | Five additions: private correspondence, bodily autonomy and the Dark Mark, media response, intimate first kiss with actual consent, non-exclusive scheduling without scorekeeping |
| Jasmine After Rain | 25, 27, 37, 48, 49 | Five additions: garden accountability, Lu Ten memories, paid relief work, Maui/Iroh lantern collaboration and separate shared-world drainage response |
| Love & Duty | 42, 45 | Two additions: four-person fair time and quiet-room needs; Toph's ability to decline being the council's tool |
| What the Armor Leaves Behind | 41, 45 | Two additions: safe alternative water deliveries, Renn's independent oversight, Greg/Starwake festival labor and privacy |
| Stars Between the Strings | 23, 26, 30, 32, 37, 45, 48, 49, 50 | Nine additions: newspaper correction and public discretion, Rose and songwriting, center funding and scheduling, job-distance conversation, chosen time together, jealousy and consent, instrument repair, low-note safety, and venue guest access |

Total revised existing chapters: **31**.

## Source / local-reader synchronization

- Chapters: updated canonical files in `json/<fandom>/<series>/<NN>.json`.
- Manifests: updated each affected `series.json` chapter word count and recomputed totals.
- Offline reader: appended `js/lanternweald-revisions-pass12-a.js` through `...pass12-f.js` in `index.html`, **after earlier passes and before `js/app.js`**.
- **Read-back checked: 31/31 canonical chapter contents, titles, chapter IDs and recorded word counts match the embedded offline overrides.** The six manifests reconcile. This is a source/content validation, **not** a real-browser visual, keyboard, accessibility or `file://` navigation test.
- Existing chapter IDs and chapter 50 endings remain unchanged; the reader retains a linear 50-chapter order per novel. No extra branches, explicit sexual scenes or forced relationship outcomes were added.

## Creative and worldbuilding checks

The same adult first-person Jasper directly describes ethical non-monogamy and a preference for polyamory. Partners can be jealous, lonely or disappointed without becoming entitled to another person's schedule. Romantic scenes add dialogue, awkwardness, chosen touch and some private fade-to-black moments, without graphic detail. Severus, Iroh, Maui, Greg, Danse, Aang, Katara and Toph are intentionally *not* given identical voices.

`LANTERNWEALD_PASS12_CONTINUITY.md` tracks who is where, which worker controls which decision, and which elements of the Closed Bells records remain unproven. `json/lanternweald-community-atlas.json` models the seven districts, homeworld boundaries, seasons, civic institutions and optional future story seeds. Its proposed events are not automatically canon.

## Next priorities

1. **46** chapters remain below the 1,200-word review line. Priority: Maui ch4/32/27/28 and other older shorts; Iroh ch22/23/24/26/28/34; Greg ch22/27/29/33, where structure and scene variety are important.
2. Review earlier chapters for any recurring boilerplate; cut repetition even when it increases the number of short chapters.
3. Validate real browser and `file://` behavior, especially sequential script execution, keyboard navigation, saved progress and screen-reader headings.
4. Preserve the mystery's unanswered signature, the independent residents' agency, and the **sealed historic lower passage**; do not conflate it with the tested temporary surface overflow channel.
