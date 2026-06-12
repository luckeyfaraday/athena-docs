---
title: Configuration
description: Configure Athena Whisper's transcription backend, models, and insertion behavior.
---

Create or edit `athena-dictate.toml` in the project root:

```toml
backend = "faster_whisper"
model = "base"
device = "cpu"
compute_type = "int8"
groq_model = "whisper-large-v3-turbo"
groq_api_key_env = "GROQ_API_KEY"
language = "auto"
multilingual = false
task = "transcribe"
sample_rate = 16000
channels = 1
max_record_seconds = 0
beam_size = 1
insertion_backend = "auto"
append_space = true
```

## Transcription backends

`backend` selects the transcription engine:

- `faster_whisper` (default) — runs locally and offline.
- `groq` — cloud API, fast but requires an API key and sends audio to Groq. Install the extra with `pip install -e .[groq]`, set the API key in the environment variable named by `groq_api_key_env` (default `GROQ_API_KEY`), and choose a Groq-hosted model via `groq_model` (e.g. `whisper-large-v3` or `whisper-large-v3-turbo`).

The `device`, `compute_type`, and `beam_size` settings apply only to the local `faster_whisper` backend.

## Model and decoding defaults

The defaults are intentionally conservative for CPU-only systems while supporting multilingual dictation:

| Setting | Default | Notes |
|---|---|---|
| `model` | `base` | Use `tiny` for lower latency, `small` for better quality, larger models only with CPU/GPU headroom. English-only `.en` models are available. |
| `language` | `auto` | Auto-detect the spoken language. |
| `task` | `transcribe` | `translate` produces English output (not arbitrary target-language translation). |
| `beam_size` | `1` | Greedy decoding — fastest, good for short single-speaker dictation. Raise to `5` for slightly better accuracy on harder audio. |
| `max_record_seconds` | `0` | Record until Stop is clicked. Set a positive value for a hard cap. |

## Environment overrides

- `ATHENA_DICTATE_BACKEND`
- `ATHENA_DICTATE_MODEL`
- `ATHENA_DICTATE_DEVICE`
- `ATHENA_DICTATE_COMPUTE_TYPE`
- `ATHENA_DICTATE_GROQ_MODEL`
- `ATHENA_DICTATE_LANGUAGE`
- `ATHENA_DICTATE_MULTILINGUAL`
- `ATHENA_DICTATE_TASK`
- `ATHENA_DICTATE_INSERTION_BACKEND`
- `ATHENA_DICTATE_MAX_RECORD_SECONDS`
- `ATHENA_DICTATE_BEAM_SIZE`

## Insertion backends

- `auto`: chooses a platform-safe backend — `x11-keystrokes` on Linux/X11, `windows-keystrokes` on Windows.
- `clipboard-only`: copies text and requires manual paste.

**Linux (X11)**

- `x11-clipboard-paste`: copies text and sends `Ctrl+V`.
- `x11-terminal-paste`: copies text and sends `Ctrl+Shift+V`.
- `x11-terminal-shift-insert-paste`: copies text and sends `Shift+Insert`.
- `x11-keystrokes`: types synthetic keystrokes; does not use the clipboard.
- `x11-direct-type`: older direct-typing backend via `xdotool type`.

**Linux (Wayland)**

- `wayland-clipboard-paste`: Wayland clipboard plus `wtype`, where supported.
- `ydotool-type`: uinput-based typing through `ydotool`.

**Windows**

- `windows-clipboard-paste`: copies text to clipboard and sends `Ctrl+V` via `keybd_event`.
- `windows-keystrokes`: types text as unicode keystrokes via `SendInput`; does not use the clipboard.

For terminals and coding-agent TUIs, leave `insertion_backend = "auto"` or use the explicit keystroke backend for that platform.

## Architecture

```text
src/athena_whisper_topic/
  audio_capture.py     microphone recording to WAV
  cleanup.py           dictation text normalization
  cli.py               Typer command-line interface
  config.py            TOML/env/default configuration
  transcriber.py       faster-whisper wrapper
  widget.py            floating PyQt/PySide dictation widget
  inject/              text insertion backends
  types.py             transcript dataclasses
```

Runtime flow:

```text
widget click
  -> capture focused target
  -> record microphone
  -> transcribe with faster-whisper
  -> clean text
  -> insert into target app
```
