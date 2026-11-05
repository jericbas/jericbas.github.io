---
title: "Building at the Seam: Why I Write Developer Tooling in Rust and TypeScript"
description: "How combining Rust's memory safety and raw speed with TypeScript's ergonomic ecosystem shapes my open-source architecture."
pubDate: 2026-11-01
tags: ["rust", "typescript", "architecture", "devlog"]
draft: false
featured: true
author: "Jeric Bas"
---

As software engineers, we often get pushed toward extremes: either write everything in high-level scriptable languages for developer velocity, or build everything in low-level systems languages for execution speed.

Over the past year building developer tooling, npm packages, and systems utilities, I have found that the sweetest engineering spot lies directly at the seam between **TypeScript** and **Rust**.

### Why TypeScript for Developer Experience
When building packages like [`vite-plugin-mock-flow`](https://github.com/jericbas/vite-plugin-mock-flow) or [`why-override`](https://github.com/jericbas/why-override), developer adoption hinges on frictionless integration. Node.js and TypeScript offer:
- Instant plug-and-play with existing web toolchains (Vite, Rollup, Next.js).
- Rich AST tooling (such as `ts-morph` and compiler APIs) for schema codemods.
- Zero friction distribution via the npm registry.

### Why Rust for Systems and Diagnostics
Whenever a tool needs deterministic latency, zero garbage-collection pauses, or robust concurrent system calls, Rust becomes the uncontested choice. Projects like [`oxitty`](https://github.com/jericbas/oxitty) and [`ufw-guard`](https://github.com/jericbas/ufw-guard) leverage:
- **Compile-time safety guarantees**: No dangling pointers or data races across threads.
- **Minimal memory footprints**: Critical when running background system monitors.
- **Fast startup time**: Essential for CLI tools that should execute under 10ms.

### The Philosophy Behind This Living Devlog
I started this portfolio and devlog to document architectural hurdles, unexpected bugs, and open-source milestones as they happen. Rather than keeping lessons in private notes, putting them in the open turns each technical challenge into lasting knowledge.

If you are exploring similar intersections in Rust and modern web development, stay tuned for upcoming breakdowns!
