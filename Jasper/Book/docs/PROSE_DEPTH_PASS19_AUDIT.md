# Editorial Pass 19 — Six-Novels Depth, Dialogue and Interconnected-Lore Audit

**Committed directly to the preexisting `main` branch:** 2026-11-06.  
**No new branch, alternate manuscript, reset, or scaffold was created.** Existing chapter JSON files were modified in place with additional scenes; earlier prose and 50-chapter structures were preserved.

## Work completed

| Series | Canonical chapters revised | Added words | Indexed words after Pass 19 | Lowest indexed chapter |
|---|---|---:|---:|---:|
| Jasmine After Rain | 24, 32, 34, 40, 42 | 1,731 | 75,921 | 1,304 |
| Love & Duty | 44 | 324 | 78,944 | 1,383 |
| The Shore I Choose | 39 | 346 | 83,289 | 1,397 |
| What the Armor Leaves Behind | 50 | 361 | 78,569 | 1,323 |
| After Always | 16, 17, 28, 29, 37, 38, 50 | 2,246 | 74,825 | 1,327 |
| Stars Between the Strings | 26, 27, 29, 30, 33, 36, 39, 41 | 2,512 | 77,435 | 1,310 |
| **Total** | **23 existing chapters** | **7,520** | **468,983** | **1,304** |

All six chapter indexes match the sums of their 50 recorded chapter counts, for **300 written chapters**. The 21 chapters flagged by Pass 18 for having fewer than 1,300 indexed words now have additional specific scenes; no indexed chapter in any of the six series is under 1,300 words. This is a useful coverage check, **not proof of equal quality or that every story has received a complete line edit**.

## What was actually changed in the prose

### Iroh — five revisions, 1,731 words

- **Ch 24, A Question Worth Asking:** Iroh's White Lotus volunteer rota reveals his habit of treating offers of care like military assignments. The correction is to ask people when and whether they want to come.
- **Ch 32, The Things Iroh Cannot Carry:** A delivery runner asks about rumors of uninspected war tunnels. Iroh refuses to certify what he does not know; Mina manages an agreed, limited cover shift.
- **Ch 34, Under the Same Lantern:** A vendor remembers a brother who served under Iroh. He has no easy line to excuse the past or demand forgiveness.
- **Ch 40, Jasmine After Rain:** Bo delivers an actual damaged-drain notice. Clinic access, delivery wages, vendors, Mina and Iroh all have separate interests and must coordinate.
- **Ch 42, Six Tables and One Teapot:** Food totals, volunteers, a damaged table and the repair sign-off make the crossover feast a community event rather than a catalog of famous romantic cameos.

These scenes push his cadence away from Greg's. Iroh's authority can be useful, threatening or intrusive; his humor is dry and deliberate, not jokey self-deprecation about cables.

### The other Avatar characters — one revision, 324 words

**Love & Duty ch 44, The City from Above:** Aang's aerial observations cannot replace Sela's flood log, Katara's drainage notes, Toph's ground inspection or the clinic's consent. This is a specific difference between Aang's adaptable diplomacy, Sela's stubborn local records and Toph's ability to test the material world.

### Maui — one revision, 346 words

**The Shore I Choose ch 39, The Keeper's Refusal:** Edda distinguishes a historically sealed maintenance passage from voluntary traveler Threadways; Fen, Lio, Mara and Orin ask separate questions about safety, crew wages, wording and uncertain testimony. Maui offers strength only after informed approval, and Mini Maui punctures his performance.

### Danse — one revision, 361 words

**What the Armor Leaves Behind ch 50, A Name Above the Door:** Niko learns that a rejected fitting is not a personal failure; Renn signs off on its safe demonstration-only storage. Ash refuses to exchange their private space for a convenient workshop repair arrangement. Danse backs the boundary and does not claim authority merely because he has training and old rank.

### Severus Snape — seven revisions, 2,246 words

- **Ch 16:** Medical evidence and a counter-curse are documented without romantic absolution or overconfident claims.
- **Ch 17:** A timing error means a potion cannot be sent to patients; Severus accepts a tool adaptation for his painful grip rather than forcing his body into a story about perfect competence.
- **Ch 28:** McGonagall offers a witness entrance as a choice, not an order to hide; Jasper distinguishes privacy from shame.
- **Ch 29:** A testimony date is corrected publicly and accurately. Severus's good service does not erase mistreatment of pupils.
- **Ch 37:** Spinner's End laboratory construction affects a neighbor whose pipe and schedule must be respected.
- **Ch 38:** Jasper asks for a break during Patronus practice and chooses a memory that doesn't need to center Severus.
- **Ch 50:** A possible keeper name enters the archive as a lead needing proof, not an announced solution; Severus makes time-limited commitments.

Severus stays prickly, precise, angry, funny and capable of tenderness; he does not turn into Iroh with harsher language or Greg in black robes.

### Greg — eight revisions, 2,512 words

- **Ch 26:** Borrowed recording equipment, unfinished lyrics and equipment return deadlines give song-making a practical cost.
- **Ch 27:** Greg says no to an extra vehicle repair without abandoning his responsibility to Steven or to Jasper.
- **Ch 29:** A stage outlet fails safety checks; Greg respects a technical stop and flirts awkwardly without turning Jasper into a stage assistant.
- **Ch 30:** Pilar runs the community center; Greg does not volunteer people's time, and unsafe rooms remain closed.
- **Ch 33:** Old posters and manager memories do not require a public confession; Greg can admit conflicting feelings without a wise-man monologue.
- **Ch 36:** Romantic tension is physical, funny, unpolished and consensual, with cleanup work and ordinary obligations still present.
- **Ch 39:** An unfinished song need not dictate a relationship's ending or rank partners.
- **Ch 41:** Jasper directly reaffirms “I'm ethically non-monogamous” and “I prefer polyamory” when a publicity notice describes Greg as their exclusive “one true love.” Greg supports a truthful correction without claiming Jasper as a prize.

Greg is warm but distractible, technically capable but vulnerable, quick with a bad joke and sometimes slower to name his fear. He should not deliver Iroh's military aphorisms or counsel his partner through every scene.

## Character research and missing bios

The principal leads already had substantial canon-grounded files in `json/characters/`; those profiles were preserved. The existing author-style reference is `json/william-writing-style.json`, based on analysis of 33 prior works. That reference guides scene pacing, dialogue interruptions, concrete sensory objects, wry first-person observations and endings that show changed behavior; it is not a guarantee that each new sentence reproduces the author's voice exactly.

Three original supporting characters lacked their own reference files; story-grounded profiles have now been added inside the established fandom/location character library:

1. `docs/character-library-source-full/characters/steven-universe/pilar-original.json` — the community-center organizer, budget and consent authority.
2. `docs/character-library-source-full/characters/steven-universe/ellis-original.json` — the reporter whose article can be revised to respect privacy and local volunteers.
3. `docs/character-library-source-full/characters/lanternweald/niko.json` — the Brasswatch apprentice who distinguishes a failed fitting from a failed student.

These are **original fanfiction characters**. Their files record what existing chapters actually establish, and explicitly mark family history, age or life details not yet known. Do not misrepresent such details as external franchise canon or fill unknown biography fields with fabrications. These profiles are writer-facing references, not new romance routes or claim that the reader automatically uses every research folder.

## Living-world continuity

See [LANTERNWEALD_PASS19_CONTINUITY.md](LANTERNWEALD_PASS19_CONTINUITY.md), and the Pass 19 links written to `json/lanternweald-community-atlas.json` and `json/lanternweald-living-world-registry.json`. These distinguish actual new scenes from optional future possibilities. The Closed Bells lower maintenance route is still sealed; the historic erased keeper's identity is still unresolved; voluntary Threadways remain separate from unsafe infrastructure.

## Reader and data validation

The reader does not automatically fetch chapter JSON. It loads `js/fanfic-data.js` followed by multiple chronological JS chapter-revision overlays.

Three exact full-chapter overlay mirrors were added and referenced from `index.html` **after Pass 18 and before `app.js`**:

- `js/lanternweald-revisions-pass19-a.js` — 7 complete canonical entries (Iroh, Love & Duty, Maui).
- `js/lanternweald-revisions-pass19-b.js` — 8 complete canonical entries (Danse and Severus).
- `js/lanternweald-revisions-pass19-c.js` — 8 complete canonical entries (Greg), and a final recomputation of runtime series word totals.

Every one of the 23 runtime entries was checked against its corresponding canonical JSON for matching chapter ID, number, title, content, and recorded word count: **23 of 23 matched exactly**. The `index.html` script order was checked as **Pass18B → Pass19A → Pass19B → Pass19C → app.js**. Every `series.json` indexes 50 chapters and its `total_word_count` equals the sum of its chapter entries.

These are repository-data and static script-order validations, **not** full end-to-end browser tests.

## Remaining editorial work

The project now clears the previous 1,300-word triage threshold across all six novels. That does not mean chapters share equal dramatic intensity, pacing, humor, research depth or emotional complexity. Continue reading each full manuscript linearly before making sweeping consistency claims, paying attention to repetition of “may I kiss you?”, identical relationship reassurance, formulaic closing lessons and the risk of making Jasper a fixer for everybody. Later passes should revise those beats where they feel mechanical, using the established narrator voice and individual character profiles. Keep non-explicit sensuality, slow-burn tension, awkwardness and private fade-to-black, without adding explicit sexual content or replacing personal negotiation with universal partner agreement.

**Final scope:** 23 chapters revised, 7,520 new indexed words, three new original-character reference files, two world registries updated, three new reader overlays connected. Six novels and 300 chapters preserved in the original repository branch.
