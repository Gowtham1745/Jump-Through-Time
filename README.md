# Chronosphere

Chronosphere is a cinematic global time and destination discovery experience built with React, TypeScript, Vite, and Tailwind CSS. It combines a live world-clock dashboard with an interactive globe, landmark discovery, and time-comparison features designed to feel immersive and editorial.

## Overview

- Live UTC and local time displays across major global cities
- Interactive globe with destination markers and selection states
- Search, continent filters, favorites, and sorting for city lists
- Landmark and wonder cards with accurate timezone display
- Day and night explorer to understand how the globe shifts across the day
- Session-based exploration tracker and random destination jumps

## Technology stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Browser Intl.DateTimeFormat for timezone-aware live formatting

## Local setup

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Production build

```bash
npm run build
```

## Linting

```bash
npm run lint
```

## Project structure

```text
src/
  App.tsx
  index.css
  main.tsx
public/
  (currently minimal for Vite defaults)
README.md
.tailwind.config.js
vite.config.ts
```

## Data and image attribution

- Time and timezone data rely on the browser runtime via `Intl.DateTimeFormat` and IANA timezone identifiers.
- Destination imagery uses Unsplash source URLs for editorial-style exploratory visuals.
- This app is designed so location metadata is easily replaceable or expanded in future iterations.

## Deployment guidance

This project is ready for static hosting on Vercel, Netlify, Cloudflare Pages, or a Vite-compatible Node deployment. Standard steps:

1. Run `npm run build`
2. Publish the `dist` output directory to your hosting provider
3. Ensure the runtime environment is static and no server-side secrets are required

## Known limitations

- This is a front-end prototype rather than a full production travel backend.
- Globe markers are stylized rather than a full 3D Earth mesh with texture streaming.
- Landmark and city data are curated and intentionally lightweight for maintainability.
- External image URLs require network access in the browser.

## Notes on accuracy

The app intentionally uses browser-native timezone logic and IANA zone names such as `Europe/London` or `America/New_York` rather than hardcoded offset values. This keeps the interface aligned with current DST and legal time rules whenever the browser environment supports them.
