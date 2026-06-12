---
title: Installation
description: Install Athena Code on Linux, macOS, or Windows, or build it from source.
---

## Linux and macOS

Install the latest build for the current operating system and architecture:

```bash
curl -fsSL https://raw.githubusercontent.com/luckeyfaraday/athena-code/main/scripts/install.sh | bash
```

The installer verifies the release checksum, copies the executable to `~/.local/share/athena-code/bin/athena-code`, and creates `~/.local/bin/athena-code`. The installed command does not depend on a cloned repository.

Install a specific version:

```bash
curl -fsSL https://raw.githubusercontent.com/luckeyfaraday/athena-code/main/scripts/install.sh |
  bash -s -- --version v0.2.1
```

See [GitHub Releases](https://github.com/luckeyfaraday/athena-code/releases) for available versions, archives, checksums, and release notes.

## Windows

Run in PowerShell:

```powershell
irm https://raw.githubusercontent.com/luckeyfaraday/athena-code/main/scripts/install.ps1 | iex
```

The installer verifies the release checksum, installs `athena-code.exe` under `%LOCALAPPDATA%\AthenaCode`, and adds its `bin` directory to your user `PATH`.

## Build from source

Requirements:

- A supported Linux, macOS, or Windows host
- Git
- Node.js with `npx`
- At least 5 GB of free temporary disk space
- Visual Studio 2022 Build Tools with **Desktop development with C++** on Windows

```bash
git clone https://github.com/luckeyfaraday/athena-code.git
cd athena-code
./scripts/build.sh
```

The build checks out the pinned OpenCode revision, applies Athena Code's patch and source overlay, installs dependencies, and writes the executable to `runtime-bin/<platform>-<architecture>/`.

Install a local Linux or macOS build by passing its generated path:

```bash
./scripts/install.sh --from-file ./runtime-bin/linux-x64/athena-code
```

On Windows:

```powershell
.\scripts\install.ps1 -FromFile .\runtime-bin\windows-x64\athena-code.exe
```

## How the fork is maintained

The repository maintains a reproducible fork rather than vendoring the entire upstream source tree:

```text
OpenCode pinned revision
        +
patches/opencode-athena.patch
        +
overlay/packages/opencode/...
        =
runtime-bin/<platform>-<architecture>/athena-code
```

| Path | Contents |
|---|---|
| `overlay/` | Athena-owned memory, recall, tools, and TUI source |
| `patches/` | Integration and branding changes applied to OpenCode |
| `scripts/build.sh` | Reproducible source build |
| `scripts/install.sh` | Linux and macOS installer |
| `scripts/install.ps1` | Windows PowerShell installer |
| `test/` | Memory, recall, snapshot, and session-index tests |
| `docs/` | Technical design documentation |
