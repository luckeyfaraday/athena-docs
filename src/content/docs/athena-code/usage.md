---
title: Usage
description: Run Athena Code interactively, one-shot, or with resumed sessions.
---

## Interactive terminal UI

Start the interactive terminal UI in the current project:

```bash
athena-code
```

## One-shot tasks

Run a one-shot coding task:

```bash
athena-code run "explain this repository and identify the highest-risk module"
```

## Memory commands

Save and inspect durable memories:

```bash
athena-code memory add "Use pnpm for this organization"
athena-code memory list
```

## Resume a session

```bash
athena-code --session SESSION_ID
```

Use `athena-code --help` for the complete command reference.

## Inside Athena Desktop

Athena Code is a standalone CLI, but [Athena Desktop](/athena-desktop/overview/) treats it exactly like Codex, OpenCode, and Claude Code: the Command Room launches it from the **New** menu as a regular embedded PTY (including a grid mode for parallel panes), it must be on `PATH`, and it participates in the same clean/task/curated/immersive context modes as every other agent.

## Development

Run the focused test suite:

```bash
npx --yes bun@1.3.14 test test
```

Build the complete executable:

```bash
./scripts/build.sh
```

See [CONTRIBUTING.md](https://github.com/luckeyfaraday/athena-code/blob/main/CONTRIBUTING.md) for the development workflow and pull request expectations.
