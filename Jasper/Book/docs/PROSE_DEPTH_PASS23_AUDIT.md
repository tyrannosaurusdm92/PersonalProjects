# Pass 23 — Voice Separation, Causal Depth and Reader-Parity Audit

**Date:** November 6, 2026. **Target:** `tyrannosaurusdm92/PersonalProjects/Jasper/Book` on the existing **`main` branch**. All manuscript changes were made directly to canonical chapter files. No alternate branch, pull request, new novel or replacement canon tree was created.

## Confirmed totals

| Novel | Existing chapters revised | New indexed words | Updated indexed words | Total chapters |
|---|---|---:|---:|---:|
| *Jasmine After Rain* | 9, 24, 39 | +880 | 79,358 | 50 |
| *Love & Duty* | 9, 24, 39 | +870 | 82,480 | 50 |
| *What the Armor Leaves Behind* | 9, 24, 39 | +830 | 81,989 | 50 |
| *After Always* | 9, 24, 39 | +854 | 78,272 | 50 |
| *Stars Between the Strings* | 9, 24, 39 | +806 | 80,902 | 50 |
| *The Shore I Choose* | 9, 24, 39 | +881 | 86,762 | 50 |
| **Total** | **18 revised chapters** | **+5,121** | **489,763** | **300** |

Previous indexed total: 484,642. All six series manifests and the collection catalog were reconciled against actual edited canonical chapter data. These metadata totals do not prove all individual chapters have comparable literary depth.

## Specific manuscript scenes written in this pass

**Iroh — chapters 9, 24, 39.** A market potter identifies a kiln defect in a cup Jasper broke, distinguishing observed damage from jealousy and allowing staff to remove unsafe stock. A White Lotus volunteer schedule gives way to Mina's actual three-column opt-in system and to individual relatives' competing obligations. Greg crosses through Starwake to taste Iroh's new smoky-citrus blend and gives a musician's practical tasting note. Iroh discusses leaf ratios, costs and drying time rather than speaking as Greg would. Their encounter is mirrored in Greg's chapter 39 by a real tin of tea and its brewing directions.

**Aang, Katara and Toph — chapters 9, 24, 39.** Katara and Jasper explicitly discuss Jasper's ethically non-monogamous relationships and preference for polyamory while sorting unusable clinic cloth; neither demands that Katara's bonds with Aang, Toph and Jasper advance in lockstep. Beren's cabbage delivery is delayed and bruised by Aang's festival testing. The group makes a real budget payment and clears a road instead of having the Avatar's fame settle the conflict. Following a spirit-related rescue at a protected spring, residents and workers preserve objections and evidence, demand safe work assessment, and protect wages while the project is stopped.

**Danse — chapters 9, 24, 39.** The power-armor drill uncovers poorly marked emergency release controls. Haylen's technical knowledge, Danse's discipline and Rhys's accountability have immediate safety consequences. During the Danse investigation, Haylen reports document requests without claiming to possess conclusive evidence. Later Danse receives Haylen's letter and the fanfiction-specific Keane baseball card, but chooses a private envelope over an immediate public memorial or a forced reconciliation.

**Severus — chapters 9, 24, 39.** The Copper Kettle's stranded Floo travelers require an actual inspection notice and honest uncertainty about safe travel. Severus shares Pensieve memories but admits that giving Jasper access does not settle Lily's or others' privacy rights. Old school essays with Slughorn's corrections show competing technical judgment; copies might be archived with permission, while the originals remain Severus's property. Physical intimacy is an ink-stained hand and unforced closeness, not a generic wise speech.

**Greg — chapters 9, 24, 39.** Greg checks in with Steven by text but protects Jasper's difficult day's details and respects the request to remove overpowering pie smells. An earlier corrupt fragment and out-of-order follow-up card in the clinic chapter were repaired in place; the appointment, grocery stop and home arrival now follow an intelligible chronology. Greg works with a real recording rest, fretting and a flawed take rather than turning every song into abstract counseling. Iroh's citrus tea recurs, and Greg's humor remains casual and specifically musical.

**Maui — chapters 9, 24, 39.** A storm gutter and collapsed roof cannot be cleared by spectacle alone: Fen, Neri, Pip and Maui verify water flow and account for residents first. A Moonroot map and a contractor's invoice remain unverified until evidence of the actual garden path appears, preserving Iroh's separate archival interest. Orin and Neri remove sensitive references to a child from public Closed Bells testimony; Maui carries the archive box only as far as requested. The old lower passage remains sealed and the keeper's identity remains unknown.

## Profiles and research

Five character profiles were created in `json/characters/`, given corresponding source-full folders, and registered in `json/characters/index.json`, raising the unified index from **170 to 175**.

- **Knight Keane** (`fo4-keane.json`), a *real Fallout 4* Recon Squad Gladius NPC, is deceased at Cambridge Police Station. His KN-100K medical/status entry appears in the game's terminal records, while the baseball card mailed to Danse is **original fanfiction** and is not claimed as a canonical item.
- **Horace Slughorn** (`hp-slughorn.json`), the official *Harry Potter* Potions teacher and former Slytherin Head, is sociable, selective about influential students and capable of courage. His annotations on fifteen-year-old Severus's essays are **fanfiction-specific**.
- **Beren** (`avatar-beren-original.json`), a named market delivery driver with legitimate route and wage concerns, is an original character. His family and history are not invented.
- **Nola** (`su-nola-original.json`), an original Starwake event and equipment steward, is documented from on-page volunteer and payment oversight, not falsely presented as licensed *Steven Universe* cast.
- **Sela** (`lanternweald-sela.json`), an original gardener commissioning a shallow skiff, already had a source-full reference in the Lanternweald character folder; that **existing profile was updated in place**, not duplicated.

Source boundaries and usable URLs are recorded in these character profiles. Canon-research highlights: [Avatar Studios character encyclopedia](https://www.avatarstudiosofficial.com/characters/), [Hogwarts teachers](https://www.harrypotter.com/features/harry-potter-101-the-hogwarts-teachers), [Cambridge Police Station terminal entries](https://fallout.fandom.com/wiki/Cambridge_Police_Station_terminal_entries), and [Steven Universe Greg character references](https://steven-universe.fandom.com/wiki/Greg_Universe).

The existing primary `avatar-iroh.json` and `su-greg.json` profiles were **updated in place** with Pass 23 source-grounded, noninterchangeable dialogue rules and the shared tea-tasting scene.

## Reader data checks

The site's `index.html` includes Pass 23 overlays **after Pass 22** and **before `js/app.js`**:

- `js/lanternweald-revisions-pass23-a.js`: canonical Avatar/Iroh chapters (6).
- `js/lanternweald-revisions-pass23-b.js`: canonical Fallout 4/Harry Potter chapters (6).
- `js/lanternweald-revisions-pass23-c.js`: canonical Greg/Maui chapters (6), plus series total refresh.

**18/18** revised reader entries were compared for exact chapter ID, number, title, **full prose content** and indexed word-count parity with their canonical `NN.json` files; each passed. This is source parity, **not a full real-browser or mobile end-to-end test**.

`json/fandoms.json` and six `series.json` manifests now agree at **300 chapters, 489,763 indexed words**. World JSON notes were appended within their existing canonical files instead of creating a second atlas or duplicate registry.

## Incomplete work and governing editorial rules

Pass 23 revised **18 existing chapters**, not all 300. Previously established 50-chapter arcs and all earlier edits remain intact. Similar word lengths cannot guarantee identical depth, and some existing chapters still need line-level removal of duplicate gestures, repetitions and over-neat emotional summaries. Future revisions should preserve the actual first-person style reference `json/william-writing-style.json`, make each love interest's speech and decisions distinct, and avoid forcing a relationship milestone into every chapter.

Jasper's ethical non-monogamy and preference for polyamory remain openly disclosed with adult partners; consent, awkwardness, attraction and fade-to-black are preferred to explicit sexual description. The reader does not gain omniscient access to private thoughts, sealed testimony or other people's histories.

See [LANTERNWEALD_PASS23_CONTINUITY.md](LANTERNWEALD_PASS23_CONTINUITY.md) for the related cross-series continuity contract.
