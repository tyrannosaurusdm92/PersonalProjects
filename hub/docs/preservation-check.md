# Source preservation audit

- Source files: `william(9).html`, `william_azara_integrated(1).zip`, and `Azara_Solar_System_and_Constellations_Natural_Coastlines_Nebulae_v7(3).html`.
- Existing non-Aza’ra page bodies were compared against the supplied `william(9).html` before relocation; all seven matched.
- The merged package preserves the existing profile pages, Aza’ra Project content, published/draft page controls, Solar System, and Constellations modules.
- JavaScript and JSON catalogs were retained, including the original celestial object names and orbital rules.
- Assets were decoded from their embedded base64 representations; the bytes are kept intact. Their code references now use relative file paths.
- The root `william.html` and both viewing pages were rechecked after path changes.
- The original Google Apps Script backend was not modified or bundled. Its source SHA-256 was inspected privately to confirm it remained unchanged, not exported into the web build.
- The source included an embedded WebAssembly turbulence module. Its identical binary has been extracted into `hub/script/wasm/azara-turbulence.wasm`; the JavaScript still retains the original embedded version to preserve offline behavior.
- A custom-domain address-bar result still requires the hosting/DNS setup described in `readme.md`; this static ZIP cannot itself configure that external hosting.
