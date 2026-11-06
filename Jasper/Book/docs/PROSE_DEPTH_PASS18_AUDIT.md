# Editorial Pass 18 — Character Voice, Polyamory, and Living-World Consequences

**Date:** November 6, 2026  
**Branch:** `main` (in-place commits only; no branch created)  
**Scope:** Targeted changes to 14 existing chapters from all six 50-chapter novels, six series indexes, two main character profiles, and five supporting-character reference files.

## Scope and truthfulness

The six series already contain 300 chapters. This pass **does not** claim that every one of those chapters has been line-edited, that every chapter is now equally long, or that the story-world arc is finished. It adds original prose directly to the canonical `content` fields rather than appending unused prompts, placeholder summaries, or empty chapter files.

This pass contributes **3,385 new words** in 14 chapter files. All 14 chapters retain their existing titles, numbering, narrative point of view and prior content. All six `series.json` files have their edited chapter word counts reconciled; each series total equals the sum of its indexed chapter counts.

| Series | Actual chapters revised | New words | Character/world consequence |
|---|---|---:|---|
| Jasmine After Rain | 9, 33, 48 | 769 | Iroh's old tactical habits, paid staff time, objection from Mina, command reflex challenged by Maui |
| Love & Duty | 11, 47 | 449 | Jasper explicitly states ethical non-monogamy and polyamory; each partner gives a distinct answer; the kite festival has a real safety closure |
| The Shore I Choose | 8, 34 | 432 | Neri protects memory privacy and voluntary return rights; the damaged fastener generates legitimate repair costs and competing local responsibilities |
| What the Armor Leaves Behind | 17, 36 | 493 | Danse's military-minded awkwardness, careful bench procedure, honest boundaries around technical competence |
| After Always | 9, 44 | 488 | Severus's precision and cutting humor contrasted with teahouse gentleness; publication consent and archival chain of custody made actionable |
| Stars Between the Strings | 8, 35, 46 | 754 | Greg explicitly considers Jasper's polyamory disclosure without automatic approval; music, cables, fuel, booked performance times and technician authority matter |

## Specific voice distinction: Iroh is not Greg

**Iroh (original Avatar: The Last Airbender continuity):** An older, trained military strategist who chooses the teahouse life but is not magically cured of his instinct to arrange other people's positions. He can be dry, courteous, amused, dangerous, irritable, and wrong. In ch09, he neutralizes an old officer by giving him the public menu; in ch33, Mina makes him give up a redesign he prepared without asking her; in ch48, he realizes he has given Maui an unjustified command. Tea does not turn him into a universal counselor. Source check: [Nickelodeon's Iroh profile](https://www.nick.com/info-page/39yzba/iroh).

**Greg (post-series Steven Universe continuity):** A former musician and Steven's father who thinks in chords, cables, rehearsals, fuel and gigs. His joking can conceal vulnerability and fear of commitment, but it should never erase his practical competence or capacity for consent. In ch08 he does not pretend to accept an entire polyamorous future at once merely because he likes Jasper; in ch35 his map becomes an actual logistics sheet; in ch46 his first instinct is to mute faulty audio equipment and defer to the technician. Unlike Iroh, he has no history of commanding an army or moving a room like a battlefield. Source check: [Greg Universe character summary](https://en.wikipedia.org/wiki/List_of_Steven_Universe_characters).

**Dialogue sanity test:** Exchange Iroh's and Greg's lines without changing the speaker names. If the scene still sounds plausible, revise it again. Iroh's restraint is strategic and sometimes vain; Greg's restraint is improvised and sometimes frightened. Iroh's self-criticism often arrives in changed procedure; Greg's can arrive in a ruined joke or an uncomfortable but direct admission. Neither should always be right.

## Other romance leads — distinct scene engines

- **Maui:** Performs before he reflects; humor is boastful, theatrical, physically expressive, with Mini Maui as a dissenting presence. The true arc is learning to ask rather than assume strength grants permission. Never make him a second Iroh.
- **Danse:** Procedural, literal, rigorous about risk; receives affection with stunned discomfort. His competence is real but limited, and he can admit that a repair belongs to somebody with the right part or expertise. Do not turn him into Greg with armor.
- **Severus Snape:** Acidly exact, intensely protective of privacy, curious despite himself; information is a kind of power to him. He does not answer every emotional question with calm encouragement or accept instant redemption.
- **Aang:** Joy and grief coexist; he refuses to turn Air Nomad sacred traditions into entertainment. He must consult the local stewards even when he can perform a spectacular rescue.
- **Katara:** Protective and organizational, often first to insist on concrete consequences, access and consent; love does not eliminate her impatience.
- **Toph:** Sensory certainty, dry antagonism toward patronizing treatment, physical attention and bold challenges; she is not a counselor with rougher language.
- **Jasper:** Adult first-person protagonist whose direct consent conversations coexist with jokes, embarrassment, affection, stubbornness, practical attention and the ability to say no.

## Ethical non-monogamy on the page

**Love & Duty ch11:** Jasper says “I'm ethically non-monogamous” and “I prefer polyamory” to Aang, Katara, and Toph. Their replies are distinct and none substitutes for unanimous blanket approval. Aang asks about time to consider; Katara names the risk of treating silence as consent; Toph insists she can speak for herself.

**Stars Between the Strings ch08:** Jasper speaks the same essential truth to Greg at an early relationship moment. Greg asks questions, admits fear of agreeing too quickly, and does not promise certainty he cannot offer.

Other stories already contain existing explicit relationship discussions and negotiated boundaries; do not retcon these as first disclosures without checking the linear sequence. Consent remains ongoing and reversible. No one is required to date all of Jasper's other partners; no relationship becomes more important merely because its lead is famous.

Sensuality should have tactile specificity, anticipation, humor, awkwardness and individually chosen responses. Keep scenes non-explicit and allow fade to black. Avoid repeating the same soft kiss–aphorism–lesson structure in every book.

## Shared world: on-page consequences created by Pass 18

1. **Jasmine Steps:** An arriving former officer cannot quietly commandeer Iroh's shop. Mina's paid hours and ventilation problems remain real even when Iroh has a better map.
2. **Riverstone Terrace:** A loose festival anchor creates a localized closure. Katara checks people, Toph identifies vibration at the post, Aang defers to stewards. A sacred Air Nomad tradition is not converted into public entertainment.
3. **Tideglass Cove:** Neri records safe access without publishing memories. Corrosion is material, not metaphor: rated brackets have a purchase price, and closing a mooring affects Lio's crew wages. Maui cannot muscle the price out of existence.
4. **Brasswatch Yard / Commonwealth:** Danse's skill is procedural rather than omniscient. He can log and inspect a failure without claiming expertise in all instruments or all environments.
5. **Moonroot Archive:** Preserving a letter is not permission to exhibit its contents. Neri creates a revised receipt; Severus decides public access for his letters and can leave the last one sealed.
6. **Starwake Pier:** A broken sound lead is tagged out; the technician directs the repair. Greg's performance requires a real booking, safe staging, and someone who checks the fuel gauge.

These additions deliberately operate **within** existing world invariants. The historic Closed Bells lower passage stays sealed. An open Threadway never means open access to another person's memories or destination. The homeworlds are still separate places with real consequences.

## Research and supporting-cast profiles

The two active canonical profiles updated in `json/characters/` are `avatar-iroh.json` and `su-greg.json`, with source links and practical voice constraints.

Five missing original-character research references were added under the existing `docs/character-library-source-full/characters/` structure:

- `avatar/clerk-ren-original.json`: cautious, procedurally competent clerk who returns a corrected receipt.
- `avatar/inspector-han-original.json`: official with valid safety duties who abuses status in the line.
- `lanternweald/bo.json`: closure and supply functions established; personal history not yet established.
- `lanternweald/halen.json`: named member of the district, but specific role and history remain unknown rather than fabricated.
- `lanternweald/sela.json`: local flood and crop log authority; can refuse proposals based on evidence.

These are original fanfiction characters, not externally researched franchise personalities. The existence of a profile does **not** imply that every bio field is now established, nor does a source-library file automatically create a runtime cast entry.

## Remaining parity gaps

Indexed chapter word counts still vary. At this checkpoint, **21 chapters have fewer than 1,300 indexed words**: Jasmine After Rain (5), Love & Duty (0), The Shore I Choose (0), What the Armor Leaves Behind (1), After Always (7), Stars Between the Strings (8). Word count is only a triage signal: a longer chapter can still repeat itself, and a shorter one can carry a complete story beat. Prioritize genuine scene development over numerical padding.

Suggested next scenes for a future in-place prose pass: Iroh 24/32/34/40/42; Greg 26/27/29/30/33/36/39/41; Snape 16/17/28/29/37/38/50; Danse 50. Inspect the actual chapter before revising. Keep all existing story content, chapter numbering and main-branch integration intact.

**Validation:** Six existing series retain 50 indexed chapters each, 300 total. No new branch, no new series and no fake chapters were created in this pass.
