# Birthday montage audit

- Entry point: `birthday.html` (the only HTML file).
- Photos: 177 unique local photographs; displayed exactly once per complete watch, in a newly shuffled order at each start/replay.
- On-screen photo identifications: none.
- Music: three playable MP3 segments split from a continuous pre-rendered Pachelbel → Beethoven → Debussy mix.
- Actual soundtrack duration: 816.718367 seconds, measured with FFprobe.
- Crossfade 1: 4.5 seconds from Canon in D to Für Elise, equal-power-inspired sine curves.
- Crossfade 2: 4.8 seconds from Für Elise to Clair de Lune, same curves.
- The original audio files begin with several seconds of silence; the supplied Canon and Für Elise recordings were trimmed at 5.45 and 4.9 seconds, respectively, before mixing.
- Audio source controls: three audio elements with overlapping, time-aligned handoffs at 367.3371s and 532.8859s.
- Photos: decoded before fading in where browser supports `HTMLImageElement.decode()`. Full photos are displayed with `object-fit: contain` and a dim blurred background fill.
- Photo dissolve: 1.45 seconds with an independent aurora wash.
- Atmospheric layers: main moving aurora canvas, transparent animated edge curtains, slowly drifting petals, diffuse dust, vector bouquets.
- CSS/JS: no external libraries, no external HTTP requests.
- Palette and reference repositories: used as design inspiration without copying their source code.
- Accessibility: keyboard commands, focus styling, generic photograph descriptions, reduced-motion support.
- Known limitations: browser autoplay requires pressing Begin; large photographs and long MP3 may need a moment to load on slow devices; recording rights are unchanged.

### GitHub audio split

The single 26 MB mix was replaced with three individually uploadable MP3 files. Timeline and visual assets are unchanged. The crossfades are preserved from the mixed source, with short matching overlaps between segments to permit continuous playback.

- GitHub filenames matched: `Pachelbel - Canon.mp3`, `Beethoven - Für Elise.mp3`, `clair-de-lune-debussy.mp3`. The 2-byte GitHub placeholders must be replaced to supply playable audio.
