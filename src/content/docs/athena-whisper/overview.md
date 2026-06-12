---
title: Athena Whisper
description: A local-first desktop dictation widget — speech-to-text for terminals, coding agents, and any focused app.
---

**Athena Whisper** is an open-source desktop dictation widget for turning speech into text and inserting it into the currently focused app. It is built for the Athena Home AI workspace and uses `faster-whisper` for local speech recognition, with platform-native keyboard and clipboard injection for system-wide text input on Linux and Windows.

The goal is a local-first alternative to cloud dictation tools such as Wispr Flow: click a small always-on-top widget, speak naturally, transcribe with Whisper, clean the text, and type it into Codex, Claude Code, opencode, terminals, browsers, chat apps, documents, and other text fields.

:::note[Repository]
[github.com/luckeyfaraday/athena-whisper](https://github.com/luckeyfaraday/athena-whisper) — Linux (X11/Wayland) and Windows. v0 prototype: usable, but not yet a polished production dictation app.
:::

## What it does

1. Focus a text box in any app.
2. Launch `athena-dictate widget`.
3. Click the widget to start recording.
4. Speak into the microphone.
5. Click stop.
6. The app transcribes speech locally with `faster-whisper`.
7. The cleaned text is inserted into the previously focused app.

This is designed for hands-free or low-friction text entry in coding agents, shells, browsers, notes, chat, email, and desktop applications.

## Features

- Floating always-on-top dictation widget (PyQt6/PySide6)
- Local Whisper transcription via `faster-whisper` — CPU-friendly multilingual defaults (`base` model, `int8` quantization)
- Microphone recording with `sounddevice` and `soundfile` (16 kHz mono)
- Basic dictation cleanup: whitespace normalization and spoken punctuation such as "comma", "period", and "new line"
- Insertion backends for Linux and Windows:
  - X11: clipboard paste, terminal paste fallbacks, direct keystroke typing
  - Windows: clipboard paste via `keybd_event`, unicode keystroke injection via `SendInput`
  - Wayland: `wl-copy` + `wtype`/`ydotool`
- CLI commands for diagnostics, file transcription, one-shot dictation, and insertion testing
- Configurable defaults through `athena-dictate.toml`

## Privacy posture

Transcription is local by default — no cloud transcription is required by the current implementation. An optional Groq cloud backend is available for faster transcription if you choose to enable it (see [Configuration](/athena-whisper/configuration/)).

## Current limitations

- Linux (X11/Wayland) and Windows are supported; macOS is not yet implemented.
- Wayland support depends on compositor-specific tools such as `wl-copy`, `wtype`, or `ydotool`.
- `faster-whisper` on CPU is practical for short dictation but is not instant large-model streaming ASR.
- Cleanup is rule-based today; LLM polishing and command mode are future work.
- System-wide insertion is inherently fragile because every terminal, compositor, and app handles synthetic input differently.

## Roadmap

- Global push-to-talk hotkey
- Better Wayland support
- Optional LLM cleanup/polish pass
- Command mode for editing selected text by voice
- Personal dictionary and phrase correction
- Local transcript history
- Latency benchmarks across `tiny`, `base`, and `small`
