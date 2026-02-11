# PROJECT_CONTEXT.md

## React Quiz Application – Unified Project Context

**Location:** `/docs/PROJECT_CONTEXT.md`  
**Last updated:** After v1.1 release (Data Consistency & UX Polish)  
**Scope:** This document is the authoritative context for continuing development

---

## 1. PURPOSE OF THIS DOCUMENT

This document exists to:

- Provide a **single, reliable source of truth** about the current state of the project
- Eliminate assumptions, guesswork, and repeated explanations
- Allow an AI assistant or a new developer to **continue work safely and correctly**
- Prevent architectural drift, hallucinated requirements, or unintended refactors

If something is **not explicitly written here**, it must be treated as **non-existent**.

---

## 2. PROJECT OVERVIEW

**Project name:** React Quiz Application  
**Stack:** Vite + React  
**State management:** Zustand  
**Persistence:** localStorage (settings + statistics only)  
**Backend:** None  
**Deployment:** Not configured  
**Release status:** v1.1 released and tagged on GitHub

This is a **client-side quiz engine** with configurable settings, statistics tracking, and sound/timer support.

---

## 3. CURRENT PROJECT STATUS

### Overall Status

- Feature complete
- Structurally verified
- Implementationally verified (all source files read)
- Stable (no runtime-blocking issues)
- Unit tests passing
- **v1.1 release created**

### Active Phase

Post-release / maintenance only

Allowed work:

- Explicit bug fixes
- Explicitly requested feature extensions
- Refactors only if explicitly ordered

No speculative or proactive changes.

---

## 4. ARCHITECTURE SUMMARY

### Entry Points

- `src/main.jsx` – single bootstrap entry
- `src/App.jsx` – central application shell

### State Management

Centralized Zustand store:

- `useQuizStore.jsx`
- Slice-based composition:
  - `uiSlice`
  - `settingsSlice`
  - `quizSlice`
  - `statsSlice`

All global state flows through this store.  
No component manages cross-domain state locally.

---

## 5. FEATURE SET (VERIFIED WORKING)

### Core Quiz Flow

- Start page
- Question flow
- Answer selection
- Score tracking
- Result page
- Retry wrong answers mode

### Configuration

- Difficulty selection
- Question limit
- Sound on/off
- Timer on/off
- Time per question

### UX Enhancements

- Progress bar
- Streak indicator
- Last result preview
- Retry mode indicator (UI-supported)
- Light/Dark theme persistence

### Media

- Sound effects:
  - click
  - correct
  - wrong
  - finish

---

## 6. DATA & PERSISTENCE

### Local Data

- Questions loaded from:
  - `src/data/questions.jsx`

### Persistence via `localStorage`

- Settings (`quizSettings`)
- Statistics:
  - bestScore
  - difficultyStats
  - streak
  - weakQuestions
  - lastResult

### lastResult Data Model (v1.1)

`lastResult` now consistently contains:

- score
- accuracy
- weakCount

The previous UI–data semantic mismatch has been resolved.

No backend.  
No server synchronization.

---

## 7. TESTING STATE

### Unit Tests (Present & Passing)

- `QuestionCard.test.jsx`
- `QuestionCard.timer.test.jsx`
- `useQuizStore.test.js`
- Tests covering:
  - lastResult structure
  - LastResultModal rendering

No failing tests at time of verification.

---

## 8. VERIFIED PROJECT STRUCTURE

```
src/
├── assets/
│ └── sounds/
├── components/
│ ├── header/
│ ├── footer/
│ ├── progress/
│ ├── question/
│ └── settings/
├── data/
│ └── questions.jsx
├── pages/
│ ├── StartPage.jsx
│ └── ResultPage.jsx
├── store/
│ ├── slices/
│ ├── utils/
│ └── useQuizStore.jsx
├── styles/
├── layout/
├── utils/
├── App.jsx
└── main.jsx
```

All folders and files above were **explicitly reviewed**.

---

## 9. KNOWN LIMITATIONS (FACTUAL)

- No backend
- No authentication
- No server-side persistence
- No deployment configuration
- No analytics

These are **not bugs** — they are out-of-scope features.

---

## 10. RETRY MODE LOGIC (v1.1 VERIFIED)

Retry mode behavior is explicitly defined:

### Entry Condition

- Triggered via `startRetryWrong`
- Loads only questions marked as wrong
- Sets `mode = "retry"`
- Sets `status = "quiz"`

### Exit Condition

- On completion of retry question set:
  - `status = "result"`
  - `mode` automatically resets to `"normal"`

Retry state is now deterministic and locked.

---

## 11. RULES FOR CONTINUING WORK

### Mandatory Rules

- Do **not** assume missing features
- Do **not** refactor unless explicitly instructed
- Do **not** change UX or logic without approval
- Work **one file at a time**
- Always return **full file content** when editing
- If no change is needed, explicitly state:
  - `No changes required.`
  - `Task completed.`

### Forbidden Actions

- Guessing intent
- Suggesting improvements unprompted
- Multi-file changes
- Architectural changes without order
- Teaching or explanatory tone in code reviews

---

## 12. FINAL DECLARATION

This project is:

- Feature complete
- Structurally sound
- Implementationally verified
- Stable
- **Released as v1.1**
- Ready for controlled extension

Any future work should start **from this document**.

If this document and the code diverge,  
**the code must be re-verified before proceeding.**
