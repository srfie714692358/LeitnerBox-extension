# LeitnerBox – Chrome Extension

LeitnerBox is a Chrome extension designed to help users build vocabulary effortlessly while browsing the web.  
It allows users to select any word or text on a webpage, view an instant translation, and optionally save it to their personal Leitner Box for later review.

This repository contains the **browser extension** layer of the LeitnerBox system.


## Purpose

The goal of this extension is to reduce friction in vocabulary learning by integrating translation and word collection directly into the browsing experience, without disrupting the user’s workflow.


## Core Features

- Detect selected text on any webpage
- Instant translation inside a lightweight popup
- Save words to a personal Leitner Box
- User authentication (register / login)
- Sync vocabulary with a backend API
- Works across all websites


## Tech Stack & Decisions

- **Vite + React 18**  
  Fast development experience and predictable component architecture.

- **TypeScript**  
  Strong typing across content scripts, background scripts, and UI.

- **CRXJS (Vite Plugin)**  
  Reliable Manifest v3 support and proper extension builds.

- **Tailwind CSS v4**  
  Utility-first styling with minimal runtime overhead.

- **pnpm**  
  Fast, deterministic dependency management.

- **Zustand (optional)**  
  Lightweight state management for auth and shared extension state.


## Project Structure

```

src/
├─ background/        # Background service worker (API sync, auth, messaging)
│  └─ index.ts
├─ content/           # Runs on webpages (text selection, DOM interaction)
│  └─ index.ts
├─ popup/             # Extension popup UI (React)
│  ├─ App.tsx
│  └─ index.tsx
├─ store/             # Global state (auth, user data)
│  └─ auth.store.ts
├─ services/          # API & external service abstractions
│  ├─ api.ts
│  └─ translate.ts
├─ utils/             # Shared helpers
└─ types/             # Shared TypeScript types

````

## Installation

Install dependencies:

```bash
pnpm install
````

## Development Workflow

The extension is developed using **build watch mode** to ensure real files are generated inside the `dist` directory.
This avoids unstable localhost-based setups and matches real Chrome extension behavior.

### 1. Start watch mode

```bash
pnpm build --watch
```

### 2. Load the extension in Chrome

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `dist` folder

### 3. Iteration cycle

* Make changes in `src/`
* The watcher rebuilds automatically
* Click **Refresh (🔄)** on the extension card to apply updates


## Production Build

To create a production-ready build for the Chrome Web Store:

```bash
pnpm build
```

The final output will be available in the `dist` directory.

## Project Status

This project is under active development and evolving incrementally with a focus on stability, performance, and clean architecture.
