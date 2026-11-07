# Pass 26 — Prose craft, living-world continuity, and character voice
**2026-11-07 · committed directly to main; no new branch.**

## Completed revisions and limitations
Pass 26 writes substantial new material directly inside **chapters 5, 27 and 45 of each of six novels**, 18 chapters in all. The original scene sequence, relationship progression, full story endings, and earlier Pass 1–25 work are retained. The additions make choices tangible: workers get paid; unsafe equipment cannot be certified by popularity; stories about grief remain private; adults must negotiate time without ownership. They add `4,698` indexed words. The current six-manifest collection contains **300 full chapters** and **503,459 indexed manuscript words**.

| Novel | Principal relationship(s) | Revised chapters | New indexed words |
|---|---|---|---:|
| Jasmine After Rain | Iroh | 5, 27, 45 | +784 |
| Love & Duty | Aang / Katara / Toph | 5, 27, 45 | +794 |
| What the Armor Leaves Behind | Danse | 5, 27, 45 | +748 |
| After Always | Severus | 5, 27, 45 | +732 |
| Stars Between the Strings | Greg | 5, 27, 45 | +822 |
| The Shore I Choose | Maui | 5, 27, 45 | +818 |
| **Total** | **Six distinct character arcs** | **18 revised chapters** | **+4,698** |

**This is not a claim to have fully copyedited or matched the literary depth of all 300 chapters.** Some inherited sections still need bespoke line editing. Counts are comparable editorial metadata, not measures of equal emotional quality.

## New consequential prose
- **Iroh** confronts ownership of postwar memorial bricks, listens rather than extracting forgiveness, remembers ordinary letters from Lu Ten, and plans fair mint delivery routes while Mina protects staff pay. He does not speak like a musician.
- **Aang, Katara, Toph** remain separate people: Aang assists but asks inspectors rather than offering miracles; Katara treats patients and protects records; Toph reads foundation stress but refuses to let stone replace testimony. Their relationship is a polycule of adults with negotiated boundaries, not a set of interchangeable voices.
- **Danse** trusts Haylen's radio measurements, holds on to the earned parts of his past after Maxson strips his rank, and asks explicitly for time and a kiss without making Jasper responsible for his existence. His voice is operational, often uncomfortable with intimacy.
- **Severus** guards who can read his old research, differentiates a kiss from testimony and public performance, and can claim private time without making exclusivity a test. He remains precise, cutting and deeply private.
- **Greg** is a musician, father and hands-on worker. His van has instrument safety and family reminders, his apology is informed by actual gigs and missed timing, and he asks for one song to be heard without demanding a ranking of partners. His voice is conversational and awkward, not aphoristic like Iroh's.
- **Maui** spots an actual contrary current, teases and seeks an audience even while consulting Fen, respects Tomas's right to depart, and asks Jasper for an unprogrammed dance. Mini Maui is used as a sparing visual joke, not mandatory punctuation.

## Character research boundaries
Five original supporting profiles were promoted to the active `json/characters/` index (**189 profiles total**): **Tomas, Vel, Pip** from preexisting source-full character references and the novel text, plus **Daron and Ren**, where only manuscript-supported facts are stated. New source-full author profiles were added for Daron and Ren; no unobserved family details, ages, hidden powers, or franchise identity were manufactured. Existing researched profiles for Iroh, Greg, Severus, Danse and Maui received Pass 26 contrast rules.

Canon research references (only for real franchise characters):
- [Official Avatar Studios: Iroh](https://www.avatarstudiosofficial.com/characters/)
- [Disney D23: Maui](https://d23.com/meet-the-characters-of-moana-2/)
- [Official Harry Potter: Hogwarts teachers](https://www.harrypotter.com/features/harry-potter-101-the-hogwarts-teachers)
- [Steven Universe Greg Universe history: fan-maintained secondary source](https://steven-universe.fandom.com/wiki/Greg_Universe/History)

The original Lanternweald, characters and specific crossovers are **fanfiction continuity**, not licensed official histories.

## Reader and metadata synchronization
- Edited canonical chapter JSON and per-series manifests are the manuscript source of truth.
- Six **existing** cumulative reader overlay files `js/lanternweald-revisions-pass25-*.js` were updated **in place** with Pass 26 content. This avoids adding six more layered JavaScript files and continues to publish the previously corrected Pass 24–25 chapters.
- Existing `index.html` still loads them after older revisions and before `js/app.js`.
- Catalog, community atlas, living-world registry and the continuity ledger now document current totals and verified scene relationships. New village-life proposals are labeled as future ideas instead of false on-page history.
- Test scope: JSON parsing, manifest totals, reader-source exact field parity, cast index counts, and script-order validation. **Not** a full real-browser, accessibility or mobile test.

## Relationship and rating rules
All romances are between adults; Jasper is an adult named first-person reader-insert. Their chosen **ethical non-monogamy and preference for polyamory are already disclosed** in the established chapters, and must remain clear to each partner. A partner may ask for time, privacy, reassurance, affection and negotiated terms without claiming exclusive ownership. Intimacy stays sensual, conversational and non-explicit, with fade-to-black where appropriate. No sexual detail or new non-consensual relationship was added.

## Post-commit source verification (November 7, 2026)

**48 / 48 exact reader entries passed:** for each of six novels, chapters **5, 14, 17, 27, 32, 42, 45 and 48** in the offline reader mirror have exactly the same chapter number, title, full prose content and indexed word count as the canonical JSON file. Each per-series manuscript index still has 50 chapters and reconciles to its word total. This also verifies that the already published Pass 24 and Pass 25 chapter edits remain available after updating the existing overlays for Pass 26.

The six overlay scripts are ordered after Pass 23 and before `js/app.js`. The catalog sums to **503,459** words and **300** chapters, the active cast index has **189 unique profile IDs**, and the community registry reports editorial Pass 26. The Pass 26 additions were reformatted as separate dialogue/prose paragraphs, and the reader mirrors were rechecked after that change. These are structural and content checks, not a substitute for a live browser, device or accessibility test.
