# Six Novels — Prose-Depth Parity Audit (Ninth Editorial Pass)

**Updated November 5, 2026 from the six current `series.json` files.** All six novels still contain **50 fully written linear chapters** each (300 total). This pass rewrites/expands **12 existing chapters**. It does not create extra endings or branch the reader.

## Current manuscript statistics

| Novel | Manifest words | Average words/chapter | Median words/chapter | Chapters under 700 | Chapters under 1,200 |
|---|---:|---:|---:|---:|---:|
| The Shore I Choose | 55,858 | 1,117 | 1,109 | 0 | 33 |
| After Always | 67,844 | 1,357 | 1,366.5 | 0 | 8 |
| Jasmine After Rain | 62,119 | 1,242 | 1,340.5 | 7 | 19 |
| Love & Duty | 74,498 | 1,490 | 1,505.5 | 0 | 3 |
| What the Armor Leaves Behind | 74,460 | 1,489 | 1,518.5 | 0 | 5 |
| Stars Between the Strings | 64,447 | 1,289 | 1,302.5 | 0 | 19 |
| **All six** | **399,226** | — | — | **7** | **87** |

**Progress by pass:** before pass seven: 377,360 words / 25 chapters under 700 / 118 under 1,200; after pass seven: 386,829 / 16 / 106; after pass eight: 393,108 / 10 / 99; after pass nine: **399,226 / 7 / 87**.

The words are manuscript metadata, not a measure of literary merit. A shorter chapter may be structurally effective. Even when length is sufficient, a scene can require more credible conflict, pacing, specific dialogue or continuity review. **Chapter-count parity is finished; complete scene-depth parity is not.**

## This pass's twelve editorial revisions

| Novel | Revised chapters | Main character/worldbuilding improvement |
|---|---|---|
| The Shore I Choose | **43, 48** | Edda's unpriced evacuation needs change the council proposal; Fen's surface-channel data is respected after a lost vote; Moonroot adopts both public and private correction rules for an arrival/maintenance ledger |
| After Always | **48** | Edda corrects a lantern stand obstructing the Frostturn path; Severus observes a correction without humiliation and reflects on his former teaching |
| Jasmine After Rain | **32, 36, 38** | Iroh seeks voluntary support after nightmares; a specific non-exclusive private schedule is negotiated; Mina's winter blanket stock and Halen's hook create practical mutual care |
| Love & Duty | **47** | Lio redesigns a heavy kite with help rather than losing ownership of the work; Fen's wind board ends launches on schedule |
| What the Armor Leaves Behind | **47** | Ash points out an old profiling term and the lack of an independent route for complaints about Danse; Renn makes the written rule precise |
| Stars Between the Strings | **24, 28, 34, 35** | Greg chooses his clinic appointment and contacts; Rose's memory isn't erased; a household plan includes actual costs; a glovebox promise leads to a consensual, realistically scheduled Starwake performance |

**Canonical sources:** `json/<fandom>/<series>/<number>.json`. The corresponding complete prose copies for offline `file://` reading are loaded by `js/lanternweald-revisions-pass9-a.js` and `js/lanternweald-revisions-pass9-b.js` **after** all previous pass overlays and **before** `js/app.js`.

## Shorter chapters remaining for targeted inspection

### The Shore I Choose

- Chapter 40: **A Day of Ordinary Things** — 870 words
- Chapter 36: **Permission for Privacy** — 874 words
- Chapter 46: **What I Remember Now** — 895 words
- Chapter 42: **Where the Water Cannot Go** — 910 words
- Chapter 45: **The Last Big Performance** — 929 words
- Chapter 37: **The Tide Between Us** — 936 words
- Chapter 33: **The Unfinished Song** — 937 words
- Chapter 34: **A Nail from the Commonwealth** — 940 words

### After Always

- Chapter 47: **A Teacher, Not a Verdict** — 1,092 words
- Chapter 31: **A House That Still Stands** — 1,097 words
- Chapter 32: **What Lily Was and Was Not** — 1,098 words
- Chapter 27: **The Kiss in the Storeroom** — 1,106 words
- Chapter 22: **The Mark** — 1,116 words
- Chapter 25: **The One I Refuse to Pity** — 1,117 words
- Chapter 45: **The Terms of Us** — 1,180 words
- Chapter 20: **A Door Left Open** — 1,196 words

### Jasmine After Rain

- Chapter 37: **The Day We Return** — 673 words
- Chapter 25: **The Garden Behind the Shop** — 678 words
- Chapter 27: **The Shape of Forgiveness** — 678 words
- Chapter 24: **A Question Worth Asking** — 685 words
- Chapter 28: **The Game We Change** — 687 words
- Chapter 23: **The White Lotus Does Not Whisper** — 690 words
- Chapter 34: **Under the Same Lantern** — 691 words
- Chapter 26: **When Tea Goes Cold** — 700 words

### Love & Duty

- Chapter 46: **Dinner for People Who Disagree** — 1,133 words
- Chapter 43: **A Letter to the South** — 1,157 words
- Chapter 44: **The City from Above** — 1,188 words
- Chapter 42: **The Shape of Fair Time** — 1,250 words
- Chapter 45: **Stone Does Not Vote** — 1,301 words
- Chapter 41: **A Bridge Is a Promise** — 1,379 words
- Chapter 50: **A Home with Doors** — 1,383 words
- Chapter 48: **Water for the Other Side** — 1,384 words

### What the Armor Leaves Behind

- Chapter 46: **The Things Steel Cannot Say** — 1,098 words
- Chapter 43: **A Refugee at the Yard** — 1,104 words
- Chapter 42: **Letter from the Old World** — 1,142 words
- Chapter 41: **The Part That Does Not Fit** — 1,157 words
- Chapter 45: **When the Plan Changes** — 1,164 words
- Chapter 44: **A Door Without a Lock** — 1,218 words
- Chapter 50: **A Name Above the Door** — 1,281 words
- Chapter 48: **The Night the Lights Went Out** — 1,296 words

### Stars Between the Strings

- Chapter 30: **The Brightest Room** — 790 words
- Chapter 32: **The Work of Staying** — 794 words
- Chapter 26: **Second Verse** — 797 words
- Chapter 33: **A Door in the Wall** — 807 words
- Chapter 23: **The Price of Being Seen** — 808 words
- Chapter 29: **No Map for This** — 810 words
- Chapter 27: **The Shape of Sorry** — 813 words
- Chapter 22: **Soundcheck** — 826 words

## Quality requirements for the tenth pass

1. **Replace repetitive boilerplate rather than adding filler.** Early Iroh and Greg chapters have been particularly compressed; develop distinct tasks, reversals, desires, hesitations, humor and paid work.
2. **Use `json/william-writing-style.json`.** It derives a corpus-level voice: first-person emotional immediacy, concrete places, ordinary jokes that complicate vulnerability, an interplay of short beats and longer reflection, and endings with consequence. Do not copy lines from the corpus.
3. **Make a cozy-world setting feel inhabited:** seven districts, seasonal schedules, shop opening/closing, actual materials, restricted repair crews, privacy, water distribution and adult relationships that continue when Jasper isn't there. A location should not exist only when a quest is active.
4. **Keep partners independent and recognizable.** Maui's showmanship must not substitute for safe tide work; Severus's precision is not a command to confess; Iroh's care has limits; Aang, Katara and Toph need separate decisions; Danse's responsibility includes independent review; Greg can be funny and still uncomfortable.
5. **Protect ethical non-monogamy, polyamory and fade-to-black.** Jasper has disclosed their preferences to every partner, and they keep freely negotiated independent relationships. A kiss or invitation is not a blanket grant of future intimacy. Avoid explicit descriptions, possession and public listing of private relationships.
6. **Preserve historical and geographic limits.** Early traveler Tideglass arch versus still-sealed underground Closed Bells passage; surface water channel passes controlled storm checks. Moonroot's missing name remains unverified. Ba Sing Se is not Jasmine Steps, Beach City not Starwake, and homeworld service providers do not automatically become valley residents.
7. **Test the reader, not just the numbers.** Preserve 300 unique chapter IDs, next/previous navigation, two ninth-pass revision overlay counts (5 and 7), early disclosures and the floating-book cover. A source-level simulation cannot certify browser accessibility or visual animation.

**Current unfilled editorial depth guideline:** 87 of 300 chapter files are below 1,200 words in the current manifest. Improving all remaining scenes will require further targeted revision and human editorial judgment.
