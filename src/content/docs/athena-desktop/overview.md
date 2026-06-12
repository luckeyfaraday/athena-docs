---
title: Athena Desktop
description: A local desktop command room for AI coding agents, session recall, and project handoffs.
---

**Athena Desktop** is a local desktop workspace for orchestrating AI coding agents with shared project context. It gives you one Electron app for launching Codex, OpenCode, Claude Code, Athena Code, Hermes, and shell sessions; inspecting live terminal output and native session history; generating project handoffs; and keeping short-lived recall context available to the next agent.

In short: an **AI coding agent workspace**, **multi-agent desktop app**, **embedded terminal control room**, **Hermes MCP bridge**, and **session recall manager** for local software development.

:::note[Repository]
[github.com/luckeyfaraday/Athena](https://github.com/luckeyfaraday/Athena) — Linux, Windows, and macOS.
:::

## Quick facts

| Area | Details |
|---|---|
| App type | Local desktop app for AI coding agent orchestration |
| Frontend | Electron, React, Vite, TypeScript |
| Terminal stack | `node-pty` + `xterm.js` embedded PTYs |
| Backend | FastAPI Python service launched by Electron |
| Agent support | Codex, OpenCode, Claude Code, Athena Code, Hermes, shell |
| Context system | Hermes memory, project-local recall, session handoffs |
| MCP support | `mcp_server/` exposes Athena tools to Hermes |
| Primary workflow | Launch or resume agents, inspect sessions, create handoffs, start fresh with recall |

## What Athena Desktop solves

AI coding tools often run as isolated terminals, each with its own context window and history. Athena turns those separate agent sessions into one local command room:

- Start shell, Hermes, Codex, OpenCode, and Claude sessions from one UI.
- Resume native agent sessions already stored on disk.
- Inspect live terminal buffers, native transcripts, and provider metadata.
- Generate bounded handoffs from useful session evidence.
- Save handoffs into project-local recall for the next fresh agent.
- Let Hermes use MCP tools to inspect sessions, write recall, and spawn visible Athena terminals.

Athena is not only a terminal emulator, memory store, or MCP server. It is a local orchestration surface for repeated, session-first AI development work.

## Core features

### Agent session management

- Launch embedded shell, Hermes, Codex, OpenCode, Claude, and Athena Code panes — individually or as grids for parallel work.
- Resume native Codex, OpenCode, Claude Code, and Hermes sessions already on disk.
- Track running embedded PTYs and historical native sessions in the Command Room, grouped by provider.
- Inspect live buffers, native transcripts, prompt paths, model metadata, branch metadata, and provider session IDs.

### Shared project context and recall

- Refresh Hermes recall before agent launch when recall is missing or stale.
- Write project-local recall to `.context-workspace/hermes/session-recall.md`.
- Generate bounded Athena Session Handoffs from selected sessions, with terminal UI noise filtered out.
- Save handoffs to recall and launch a fresh agent from that handoff.
- Track recall audit metadata: source, source count, source titles, byte size, refresh time, and whether recall was used by a launch.

### Hermes MCP integration

- Expose Athena health, memory, recall, native sessions, transcripts, and terminal spawning through MCP.
- Let Hermes spawn visible Athena terminals through Electron control.
- Keep Hermes as the owner of long-term memory and higher-level recall decisions.

### Local desktop workflow

- Workspace tabs isolate active projects.
- Electron starts and monitors the FastAPI backend.
- Settings shows backend, Hermes, adapter, and recall status, and includes a Hermes installer and MCP connect helper.
- Memory Room inspects project memory and can delete exact Hermes memory entries.
- Review Room focuses on deciding which session output is worth keeping.

## Use cases

- Run several AI coding agents against one local project.
- Resume prior Codex, OpenCode, Claude Code, or Hermes work.
- Review what an agent did before deciding what context to keep.
- Start a new agent with a curated handoff instead of a full noisy transcript.
- Let Hermes control visible Athena terminals through MCP.
- Keep project-local recall separate across workspaces.

## Next steps

- [Getting Started](/athena-desktop/getting-started/) — install and run the app.
- [Sessions & Handoffs](/athena-desktop/sessions-and-handoffs/) — the core workflow.
- [Hermes & the MCP Bridge](/athena-desktop/hermes-mcp-bridge/) — connect long-term memory.
