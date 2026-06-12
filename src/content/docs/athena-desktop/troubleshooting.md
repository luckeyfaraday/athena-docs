---
title: Troubleshooting
description: Common issues when running Athena Desktop and how to fix them.
---

## Backend does not start

Check that backend dependencies are installed and that Electron is using the expected Python:

```bash
export CONTEXT_WORKSPACE_PYTHON=/path/to/python
```

Then restart the desktop app.

## Agent command is unavailable

Install the relevant CLI and make sure it is on `PATH` for the Electron process:

```bash
which codex
which opencode
which claude
which hermes
```

## Multiple Athena windows show stale UI

Quit all running Athena/AppImage instances before testing a newly built AppImage. Linux AppImages mount into `/tmp/.mount_ATHENA...`, so an older running instance can make it look like a rebuild did not change the UI.

## Embedded shell prints an `nvm` warning

If the app is launched through `npm run dev`, the embedded shell may inherit npm environment variables. With `nvm`, this can produce:

```text
nvm is not compatible with the "npm_config_prefix" environment variable
```

This comes from shell startup, not the terminal renderer. A narrow fix is to sanitize `npm_config_prefix` from the PTY environment before spawning embedded terminals.

## Port conflicts

Electron asks the OS for a free backend port. Vite uses `127.0.0.1:5173` during development.

## Visible terminal spawning fails over MCP

Visible terminal tools require the Electron app itself, not only the FastAPI backend. Check `~/.context-workspace/electron-control.json` and restart the Athena desktop app. See [Hermes & the MCP Bridge](/athena-desktop/hermes-mcp-bridge/) for details.
