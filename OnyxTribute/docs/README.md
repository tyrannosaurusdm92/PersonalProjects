# Lord Onyx Blepman — Memorial Tribute

This is the completed replacement for the pre-existing `OnyxTribute/tribute.html` placeholder, inspired by the `MomBirthday` presentation, not a copy of it.

- Name: Lord Onyx Blepman, Emperor of the Voidattude
- Adopted: February 13, 2016
- Passed: November 10, 2026
- Length: 13:37 (816.718 seconds; matched to MomBirthday)
- Music: **only** `audio/Betty_Noyes_-_Baby_Mine_Radio_Edit_320Kb_(mp3.pm).mp3`, which already existed and was not changed.
- Music repetition: The original clip plays at its *natural speed*, with continuous repetition sufficient for the 13:37 presentation. Since the clip is shorter than one third of the birthday tribute, fitting the full 13:37 requires more than three complete plays. No other song or audio is introduced. Shortening to exactly three plays would shorten the montage substantially.

## Photographs and audit

The photo manifest lists each approved source filename. Photos are drawn **only from the user's linked Google Drive**; `Background Images/Onyx_01–20.webp` and verified photographs from `Media/Images/Onyx`. Each selected image was visually screened; ambiguous images containing a visible unidentified person were excluded rather than guessing who they were. The selected photos depict Onyx and no other cats or standalone people. Images with other cats or solo-person photos are not allowed. `photo-manifest.json` lists the exact source and a hash of each optimized image. Files were resized, oriented correctly and stripped of EXIF metadata for a privacy-respecting web presentation.

## Birds

`assets/images/birds/*.png` includes exactly the **seven animated bird sprite sheets extracted from the user-provided `game (2)(1).html`**: bluejay, cardinal, dove, finch, hummingbird, robin and sparrow. Their exact original sprite-sheet artwork is preserved; the game world, menus, scenery, other characters, game engine, and mechanics were not carried over. `js/birds.js` animates flight and wing flaps independently of the original game.

## Poetry

The two full poems are supplied verbatim in `json/poems.json` and `js/data.js`, split into four-line reading cards for accessible pacing. Their full source text is preserved. Photos continue to dissolve behind the reading cards. Intro and closing dedication are new to Onyx.

## Running

Serve the project directory as static files or load `tribute.html` directly. The repository's pre-existing `audio` folder must remain alongside it; the downloaded ZIP also supports streaming **that same unchanged audio recording from the original GitHub repository** if opened without a local audio folder and the network is available. Press **Remember Onyx** for the required browser audio gesture. There are play/pause, seek, ±10 seconds, mute, fullscreen, keyboard shortcuts, and a replay button.

## Accessibility

Text is real selectable HTML rather than overlaid bitmap text. Motion honors `prefers-reduced-motion` for background animations and decorative birds. Playback pauses when the tab becomes hidden. All controls are keyboard-focusable, and no third-party tracking scripts are included.
