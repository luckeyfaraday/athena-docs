---
title: Sessions & Handoffs
description: How embedded agent sessions, context modes, and session handoffs work in Athena Desktop.
---

## How agent sessions work

Athena's primary workflow is embedded, interactive agent sessions. The Electron main process launches terminal panes through `node-pty`, and the React UI renders them with `xterm.js`.

The **New** menu can launch:

- Shell
- Hermes
- Athena Code / Athena Code Grid
- Codex / Codex Grid
- OpenCode / OpenCode Grid
- Claude / Claude Grid

Grids launch several panes of the same agent for parallel work.

### Context modes

Every agent launch starts **Clean** unless an explicit context mode is selected. By default, fresh agent panes start without Athena project context. When an explicit immersive context mode is selected, Athena:

1. Creates an immutable workspace-scoped context bundle.
2. Writes a compact bootstrap prompt that points at the bundle.
3. Starts the selected CLI in an embedded PTY.
4. Tracks the pane as a live session and captures a bounded terminal buffer for review.

Agent panes receive a generated Athena prompt path only for **task**, **curated**, or explicit **immersive** launches. Clean launches receive no prompt path.

### Native session discovery

Athena also discovers native provider sessions already on disk, so previous Codex, OpenCode, Claude Code, and Hermes work can be inspected or resumed from the Sessions tab.

## Session handoffs

Athena Session Handoffs are bounded markdown summaries generated from selected sessions in **Review Room**. They help a new agent start fresh without losing useful project context.

The handoff flow:

1. Select one or more useful live or native sessions.
2. Athena extracts usable evidence and filters terminal UI noise.
3. Review the generated handoff preview.
4. Save the handoff to project-local recall.
5. Start a fresh Codex, OpenCode, or Claude session with that recall attached.

Handoffs do not blindly merge full transcripts. Metadata-only sessions and terminal buffers with no usable task evidence are rejected or clearly marked.

## Agent skills

On every launch, the desktop app installs a bundled agent skill named `athena-context-workspace` into the local skill directories of the supported coding agents:

```text
~/.codex/skills/athena-context-workspace
~/.claude/skills/athena-context-workspace
~/.config/opencode/skills/athena-context-workspace
```

Athena tracks what it installed in `~/.context-workspace/agent-skills.json`, so updates are applied cleanly and directories with your own edits are never overwritten.

This skill teaches Codex, Claude Code, and OpenCode how to behave inside an Athena workspace, including how to route **`ask hermes`** requests through the Athena backend (see [Hermes & the MCP Bridge](/athena-desktop/hermes-mcp-bridge/)).

## Legacy backend runs

The backend still includes an older one-shot run registry and Codex adapter. This path receives an agent spawn request, creates a run record, writes bounded artifacts under `.context-workspace/runs/<run-id>/`, executes the CLI process, and exposes status/artifact endpoints.

That flow is maintained for compatibility and tests. Athena's current product direction is session-first embedded terminals plus native session discovery. Hermes memory and project-local recall remain the durable shared context.
