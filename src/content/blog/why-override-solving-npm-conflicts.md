---
title: "Solving Dependency Hell: The Origins of why-override"
description: "A deep dive into why npm overrides happen and how a CLI diagnostic tool helps demystify transitive dependency locks."
pubDate: 2026-10-14
tags: ["npm", "cli", "node", "architecture"]
draft: false
featured: false
author: "Jeric Bas"
---

When maintaining large enterprise codebases or monorepos, `package.json`'s `overrides` field often turns into a graveyard of quick fixes. You add an override because an upstream package has an unresolved security advisory, but six months later, no one knows which package originally demanded it.

### The Missing Diagnostic
While package managers tell you *that* an override was applied, they rarely trace the dependency graph upstream to show *all* packages requesting the legacy version.

This friction led me to develop [`why-override`](https://github.com/jericbas/why-override), a fast diagnostic CLI that:
1. Traverses the local `package-lock.json` dependency tree.
2. Identifies every root and transitive consumer of overridden modules.
3. Reports whether any upstream maintainers have released compatible updates so you can safely retire the override.

The tool is open-sourced on GitHub and available on npm for anyone wrestling with legacy lockfile dependencies.
