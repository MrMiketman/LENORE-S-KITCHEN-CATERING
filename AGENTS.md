<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Site content (business facts, story, gallery photo URLs) lives in `src/content/*`; pages only render it — keeps verified copy editable in one place.
- Recovered gallery collections preserve source-page order and membership, share asset pointers for repeated originals, and keep uploaded media separate — prevents misplaced photos and accidental video replacement.
- Inquiry/contact forms validate client-side but have no delivery backend yet; they must never show a false success message.
- Browser icons (`public/favicon*`, `public/apple-touch-icon.png`) are a bold, solid-silhouette rendition of the hat-and-rose mark in `src/assets/lkc-rose.png.asset.json` on a charcoal tile — never a separate or invented mark — so the tab icon matches the header logo yet stays legible at 16px.
