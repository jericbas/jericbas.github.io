# jericbas.github.io 🚀

> **Living Developer Journal, Portfolio & Systems Showcase**  
> Built with **Astro 5+**, **React 19**, and **Tailwind CSS 4**.  
> Automatically deployed to [https://jericbas.github.io](https://jericbas.github.io).

---

## 🌟 Key Features

1. **Craft Showcase**: Dedicated interactive grid highlighting your **Rust** systems tools (`oxitty`, `ufw-guard`) and **npm** packages (`vite-plugin-mock-flow`, `why-override`, `zod-v3-to-v4`).
2. **Markdown/MDX Content Collections**:
   - Write articles in `src/content/blog/*.md`.
   - **Draft Protection**: Use `draft: true` in the frontmatter to keep notes private and save work-in-progress thoughts without them appearing on your live site.
3. **3-Mode Color Appearance**:
   - ☀️ **Light Mode**: Crisp, high-key paper daylight aesthetic.
   - 🌒 **Dim Mode (Twilight / Soft Dark)**: The comfortable midpoint between bright white and harsh black—soft charcoal and slate navy that reduces eye fatigue.
   - 🌑 **Dark Mode (Deep Obsidian)**: Pitch-black night contrast.
4. **Philippine Seasonal Theme Engine**:
   - Automatically synchronizes with the calendar month or allows visitors to preview any Philippine season:
     - **Jan**: *Bagong Taon* (Clean Slate & Frost Cyan)
     - **Feb**: *Harana* (Rose Quartz & Velvet Crimson)
     - **Mar**: *Tag-araw* (Tropical Sunbeam & Warm Amber)
     - **Apr**: *Quiet Horizon* (Linen Sage & Sand)
     - **May**: *Flores de Mayo* (Botanical Fuchsia & Emerald)
     - **Jun**: *Araw ng Kalayaan* (Heritage Indigo & Coral Red)
     - **Jul**: *Habagat* (Ocean Mist & Storm Slate)
     - **Aug**: *Buwan ng Wika* (Golden Pearl & Terracotta)
     - **Sep**: *Ber Months Kickoff* (Early Parol Gold & Warm Pine)
     - **Oct**: *Undas & Dusk* (Amethyst Twilight & Ember)
     - **Nov**: *Paskong Pinoy Festive* (Parol Star Gold & Christmas Lantern Red)
     - **Dec**: *Noche Buena Grand* (Yuletide Star Gold & Velvet Crimson)
5. **Clean Storefront Auto-Sync (`jericbas/jericbas`)**:
   - Automatically updates your GitHub profile README (`jericbas/jericbas`) whenever you publish new posts.
   - Keeps your storefront minimalist and uncrowded: displays only your top 3–4 latest article links inside safe HTML comments (`<!-- BLOG-POSTS:START --> ... <!-- BLOG-POSTS:END -->`).
6. **Zero-Clutter Weekly Writing Reminder**:
   - A GitHub Action runs every Monday morning (PHT), inspects your public commits across repositories, and opens a single reminder issue in this repo with direct links and writing prompts to inspire new posts.
   - Automatically closes the previous week's issue so your issue tracker stays spotless.

---

## 🚀 Quickstart & Local Development

Make sure you have [Bun](https://bun.sh) installed:

```bash
# Clone or navigate to the directory
cd projects/jericbas.github.io

# Install dependencies
bun install

# Start local dev server (includes live preview of drafts)
bun run dev

# Build production static site (drafts are excluded)
bun run build

# Preview production build locally
bun run preview
```

---

## ✍️ How to Write a New Devlog Post

Create a new file in `src/content/blog/your-post-title.md`:

```markdown
---
title: "Your Engaging Article Title"
description: "A punchy 1-2 sentence summary of what this post covers."
pubDate: 2026-11-05
tags: ["rust", "npm", "architecture"]
draft: false     # Set to true while writing privately; change to false to publish
featured: true   # Set to true to highlight on the homepage
author: "Jeric Bas"
---

Write your article here using standard Markdown or MDX!
```

---

## 🤖 GitHub Automation Setup

### 1. Enabling GitHub Pages Deployment
1. Push this repository to GitHub under the name `jericbas.github.io`.
2. Go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site upon every push to `main`!

### 2. Auto-Syncing with Profile README (`jericbas/jericbas`)
To let the site update your GitHub profile README cleanly:
1. Generate a GitHub Personal Access Token (PAT) with `repo` permissions at:  
   `https://github.com/settings/tokens/new`
2. In your `jericbas.github.io` repo, go to **Settings** → **Secrets and variables** → **Actions**.
3. Add a secret named: `GH_PAT` with your token.
4. In your `jericbas/jericbas` repository's `README.md`, add these two comment lines wherever you want the list to appear:
   ```markdown
   <!-- BLOG-POSTS:START -->
   <!-- BLOG-POSTS:END -->
   ```
Whenever a new post is pushed to `main`, GitHub Actions will populate that exact section while preserving the rest of your README!

---

## 📂 Project Structure

```
jericbas.github.io/
├── .github/
│   └── workflows/
│       ├── deploy.yml             # GitHub Pages deployment action
│       ├── sync-profile.yml       # Action that syncs articles to jericbas/jericbas
│       └── weekly-inspiration.yml # Weekly git digest & writing reminder
├── public/
│   └── favicon.svg                # Clean brand terminal icon
├── scripts/
│   ├── sync-profile.mjs           # Profile README sync script
│   └── weekly-digest.mjs          # Activity scanner & issue reminder script
├── src/
│   ├── components/
│   │   ├── icons/                 # Clean SVGs (GithubIcon, etc.)
│   │   ├── Footer.tsx             # React footer
│   │   ├── Navbar.tsx             # Responsive header with ThemeSwitcher
│   │   ├── ProjectGrid.tsx        # Rust & npm projects showcase grid
│   │   ├── SeasonalBanner.tsx     # Philippine seasonal tag & announcement
│   │   └── ThemeSwitcher.tsx      # 3 modes (Light/Dim/Dark) + 12 PH seasons
│   ├── content/
│   │   └── blog/                  # Markdown/MDX articles (supports draft: true)
│   ├── layouts/
│   │   └── Layout.astro           # Base site layout with theme-flash prevention
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── [...slug].astro    # Dynamic blog post reader
│   │   │   └── index.astro        # Full devlog post archive
│   │   ├── index.astro            # Homepage (Hero, Featured Craft, Recent Posts)
│   │   ├── projects.astro         # Deep dive into Rust & npm tooling
│   │   └── rss.xml.ts             # Automated RSS 2.0 feed
│   ├── styles/
│   │   └── global.css             # Tailwind v4 + 12 Philippine seasonal tokens
│   ├── utils/
│   │   └── theme.ts               # Theme calendar definitions & mode helpers
│   └── content.config.ts          # Astro Content Collections configuration
├── astro.config.mjs               # Astro + React + Tailwind configuration
├── package.json
└── tsconfig.json
```
