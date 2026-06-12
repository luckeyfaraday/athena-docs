---
title: Installation
description: Install Athena Whisper from source or as a packaged desktop app.
---

## From the repository

```bash
python3 -m venv .venv
. .venv/bin/activate           # Windows: .venv\Scripts\activate
pip install -e ".[dev,gui]"
```

**Linux** — for X11 desktop insertion:

```bash
sudo apt-get install xdotool xclip
```

If PyQt6 reports an XCB platform plugin error, install the common X11 Qt runtime libraries:

```bash
sudo apt-get install libxcb-cursor0 libxcb-xinerama0 libxkbcommon-x11-0
```

**Windows** — no additional tools required. The `windows-keystrokes` and `windows-clipboard-paste` backends use `ctypes` to call Win32 `SendInput` and `keybd_event` directly.

## Run the widget

```bash
.venv/bin/athena-dictate widget      # Linux
.venv\Scripts\athena-dictate widget  # Windows
```

The repository includes an `athena-dictate.toml` configured for automatic platform-specific insertion. On Linux/X11, `auto` uses keystrokes instead of clipboard paste, so terminal apps such as Codex, Claude Code, opencode, and shell-based TUIs do not receive `Ctrl+V` image-paste shortcuts. On Windows, `auto` uses Win32 keystrokes.

## CLI usage

Check the current desktop/session environment:

```bash
athena-dictate doctor
```

Transcribe an existing audio file:

```bash
athena-dictate transcribe-file path/to/audio.wav
athena-dictate transcribe-file path/to/audio.wav --language es     # explicit language
athena-dictate transcribe-file path/to/audio.wav --language auto   # auto-detect
athena-dictate transcribe-file path/to/audio.wav --task translate  # translate to English
```

Record one short dictation and insert the result:

```bash
athena-dictate record-once --seconds 5 --paste
athena-dictate record-once --multilingual   # language changes within one recording
athena-dictate record-once --seconds 5 --no-paste   # record without inserting
```

Test keystroke insertion without recording or transcribing:

```bash
athena-dictate type-text "hello from athena"
```

## Packaged desktop apps

Athena Whisper can be bundled into a double-clickable desktop app using PyInstaller, then wrapped in a native installer per platform:

- **Windows** → `dist/Athena Dictate Setup.exe` (Inno Setup installer)
- **macOS** → `dist/Athena Dictate.dmg`
- **Linux** → `dist/Athena Dictate.AppImage`

PyInstaller does not cross-compile — build each installer on its own OS:

```bash
# Windows (PowerShell) — requires Inno Setup (choco install innosetup)
pwsh -File build/build-windows.ps1

# macOS
bash build/build-macos.sh

# Linux
bash build/build-linux.sh
```

The GitHub Actions workflow (`.github/workflows/build.yml`) builds all three installers on hosted runners — trigger it manually or push a version tag (`vX.Y.Z`), which also attaches the installers to a GitHub release.

:::note
The Whisper model is **not** bundled: on first launch the app downloads the configured model (default `base`, ~140 MB) into the local cache, so the first run needs internet and is slower. Later runs are fully offline.
:::
