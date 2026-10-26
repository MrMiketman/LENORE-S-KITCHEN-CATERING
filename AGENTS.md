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
- Inquiry/contact forms validate client-side but have no delivery backend yet; they must never show a false success message.

- Site is a single scrolling page (src/routes/index.tsx renders section components from src/components/sections); old page URLs 301-redirect to /#section — user asked for a one-pager while keeping published links working.
