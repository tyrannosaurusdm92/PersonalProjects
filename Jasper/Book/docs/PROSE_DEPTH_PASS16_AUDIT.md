# Editorial Pass 16 — Maui Voice, Character Differentiation, and Lanternweald Causality

**November 6, 2026 · Existing `main` branch · No new branch or PR**

## What actually changed

This is a **14-chapter editorial pass on six existing 50-chapter novels**, not a replacement for the 300-chapter collection. The canonical `json/<fandom>/<series>/NN.json` texts were revised directly. The static website reads matching complete-chapter updates through `js/lanternweald-revisions-pass16-a.js` (six Maui chapters) and `js/lanternweald-revisions-pass16-b.js` (eight chapters in five companion novels). Both scripts are loaded after pass 15 and before `js/app.js`. None of the chapter IDs, titles or sequences was changed.

| Novel | Chapter | Title | Old words | New words | Added |
|---|---:|---|---:|---:|---:|
| The Shore I Choose | 3 | The Name Beneath the Bell | 1581 | 1822 | 241 |
| The Shore I Choose | 12 | A Place for the Departing | 1460 | 1688 | 228 |
| The Shore I Choose | 18 | One Door Closed by Choice | 1734 | 1963 | 229 |
| The Shore I Choose | 27 | The Visitor's Right to Leave | 1644 | 1862 | 218 |
| The Shore I Choose | 36 | Permission for Privacy | 1733 | 2000 | 267 |
| The Shore I Choose | 48 | The Lantern Ledger | 1603 | 1858 | 255 |
| Jasmine After Rain | 12 | The Dragon's Breath | 1561 | 1866 | 305 |
| Jasmine After Rain | 37 | The Day We Return | 1316 | 1603 | 287 |
| Stars Between the Strings | 16 | When the Van Breaks Down | 1500 | 1783 | 283 |
| Stars Between the Strings | 42 | Folding Chairs and Honest Labor | 1295 | 1574 | 279 |
| After Always | 23 | Occlumency | 1243 | 1528 | 285 |
| What the Armor Leaves Behind | 37 | The Name He Chose | 1509 | 1784 | 275 |
| Love & Duty | 24 | Aang's Terrible, Wonderful Idea | 1590 | 1866 | 276 |
| Love & Duty | 43 | A Letter to the South | 1477 | 1813 | 336 |

**Net change: +3,764 recorded chapter words. Total: 454,811 recorded words across 300 chapters.** All six series manifests, chapter entry word counts and the top-level `json/fandoms.json` catalog were recalculated. The individual series are: The Shore I Choose 81,459; Jasmine After Rain 72,970; Stars Between the Strings 73,745; After Always 71,713; What the Armor Leaves Behind 77,305; Love & Duty 77,619.

## Distinct voices and consequences

- **Maui 3, 12, 18, 27, 36, 48:** Still theatrical, proud, quick to improvise and desperate to be helpful. The choice to wait or ask matters precisely because his desire to perform remains. The bell spring has real maintenance; a traveler can leave without a public record of destination; Jasper may leave a photograph untouched; a suitcase belongs to its carrier; the public board must serve bread buyers, not gossip; the archive is accountable for physically usable access. Mini Maui, magical hook, and animal-shifting remain film-fiction devices and are not made into Māori cultural practice.
- **Iroh 12, 37:** A former general who can be mistaken about scheduling other people's work. Mina challenges his shop rota, while Jun's relief kitchen rejects his desire to solve an entire supply problem before carrying the cups he was actually asked to carry. His military history is real, not a prefabricated wise speech.
- **Greg 16, 42:** A van, car-wash shifts, repair invoices, Steven's offer, songs and paid stage crew are his texture. He jokes and hums when worried; Nola owns her schedule. He doesn't turn into an Iroh-style philosopher.
- **Severus 23:** Occlumency boundaries have an agreed stop signal and a record that tracks consent, not private memories; he remains sharp and disciplined.
- **Danse 37:** His signature and generator procedure separate repair from the local operator's responsibility; he is still clipped, technical and uneasy without rank.
- **Aang, Katara, Toph 24, 43:** Aang's imaginative ambition risks a public route, Katara thinks like a healer with limited supplies and actual agency, and Toph trusts ground, structure and her own blunt observations. Beren's work route and the Southern clinic's independent needs constrain their choices.

## Shared-world continuity that remains binding

1. The seven Lanternweald districts have their own institutions, schedules, materials and residents, and Threadways are voluntary. Fame or romance gives no entitlement to another person's labor, memory, wages, passage or records.
2. The historical **sealed lower flood passage stays sealed**. Public safety projects use measured channels and inspections, not a magical shortcut or a new hidden revelation.
3. The Closed Bells keeper is **unidentified**; Neri's testimony and Orin's document distinctions remain subject to corrections and privacy. The new table scene is about usable access, not an invented solution to the mystery.
4. Contemporary visiting Māori artists such as Mereana retain the right to plan, perform and control their own work. The Disney Maui films and ancestral Māori narratives are **not** interchangeable.
5. Jasper is an **adult first-person protagonist**, ethically non-monogamous and preferring polyamory; each relationship preserves informed choices and other partners' privacy. Intimacy stays non-explicit, occasionally fading to black, and partners do not all share the same speech patterns.
6. Sea-glass beds and other gardens have finite yields. Shops, piers, clinics and performers have costs and competing obligations; Lanternweald is a lived-in original setting, not a magically limitless resource machine.

## QA performed and remaining

At construction, each edited JSON chapter body and metadata was used to create a source-complete reader override. All **6/6 Maui** and **8/8 companion** source/reader records were independently re-fetched and compared **exactly** on chapter number, title, body and word count. The website includes both script tags after the pass-15 overlay. Every revised chapter remains above 1,200 recorded words. The six manifest totals and catalog were reconciled.

This is **14/300 chapters revised in this round**, not a claim that every line in all six books has been polished. **A real browser navigation/assistive technology test, complete 300-chapter copyedit and professional cultural consultation were not performed.**

Companion reference: `LANTERNWEALD_PASS16_CAUSAL_NOTES.md` and `../Maui/15_PASS16_CHARACTER_AND_RELATIONSHIP_CONTINUITY.md`.
