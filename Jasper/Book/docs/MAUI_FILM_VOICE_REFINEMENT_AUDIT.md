# Maui — Second Film-Voice Refinement Audit (2026-11-05)

**Scope:** The original `The Shore I Choose`, 50 chapters on the existing GitHub `main` branch, plus three Maui crossover scenes in other books. Earlier sourcebook-grounded changes already covered all 50 chapters; this pass adds a second, distinct **chapter-by-chapter voice edit** rather than creating new story chapters or a duplicate novel.

## Grounding and hard boundaries

Primary film references were read from `Maui/01_DISNEY_CANON.md`, `Maui/10_CHARACTER_AND_SCENE_TOOLKIT.md` and `Maui/13_PERSONALITY_REWRITE_CANON.md`, with `Maui/09_LANTERNWEALD_INTEGRATION.md` for environmental and character continuity. **This is Disney's fictional demigod after *Moana* and *Moana 2***, not an unqualified retelling of a Māori traditional ancestor or an invented all-purpose Polynesian mythology.

His constant traits: enormous self-confidence, comedic exaggeration, fast improvisation, sea knowledge, a magical shape-changing hook, occasional silent Mini Maui, desire for applause, heroism, jealousy, trickery, genuine warmth, fear of abandonment and a continuing bond with Moana. He grows in **choice of action**. He does not stop wanting to win, being annoyed by rules, embarrassing himself or throwing verbal sparks at Jasper and other characters.

Jasper remains the active, adult first-person reader-insert who has plainly disclosed **ethical non-monogamy** and a preference for **polyamory**. He cannot coerce Jasper or treat the other partners as prizes. Flirtation and consensual intimacy stay non-explicit and may fade to black.

## Chapter-wide editing coverage

| Existing chapter range | Chapters revised | Type of correction | Offline-reader file |
|---|---:|---|---|
| 01–10 | 10/10 | More daring and playful first impressions; actual seamanship; enormous but comic competence; more theatrical responses when Jasper needs space | `js/maui-personality-rewrite-01-10.js` |
| 11–20 | 10/10 | Pride when a sign is lost, defensive anger, better handling of an offensive prize comment, absurd festival clothing, and real impatience with departure and the unexplained lower bell | `js/maui-personality-rewrite-11-20.js` |
| 21–30 | 10/10 | Stronger banter with Greg and Iroh, jealousy that doesn't disappear, unrequested festival announcements, boastful fisher response to a pantry shortage, injured pride at expert feedback | `js/maui-personality-rewrite-21-30.js` |
| 31–40 | 10/10 | Calendar hubris, smart sarcasm, resentment of indefinite paperwork, joking around a violated privacy boundary, explicit memory of Moana correcting his embellished tales, hilariously defeated laundry | `js/maui-personality-rewrite-31-40.js` |
| 41–50 | 10/10 | Comic suffering over inspections, frustration over losing a vote, extravagant rescue proposals, continued desire for fans, a funny but voluntarily respectful doorstep wait, an unabashedly Maui-flavored romance conclusion | `js/maui-personality-rewrite-41-50.js` |

**All 50 chapters are revised in their existing `json/Disney/Maui-And-Jasper/NN.json` files.** No story structure, existing named milestones, ending, or new branch is introduced. The five source-complete reader files were modified **in place**, not layered as new override stacks. Current Maui manifest: **79,060 recorded words / 50 complete chapters**, with no chapter below 1,200 words.

## Crossovers changed

- **`Jasmine After Rain` 48:** Maui is allowed to want his name shouted at the festival, then admits that he also wants the children to see their community as spectacular. He does not become Iroh's obedient pupil.
- **`Stars Between the Strings` 44:** Maui carries the scheduled bench with a flourish, jokes about moving the entire stage, and confronts Nola's real crew checklist without losing his ego.
- **`After Always` 48:** At the quiet vigil he shows off while moving blankets and gives a theatrical distant greeting instead of becoming a solemn, anonymous laborer.

Their existing canonical chapter JSON and affected series manifests were updated; the reader gets `js/maui-crossover-personality-corrections.js`, loaded after the five Maui overlays and before `js/app.js`.

## Re-read verification

Each of the five Maui reader scripts was re-fetched from GitHub along with its corresponding 10 canonical JSON chapters. Exact match on **50/50** title, ID, number, complete text and recorded word count. The crossover reader was likewise compared to its three canonical chapters: **3/3 matched**. All six story manifests remain 50 chapters each and reconcile, totaling **449,105** recorded words across **300** chapters.

**Limitations:** These are authored characterization line edits and specific scene corrections on top of the previous full-book film-voice pass, **not** a new from-scratch 79,060-word manuscript. A screen-canon authenticity assessment remains a matter of Jasper's reading judgment. No actual browser, audio, accessibility or professional cultural consultation test is claimed.
