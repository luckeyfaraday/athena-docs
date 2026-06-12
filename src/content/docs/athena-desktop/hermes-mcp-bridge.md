---
title: Hermes & the MCP Bridge
description: Connect Hermes to Athena Desktop for shared memory, and let Hermes drive the workspace through MCP.
---

Hermes is the long-term memory agent in the Athena stack. The integration runs in both directions:

- The bundled coding-agent **skills** let Codex, Claude Code, and OpenCode *ask* Hermes through Athena.
- The **MCP bridge** lets Hermes *drive* Athena — spawn terminals, read sessions, write recall.

## Connecting Hermes

"Connecting Hermes" is two independent steps. The **Settings → Hermes** card in the desktop app shows the current state of both and provides actions where it can.

1. **Install the Hermes Agent CLI.** On Linux/WSL with `bash` and `curl`, the Hermes card shows an **Install Hermes** button wired to `POST /hermes/install`. On native Windows, install the native Hermes build separately and make sure `hermes` is on your `PATH`. Athena detects Hermes through `shutil.which("hermes")` plus `~/.hermes`.

2. **Point Hermes at the Athena MCP bridge.** Add the bridge block to your Hermes config (`~/.hermes/config.yaml`). The Hermes card has a **Connect Hermes to Athena** helper with a copyable snippet; full details below.

## Hermes memory

The backend uses `HermesManager` and `HermesMemoryStore` to find Hermes status and read/write memory. The memory query endpoint returns plain text so CLI agents can consume it easily with tools like `curl`:

```text
GET /memory/hermes?q=<query>
```

## Asking Hermes

When the user says `ask hermes ...`, the agent routes the question through Athena instead of shelling out to the `hermes` binary directly:

1. If the Athena MCP tools are loaded, it calls `context_workspace_ask_hermes(workspace, question)`.
2. Otherwise, if `CONTEXT_WORKSPACE_BACKEND_URL` is set, it POSTs to `/hermes/ask` with `{ project_dir, question }`.

Both paths reach the local Athena backend, which runs Hermes once with the project as context and returns the answer. Routing through the backend keeps logging, project scoping, and recall consistent across agents.

## The MCP bridge

Athena includes an MCP server under `mcp_server/` so Hermes can call into the running desktop workspace. This bridge is designed for Hermes running in WSL while Athena runs on Windows, but the same concepts apply to local desktop usage.

Install the MCP server dependencies into the Python environment Hermes will use:

```bash
pip install -r /mnt/c/Users/you/context-workspace/mcp_server/requirements.txt
```

Add the bridge to the Hermes config at `~/.hermes/config.yaml`:

```yaml
mcp_servers:
  context_workspace:
    command: "python"
    args:
      - "/mnt/c/Users/you/context-workspace/mcp_server/server.py"
    timeout: 120
    connect_timeout: 30
    env:
      CONTEXT_WORKSPACE_BACKEND_STATE: "/mnt/c/Users/you/.context-workspace/backend.json"
```

If Hermes uses its own virtual environment, set `command` to that interpreter.

### Backend discovery

The Electron app writes backend discovery state to `~/.context-workspace/backend.json` (on Windows: `C:\Users\you\.context-workspace\backend.json`, visible from WSL at `/mnt/c/Users/you/.context-workspace/backend.json`).

Start the Athena desktop app before starting Hermes so the backend state file exists. If you run the backend directly on a fixed port, use `CONTEXT_WORKSPACE_BACKEND_URL` instead:

```yaml
env:
  CONTEXT_WORKSPACE_BACKEND_URL: "http://127.0.0.1:8000"
```

### Electron control and security

Visible terminal tools require the Electron app itself, not only the FastAPI backend. Electron writes control discovery state to `~/.context-workspace/electron-control.json`.

The Electron control server requires a per-launch secret token for every endpoint except `/health`. The desktop app generates the token at startup and writes it into `electron-control.json` (created with `0600` permissions). The MCP bridge reads the token automatically and sends it as a `Bearer` token, so no manual configuration is needed in the normal flow. If you override discovery with `CONTEXT_WORKSPACE_ELECTRON_CONTROL_URL`, also set `CONTEXT_WORKSPACE_ELECTRON_CONTROL_TOKEN`.

The token, loopback-only `Host` enforcement, and rejection of cross-origin requests together prevent other local processes and malicious web pages from driving the control server.

### Recall refresh

When Electron starts the backend, it configures a default recall refresh command (`python scripts/hermes-refresh-recall.py`), overridable with `CONTEXT_WORKSPACE_HERMES_REFRESH_CMD`. The default script writes a short project-local recall cache and uses native session discovery as fallback context.

If the same projects live under different usernames on different machines (e.g. `C:\Users\alanq\...` on Windows and `/home/alan/...` on Linux), set `CONTEXT_WORKSPACE_HOME_ALIASES` to the extra usernames (comma-separated) so project-scoped memory matching recognizes both home paths.

## MCP tools

The bridge exposes tools for health checks, memory reads/writes, native agent session discovery, visible terminal spawning, legacy run management, artifact and transcript reads, and recall cache management:

```text
context_workspace_list_agent_sessions(project_dir, provider?, query?, limit?)
context_workspace_summarize_agent_sessions(project_dir, provider?, query?, limit?)
context_workspace_open_workspace(project_dir, select?)
context_workspace_spawn_agent(project_dir, task, agent_type?, visible_terminal?, open_workspace?)
context_workspace_spawn_terminal(project_dir, kind?, count?, title?, resume_session_id?, session_label?, open_workspace?)
context_workspace_kill_terminal(target)
context_workspace_close_workspace(project_dir)
context_workspace_read_agent_session(provider, session_id, max_bytes?, tail?)
context_workspace_write_recall_cache(project_dir, markdown)
context_workspace_read_recall_cache(project_dir)
context_workspace_clear_recall_cache(project_dir)
```

Use `context_workspace_spawn_agent` for user-requested Codex, OpenCode, or Claude work — it opens a visible Command Room PTY by default, so Athena must be running. Use `context_workspace_spawn_terminal` for lower-level terminal control such as shells, grids, Hermes panes, or explicit resumes.

### Recommended recall workflow

1. Hermes runs its own `session_search`.
2. Hermes calls `context_workspace_summarize_agent_sessions` when it needs native session history for the selected workspace.
3. Hermes summarizes the relevant prior-session context.
4. Hermes calls `context_workspace_write_recall_cache(project_dir, markdown)`.
5. Future Athena agent launches include that cache in the generated prompt context.

:::caution
Do not use the FastAPI backend `POST /agents/spawn` route for OpenCode or Claude visible terminals — that is the legacy run/artifact path. If visible spawning fails with an Electron control error, check `~/.context-workspace/electron-control.json` and restart the Athena desktop app.
:::

Athena owns these app-side tools. Hermes still owns its own config, `session_search`, long-term memory writes, and the decision about when to refresh or clear recall.
