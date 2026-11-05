---
title: "Why I Built vite-plugin-mock-flow: Eliminating Friction in Local API Mocking"
description: "How a frustration with heavyweight mock servers led to creating an in-memory, flow-based mock plugin for Vite."
pubDate: 2026-10-25
tags: ["npm", "vite", "typescript", "frontend"]
draft: false
featured: true
author: "Jeric Bas"
---

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

Published on the npm registry, it serves as a lightweight alternative for teams wanting rapid prototyping without mock server overhead.
