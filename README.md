# Crayons & Walls

A visual timeline that explores how AI constraints evolved over time, built as a production-ready single-page app with Vite + React.

## Highlights

- Timeline-driven UI with era visuals and interactive navigation.
- Content is data-driven, so updates happen in one place.
- Lightweight Vite build that is ready for GitHub Pages.

## Quickstart

### Prerequisites

- Node.js 18+
- npm (recommended)

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## Key Files Detector

Use this helper prompt to quickly identify the most important files when onboarding new contributors or AI assistants:

```
You are a Key Files Detector. Your job is to identify the most critical files in a project for a developer jumping in.
Look for entry points, main logic components, data constants, and configuration files.

For this project, the key files are:
1. index.html - The HTML entry point that bootstraps the app.
2. index.tsx - The React entry point that mounts the application.
3. App.tsx - The main application layout, logic, and state management.
4. constants.ts - Timeline data that powers the era content.
5. components/ - Shared UI elements like the time dial and era visuals.
6. vite.config.ts - Build configuration, including the GitHub Pages base path.
```

## Project Structure

```
.
├── App.tsx
├── components/
├── constants.ts
├── index.html
├── index.tsx
├── public/
│   ├── favicon.svg
│   ├── icon-192.svg
│   ├── icon-512.svg
│   └── site.webmanifest
├── types.ts
└── vite.config.ts
```

## Deployment (GitHub Pages)

This project is configured to deploy to GitHub Pages using the Vite build output.

1. Push to `main`.
2. GitHub Actions builds the site and publishes the `dist/` directory.

If you rename the repository, update the `base` path in `vite.config.ts` to match the new repo name.

## Contributing

Pull requests are welcome. Please open an issue to discuss significant changes.

## License

[MIT](https://choosealicense.com/licenses/mit/)
