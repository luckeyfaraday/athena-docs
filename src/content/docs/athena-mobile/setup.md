---
title: Setup & Deployment
description: Run Athena Mobile in development and deploy it as a private PWA over Tailscale.
---

## Development

```bash
npm install
npm run dev
```

Default local URL:

```text
http://127.0.0.1:5174
```

For a phone on the same Tailscale network, run:

```bash
npm run dev:tailscale
```

This binds the dev server to the laptop's Tailscale IP only. Then open the laptop's Tailscale URL on the phone, for example:

```text
http://100.124.147.99:5174
```

To bind a different address, set `ATHENA_HOST` — an explicit IP, or `0.0.0.0` to deliberately expose every interface:

```bash
ATHENA_HOST=0.0.0.0 npm run dev
```

## Configuration

Copy `.env.example` to `.env.local`:

```bash
VITE_ATHENA_MODE=live
VITE_ATHENA_BACKEND_URL=
VITE_ATHENA_CONTROL_URL=
VITE_ATHENA_PROJECT_DIR=
VITE_ATHENA_TOKEN=
```

- `VITE_ATHENA_MODE`: `demo` for local fixture mode, `live` to call the configured Athena services.
- In live mode, blank URLs use the same-origin Vite proxy, which reads Athena's discovery files (`~/.context-workspace/backend.json` and `electron-control.json`).
- Set `VITE_ATHENA_PROJECT_DIR` to the local Athena workspace path used for session history and new terminal launches before the app has discovered active workspaces.

## Production deployment (private PWA)

Build the static app, then run the production server:

```bash
npm run build
npm start
```

The production server listens on `127.0.0.1:4174` by default. It serves `dist/` and mounts the same local endpoints used in development:

- `/athena-backend` proxies to Athena backend discovery from `~/.context-workspace/backend.json`.
- `/athena-control` proxies to Electron control discovery from `~/.context-workspace/electron-control.json`.
- `/athena-push` handles Web Push enrollment and notifications.

Expose it privately with Tailscale HTTPS:

```bash
tailscale serve --bg https / http://127.0.0.1:4174
```

Then open the Tailscale HTTPS URL on the phone and add Athena Mobile to the home screen.

:::note
HTTPS is required for Web Push notifications.
:::

Useful production overrides:

```bash
PORT=4174 npm start
ATHENA_HOST=tailscale npm start
ATHENA_BACKEND_TARGET=http://127.0.0.1:8000 npm start
ATHENA_CONTROL_TARGET=http://127.0.0.1:9000 npm start
```
