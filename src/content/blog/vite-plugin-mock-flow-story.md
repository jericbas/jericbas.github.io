---
title: "Building vite-plugin-mock-flow: Eliminating Friction in Local API Mocking (WIP)"
description: "Architecture notes and lessons while actively developing an in-memory, flow-based mock plugin for Vite."
pubDate: 2026-10-25
tags: ["npm", "vite", "typescript", "wip"]
draft: false
featured: true
author: "Jeric Bas"
---

> [!NOTE]
> **Project Status: Under Active Construction 🚧**
> `vite-plugin-mock-flow` is currently in active development. This post captures the design motivations, architecture considerations, and early iterations.

Every frontend developer knows the dreaded blocker: you need to build a complex multi-step UI flow (like an checkout funnel, authentication handshake, or multipart file upload), but the backend staging endpoints are either incomplete, unstable, or rate-limited.

### The Problem With Traditional Mocking
Most existing solutions force you into one of two compromises:
1. **Running a dedicated mock server** (e.g. Express or json-server): Requires extra terminal tabs, port management, CORS configuration, and CI environment setup.
2. **Hardcoding mock data in component state**: Pollutes production source code and fails to replicate real network latency or HTTP status transitions.

### The Solution: vite-plugin-mock-flow
I built [`vite-plugin-mock-flow`](https://github.com/jericbas/vite-plugin-mock-flow) to intercept requests directly inside the Vite development server middleware.

Key architectural goals:
- **Zero Port Overhead**: Runs directly within your Vite dev server port.
- **Stateful Sequences**: Simulates realistic progression (e.g. initial `202 Accepted` followed by `200 Ready`).
- **Zero Bundle Leakage**: Excluded completely from production builds.

### Current Progress
The plugin core is currently being engineered and dogfooded in local Vite projects. Stay tuned for release notes and benchmarks once the initial v0.1.0 tag is published!
