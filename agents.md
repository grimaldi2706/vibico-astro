# VIBICO - Viajeros en Bicicleta Por Colombia

## 1. Project Overview

VIBICO is a static website built with Astro designed as a resource hub for bicycle tourists (cyclotourists) traveling through Colombia and Latin America. The site provides practical resources, maps, contacts, useful apps, and real travel experiences to foster respect, mutual aid, and responsible access to cyclotourism.

**Key Features:**
- Multilingual support (Spanish/English).
- Information portals (Migration, borders, emergency numbers).
- Maps of host network, bike shops, and voluntariates.
- Directory of platforms (Warmshowers, WWOOF, Couchsurfing, etc.).
- Directory of apps (Strava, Komoot, OsmAnd, etc.).
- Traveler experiences and blogs.

## 2. Tech Stack

- **Framework:** Astro v5.16.0
- **Styling:** Tailwind CSS v4.1.17 + @tailwindcss/typography
- **Content:** MDX (for pages) + JSON (for configuration)
- **Language:** TypeScript (configured via tsconfig.json)

## 3. Project Structure & Key Files

The project follows a **JSON-as-CMS** approach. Most textual content and links are stored in JSON configuration files, not hardcoded in components.

### `src/config/`
This directory contains the "database" for the site.
- **`common.json`**: Global settings (theme colors, logo, contact info, social media links).
- **`es.json`**: Spanish content (Site title, descriptions, navigation, information sections, maps data, platform lists, apps, experiences).
- **`en.json`**: English content (same structure as es.json).
- **`index.js`**: Merges `common`, `es`, and `en` into a single `config` object for export.

### `src/components/`
Reusable UI components.
- **`Header.astro`**: Main navigation bar. Receives `lang` prop.
- **`Footer.astro`**: Footer with social links.
- **`MapList.astro`**: Renders maps from JSON config.
- **`InfoGrid.astro`**: Renders grid of info links (e.g., Migration, borders).
- **`LinkGrid.astro`**: Renders generic lists of links.
- **`pages/Home.astro`**: Specific logic for the homepage.

### `src/layouts/`
- **`Layout.astro`**: Main layout wrapper. Accepts `title`, `description`, `image`, and `lang` props. Handles global `<head>` metadata and language switching logic.

### `src/content/pages/`
- MDX files for static pages (e.g., `es/home.mdx`, `es/informacion.mdx`).
- These usually wrap the components but inherit data from the config or frontmatter.

### `public/`
- Static assets (images, icons).
- **Note:** Paths in JSON config often start with `/vibico-astro/...` due to the deployment base path.

## 4. How to Edit Content

**Rule:** Do NOT hardcode text in `.astro` components unless it is structural UI (buttons, generic labels). To change text, links, or add new items:

1.  **For text & links:** Edit `src/config/es.json` (or `en.json`).
    - Example: To change the "About Us" text, find `site.description` in the JSON.
    - Example: To add a new emergency number, add it to `site.emergency_numbers`.
    - Example: To add a new link to the navigation, add it to the `navigation` array in the JSON.

2.  **For Images:**
    - Place images in `public/`.
    - Update the `image` path in the corresponding JSON object.

3.  **For new Pages:**
    - Create an MDX file in `src/content/pages/[lang]/[page].mdx`.
    - Ensure the route is defined in `navigation` in the JSON.

## 5. Development Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/` |
| `npm run preview` | Preview your build locally |

## 6. Important Details

- **Base URL:** The site uses a base URL prefix (`/vibico-astro`). This is handled in `Layout.astro` via `import.meta.env.BASE_URL`.
- **Theme Colors:** Defined in `src/config/common.json` under `theme.colors`. Used in Tailwind config.
- **Data Relationships:**
  - Navigation is defined in JSON.
  - Content for each navigation item is fetched dynamically or passed via props.
  - The `[...slug].astro` file likely handles the routing logic between the JSON data and the MDX pages.

## 7. Current Maintainer
- **Contact:** +57 3155730212 / contacto@vibico.org
- **Social:** Facebook, Instagram, WhatsApp Group