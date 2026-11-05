# Jasper's Fanfiction Spot

This folder contains five complete, linear fanfiction stories for Jasper. The reader presents each story in chapter order and saves reading progress in this browser.

## Stories

- **After Always** — Harry Potter; Severus Snape / Jasper
- **Jasmine After Rain** — Avatar: The Last Airbender; Iroh / Jasper
- **Love & Duty** — Avatar: The Last Airbender; Aang, Katara, Toph / Jasper
- **Stars Between the Strings** — Steven Universe; Greg Universe / Jasper
- **What the Armor Leaves Behind** — Fallout 4; Paladin Danse / Jasper

The collection contains 200 chapters. The stories retain their character work, emotional arcs, romance, and fandom-specific conflict. Romantic moments stay non-graphic and transition naturally when a scene ends in private.

## Reading

Open `index.html`. Choose a story and chapter, then use Previous and Next to read in order. Progress is stored locally on the device.

The offline reader uses `js/fanfic-data.js` and `js/app.js`. Chapter source files remain under `json/<fandom>/<series>/`. The supporting character and setting references are retained as offline reference material; the reader does not generate or branch stories.

## 2026-11-04 interconnected-romance expansion (in progress)

The HTML reader currently contains **six linear, teen-rated stories and 216 actually written chapters**, including one newly authored continuation per series. The 300-chapter goal is **not yet finished**. See `SIX_NOVELS_FIFTY_CHAPTER_ROADMAP.md` for the remaining **84 unwritten** chapters and `LANTERNWEALD_LIVING_WORLD_BIBLE.md` for deeper geography, civic history, customs, and crossover rules.

Jasper explicitly tells Maui, Iroh, Aang, Katara, Toph, Danse, Severus, and Greg that they are ethically non-monogamous and prefer polyamory before each romance's first kiss. These scenes are source-edited in individual chapter JSON and mirrored into the fully offline `js/lanternweald-relationship-scenes.js` reader patch. New prose chapters appear in `js/lanternweald-new-chapters.js`, loaded after the original offline data. Open `index.html` directly; no web server or generator is required. All intimate material remains non-graphic.
