# Editorial Pass 21 — Narrative Depth, Voice and Integrated-World Audit

> **Pass 22 factual correction (2026-11-06):** Mereana explicitly identifies as a Māori performer and teacher in *The Shore I Choose* chapter 6. Her iwi affiliation and specific personal rituals are not established. The original pass omitted this existing manuscript fact.

**Date:** 2026-11-06  
**Target:** `tyrannosaurusdm92/PersonalProjects`, `Jasper/Book`, existing **`main` branch**.  
**Status:** Direct, in-place edits to existing prose; no new branch, pull request, new route or replacement manuscript.

## Revision totals

| Novel | Edited chapters | Indexed words added | Updated indexed words | Retained chapters |
|---|---|---:|---:|---:|
| *Jasmine After Rain* | 12, 25, 47 | 788 | 77,638 | 50 |
| *Love & Duty* | 12, 25, 47 | 856 | 80,821 | 50 |
| *What the Armor Leaves Behind* | 12, 25, 47 | 796 | 80,281 | 50 |
| *After Always* | 12, 25, 47 | 843 | 76,622 | 50 |
| *Stars Between the Strings* | 12, 25, 47 | 875 | 79,232 | 50 |
| *The Shore I Choose* | 12, 25, 47 | 842 | 85,076 | 50 |
| **Total** | **18 existing chapters** | **5,000** | **479,670** | **300** |

These counts are reconciled chapter-index metadata (the previous collection total was 474,670). They are **not** independent literary quality ratings. All edited chapters retained their previous text except for small, explicit continuity repairs.

## What changed in the actual prose

**Iroh — ch 12:** He gives Mina the authority, wages and right to reject spoiled tea deliveries while he travels, instead of treating her as someone to be assigned military orders. This builds on the existing rota conflict and recognizes that tea-shop staff have livelihoods beyond his generous intentions. **Ch 25:** Lian decides which damaged plants can recover, what to buy from Huan and when her soil may be replanted. Iroh does not “win” the garden dispute with a grand gesture. **Ch 47:** Halen's mourning does not turn his empty chair into Iroh's permanent reservation; the customer is free to decide where to sit.

**Aang, Katara and Toph — ch 12:** A reporter pressures a clinic patient about Katara's romantic household. Katara limits what she can say on the patient's behalf; Aang and Toph separately choose how much to make public. **Ch 25:** After a child falls through unsafe Southern Water Tribe ice, the child's family, Gran Gran, Hakoda and the shoreline watch discuss real warning markers, rather than requiring Katara to run her former village forever. **Ch 47:** The Longlight Festival does not put Aang's name on a kite made by local apprentices; the makers retain credit, repair decisions and materials. The sacred Air Nomad material remains separate from Lanternweald festival traditions.

**Danse — ch 12:** The ground crew catches a crate with an uncertified hose coupling; Danse supports a safe vertibird delay without pretending his military rank replaces the pilot's or technician's knowledge. **Ch 25:** Haylen chooses what risk she accepts in helping Jasper find Danse and warns against making Danse owe his own return. Her action is not a promise of a rescue or approval of Maxson's order. **Ch 47:** Ash and Renn require an independent complaints reviewer and an option for an outside witness, rather than a military-style instruction to complain to the very supervisor named in a complaint.

**Severus — ch 12:** He corrects a false disciplinary academic record about a pupil he once humiliated, without asking that person to forgive him or take part in his redemption story. **Ch 25:** A tense, non-explicit laboratory exchange unfolds around a mislabelled vial; the text also repairs an earlier continuity glitch that made the already burned newspaper seem to be put away later. **Ch 47:** Orin's oral-history project must use voluntary witness invitations and cannot rely on private addresses or repeated contact after a refusal. Severus asks for accurate evidence rather than a flattering biography.

**Greg — ch 12:** Greg, Steven's photograph, Jasper's independent shelf and the car/van life remain distinct; Jasper's ethical non-monogamy does not imply every partner gets the same housing or belongings. Greg is goofy, warm, musical and a father, not another tea philosopher. **Ch 25:** Greg contacts customers to offer refunds after the car wash pump fails and accepts Alva's technical limits; a previously scrambled sequence of her arrival and inspection has been corrected. **Ch 47:** Greg insists a hired sound technician receive the agreed fee, not a program credit in lieu of payment. The event technician remains **unnamed** rather than being conflated with Alva, the car wash specialist.

**Maui — ch 12:** Lark's intended crossing and route are private; Pip and Neri work toward a voluntary register. Maui's very conspicuous wish to help is redirected toward respecting a no. **Ch 25:** Mereana and visiting collaborators control their own artworks, lending terms, repair authorization and missed bookings; chapter 6 already identifies Mereana as a Māori performer and teacher; her specific iwi and any undisclosed rituals remain unknown. **Ch 47:** Fen documents tide and debris limits for the temporary upper water channel, while the older Closed Bells lower maintenance passage remains sealed. Maui may joke about heroic persecution by paperwork, but he does not override actual measurements.

## Character reference research

Five **original** supporting characters lacked individualized files. Pass 21 researched their **authored manuscript appearances**, then added each to both the active `json/characters/` index and the reference character-library folders:

| Person | Source novel | On-page grounding | What was not invented |
|---|---|---|---|
| **Lian** | *Jasmine After Rain* 25 | Neighboring gardener, damaged seedlings, asks for soil testing, chooses replacement planting | Age, history, family |
| **Huan** | *Jasmine After Rain* 25 | Market plant grower or vendor recommended by Lian | Pronouns, personality, inventory |
| **Lark** | *The Shore I Choose* 12 | Traveler who requests a confidential departure without required return date | Destination, home, age |
| **Mereana** | *The Shore I Choose* 6 and 25 | Māori performer and teacher from Aotearoa; protects artists' ownership and loan terms | Specific iwi, invented ceremonies, family |
| **Alva** | *Stars Between the Strings* 25 | Beach City pump repair specialist with a maintenance checklist | Qualification to inspect an unrelated concert's electrical system |

No external franchise biography exists for these **story-original characters**. Their reference files mark unknown details explicitly instead of making up biographies. The unified index now has **168** registered profiles (previously 163).

The user-established `json/william-writing-style.json` remains the prose style reference. The aim is direct first-person feeling, specific action and sensory context, deliberate humor and intimate boundaries—**not** duplicating identical romantic dialogue for every love interest.

## Reader, catalog and integrity checks

The reader uses `window.JASPER_FANFIC_DATA` with chronological JavaScript overlays, not live JSON requests. Pass 21 added:

- `js/lanternweald-revisions-pass21-a.js` — six canonical Avatar chapter mirrors.
- `js/lanternweald-revisions-pass21-b.js` — six canonical Fallout 4 and Harry Potter chapter mirrors.
- `js/lanternweald-revisions-pass21-c.js` — six canonical Steven Universe and Maui chapter mirrors plus a runtime series word-count refresh.

These files are referenced in `index.html` **after Pass 20 and before `js/app.js`**. All **18 of 18** overlay chapter records were checked for full-content, title, chapter ID, chapter number and indexed word-count parity with their corresponding canonical `NN.json` files.

All six `series.json` indexes and `json/fandoms.json` reconcile at 300 chapters and 479,670 indexed words. Their completeness and script-order checks do **not** constitute a full browser or mobile test.

Two world documents were updated: `json/lanternweald-community-atlas.json` and `json/lanternweald-living-world-registry.json`, tying the new scenes to the shared-world's distinct districts and rules. See [LANTERNWEALD_PASS21_CONTINUITY.md](LANTERNWEALD_PASS21_CONTINUITY.md) for a concise editorial contract.

## Honest limits and next revision targets

The pass substantively revised **18** chapters, not every one of the 300. All 300 chapters existed before this pass, and all remain written. Having 50 chapters per novel or similar chapter lengths does not make them equal in emotional depth. Future work should read complete arcs in sequence, trim redundant “may I kiss you?” beats, vary the conclusions of intimate scenes, preserve first-person Jasper voice and ensure not every crisis resolves because Jasper provides advice.

Ethical non-monogamy and preference for polyamory are **already established** and were preserved; partner-specific choices remain voluntary. Sensuality and closeness remain non-explicit, with fade-to-black where appropriate. No new canon ethnicity, historical ritual, family tie, romantic route or professional license was fabricated merely to fill a character file.
