---
title: Athena Code
description: An open-source terminal AI coding agent with persistent memory, automatic context recall, and searchable history.
---

**Athena Code** is an open-source terminal AI coding agent with persistent memory, automatic context recall, and searchable history across coding sessions.

It is a memory-focused fork of [OpenCode](https://github.com/anomalyco/opencode). It gives an AI coding agent local, durable memory; freezes relevant context for a session; recalls related facts for each turn; and indexes prior conversations for later search.

:::note[Repository]
[github.com/luckeyfaraday/athena-code](https://github.com/luckeyfaraday/athena-code) — MIT licensed. Native release builds for Linux, macOS, and Windows on x64 and ARM64.
:::

## Why Athena Code?

Most coding agents start each session without durable knowledge of your preferences, architecture decisions, or previous work. Athena Code adds a local-first memory layer directly to the agent loop:

- **Persistent AI memory:** save stable facts, preferences, decisions, and workflow notes for future sessions.
- **Automatic contextual recall:** retrieve relevant memories for the current request without sending the entire memory store on every turn.
- **Cross-session, cross-agent search:** index and search previous conversations with SQLite FTS5 — Athena Code's own, plus local Claude Code, Codex, opencode, and Hermes session stores when present.
- **Frozen session context:** build one deterministic memory snapshot per session and reuse it across tool calls.
- **Native agent tools:** expose `memory_write`, `memory_read`, and `session_recall` to the model.
- **Local-first storage:** memory and recall data stay in local files by default; the memory hot path requires no Athena backend service.
- **Open agent loop:** built on the open-source OpenCode terminal coding agent.

## Platform support

| Platform | Status |
|---|---|
| Linux x64 | Native release build |
| Linux ARM64 | Native release build |
| macOS Apple Silicon | Native release build; unsigned |
| macOS Intel | Native release build; unsigned |
| Windows x64 | Native release build; unsigned |
| Windows ARM64 | Native release build; unsigned |

Unsigned macOS builds may require confirmation in **System Settings → Privacy & Security** on first launch. Windows SmartScreen may also warn about an unrecognized publisher. Code signing and macOS notarization are planned release hardening work.

## FAQ

### Is Athena Code the same as OpenCode?

No. Athena Code is an independent, memory-focused fork built from a pinned OpenCode revision. It retains OpenCode's terminal coding-agent foundation and adds Athena-owned persistent memory, context snapshots, recall, session search, tools, branding, tests, and release packaging.

### Does Athena Code require the Athena desktop application?

No. Athena Code builds and runs as a standalone terminal application. It can also be launched by [Athena Desktop](/athena-desktop/overview/) or another terminal workspace manager.

### Is memory uploaded to a server?

Athena Code's native memory store, snapshots, and session index are local by default. Model requests still go to whichever AI provider you configure through the underlying OpenCode provider system.

### Can Athena Code remember information across repositories?

Yes. Global memories under `~/.athena-code` are available across folders. Project memories and indexed session history remain scoped to their project.

### How is this different from adding instructions to `AGENTS.md`?

`AGENTS.md` is best for repository instructions that should always be loaded. Athena Code memory is designed for durable facts and selective retrieval: relevant entries are recalled for a request while unrelated entries remain out of the prompt.

## License and attribution

Athena Code is available under the MIT License. It is derived from [OpenCode](https://github.com/anomalyco/opencode), which is also MIT licensed. Athena Code is an independent project and is not affiliated with or endorsed by the OpenCode maintainers.
