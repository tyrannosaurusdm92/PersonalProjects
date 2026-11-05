# Six Novels — Prose-Depth Parity Audit (Eighth Pass)

**Updated November 5, 2026 from live manuscript metadata after the eighth revision pass.** The library has **300 fully written chapters**, 50 per novel, and 13 existing chapter revisions in this pass. The aim is richer distinct dialogue, consequential scenes and a coherent, independently inhabited Lanternweald—not mechanical text padding.

## Current length and remaining editorial work

| Series | Manifest words | Average words/chapter | Median | Chapters under 700 | Chapters under 1,200 |
|---|---:|---:|---:|---:|---:|
| The Shore I Choose | 54,770 | 1,095 | 1,086 | 0 | 35 |
| After Always | 67,531 | 1,351 | 1,366.5 | 0 | 9 |
| Jasmine After Rain | 60,171 | 1,203 | 1,240.5 | 10 | 22 |
| Love & Duty | 74,156 | 1,483 | 1,505.5 | 0 | 4 |
| What the Armor Leaves Behind | 74,133 | 1,483 | 1,518.5 | 0 | 6 |
| Stars Between the Strings | 62,347 | 1,247 | 1,204 | 0 | 23 |
| **Total** | **393,108** | — | — | **10** | **99** |

**Comparative trend:** before pass seven, 377,360 words / 25 chapters under 700 / 118 under 1,200; after pass seven, 386,829 words / 16 under 700 / 106 under 1,200; after pass eight, **393,108 words / 10 under 700 / 99 under 1,200**. Word counts are derived from the chapter manifests. A short chapter can work artistically; the thresholds guide inspection but do not determine quality. All novels are 50 chapters, but their overall prose totals and scene depth remain different.

## Thirteen revised chapters in pass eight

| Novel | Chapter numbers | Key change |
|---|---|---|
| The Shore I Choose | **2, 7, 9, 10** | Fen's safe tide markers and knot lessons; Pip's accessible landing; shared emergency work and optional refuge; festival volunteers, Mereana's authority over artwork and clear maps |
| After Always | **34** | Pomfrey's controlled medical incident documentation, Jasper's right to decide what to share and Severus accepting a boundary |
| Jasmine After Rain | **31, 35, 40** | Zuko's warehouse policy letter and Iroh's limits; a practical neighborhood garden, shared labor and no invasive planting; actual tea shop scheduling and non-exclusive relationship planning |
| Love & Duty | **48** | The water delivery plan changes after feedback from residents, cart drivers and Edda's actual route checks |
| What the Armor Leaves Behind | **48** | The night outage tests backup lighting, shared trained roles and a safe work rota, not just Danse's heroism |
| Stars Between the Strings | **25, 31, 40** | A winter pump repair, an interrupted family date with a later successful reschedule, and Greg's original music and continued polyamorous relationship across two skies |

**Source-of-truth:** each revised chapter has its exact prose in `json/<fandom>/<series>/<chapter>.json` and is mirrored offline by `js/lanternweald-revisions-pass8-a.js` and `js/lanternweald-revisions-pass8-b.js`, loaded after earlier revision overlays but before `js/app.js`. The manifest chapter IDs and next-chapter references are not changed.

## Shortest chapters to inspect next

### The Shore I Choose

- Chapter 48: **The Lantern Ledger** — 799 words
- Chapter 43: **The Right to Disagree** — 856 words
- Chapter 40: **A Day of Ordinary Things** — 870 words
- Chapter 36: **Permission for Privacy** — 874 words
- Chapter 46: **What I Remember Now** — 895 words
- Chapter 42: **Where the Water Cannot Go** — 910 words
- Chapter 45: **The Last Big Performance** — 929 words
- Chapter 37: **The Tide Between Us** — 936 words

### After Always

- Chapter 48: **The Lantern Vigil** — 1,031 words
- Chapter 47: **A Teacher, Not a Verdict** — 1,092 words
- Chapter 31: **A House That Still Stands** — 1,097 words
- Chapter 32: **What Lily Was and Was Not** — 1,098 words
- Chapter 27: **The Kiss in the Storeroom** — 1,106 words
- Chapter 22: **The Mark** — 1,116 words
- Chapter 25: **The One I Refuse to Pity** — 1,117 words
- Chapter 45: **The Terms of Us** — 1,180 words

### Jasmine After Rain

- Chapter 36: **A Promise with No Audience** — 667 words
- Chapter 38: **Jasmine in Winter** — 667 words
- Chapter 32: **The Things Iroh Cannot Carry** — 672 words
- Chapter 37: **The Day We Return** — 673 words
- Chapter 25: **The Garden Behind the Shop** — 678 words
- Chapter 27: **The Shape of Forgiveness** — 678 words
- Chapter 24: **A Question Worth Asking** — 685 words
- Chapter 28: **The Game We Change** — 687 words

### Love & Duty

- Chapter 47: **The Longlight Kites** — 1,127 words
- Chapter 46: **Dinner for People Who Disagree** — 1,133 words
- Chapter 43: **A Letter to the South** — 1,157 words
- Chapter 44: **The City from Above** — 1,188 words
- Chapter 42: **The Shape of Fair Time** — 1,250 words
- Chapter 45: **Stone Does Not Vote** — 1,301 words
- Chapter 41: **A Bridge Is a Promise** — 1,379 words
- Chapter 50: **A Home with Doors** — 1,383 words

### What the Armor Leaves Behind

- Chapter 47: **A Practical Kind of Courage** — 1,075 words
- Chapter 46: **The Things Steel Cannot Say** — 1,098 words
- Chapter 43: **A Refugee at the Yard** — 1,104 words
- Chapter 42: **Letter from the Old World** — 1,142 words
- Chapter 41: **The Part That Does Not Fit** — 1,157 words
- Chapter 45: **When the Plan Changes** — 1,164 words
- Chapter 44: **A Door Without a Lock** — 1,218 words
- Chapter 50: **A Name Above the Door** — 1,281 words

### Stars Between the Strings

- Chapter 35: **The Note in the Glovebox** — 783 words
- Chapter 34: **Everyday Magic** — 787 words
- Chapter 24: **A Little More Honest** — 790 words
- Chapter 30: **The Brightest Room** — 790 words
- Chapter 28: **A Song for Nobody Else** — 791 words
- Chapter 32: **The Work of Staying** — 794 words
- Chapter 26: **Second Verse** — 797 words
- Chapter 33: **A Door in the Wall** — 807 words


## Editing standards for the next pass

1. **Follow the user's writing profile:** `json/william-writing-style.json` calls for emotionally direct first-person prose, details grounded in physical surroundings, variable sentence rhythm, humor around vulnerability, and dialogue that changes later behavior. Avoid repeated thematic speeches and generic romantic descriptions.
2. **Let each partner sound different:** Maui's enormous charisma can conceal fear; Iroh is gentle but fallible; Severus precise and vulnerable through restraint; Aang hopeful, Katara practical and Toph impatient; Danse structured but not commanding strangers; Greg funny but allowed to feel left out.
3. **Keep practical consequences visible:** safe sailing, coastal engineering, accessible routes, fair pay, supplies, shop schedules, stormwater, repairs, public records and consent. A problem solved by a protagonist should not erase the next person's work.
4. **Do not collapse the homeworlds into one:** Ba Sing Se and the Jasmine Dragon are not automatically a Lanternweald district; Beach City and Starwake are distinct destinations connected by voluntary Threadways. Keep local weather and time meaningful.
5. **Respect ethical non-monogamy and polyamory:** Jasper explicitly tells their partners this is their preference. Each partner retains separate consent, priorities and relationships. The chapter-50 endings stay open and non-exclusive; romance remains sensual but not explicit, with fade-to-black for later intimate nights.
6. **Protect mysteries from false closure:** Maui's early misaligned traveler tide arch is different from the later sealed historic drainage barrier. That underground barrier remains closed; the separate surface channel passes storm tests. The Closed Bells signature is unverified.
7. **Validate actual experience:** source-level tests confirm 300 IDs and reader ordering, not visual browser performance. Revisit layout, chapter selection, keyboard navigation and responsive display in a real browser when available.

**Status:** 99 of 300 chapters remain below the 1,200-word editorial guideline. Further revision is worthwhile; this audit does not claim every chapter is equally deep or equally strong.
