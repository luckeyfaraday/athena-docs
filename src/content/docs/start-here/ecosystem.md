---
title: The Ecosystem
description: How Athena Desktop, Athena Code, Athena Mobile, and Athena Whisper fit together.
---

The Athena ecosystem is built around one idea: **the context an agent produces should outlive the session that produced it.** Each tool plays a distinct role around that idea.

## How the pieces fit together

```text
                        ┌──────────────────┐
   your phone ──────────│  Athena Mobile   │ (PWA over Tailscale)
                        └────────┬─────────┘
                                 │
                        ┌────────▼─────────┐
   your voice ──────────│  Athena Desktop  │── the command room
   (Athena Whisper)     │  Electron + React│   embedded PTY terminals,
                        │  FastAPI backend │   session recall, handoffs,
                        └────────┬─────────┘   Hermes MCP bridge
                                 │
              ┌──────────┬───────┴───────┬───────────┐
              ▼          ▼               ▼           ▼
        Athena Code    Codex        Claude Code   OpenCode
        (memory-first   ...any agent CLI on your PATH...
         coding agent)
```

- **Athena Desktop** is the hub. It launches and resumes agent sessions, captures what they did, distills it into bounded handoffs, and keeps project-local recall available to the next agent. It also exposes an MCP bridge so Hermes can drive the workspace itself.
- **Athena Code** is the ecosystem's own coding agent. It runs standalone in any terminal, but inside Athena Desktop it's launched like any other agent pane — and it carries its own persistent memory and cross-session search wherever it runs.
- **Athena Mobile** gives you a window into the same workspace from your phone — session history, terminal launches, and push notifications — without exposing anything to the public internet (it binds to your Tailscale network only).
- **Athena Whisper** feeds the whole thing with your voice. It transcribes locally and types the result into whatever has focus: an Athena terminal pane, a coding agent TUI, a browser, anything.

## Shared concepts

A few concepts show up across the ecosystem:

### Memory and recall

Durable knowledge lives in **memory** (long-term facts, preferences, decisions). When a session starts, the relevant slice of memory becomes **recall** — a bounded, project-local cache the agent reads as background context. Athena Desktop writes recall to `<project>/.context-workspace/hermes/session-recall.md`; Athena Code keeps its own layered memory under `~/.athena-code/` and `<project>/.context-workspace/memory/`.

### Session handoffs

Instead of pasting a full noisy transcript into a new agent, Athena generates a **Session Handoff**: a bounded markdown summary extracted from selected sessions, with terminal UI noise filtered out. Save it to recall, then launch a fresh agent that starts informed.

### Hermes

Hermes is the long-term memory agent in the stack. Athena Desktop integrates with it in both directions: coding agents can *ask* Hermes questions through Athena's backend, and Hermes can *drive* Athena (spawn terminals, read sessions, write recall) through the [MCP bridge](/athena-desktop/hermes-mcp-bridge/).

## Repositories

All projects are open source under [github.com/luckeyfaraday](https://github.com/luckeyfaraday):

| Project | Repository |
|---|---|
| Athena Desktop | [luckeyfaraday/Athena](https://github.com/luckeyfaraday/Athena) |
| Athena Code | [luckeyfaraday/athena-code](https://github.com/luckeyfaraday/athena-code) |
| Athena Mobile | [luckeyfaraday/athena-mobile](https://github.com/luckeyfaraday/athena-mobile) |
| Athena Whisper | [luckeyfaraday/athena-whisper](https://github.com/luckeyfaraday/athena-whisper) |
