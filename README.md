# React Quiz Engine

A modern, feature-complete **client-side quiz application built with React**, focused on clean architecture, predictable state management, verified implementation quality, and controlled incremental hardening.

This repository now represents **v1.2 – Quality & Stability Hardening**.

---

## Project Status

- Feature complete
- Structurally verified
- Architecture aligned with internal context document
- Accessibility improvements implemented (non-visual)
- Performance audited
- Unit and integration tests passing
- Basic happy-path smoke test coverage added
- No backend / no server-side persistence

This version serves as a **stable, hardened baseline** for future controlled development.

---

## What changed in v1.2

### Weak Question Tracking Improvements

- Consistent `weakQuestions` accumulation
- Deterministic retry cleanup behavior
- Guarded against corrupted `weakQuestions` state
- Dedicated unit tests added

### Retry Mode Integration Tests

- Full retry flow covered:
  - finish quiz → retry wrong → complete retry → result
- Validated mode transitions (`normal` → `retry` → `normal`)
- Ensured `lastResult` is never overwritten during retry

### Edge-Case Hardening

- Empty question pools handled safely
- Invalid category/difficulty combinations guarded
- Corrupted `localStorage` parsing hardened in `statsSlice`
- Defensive guards added in `quizSlice`
- No silent crashes allowed

### Accessibility Improvements (Non-Visual)

- ARIA labels added to:
  - Icon-only buttons
  - Modal overlay
- ESC closes modal
- Enter confirms focused button action
- No visual redesign

### Performance & Cleanup

- Audited Zustand state updates for minimal mutation
- Removed unnecessary function recreation in header
- Verified no redundant `localStorage` writes
- Prevented unnecessary header re-renders
- No behavioral changes introduced

### Testing Improvements

- Strengthened unit coverage
- Retry integration coverage added
- Basic happy-path smoke test:
  - Start quiz → answer → finish → result

---

## Core Features

### Quiz Flow

- Start → questions → result
- Multiple-choice questions
- Score & accuracy calculation
- Result screen on completion
- Deterministic retry mode

### Settings & Configuration

- Difficulty selection (easy / normal / hard)
- Question count per quiz
- Sound toggle
- Timer toggle
- Adjustable time per question

### UX Enhancements

- Progress bar
- Per-question timer
- Streak indicator
- Last result modal
- Light / Dark theme (persistent)

### Statistics

- Best score tracking
- Accuracy calculation
- Difficulty-based statistics
- Streak tracking
- Persistent last result
- Weak question tracking

---

## Architecture Overview

### Tech Stack

- React
- Vite
- Zustand
- JavaScript (ES6+)
- localStorage (validated & hardened)

---

## Architecture Diagram (High-Level)

             ┌────────────────────┐
             │      React UI      │
             │--------------------│
             │ Header / Question  │
             │ Settings / Modals  │
             │ Progress / Footer  │
             └─────────┬──────────┘
                       │
                       ▼
             ┌────────────────────┐
             │   useQuizStore     │
             │  (Zustand Store)   │
             └─────────┬──────────┘
                       │
    ┌──────────────────┼──────────────────┐
    ▼                  ▼                  ▼

quizSlice settingsSlice statsSlice
(quiz flow) (user config) (history,
persistence)

                       ▼
                    uiSlice
                (UI flags / modals)

### Architectural Principles

- Single source of truth: `useQuizStore`
- Slice isolation (no accidental cross-mutation)
- Retry mode as controlled state machine extension
- localStorage treated as non-trustworthy input
- Deterministic state transitions only
- No silent runtime crashes

---

## State Structure

Global state is composed of isolated slices:

- `quizSlice` – quiz flow logic
- `settingsSlice` – user-configurable options
- `statsSlice` – statistics and historical data
- `uiSlice` – UI flags and modal control

All state transitions are explicit and validated.

---

## Project Structure

```
src/
├─ components/
│ ├─ header/
│ ├─ footer/
│ ├─ question/
│ │ └─ tests/
│ ├─ settings/
│ ├─ progress/
│ ├─ pages/
│ └─ store/
│ ├─ slices/
│ └─ tests/
├─ styles/
│ ├─ base/
│ ├─ layout/
│ ├─ components/
├─ utils/
├─ App.jsx
└─ main.jsx

```

All directories are explicitly verified.

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

---

### Installation

```bash
npm install
```

Start the development server:

```Bash
npm run dev
```

---

## Versioning & Releases

- Current release: v1.2
- Previous stable baseline: v1.1
- Controlled incremental releases
- No uncontrolled refactors

---

## Testing

Unit and integration tests are implemented at:

- Store level
- Component level

Covered areas:

- Quiz flow logic
- Timer behavior
- Retry mode transitions
- weakQuestions handling
- lastResult structure validation
- Modal rendering
- QuestionCard interaction
- Basic happy-path smoke test

Run tests:

```Bash
npm test
```

## Built With

- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Vitest](https://vitest.dev/) - Unit testing framework

---

## Question Sources

Two supported data sources:

1. Local question data (src/data/questions.jsx)
2. Public Trivia API (Open Trivia Database)

If API category is unsupported:

- Error is handled gracefully
- No crash occurs

---

## Contributing / Support

- Avoid architectural refactors without discussion
- Maintain slice isolation
- Preserve invariants:
  - Stable lastResult structure
  - Retry mode isolation
  - Safe localStorage parsing
  - No state corruption

- All changes must be deterministic

---

## Author

This project is maintained by Duško Vokić.
You can reach out via:

- GitHub: https://github.com/D-vokic
- Website: https://duskovokic.com

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- React community for best practices and tooling
- Zustand for lightweight state management
- Vitest for fast and reliable testing
