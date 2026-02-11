# React Quiz Engine

A modern, feature-complete **client-side quiz application built with React**, focused on clean architecture, predictable state management, and verified implementation quality.

This repository represents **v1.1 – Data Consistency & UX Polish**, following the initial stable release.

---

## Project Status

- Feature complete
- Structurally verified
- Implementation fully reviewed
- Stable (no runtime-blocking issues)
- Unit tests passing
- No backend / deployment configuration

This version serves as a **stable baseline** for future controlled development.

---

## What changed in v1.1

### Data Consistency

- `lastResult` data model aligned
- `weakCount` is now consistently defined and populated
- Removed documented UI–data semantic inconsistency

### Retry Mode Logic

- Explicit entry condition via `startRetryWrong`
- Explicit exit condition (automatic reset to `normal` mode on completion)
- Retry state behavior is now clearly defined and predictable

### Test Coverage

- Added tests for:
  - `lastResult` structure validation
  - `LastResultModal` rendering
- Strengthened results-related test coverage

### UX Polish

- Label and indicator consistency reviewed
- No flow changes
- No refactors

---

## Features

### Core Quiz Flow

- Start → questions → results
- Multiple-choice questions
- Score and accuracy calculation
- Result screen at quiz completion

### Settings & Configuration

- Difficulty selection (easy / normal / hard)
- Question count per quiz
- Sound on / off
- Timer on / off
- Time per question (range-based)

### UX Enhancements

- Progress bar
- Per-question timer with automatic timeout
- Streak indicator
- Last result preview modal
- Light / Dark theme with persistence

### Sound & Media

- Optional sound effects:
  - click
  - correct
  - wrong
  - finish

### Statistics

- Best score
- Accuracy tracking
- Difficulty-based stats
- Streak tracking
- Last result persistence

---

## Demo

Live demo (if available):  
https://react-quiz-engine.netlify.app/

---

## Architecture Overview

### Tech Stack

- React
- Vite
- Zustand
- JavaScript (ES6+)
- localStorage (settings & statistics)

### State Management

Global state is centralized in a **single Zustand store**, composed of isolated slices:

- `uiSlice` – UI state (status, theme, mode)
- `settingsSlice` – user-configurable settings (persistent)
- `quizSlice` – quiz flow and logic
- `statsSlice` – statistics and historical data

All cross-domain state flows through `useQuizStore`.

---

## Project Structure

The project follows a feature-based folder structure:

```

src/
├─ components/
│  ├─ header/
│  ├─ footer/
│  ├─ question/
│  ├─ settings/
│  ├─ progress/
│  ├─ pages/
├─ store/
│  ├─ slices/
│  │  ├─ quizSlice.js
│  │  ├─ settingsSlice.js
│  │  ├─ statsSlice.js
│  │  └─ uiSlice.js
│  └─ useQuizStore.jsx
├─ styles/
│  ├─ base/
│  ├─ layout/
│  ├─ components/
│  └─ index.css
├─ utils/
├─ main.jsx
└─ App.jsx

All files and folders above were **explicitly reviewed and verified**.

```

State management is split into dedicated Zustand slices:

- UI
- Settings
- Quiz logic
- Statistics

---

### Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

---

### Installation & Run

1. Clone the repository.
2. Install dependencies:

```Bash
npm install
```

3. Start the development server:

```Bash
npm run dev
```

---

## Versioning & Releases

- Current release: v1.1
- Previous stable baseline: v1.0
- Releases are tagged and published on GitHub
- Future changes should be tracked via new releases

---

## Usage

1. Start a new quiz from the start screen.
2. Answer questions manually or let the timer expire.
3. Track progress using the progress bar.
4. Open settings to adjust quiz behavior.
5. View results and statistics at the end of the quiz.
6. Retry incorrect questions to improve performance.

---

### Question Sources

The quiz supports two data sources:

- **Local question data** (default, from `src/data/questions.jsx`)
- **Public Trivia API** (Open Trivia Database)

### API Limitations

- The public API does **not support all categories**
- Some custom or niche quizzes are unavailable
- In unsupported cases, the app:
  - falls back to local data, or
  - shows an informational error message

A paid or custom API would be required for full category coverage.

---

## Testing

Unit tests are present and passing for:

- Quiz store logic
- Timer behavior
- QuestionCard interactions
- lastResult structure
- LastResultModal rendering

Run tests with:

```Bash
npm test
```

## Built With

- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Vitest](https://vitest.dev/) - Unit testing framework

---

## Contributing / Support

- Contributions are welcome. Feel free to open an issue or submit a pull request.
- Please avoid refactors or architectural changes without discussion
- All changes should be explicit and scoped.

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
