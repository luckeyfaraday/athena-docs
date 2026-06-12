---
title: Getting Started
description: Install and run the Athena Desktop app.
---

## Requirements

- Node.js and npm
- Python 3.11+ recommended, with `pip`
- Optional agent CLIs: `codex`, `opencode`, `claude`, `hermes`, `athena-code`
- Optional Hermes Agent install for real shared memory integration

The desktop app can open without every agent CLI installed. Missing adapters appear as unavailable, and related launch commands may fail inside the terminal until the CLI is installed and available on `PATH`.

## Quick start

```bash
git clone https://github.com/luckeyfaraday/Athena.git
cd Athena/client
npm install
npm run dev
```

`npm run dev` does four things:

1. Builds the Electron TypeScript entry points.
2. Starts Vite on `127.0.0.1`.
3. Launches Electron.
4. Electron starts the FastAPI backend on a free localhost port.

## Full setup (backend + tests)

Install the client dependencies:

```bash
cd client
npm install
```

Install backend dependencies from the repository root:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
pip install pytest   # for the test suite
```

If your preferred Python is not `python3`, point Electron at it:

```bash
export CONTEXT_WORKSPACE_PYTHON=/absolute/path/to/python
```

## Production builds

```bash
cd client
npm run build      # production build
npm run dist       # build an AppImage on Linux
npm start          # launch a previously built Electron app
```

## Running the backend directly

From the repository root:

```bash
python3 -m uvicorn backend.app:app --host 127.0.0.1 --port 8000
```

Useful endpoints:

```text
GET  /health
GET  /hermes/status
GET  /hermes/recall/status
POST /hermes/recall/refresh
POST /hermes/recall/write
POST /hermes/recall/mark-used
GET  /memory/hermes?q=<query>
GET  /memory/recent?limit=10
POST /memory/store
POST /memory/delete
GET  /agents/adapters
GET  /agents/sessions
GET  /agents/sessions/{provider}/{session_id}/transcript
POST /agents/spawn
GET  /agents/runs
```

## Testing

Run the backend test suite from the repository root, and the client build check from `client/`:

```bash
pytest
cd client && npm run build
```

The tests use fake CLI agent fixtures, so execution flow can be verified without hosted models or external agent tools.
