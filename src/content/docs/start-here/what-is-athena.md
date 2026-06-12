---
title: What is Athena?
description: An introduction to Athena, the local-first ecosystem for working with AI coding agents.
---

Athena is a **local-first ecosystem for working with AI coding agents**, built by LuckeySystems. It solves a problem every developer who works with multiple AI tools knows well: coding agents run as isolated terminals, each with its own context window and its own history. What one agent learned, the next one has to rediscover.

Athena turns those separate agent sessions into **one local command room with shared project context**:

- Start shell, Hermes, Codex, OpenCode, Claude Code, and Athena Code sessions from one UI.
- Resume native agent sessions already stored on disk.
- Inspect live terminal buffers, native transcripts, and provider metadata.
- Generate bounded handoffs from useful session evidence, so a fresh agent starts with curated context instead of a noisy transcript.
- Keep durable memory and project-local recall available to whichever agent runs next.

## Local-first by design

Everything in the Athena ecosystem runs on your machine. Memory, recall caches, session indexes, and even speech-to-text stay in local files by default. Your model requests go to whichever AI provider you configure — but the orchestration layer, the memory layer, and the history layer are yours.

## The four tools

| Tool | What it is |
|---|---|
| **[Athena Desktop](/athena-desktop/overview/)** | The command room. An Electron + React desktop app with a FastAPI backend that launches and manages agent sessions, generates handoffs, and bridges Hermes via MCP. |
| **[Athena Code](/athena-code/overview/)** | A terminal AI coding agent (memory-focused OpenCode fork) with persistent local memory, automatic recall, and cross-session search. |
| **[Athena Mobile](/athena-mobile/overview/)** | A PWA companion that reaches your Athena workspace from your phone over a private Tailscale network. |
| **[Athena Whisper](/athena-whisper/overview/)** | A local desktop dictation widget — speak, transcribe locally with `faster-whisper`, and have the text typed into any focused app. |

## Where to start

If you're new to the ecosystem, start with **Athena Desktop** — it's the hub everything else plugs into. Head to the [Getting Started guide](/athena-desktop/getting-started/), or read [The Ecosystem](/start-here/ecosystem/) first to see how the pieces fit together.
