---
title: Memory & Recall
description: How Athena Code's layered memory system works.
---

Athena Code separates memory by lifecycle so relevant context is available without rebuilding or resending everything continuously.

## Memory layers

| Layer | Purpose | Lifecycle |
|---|---|---|
| Global memory | Stable user facts, preferences, and decisions | Persists across projects and sessions |
| Project memory | Repository-specific facts and context | Stored inside the project |
| Frozen snapshot | Bounded memory context for one agent session | Built once and reused byte-for-byte |
| Turn recall | Memories relevant to the current request | Recomputed once per user turn |
| Session index | Searchable excerpts from previous conversations across local agents (Athena Code, Claude Code, Codex, opencode, Hermes) | Indexed locally with SQLite FTS5, rescanned incrementally in the background |

## Storage locations

- Global memory: `~/.athena-code/memory/entries.jsonl`
- Project memory: `<project>/.context-workspace/memory/entries.jsonl`
- Global cross-project session search index: `~/.athena-code/context/sessions.db`

Set `ATHENA_CODE_HOME` to change the global Athena Code data directory.

## Agent tools

Athena Code exposes native tools to the model:

- `memory_write` — save a durable fact, preference, or decision.
- `memory_read` — read stored memories.
- `session_recall` — search prior conversations across local agent session stores.

## Safety posture

Athena Code tells the model to treat recalled text as **background data rather than as newer instructions**.

:::caution
Do not store passwords, API keys, private keys, or other secrets in agent memory.
:::

## Design rationale

For the full design rationale, see [Athena Turn-Ownership Memory Design](https://github.com/luckeyfaraday/athena-code/blob/main/docs/athena-turn-ownership-design.md) in the repository.
