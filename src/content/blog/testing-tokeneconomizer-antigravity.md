---
title: "experiment(ai): Testing TokenEconomizer with Google Antigravity"
description: "A quick look at how TokenEconomizer helps stop coding agents from burning tokens on repeated commands, tool schemas, and error loops."
pubDate: 2026-11-10
tags: ["ai", "antigravity", "tooling", "devlog", "optimization"]
draft: false
featured: true
author: "Jeric Bas"
---

Over the past few months, my daily coding tools have shifted quite a bit. I spent time with GitHub Copilot, worked with Claude Code, and for this month (and likely through December), my main driver is Google Antigravity (`agy`).

Moving between different assistants made one thing obvious: coding agents are helpful, but they burn through tokens fast.

A lot of that waste happens in three common ways:
1. **Session Amnesia**: Every new session starts fresh. If your project needs a specific virtual environment command like `/opt/env/bin/pytest`, the agent tries `pytest`, fails, and burns 3 to 5 turns rediscovering the right path.
2. **Tool Schema Overhead**: Modern agents carry 15 to 30 tool definitions. Sending these large JSON schemas on every prompt turn adds up quickly, even for simple one-line edits.
3. **Error Loops**: When an agent gets stuck on a confusing bug, it often edits the same file back and forth, burning tokens without making real progress.

---

### Discovering TokenEconomizer

While looking for ways to reduce this waste, I discovered [TokenEconomizer](https://github.com/microsoft/TokenEconomizer), an open-source project from Microsoft Research and UC Berkeley.

Instead of changing how you prompt, it runs in the background and applies three simple ideas:
* **Remembers working commands**: Saves working paths and injects a tiny 40-token note at the start of future sessions.
* **Prunes unused tools**: Omits tool definitions that your current project does not need.
* **Stops runaway loops**: Nudges the agent early if it starts spinning in circles on the same file.

I decided to install it and test how it pairs with Antigravity.

---

### Setting It Up in Antigravity (`agy`)

Since Antigravity is my main tool right now, I installed TokenEconomizer as a local plugin. The setup took only a few terminal commands:

#### 1. Clone the repository
```bash
git clone https://github.com/microsoft/TokenEconomizer.git
cd TokenEconomizer
```

#### 2. Build the plugin bundle
```bash
python3 scripts/build_plugin.py --out dist/marketplace
```

#### 3. Install into Antigravity
```bash
agy plugin install dist/marketplace/tokeneconomizer
```

#### 4. Enable rule-based facts (Zero LLM cost)
To keep the plugin itself from spending extra tokens to learn, I enabled the local `envfacts` mode:
```bash
te --host antigravity config set microskills=envfacts --global
```

Now the plugin automatically hooks into Antigravity session starts and stops.

---

### Running a Quick Benchmark

I asked Antigravity to run a quick local benchmark using Gemini Flash pricing weights to see what the numbers look like:

| Area | Without Plugin | With TokenEconomizer | Difference |
| :--- | :--- | :--- | :--- |
| **Command Memory (EnvFacts)** | 19,200 tokens | 6,568 tokens | ~65% reduction |
| **Tool Pruning** | 129,500 tokens | 60,620 tokens | ~53% reduction |
| **Loop Guard** | 86,000 eff. tokens | 30,960 eff. tokens | ~64% reduction |

In practice, instead of failing a command and searching around, TokenEconomizer injected this short 42-token note:

> `environment facts learned from earlier tasks in this checkout:`  
> `- python -m pytest fails here; /opt/env/bin/python -m pytest works.`

That small hint prevented thousands of wasted exploratory tokens. 

*Note: This initial test was run on Gemini Flash. Later on, I plan to run tests with other models (such as Gemini Pro or Argon) and will update with new results.*

---

### Things to Keep in Mind

A few quick takeaways from testing:
* **API Billing vs Subscriptions**: If you pay for tokens directly through an API key, token reductions directly lower your monthly bill. If you are on a flat subscription, it mostly means faster replies and fewer rate-limit slowdowns.
* **Real-world numbers will vary**: Benchmarks simulate worst-case loops and missing commands. Day-to-day savings will depend on how many sessions you run and how complex your repositories are.

---

### What's Next

Once installed, you can inspect what the plugin is doing with simple commands like `te --host antigravity status` and `te doctor`.

TokenEconomizer is a solid addition if you want to keep token usage reasonable without being locked into one vendor. Moving forward, I also plan to test other tools that compress tokens and optimize context to see how they compare.

See you in the next commit!
