# Athena Ecosystem Docs

Documentation site for the Athena ecosystem by LuckeySystems, built with
[Astro Starlight](https://starlight.astro.build).

Covers:

- **Athena Desktop** — the desktop command room for AI coding agents
- **Athena Code** — terminal AI coding agent with persistent memory
- **Athena Mobile** — mobile companion PWA over Tailscale
- **Athena Whisper** — local-first desktop dictation widget

## Commands

All commands are run from this directory (`docs/`):

| Command           | Action                                 |
| :---------------- | :------------------------------------- |
| `npm install`     | Install dependencies                   |
| `npm run dev`     | Start dev server at `localhost:4321`   |
| `npm run build`   | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally   |

## Structure

Content lives in `src/content/docs/` as Markdown/MDX. The sidebar is
configured in `astro.config.mjs`. Page content is sourced from the project
READMEs at [github.com/luckeyfaraday](https://github.com/luckeyfaraday).
