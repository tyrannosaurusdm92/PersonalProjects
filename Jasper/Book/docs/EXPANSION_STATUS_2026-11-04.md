# Jasper/Book — Connected Romance Expansion (November 4, 2026)

## What has actually been written

The repo contains **216 real chapters** across six linked fanfiction stories. The target is **300** (50 for each). This branch **does not claim to have finished the missing 84 chapters**. The planning document `50_CHAPTER_EXPANSION_ROADMAP.md` supplies scene-by-scene directions for those, not placeholders.

### Prose added and revised

- Six new fully authored chapters: *The Shore I Choose* 11, *After Always* 41, *Jasmine After Rain* 41, *Love & Duty* 41, *What the Armor Leaves Behind* 41, and *Stars Between the Strings* 41.
- Six early source chapters revised to show Jasper directly explaining ethical non-monogamy and preference for polyamory to the individual romantic interests. *Love & Duty* contains three separate conversations.
- Three existing short chapters substantially rewritten with complete scenes, sensory setting, real dialogue, and emotionally appropriate transitions: Maui 09, Iroh 39 and Greg 39.
- A shared Sixth-Threadway/Seventh-Ring mystery developed through all six new chapter perspectives, with expanded rules, history and communal conflicts in `LANTERNWEALD_WORLD_BIBLE.md`. **There are six Threadways, and the seventh ring is a mechanical warning mechanism, not an extra door.**

### Offline reader behavior

The canonical source chapters live in `json/[fandom]/[series]/[chapter].json`. The existing offline bundle `js/fanfic-data.js` is retained. `index.html` loads `js/continuity-expansion.js` after that bundle but before `js/app.js`, so the new and revised chapters are visible when opening the local HTML file. There are **15** projection records (six new chapter additions and nine existing chapter patches).

When continuing this work, regenerate the projection from canonical source JSON; do **not** treat the projection as a second independent manuscript. The series metadata and `json/authored-library-index.json` reflect only actually written chapters.

### Verified data checks

On this branch, a structural check confirmed:

- 6 series and 216 authored chapter records;
- chapter counts and chapter IDs in each `series.json` are consistent;
- `authored-library-index.json` matches per-series counts and word totals;
- word totals equal sums of recorded chapter counts;
- no duplicate chapter IDs within any series;
- all fifteen projected texts contain substantial prose;
- script load order is existing offline data, then the 15-change projection, then the reader.

This is a data/structure validation, **not** an in-browser QA run or a claim that all 300 chapters have been drafted.

## Further editorial work needed

1. Write the remaining 84 full chapters following the roadmap, keeping genuine character-specific voices and distinct plots rather than recycling template scenes.
2. Revise remaining compressed chapters, especially Maui 01–10, Iroh 22–40, and Greg 22–40, without padding or replacing meaningful scenes.
3. Read the entire six-book corpus for chronology, crossovers, relationship consent and consistent pronouns.
4. Review the finished offline reader in a local browser at desktop and mobile sizes, checking chapter selection, progress, line breaks, and offline behavior.
5. For Maui cultural material, honor `MAUI_CULTURAL_NOTES.md` and obtain a culturally informed review where possible.

**Publishing policy:** Do not mark planned chapters as complete, add empty placeholder files, or change the footer to “300 chapters” until 300 nonempty prose chapters exist and have been read for continuity.
