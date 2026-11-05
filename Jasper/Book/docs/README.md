# Jasper's Fanfiction Spot

This folder contains six interconnected, linear fanfiction stories for Jasper. Expansion toward 50 chapters each remains in progress. The reader presents each story in chapter order and saves reading progress in this browser.

## Stories

- **The Shore I Choose** — Maui / Jasper; the Tideglass story that begins the shared world

- **After Always** — Harry Potter; Severus Snape / Jasper
- **Jasmine After Rain** — Avatar: The Last Airbender; Iroh / Jasper
- **Love & Duty** — Avatar: The Last Airbender; Aang, Katara, Toph / Jasper
- **Stars Between the Strings** — Steven Universe; Greg Universe / Jasper
- **What the Armor Leaves Behind** — Fallout 4; Paladin Danse / Jasper

The collection currently contains 228 written chapters. The stories retain their character work, emotional arcs, romance, and fandom-specific conflict. Romantic moments stay non-graphic and transition naturally when a scene ends in private.

## Reading

Open `index.html`. Choose a story and chapter, then use Previous and Next to read in order. Progress is stored locally on the device.

The offline reader uses `js/fanfic-data.js`, the three continuation/relationship overlays, `js/app.js`, and `js/floating-book.js`. Chapter source files remain under `json/<fandom>/<series>/`. The supporting character and setting references are retained as offline reference material; the reader does not generate or branch stories.

## 2026-11-04 interconnected-romance expansion (in progress)

The HTML reader currently contains **six linear, teen-rated stories and 228 actually written chapters**, including three new continuation chapters per series since the original migration. The 300-chapter goal is **not yet finished**. See `SIX_NOVELS_FIFTY_CHAPTER_ROADMAP.md` for the remaining **72 unwritten** chapters and `LANTERNWEALD_LIVING_WORLD_BIBLE.md` for deeper geography, civic history, customs, and crossover rules.

Jasper explicitly tells Maui, Iroh, Aang, Katara, Toph, Danse, Severus, and Greg that they are ethically non-monogamous and prefer polyamory before each romance's first kiss. These scenes are source-edited in individual chapter JSON and mirrored into the fully offline `js/lanternweald-relationship-scenes.js` reader patch. New prose chapters appear in `js/lanternweald-new-chapters.js`, loaded after the original offline data. Open `index.html` directly; no web server or generator is required. All intimate material remains non-graphic.

## 2026-11-04 second expansion and restored book gateway

This pass wrote another **12 chapters**: Maui 12–13 and chapters 42–43 of each of the other five novels. Story totals are now Maui **13** and five other novels **43 each**, or **228 actually written chapters**. The remaining **72** chapters are plotted but not prose and are not selectable in the reader. The source JSON chapter manifests and `json/fandoms.json` reflect these counts. The new offline overlay is `js/lanternweald-continuations-pass2.js`.

The opening screen again shows a **floating interactive 3D book**, based on the existing `assets/book-cover.png`. Click or keyboard-activate the cover to enter the library; use the Back to book cover control to see it again. Hover/pointer motion subtly tilts the book, and the animation respects reduced-motion preferences. Page flipping remains deliberately absent. With JavaScript unavailable, the plain reader is left accessible instead of being concealed behind an inert book.

This pass also expanded the lore of privacy-respecting departures, the seventh scratch/old drains, the archive's approach to historical accountability, interworld repairs, the Lanternweald's practical economic limitations and how shared meals avoid presuming relationships. See `docs/LANTERNWEALD_PASS2_CONTINUITY.md`.
