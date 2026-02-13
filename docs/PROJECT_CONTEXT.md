# REACT QUIZ APPLICATION

PROJECT CONTEXT DOCUMENT

This document defines the current verified state of the React Quiz Application.  
If something is not written here, it does not exist.

---

# 1. PROJECT OVERVIEW

**Project Name:** React Quiz Application  
**Stack:** Vite + React + Zustand  
**State Management:** Single global Zustand store (`useQuizStore.jsx`)  
**Version Baseline:** v1.1 (Stable Release)  
**Current Phase:** v1.2 – Quality & Stability Hardening (In Progress)

The application is fully functional and feature complete as of v1.1.  
v1.2 focuses strictly on stability, correctness, accessibility, performance, and documentation alignment.

---

# 2. ARCHITECTURAL PRINCIPLES

## Single Source of Truth

All global state flows through:

useQuizStore.jsx

State is divided into isolated slices:

- `quizSlice` – quiz flow logic
- `settingsSlice` – user-configurable options
- `statsSlice` – statistics and historical data
- `uiSlice` – UI flags and modal visibility

No slice may silently mutate another slice.

---

## Deterministic State Transitions

The application must:

- Never crash silently
- Never allow corrupted localStorage to break runtime
- Never allow retry mode to pollute base quiz state
- Maintain stable `lastResult` structure

All transitions must be explicit and predictable.

---

# 3. CORE FEATURES

## Quiz Flow

- Start → Questions → Result
- Multiple choice answers
- Score calculation
- Accuracy calculation
- Result screen
- Retry incorrect questions

## Settings

- Difficulty selection
- Question limit per quiz
- Sound toggle
- Timer toggle
- Time per question slider

## Statistics

- Best score
- Streak tracking
- Difficulty-based stats
- Weak question tracking
- Persistent last result

---

# 4. RETRY FLOW – FULL ARCHITECTURAL DESCRIPTION

Retry mode is a controlled extension of normal quiz mode.

It is implemented in `quizSlice`.

---

## 4.1 Entry Condition

Retry mode is entered only through:

startRetryWrong()

Conditions:

- `weakQuestions` must exist
- Only questions with `wrong > 0` are included
- Retry pool must not be empty

If no retryable questions exist:

- No state change occurs

---

## 4.2 Retry Initialization

When retry starts:

- `mode` becomes `"retry"`
- `status` becomes `"quiz"`
- `questions` replaced with retry pool
- `answersLog` reset
- `currentIndex` reset
- `score` reset

Retry must never:

- Overwrite `lastResult`
- Mutate historical statistics incorrectly
- Mix retry pool with normal pool

---

## 4.3 Retry Completion

When final retry question is answered:

If correct:

- Question removed from `weakQuestions`
- Updated `weakQuestions` persisted
- `mode` resets to `"normal"`
- `status` becomes `"result"`

If incorrect:

- `weakQuestions` remains
- `mode` resets to `"normal"`
- `status` becomes `"result"`

Retry always exits deterministically to normal mode.

---

## 4.4 Retry Invariants

The following must always hold:

- Retry never overwrites `lastResult`
- Retry never mutates base quiz history
- `weakQuestions` reflects actual incorrect answers only
- Exiting retry restores deterministic base state

Violation of any invariant is a critical regression.

---

# 5. STATE INTEGRITY GUARANTEES

The following invariants are mandatory:

- `lastResult` structure is stable
- `weakQuestions` is always an object
- `retry` mode never pollutes normal question pool
- Exiting retry restores `mode = normal`
- localStorage parsing never throws
- Empty question pools never cause runtime crashes

---

# 6. CURRENT PROJECT STATUS

## v1.1 (Released – Stable)

Completed:

- Data consistency fixes
- Retry logic stabilization
- lastResult alignment
- UI-data semantic cleanup
- Basic test coverage
- Stable release baseline

---

## v1.2 – Quality & Stability Hardening

### Weak Question Tracking Improvements

STATUS: COMPLETED

- Consistent updates on wrong answers
- Retry cleanup verified
- Corruption guard added
- Dedicated unit tests added
- Integration behavior verified

---

### Retry Mode Integration Tests

STATUS: COMPLETED

- Full retry flow tested:
  - Finish quiz
  - Retry wrong
  - Complete retry
  - Result
- Mode transitions validated (`normal → retry → normal`)
- lastResult protection verified
- Deterministic integration coverage added

---

### Edge-Case Hardening

STATUS: PARTIALLY COMPLETED

Completed:

- Empty question pool handling
- Invalid category/difficulty guards
- Hardened localStorage parsing in `statsSlice`
- Defensive guards in `quizSlice`
- Additional edge-case tests

Remaining (optional refinement):

- Additional localStorage corruption test depth

---

### Accessibility Improvements

STATUS: NOT STARTED

Planned:

- ARIA labels for icon-only buttons
- ESC to close modal
- Improved keyboard interaction
- Focus preservation
- No visual redesign

---

### Performance Review

STATUS: NOT STARTED

Planned:

- Audit Zustand updates
- Reduce redundant localStorage writes
- Prevent unnecessary re-renders in QuestionCard
- Avoid unstable callback recreation

---

### Documentation Alignment

STATUS: IN PROGRESS

- Retry flow description added
- Architectural clarity expanded
- Invariant documentation formalized

---

# 7. TESTING REQUIREMENTS

All new logic must include:

- Deterministic unit tests
- No flaky timers
- No reliance on real timers without mocks
- No snapshot-only validation for logic

Integration tests must validate:

- State transitions
- Mode boundaries
- Retry isolation
- Result protection

Test coverage must remain stable or increase.

---

# 8. KNOWN LIMITATIONS

- No backend
- No authentication
- No server persistence
- No deployment automation
- No analytics

These are out-of-scope.

---

# 9. RULES FOR CONTINUING WORK

Mandatory:

- No assumptions
- No refactors without explicit instruction
- No UX changes without approval
- One file at a time
- Return full file content when editing
- Explicitly state when no change is required
- Respect architectural invariants

Forbidden:

- Guessing intent
- Multi-file changes
- Silent architectural drift
- Unprompted redesigns
- Breaking retry invariants

---

# 10. FINAL DECLARATION

This project is:

- Feature complete
- Structurally verified
- Implementationally verified
- Stable (v1.1 baseline)
- In controlled v1.2 hardening phase

Retry logic is deterministic and protected by integration tests.

All future work must remain aligned with this document.
