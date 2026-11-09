# Pass 27 — Character-specific depth and Lanternweald shared-world revision
**Date:** November 8, 2026 · **Target:** `PersonalProjects/main` · **Status:** changes committed in place, not on a new branch.

## What changed, and what did not
Pass 27 revised **24 existing prose chapters**, specifically **6, 20, 33 and 47** in each of six completed fifty-chapter novels. The additional scenes are original authored prose inside the canonical chapter JSON, mirrored into the already-existing offline reader JavaScript. No chapters were deleted, renumbered, replaced with outlines, or shifted to another branch. This adds **6,391 indexed whitespace-counted words** on top of Pass 26; the library now contains **300 written chapters totaling 509,850 indexed words**.

| Novel | Lead focus | New indexed words | Current total |
|---|---|---:|---:|
| Jasmine After Rain | Iroh | 1,108 | 82,679 |
| Love & Duty | Aang / Katara / Toph | 1,046 | 85,682 |
| What the Armor Leaves Behind | Danse | 1,075 | 85,411 |
| After Always | Severus | 893 | 81,287 |
| Stars Between the Strings | Greg | 1,131 | 84,406 |
| The Shore I Choose | Maui | 1,138 | 90,385 |
| **Six total** | **24 newly expanded chapter slots** | **6,391** | **509,850** |

The goal is to equalize scene-level depth over multiple passes, **not to assert that equal word counts prove equal quality**. Existing untouched prose has not undergone a complete fresh line edit or device-level reading test. Earlier Pass 24–26 additions remain intact.

## Manuscript-level character distinctions
- **Iroh** can play a tactical Pai Sho game and laugh about it, adjust shop expenses without shifting costs to staff, accept Mina's authority, and write a measured response to Greg's music invitation. Former-general acuity, tea expertise and Lu Ten's grief are not interchangeable with generic supportive dialogue.
- **Adult Aang, Katara and Toph** have different motives and expressions of intimacy: Aang's offer of a household space carries consequences for everyone; Katara's anger at negligent housing conditions does not dissolve into immediate forgiveness; Toph is a blunt ground-sense teacher who wants her autonomy respected. Pip's priced kite materials show how culture, real craft and public access coexist.
- **Danse** is a trained field commander whose affection sounds like questions about conditions, consent and availability. He recognizes Haylen's technical authority, reckons with his past treatment of synths, and lets adult trainees correct dangerous workshop procedures. Jasper explicitly explains ethical non-monogamy and preference for polyamory during the developing romance.
- **Severus** protects potion evidence and the rights of other witnesses; his first impulse is precise, sarcastic suspicion, not a therapeutic monologue. He negotiates boundaries and time with Jasper without expecting romantic exclusivity or access to private notes.
- **Greg** approaches a relationship through music, cheap coffee, his van and Steven's childhood rather than Iroh-style strategy. He admits a relationship needs communication, not his best performance; he asks Jasper to leave a sweater in his van without implying marriage or possession. Jasper explicitly states their ethical non-monogamy and preference for polyamory early.
- **Maui** remains the loud, vain, funny, capable shapeshifting voyager Disney depicts while respecting Mereana's authority over a cultural performance, Fen's measurements and Sela's damaged crops. He and Greg share a direct music-making scene in The Shore I Choose 33 that makes their voices meaningfully different.

## Character research — eight supporting profiles
The active character index grew from **189** to **197**, adding five profiles grounded in existing original-character source dossiers: **Neri, Orin, Renn, Lio, Halen (Jasmine Steps)**, and three written from manuscript evidence: **Mr. Halen (Ba Sing Se), Inspector Han, Wen Haru**. New source dossiers were also saved for the latter three. The two Halen entries are **not presumed to be one person**. Lio is a **sixteen-year-old minor in the established chapter 19**: no romantic or sensual treatment. Renn's earlier mechanic/shift-leader descriptions versus adult-apprentice presentation in chapter 47 are explicitly flagged as a continuity question, not overwritten by an invented origin.

Existing Iroh, Greg, Maui, Severus, Danse, adult Aang, Katara and Toph dossiers have Pass 27 story-specific voice rules.

Selected franchise research anchors: [Netflix Tudum on Iroh](https://www.netflix.com/tudum/features/avatar-season-2-cast-guide?inapp=true-65), [Disney D23 on animated Maui](https://d23.com/meet-the-characters-of-moana-2/), [Greg Universe supporting-character background (secondary)](https://en.wikipedia.org/wiki/List_of_Steven_Universe_characters). Fanfiction-original names and settings are not presented as licensed canon. No extended dialogue or lyrics were copied.

## Reader and continuity publishing
All six cumulative `js/lanternweald-revisions-pass25-*.js` scripts now contain twelve canonical chapter entries per novel (Pass 24–27). **The stale `series.total_word_count` assignment in those overlays was corrected to the updated per-series total**, instead of only modifying JSON manifests. They remain loaded after the earlier revisions and before `js/app.js`.

The living-world registry and community atlas include revised chapter slots, public-versus-private record boundaries, independent residents, and new optional social activity seeds. A distinct structured JSON reference `json/lanternweald-pass27-living-world-activities.json` separates existing on-page scenes from **unwritten** future play/activity possibilities. This documents lore; it does not claim to implement a live game or browser simulation.

## Narrative and relationship rules
Jasper is an **adult first-person reader insert** and explicitly discloses that they practice **ethical non-monogamy** and **prefer polyamory**. Every partner decides whether and how to participate. No named character is assigned a relationship by default. Show attraction, playful friction, consent, jealousy, repair, tender touch and a genuine fade to black where appropriate, **not explicit sex**. Other people retain jobs, histories and the power to decline Jasper's requests.

## Testing boundary
Source-of-truth checks require 50 chapters and index totals per manuscript, matching reader overlay fields and load order, 197 unique cast profiles and coherent world-reference totals. Real browser/device/accessibility and complete human literary review still require separate execution. Verification outcomes will be recorded below once cross-file source checks are completed.
