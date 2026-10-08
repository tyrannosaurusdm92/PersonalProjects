# William Saville — The Transgender T-Rex

This is the website for William Saville, including the interactive Solar System and Constellations pages for Aza’ra.

## Where the files go

Keep `william.html` beside the `hub` directory. Upload both, preserving their names and folders.

```text
william.html
hub/
  css/
  script/
    js/
    views/
    wasm/
  json/
  docs/
  assets/
    images/
      site/
      azara/
```

The existing `william.html` page is the entry point; it references the images, styles, sky maps, and scripts inside `hub` using relative paths. Do not upload it without `hub`.

## Visiting the site

The site is prepared for the public address `https://thetransgendertrex.com/`. Your hosting service must serve `william.html` as the *home page* for `/` without sending the visitor to a different URL.

The existing Google Apps Script service already recognizes the domain and can redirect visitors to its GitHub-hosted fallback. That redirect **does not** preserve the domain in the address bar. The backend itself has not been changed, and the website deliberately includes no backend endpoint, credentials, or Apps Script files.

If your hosting provider supports a **rewrite**, set `/` to serve `/william.html` internally (not a 301/302 redirect). If you use GitHub Pages as the home-page host, the publication source needs an `index.html` at its root; at deployment time you can publish a copy of `william.html` as `index.html`, alongside the same `hub` folder. The requested ZIP keeps only `william.html` at the top level.

The domain's DNS, HTTPS, and any GitHub Pages custom-domain setting must point to that host. This package does not perform those external changes. Do not edit your Google Apps Script backend for this.

## Aza’ra navigation and publishing

Solar System and Constellations are public by default in Aza’ra’s navigation, and their interactive viewers work directly at `william.html#azara-solar-system` and `william.html#azara-constellations`. Visitors do not need `#admin` or a publication step, even if their browser remembers an older unpublished flag. Language Building remains blank and hidden until separately published.

The optional `william.html#admin` editor still supports supplemental page text, draft saving and exporting the updated HTML. Use **Save Updated HTML**, then replace the deployed `william.html` (and the deployed `index.html` copy, if applicable). Keep the `hub` directory with it.

Saving a draft in this static page is local to the browser/device; it is not synced to a backend. The `#admin` editor is not an authenticated management system. Unpublished standalone viewer files remain accessible to people who know their URLs; hiding navigation does not protect private material. Do not put private drafts or secrets in files on a public host.

## Visuals

Images formerly embedded inside HTML, CSS, and the astronomy texture script are preserved in `hub/assets/images`. The views use the identical image bytes through relative URLs. There is no additional generated artwork. The original turbulence WebAssembly module is also mirrored in `hub/script/wasm/azara-turbulence.wasm`, while the existing JavaScript retains its embedded fallback for offline use.

## Documentation

- `manifest.json` inventories the included files, sources, and SHA-256 hashes.
- `repositories-used.md` records source provenance.
- `preservation-check.md` gives comparison results against the original files.
- `asset-manifest.json` lists extracted image assets.
