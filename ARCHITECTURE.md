# Architecture & System Design 📐

Detailed overview of the engineering architecture, themes, and automation pipelines powering `jericbas.github.io`.

---

## 🌟 Architecture & Features

### 1. Framework & Stack
- **Astro 5+**: Static-first generation for sub-second page loads, SEO, and RSS delivery.
- **React 19**: Interactive components (`@astrojs/react`) for dynamic UI controls and theme switching.
- **Tailwind CSS 4**: Next-generation utility-first styling with custom CSS variables.
- **Bun**: Modern, ultra-fast JavaScript runtime and package manager.

### 2. 3-Mode Color System
- ☀️ **Light Mode**: Crisp, high-key paper daylight aesthetic.
- 🌒 **Dim Mode (Twilight / Soft Dark)**: Soft charcoal and slate navy that reduces eye fatigue without pitch-black glare.
- 🌑 **Dark Mode (Deep Obsidian)**: High-contrast night contrast.

### 3. Philippine Seasonal Theme Engine
Synchronizes dynamic accent tokens with the calendar month or allows visitor overrides:
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
- **Nov**: *Paskong Pinoy Festive* (Parol Star Gold & Lantern Red)
- **Dec**: *Noche Buena Grand* (Yuletide Star Gold & Velvet Crimson)

### 4. Content Collections & Draft Protection
- Articles live in `src/content/blog/*.md`.
- Setting `draft: true` in the frontmatter keeps unpublished drafts excluded from production builds.

### 5. Profile Storefront Sync (`jericbas/jericbas`)
- `scripts/sync-profile.mjs` updates the section between `<!-- BLOG-POSTS:START -->` and `<!-- BLOG-POSTS:END -->` in `jericbas/jericbas`.
- Triggered automatically via `.github/workflows/sync-profile.yml` when posts are published.

### 6. Weekly Inspiration Generator
- `.github/workflows/weekly-inspiration.yml` runs every Monday morning.
- Queries recent git commits, closes prior reminder issues, and opens a single inspiration issue with prompts.

---

## 📂 Project Structure

```
jericbas.github.io/
├── .github/workflows/         # Deployment & sync GitHub Actions
├── public/                    # Favicons and static assets
├── scripts/                   # Profile sync & weekly digest scripts
├── src/
│   ├── components/            # React UI components (Navbar, ThemeSwitcher, etc.)
│   ├── content/blog/          # Markdown/MDX articles
│   ├── layouts/               # Base Astro layout
│   ├── pages/                 # Static pages & RSS route
│   ├── styles/                # Tailwind v4 & seasonal CSS tokens
│   └── utils/                 # Theme & mode helpers
├── astro.config.mjs           # Astro configuration
└── package.json
```
