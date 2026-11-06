# Editorial Pass 17 — Six-Novel Character and Causal Continuity Audit

**Applied to the existing main branch on 2026-11-06.** This is a concrete revision of **14 existing canonical chapter JSON files across six ongoing 50-chapter stories**. It does not replace the other 286 chapters, create new branches, or declare a completed 300-chapter full line-edit.

## 1. Actual chapter revisions

| Novel | Ch. | Existing chapter | Before | After | Added |
|---|---:|---|---:|---:|---:|
| The Shore I Choose | 15 | No One Is a Prize | 1507 | 1781 | 274 |
| The Shore I Choose | 22 | Tea, Salt and Smoke | 1729 | 1952 | 223 |
| The Shore I Choose | 43 | The Right to Disagree | 1550 | 1830 | 280 |
| The Shore I Choose | 49 | The Boats That Return | 1677 | 1952 | 275 |
| Jasmine After Rain | 26 | When Tea Goes Cold | 1287 | 1514 | 227 |
| Jasmine After Rain | 46 | A Game Neither of Us Wins | 1363 | 1587 | 224 |
| Love & Duty | 28 | The Things Toph Will Not Say | 1501 | 1740 | 239 |
| Love & Duty | 41 | A Bridge Is a Promise | 1379 | 1692 | 313 |
| Stars Between the Strings | 22 | Soundcheck | 1296 | 1560 | 264 |
| Stars Between the Strings | 43 | Steven Comes Home for Dinner | 1323 | 1483 | 160 |
| What the Armor Leaves Behind | 22 | A Machine with a Name | 1509 | 1704 | 195 |
| What the Armor Leaves Behind | 43 | A Refugee at the Yard | 1394 | 1609 | 215 |
| After Always | 15 | The Half-Blood Prince | 1233 | 1427 | 194 |
| After Always | 42 | Not an Appointment | 1260 | 1444 | 184 |

**Added: 3,267 words.** All are in the preexisting chapter JSON. Recorded total after this pass: **458,078 words in 300 chapters**.

**Series totals:** The Shore I Choose 82,511; Jasmine After Rain 73,421; Love & Duty 78,171; Stars Between the Strings 74,169; What the Armor Leaves Behind 77,715; After Always 72,091.

## 2. What changed in character, not just in word count

- **Maui:** The emotional price of applause is visible at the feast (15). He behaves unlike Iroh when challenged about salt and planting (22). He tries to turn an unfavorable civic vote into a heroic victory but must confront Edda's measured exit requirements (43). A navigation note from independent Moana changes what he *does* on a chart, not just what he *says* about respect (49).
- **Iroh:** A shop rota and an actual customer booking reveal that the former general still tries to arrange other people's time (26). His Pai Sho attention and White Lotus letter show how his planning instincts can make him absent even while sitting at the table (46). Mina can say no to extra work. His kindness is sometimes tactical, sometimes evasive, never just a stream of therapist-like lines.
- **Greg:** He recognizes an unsafe microphone lead, makes a musical joke, works with the technician rather than overriding her, and retains the nerves of an imperfect performer (22). Steven is an adult with his own travel, family questions and agency (43), not a cheerleader for Greg's new partner.
- **Danse and Nick:** Nick's protected witness and Danse's insistence on official verification collide without Nick becoming his tutor (Armor 22). Danse accepts Renn's actual parts limits and allows an unnamed refugee their privacy (Armor 43), even when it irritates him.
- **Severus and Pomfrey:** A question about the Half-Blood Prince's notes and student safety produces a verifiable addendum, not an instant redemption (After Always 15). Iroh declines to force Severus to socialize; Severus is resentful despite finding no opening for an argument (42).
- **Aang, Katara and Toph:** Toph detects unwanted birthday theatrics and asks for her own kind of celebration (Love & Duty 28). Aang's air-view optimism, Katara's care and Toph's ground-based diagnosis conflict over a bridge that Beren needs for actual deliveries (41).

## 3. New profiles: external research versus original-character extraction

Three missing franchise profiles were researched and added as individual JSON files:
- `docs/character-library-source-full/characters/disney-movies/moana.json` — film wayfinding leadership, crew autonomy and Mauian friendship.
- `docs/character-library-source-full/characters/steven-universe/steven-universe.json` — Greg's son, family autonomy, explicitly adult **fanfiction extrapolation**.
- `docs/character-library-source-full/characters/harry-potter/poppy-pomfrey.json` — Hogwarts matron/healer; any postwar consulting role is **AU**.

Sixteen original supporting-character files were added, grounded in **existing manuscript** behavior rather than invented external canon: Neri, Mara, Pip, Fen, Edda, Orin, Tamsin, Lio, Nola, Renn, Ash, Tomas, Vel, Mina, Jun, and Beren. Fourteen are under `characters/lanternweald/`; Mina and Jun are under `characters/avatar/`. These document independent work, speech patterns, rights and recurring story locations. The original character profiles are story-bible evidence, **not factual claims about existing media**.

The original eight major protagonist profiles (Maui, Iroh, Greg, Danse, Severus, Aang, Katara, Toph) already existed and were preserved. **This does not certify that all named people in 300 chapters have bios.** Additional rare cameo / single-scene gaps require a later complete roster reconciliation.

### External sources consulted for missing franchise characters
- Moana first film: https://movies.disney.com/Moana
- Moana second film: https://movies.disney.com/moana-2
- Moana personality: https://princess.disney.com/moana
- Greg and Steven episode chronology (secondary): https://steven-universe.fandom.com/wiki/Greg_Universe
- Greg and Steven history (secondary): https://steven-universe.fandom.com/wiki/Greg_Universe/History
- Poppy Pomfrey (official): https://www.harrypotter.com/de/fact-file/characters-and-pets/poppy-pomfrey
- Snape's skills (official): https://www.harrypotter.com/features/the-shrewd-skills-of-severus-snape
- Danse / Blind Betrayal (secondary): https://fallout.fandom.com/wiki/Blind_Betrayal

Research distinguishes official canon, secondary recaps, reader-created AU details, and original Lanternweald lore.

## 4. Shared-world consequences and protected canon

1. Tideglass and Riverstone paths require **tested access**, not a demigod carrying somebody's equipment as an emergency plan. The sealed lower Closed Bells passage stays sealed. Even a successful surface test does not authorize entry.
2. The Moonroot lost-keeper identity is **still unverified**. The record policy protects contributor confidentiality. No character can solve that mystery through a romantic epiphany.
3. Local work is independent: Fen's salinity readings, Edda's turn paths, Pip's signage, Mara's bread business, Mina's paid shift, Nola's contracts, Renn's components and Jun's kitchen stocks all have limits.
4. Moana's sea voyage exists **outside** Lanternweald. She decides with her crew, receives only the conditions Maui and Fen actually know, and need not visit or be romantically invested in the valley.
5. Adult Jasper remains first-person and ethically non-monogamous, preferring polyamory. Partners have their own choices and privacy; relationships and schedules are not a public registry.
6. Romantic physicality remains sensual but non-explicit, with private moments and fade-to-black when earned. No screenplay lines, song lyrics or ceremonies were imported.
7. The world follows a network of choices rather than effortless grants. Receiving a letter, performing a set, or running an event involves transport, materials, consent, wages and sometimes delay.

## 5. Website/data integration and checks

Three complete-chapter reader overlays were created:
- `js/lanternweald-revisions-pass17-a.js` — 4 Maui chapters.
- `js/lanternweald-revisions-pass17-b.js` — 4 Avatar chapters.
- `js/lanternweald-revisions-pass17-c.js` — 6 SU/Fallout/HP chapters.

They load in `index.html` **after Pass 16 and before `js/app.js`**. All 14 reader entries were re-fetched and tested to match their corresponding JSON chapter on exact **ID, number, title, content and word count**. All six `series.json` manifests have 50 entries and totals equal to sums of their chapter records; `json/fandoms.json` agrees with each.

**Not performed:** full 300-chapter prose audit, website accessibility test in a real browser, authoritative review of every cameo, or professional Māori cultural consultation. Future passes should not misrepresent these checks as completed.

Next reference: `LANTERNWEALD_PASS17_CONNECTIONS.md`.
