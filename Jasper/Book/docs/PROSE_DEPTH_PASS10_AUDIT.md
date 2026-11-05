# Tenth Editorial Pass — Six-Novel Manuscript Audit

**Updated November 5, 2026.** This is the latest editorial audit; `PROSE_DEPTH_PARITY_AUDIT.md` remains the historical ninth-pass record. Both tenth-pass commits went directly to `main`. There are still **six 50-chapter linear novels, 300 fully written chapters**. The tenth pass revises fourteen existing chapters without adding chapter numbers or alternate paths.

## Current manifest statistics

| Story | Chapters | Manuscript words | Average per chapter | Under 1,200 words | Under 700 words |
|---|---:|---:|---:|---:|---:|
| The Shore I Choose | 50 | 56,734 | 1,135 | 33 | 0 |
| After Always | 50 | 68,083 | 1,362 | 7 | 0 |
| Jasmine After Rain | 50 | 63,026 | 1,261 | 19 | 3 |
| Love & Duty | 50 | 74,818 | 1,496 | 2 | 0 |
| What the Armor Leaves Behind | 50 | 74,711 | 1,494 | 4 | 0 |
| Stars Between the Strings | 50 | 64,484 | 1,290 | 19 | 0 |
| **Total** | **300** | **401,856** | — | **84** | **3** |

**These numbers come from the six current `series.json` manifests.** Chapter counts have reached parity; prose word counts and scene depth have not. Chapters under 1,200 words remain candidates for judgment-based expansion; a chapter above that line can still need better dialogue or pacing. Do not inflate manuscripts with generic repeated speeches just to pass a numerical threshold.

## Tenth-pass actual chapter revisions

| Story | Chapters | Revision focus |
|---|---|---|
| The Shore I Choose | 36, 40, 42 | Privacy rules with restricted crossing information, mutual chores and flirtation without grand heroics, controlled drainage limits and a true independent complaint route |
| After Always | 47 | Severus and Orin negotiate the limits of public wartime testimony, evidence, confidential witnesses, and honest uncertainty |
| Jasmine After Rain | 23, 25, 27, 37 | Four formerly repetitive chapter bodies rewritten as distinct White Lotus, garden, memorial and anniversary stories in Ba Sing Se; Mina's labor and Lu Ten's memory remain real |
| Love & Duty | 46 | A homecoming dinner becomes a specific voluntary supply plan and distinct time needs, not a ranking of partners |
| What the Armor Leaves Behind | 46 | Civilian worker scheduling and independent safety reporting continue beyond an engineering success |
| Stars Between the Strings | 23, 26, 30, 32 | Four formerly repetitive chapter bodies rewritten around a newspaper correction, new songwriting, donor influence and a job offer without romantic pressure |

The first eight rewrites replace formulaic passages; the other six preserve the original chapter text and add specifically dramatized consequences. The revised prose is first-person Jasper, with negotiated ethical non-monogamy and preferred polyamory, playful attraction, consent and non-explicit fade-to-black. No one is automatically required to date another partner.

## Integrity and reader delivery

- Canonical prose exists in `json/<fandom>/<series>/<chapter>.json`, not only as a roadmap.
- Every revised chapter has a recomputed `word_count`; affected `series.json` manifests update the matching chapter and recalculate `total_word_count`.
- `js/lanternweald-revisions-pass10-a.js` overrides eight complete revised chapters, and `js/lanternweald-revisions-pass10-b.js` overrides six, both after the ninth-pass overlays and before `js/app.js` so file-opened offline reading sees the revisions.
- All six chapter-50 conclusions, existing chapter IDs, order, previous reader overlays and in-world ethical boundaries are preserved.
- No branch, PR, interactive choice mechanic or explicit scene was created.

## Remaining quality checks

1. Read the neighboring chapters before making the next pass to catch transitions, travel duration, relationship schedule conflicts, duplicated phrases and sudden tonal shifts.
2. Prioritize naturally distinctive scenes in still-short Iroh/Greg and Maui chapters; use verified character attitudes and lived-in jobs, rather than mechanical padding.
3. Re-test the reader in a real browser and its offline file-open workflow; this source-level audit is not a claim of a completed visual/accessibility test.
4. Keep the old underground flood barrier sealed, the unknown Closed Bells signature unverified, and Ba Sing Se/Beach City distinct from Lanternweald's own districts.
