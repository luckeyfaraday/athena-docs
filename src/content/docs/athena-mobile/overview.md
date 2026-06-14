---
title: Athena Mobile
description: A mobile companion PWA for Athena that connects over a private Tailscale network.
---

**Athena Mobile** is the mobile companion for [Athena Desktop](/athena-desktop/overview/). It is a PWA (progressive web app) hosted on your laptop and opened from your phone over a private [Tailscale](https://tailscale.com/) network — so you can reach your Athena workspace from anywhere on your tailnet without exposing anything to the public internet.

:::note[Repository]
[github.com/luckeyfaraday/athena-mobile](https://github.com/luckeyfaraday/athena-mobile)
:::

## How it works

Athena Desktop's backend and Electron control services are localhost-only by design. Athena Mobile bridges that gap with a same-origin proxy: the phone talks to the mobile app server over Tailscale, and the app server talks to Athena's loopback services on the laptop.

The proxy reads Athena's existing discovery files, so no manual URL wiring is needed:

```text
~/.context-workspace/backend.json
~/.context-workspace/electron-control.json
```

The app does not modify the Athena workspace itself. It reads the current Athena API shapes and keeps mobile access behind configurable clients.

## Private by default

By default the production server listens on loopback (`127.0.0.1:4174`) and is exposed to your phone privately through Tailscale Serve over HTTPS, so nothing reaches the public internet. A Tailnet-only binding mode is also available — binding the server directly to the laptop's Tailscale IP (the `100.64.0.0/10` address) so the app, and the loopback Athena control proxy behind it, stays off any other LAN/Wi-Fi interface the laptop is joined to; the Tailscale dev mode uses this directly. The tailnet binding modes fail fast if Tailscale is not up.

## Modes

- `demo`: explicit local fixture mode for UI development.
- `live`: call the configured Athena backend and Electron control URLs.

## First release package

The first release is a private PWA hosted on the laptop and opened from the phone over Tailscale HTTPS, with Web Push notification support. See [Setup & Deployment](/athena-mobile/setup/) for the full walkthrough.
