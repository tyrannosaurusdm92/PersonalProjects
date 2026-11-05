# Six Novels — Prose-Depth Parity Audit

**Compiled November 5, 2026 from the six live `series.json` manifests on `main`.** Each book contains **50 authored chapters**, and the library contains **300**. This audit is intended to help future editing achieve the requested parity of rich scenes, emotional development, character interactions and dialogue, **without undoing the finished story arcs or creating more chapter numbers**.

## Word-count and chapter-size comparison

| Series | Manifest total words | Average per chapter | Median per chapter | Chapters below 700 words | Chapters below 1,200 words |
|---|---:|---:|---:|---:|---:|
| The Shore I Choose | 49,293 | 986 | 1,002 | 8 | 39 |
| After Always | 66,199 | 1,324 | 1,360.5 | 0 | 12 |
| Jasmine After Rain | 56,103 | 1,122 | 1,121 | 17 | 26 |
| Love & Duty | 72,956 | 1,459 | 1,505.5 | 0 | 7 |
| What the Armor Leaves Behind | 73,063 | 1,461 | 1,518.5 | 0 | 9 |
| Stars Between the Strings | 59,746 | 1,195 | 1,159 | 0 | 25 |
| **All six** | **377,360** | — | — | **25** | **118** |

**Important:** metadata word counts reflect the editorial manifests and may need independent recount after future revisions. A short chapter can be genuinely effective; this table identifies likely candidates for inspection, not automatic failures. Chapter count is equal now, but word count, scene density, and craft quality vary. The editorial roadmap aspires to roughly **1,200–1,800 meaningful words for new or heavily expanded scenes**, without padding or repetitive dialogue.

## First targets for scene-deepening

### The Shore I Choose

Shortest chapters by manifest word metadata (chapters are *written*, not stubs):

- Chapter 4, **The Things Hands Remember** — 482 words
- Chapter 9, **Stormlight** — 506 words
- Chapter 5, **Where the Water Goes** — 523 words
- Chapter 8, **What the Door Kept** — 548 words
- Chapter 7, **A Dance That Asked** — 569 words
- Chapter 3, **The Name Beneath the Bell** — 577 words
- Chapter 2, **The Hook and the Horizon** — 606 words
- Chapter 1, **A Stranger in the Tide** — 670 words

**Priority:** extend its original arrival and early courtship scenes before changing late book continuity; keep the specific first-person agency and the tide/coast setting.

### After Always

Shortest chapters by manifest word metadata (chapters are *written*, not stubs):

- Chapter 49, **A Night Without Explanations** — 855 words
- Chapter 50, **After the Door Opens** — 892 words
- Chapter 34, **The Potion He Cannot Brew** — 1,006 words
- Chapter 48, **The Lantern Vigil** — 1,031 words
- Chapter 47, **A Teacher, Not a Verdict** — 1,092 words
- Chapter 31, **A House That Still Stands** — 1,097 words
- Chapter 32, **What Lily Was and Was Not** — 1,098 words
- Chapter 27, **The Kiss in the Storeroom** — 1,106 words

**Priority:** preserve existing ending while enriching earlier compressed scenes with lived-in dialogue, practical consequences and independent partner agency.

### Jasmine After Rain

Shortest chapters by manifest word metadata (chapters are *written*, not stubs):

- Chapter 29, **A Road of Our Own** — 651 words
- Chapter 39, **The Tea We Make** — 660 words
- Chapter 30, **The Fire Beneath the Kettle** — 662 words
- Chapter 33, **A Small Rebellion** — 663 words
- Chapter 40, **Jasmine After Rain** — 663 words
- Chapter 36, **A Promise with No Audience** — 667 words
- Chapter 38, **Jasmine in Winter** — 667 words
- Chapter 35, **The General and the Gardener** — 671 words

**Priority:** preserve existing ending while enriching earlier compressed scenes with lived-in dialogue, practical consequences and independent partner agency.

### Love & Duty

Shortest chapters by manifest word metadata (chapters are *written*, not stubs):

- Chapter 50, **A Home with Doors** — 974 words
- Chapter 49, **Four People, Four Answers** — 1,025 words
- Chapter 48, **Water for the Other Side** — 1,040 words
- Chapter 47, **The Longlight Kites** — 1,127 words
- Chapter 46, **Dinner for People Who Disagree** — 1,133 words
- Chapter 43, **A Letter to the South** — 1,157 words
- Chapter 44, **The City from Above** — 1,188 words
- Chapter 42, **The Shape of Fair Time** — 1,250 words

**Priority:** preserve existing ending while enriching earlier compressed scenes with lived-in dialogue, practical consequences and independent partner agency.

### What the Armor Leaves Behind

Shortest chapters by manifest word metadata (chapters are *written*, not stubs):

- Chapter 50, **A Name Above the Door** — 909 words
- Chapter 49, **The Good Parts of an Order** — 943 words
- Chapter 48, **The Night the Lights Went Out** — 978 words
- Chapter 47, **A Practical Kind of Courage** — 1,075 words
- Chapter 46, **The Things Steel Cannot Say** — 1,098 words
- Chapter 43, **A Refugee at the Yard** — 1,104 words
- Chapter 42, **Letter from the Old World** — 1,142 words
- Chapter 41, **The Part That Does Not Fit** — 1,157 words

**Priority:** preserve existing ending while enriching earlier compressed scenes with lived-in dialogue, practical consequences and independent partner agency.

### Stars Between the Strings

Shortest chapters by manifest word metadata (chapters are *written*, not stubs):

- Chapter 39, **The Song We Keep** — 765 words
- Chapter 37, **The Quiet Encore** — 773 words
- Chapter 36, **When We Choose Each Other** — 778 words
- Chapter 38, **A Future with Windows** — 778 words
- Chapter 40, **Stars Between the Strings** — 778 words
- Chapter 31, **Bad Timing** — 783 words
- Chapter 35, **The Note in the Glovebox** — 783 words
- Chapter 25, **The Car Wash in Winter** — 787 words

**Priority:** preserve existing ending while enriching earlier compressed scenes with lived-in dialogue, practical consequences and independent partner agency.


## What to change when deepening a chapter

1. **Protect the distinctive voice and sequence of events.** Follow `json/william-writing-style.json`: first-person Jasper narration, physical texture, uneven sentence rhythms, humor that reveals discomfort, dialogue that changes what people decide, and vulnerability shown through later behavior. Do not copy reference lines verbatim.
2. **Add necessary scenes, not filler.** Find the chapter's irreversible choice; build a concrete arrival, interpersonal obstacle, conversation with subtext, changed behavior, and aftereffect. A chapter about a repair should show the work, the person who uses the repaired object, and the cost or consequence.
3. **Make partner dialogue sound different.** Maui can be expansive, funny and insecure; Severus economical and dry; Iroh warm but fallible; Aang earnest, Katara decisive, Toph blunt; Danse deliberate and revising his assumptions; Greg playful, musical and sometimes privately vulnerable. Jasper remains recognizable across six relationships, but each bond has its own emotional grammar.
4. **Keep consent ongoing.** Jasper explicitly prefers polyamory and is ethically non-monogamous; no retrofit should erase the prior partner disclosures, convert an ending to exclusivity, reveal other partners' private conversations, or treat consent as a one-time speech.
5. **Strengthen the lived world.** Use distinctive neighborhoods, seasons, practical jobs, small community mistakes, food distribution, local signs, accessible paths, volunteer pay, and unresolved histories. A crossover should change decisions or deepen understanding, not simply add a famous cameo.
6. **Vary romance beats.** Let longing, awkward flirting, warm humor, chosen reassurance and the mundane morning after carry intimacy. Non-graphic fade-to-black is sufficient. Avoid identical kiss descriptions or repeating a generic moral in every chapter.
7. **Maintain strict offline synchronization.** Any rewrite of a JSON chapter must also update the embedded offline reader source at the same chapter ID, refresh its word-count metadata, and preserve 1–50 numbering plus next-chapter links. Earlier original 210 reader chapters live in `js/fanfic-data.js`; later ones live in the pass overlays.
8. **Validate context and visuals.** Run a real browser check of the floating-book gateway and all selectors separately from structural source audits. Structural QA cannot prove the UI looks right on a particular screen size.

## Canon guardrails before substantive revisions

- **Do not reopen the historic lower Tideglass service tunnel in any chapter-50 ending.** The seventh scratch marks an upper maintenance hatch. Maui 47 reopens and tests a different *surface* overflow channel.
- **Do not solve the Closed Bells signature by fiat.** The ledger documents harm and preserves a deliberately unknown signatory, with testimony given voluntarily.
- **Do not erase or merge the six distinct consensual relationships** into a single romantic outcome; all endings remain paths forward for the same Jasper.
- **Do not turn cultural practice into decorative magic** (especially Mereana's specific Māori context or Aang's Air Nomad rites).
- **Do not remove consequences** from food, material wear, accessibility, medical supplies, wages, care, transportation or seasonal weather.

**Status:** 300 of 300 actual chapters, zero outlines. **Depth-parity revision remains recommended** and is a separate editorial task, not an unfinished plot.
