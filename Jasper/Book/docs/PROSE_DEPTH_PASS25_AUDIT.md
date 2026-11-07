# Pass 25 — Six-novel scene depth, character voice and reader integration
**Date:** November 7, 2026. **Git branch:** directly on `main`; no new branch.

## Scope and actual manuscript changes
This is a **targeted editing pass**. It substantially expands **12 existing canonical prose chapters**, chapters **17 and 42** in each of the six novels, and preserves the remaining 288 chapters. Every manuscript still has 50 chapter files, so there are **300/300 complete chapters**, not chapter outlines. Twelve new scene-level edits add **3024 indexed words** while retaining earlier relationships, events, endings, and character backgrounds.

| Novel | New chapter edits | Net indexed words | What the new scenes do |
|---|---|---:|---|
| Jasmine After Rain | 17, 42 | +432 | Mina's paid hours; Iroh's distinct strategic and tea-shop manner contrasted against Greg's musician cadence |
| Love & Duty | 17, 42 | +408 | Aang's careful Air Nomad remembrance; Katara/Toph/Aang's genuinely separate obligations; adult scheduling/ENM |
| After Always | 17, 42 | +413 | Severus's privacy, pain and consent; his sharp, technical yet discerning response to Iroh's invitation |
| What the Armor Leaves Behind | 17, 42 | +585 | Danse and Haylen's safety verification; Haylen's private letter separated from public water tests |
| Stars Between the Strings | 17, 42 | +591 | Greg's music-industry experience and working-class humor; a proper paid stage crew and Iroh's citrus-smoke tea callback |
| The Shore I Choose | 17, 42 | +595 | Maui's bravado and vulnerability; Fen/Tamsin/Sela/Toph setting safe routes and demanding written, funded storm repairs |
| **Total** | **12** | **+3024** | **Six distinct romantic arcs in one continuing world** |

The resulting six manifest totals sum to **498761 indexed words**. Earlier Pass 24 also changed chapters **14, 32, 48** across all six books (18 already-written edits) but did not wire them into the offline reading interface. Pass 25 adds six concise per-novel `js/lanternweald-revisions-pass25-*.js` source overlays *after Pass 23 and before `js/app.js`* so the local-file reader shows **30 Pass 24+25 revised chapter versions** while preserving previous passes. Those JS files are publishing mirrors, not additional chapter manuscript duplicates.

## Voice and source distinctions
**Iroh:** an older tea master, former military strategist, observant and warm with deceptively serious decision-making; not a catchphrase dispenser. **Greg:** an informal musician and father, practical about contracts, equipment, music, his van and Steven; caring through awkward jokes and tangible help, not borrowed sage speech. Their direct chapter 39 tea tasting and Greg's citrus/smoke callback now have clear character-specific follow-through.

**Maui:** ambitious, theatrical demigod who enjoys praise but can recognize qualified labor and ask instead of taking over. **Severus:** guarded, sharp, precise, risk-aware and slow to declare feelings. **Danse:** formal, evidence-led and loyal, with gradually less defensive tenderness. **Aang:** playful and idealistic while carrying historically specific loss. **Katara:** independently protective of patients and their work. **Toph:** tactile confidence and abrasive wit rather than interchangeable advice.

Jasper remains an adult first-person protagonist. Established disclosures of **ethical non-monogamy and a preference for polyamory** remain in canon; nobody is forced to accept a relationship, share their time, reveal secrets, or become an instrument of someone else's romance. Attraction may be awkward, sensual and tender, but sexual action stays **non-explicit or fades to black**.

## Character biography research
Previously unindexed, **story-original** supporting cast members **Mina, Fen and Tamsin** now have full active `json/characters/` profiles, registered in `json/characters/index.json` (**184 total**). Their biographies were recovered and grounded in the preexisting `docs/character-library-source-full/characters/` material and chapters; nothing absent was filled with invented external franchise lore. Licensed character voice anchors remain the existing researched franchise profiles; canon examples: [Avatar Studios character encyclopedia](https://www.avatarstudiosofficial.com/characters/) and [Disney D23 Maui overview](https://d23.com/meet-the-characters-of-moana-2/).

## World mechanics and consequences
The lower historical Closed Bells passage **remains sealed** and the erased keeper's name is **still not established**. Safe handling of the upper temporary surface channel depends on inspections, tested flow and published warning routes. The Six Tables feast needs reachable aisles, food preparation, staff time, cleaning and paid labor. Crossing through a Threadway never erases a home's physics, a local worker's authority or anybody's consent.

## Technical publishing and validation boundaries
Each six-story manifest is reconciled to its edited chapter `word_count` values, `json/fandoms.json` now matches all six manifests, `index.html` orders all six Pass 25 files before `js/app.js`, and 50 chapter slots survive per novel. The editorial change log is in this file and `LANTERNWEALD_PASS25_CONTINUITY.md`. Text-source/parity checks are **not substitutes for testing actual local-file browser rendering**. Prose density and style remain uneven in inherited sections; no claim of a full 300-chapter line edit is made.

**Post-commit verification:** All **30/30** published Pass 24–25 reader entries were independently fetched from `main` and compared to canonical chapter JSON for exact `id`, chapter number, title, full content and indexed word count. All six script tags were confirmed in the correct order after Pass 23 and before `js/app.js`. The six series manifests and catalog sum to **498,761** indexed words; the character index contains **184/184** unique active profiles. Actual browser/mobile end-to-end interactions were not tested.
