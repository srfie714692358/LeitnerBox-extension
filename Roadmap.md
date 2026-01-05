# Leitner Box – Roadmap

## Phase 1 – Extension Core (MVP)
- [x] Project setup with Vite + CRXJS
- [x] Manifest v3 configuration
- [x] Content script for text selection
- [x]  Translation API + hook (Refactored to generic architecture)
- [x] Get definition of word API + hook (Implemented generic architecture)
- [ ] Split text to words
- [ ] Translate words just by one request
- [ ] Use these APIs in background * the extension should translate and get definition in background. It will be a option that user will be able to turn it on/off in settings
- [ ] Popup UI with Tailwind for show result * The result should have two tabs, 1. Show the translation and save button, 2. Show definition of words and save button
- [ ] Save word locally (temporary storage)
- [ ] Update readme.md file.

## Phase 2 – Leitner System
- [ ] Leitner Box levels
- [ ] Review scheduling
- [ ] Word statistics
- [ ] Progress indicators

## Phase 3 – Authentication & Sync
- [ ] User registration from extension
- [ ] User login / logout
- [ ] Token-based authentication
- [ ] Sync words with backend
- [ ] Error & loading states

## Phase 4 – UX & Polish
- [ ] Animations & transitions
- [ ] Keyboard shortcuts
- [ ] Dark mode
- [ ] Settings page

## Phase 5 – Release
- [ ] Chrome Web Store preparation
- [ ] Production build
- [ ] Documentation finalization