# Changelog

All notable changes to this project will be documented in this file.

This project follows controlled, versioned releases.  
No uncontrolled refactors or undocumented architectural changes are allowed.

---

# [v1.2] – Quality & Stability Hardening

## Overview

v1.2 focused strictly on correctness, determinism, accessibility, performance auditing, and documentation alignment.  
No visual redesigns were introduced.

This release establishes a hardened, production-stable baseline.

---

## Added

### Retry Mode Integration Tests

- Full retry flow coverage:
  - Finish quiz
  - Retry wrong
  - Complete retry
  - Result screen
- Verified mode transitions (`normal → retry → normal`)
- Ensured `lastResult` is never overwritten during retry

### Weak Question Tracking Tests

- Dedicated unit tests for `weakQuestions`
- Guard tests for corrupted weakQuestions state

### Basic Smoke Test

- Happy-path coverage:
  - Start quiz → answer → finish → result

### Accessibility Improvements (Non-Visual)

- ARIA labels for icon-only buttons
- Proper dialog roles (`role="dialog"`, `aria-modal`)
- ESC closes modal
- Enter activates focused button
- Focus preservation on modal open/close

---

## Improved

### Weak Question Tracking

- Deterministic accumulation of `weakQuestions`
- Reliable cleanup after retry success
- Protected against invalid or corrupted state

### Edge-Case Handling

- Empty question pools handled safely
- Invalid category/difficulty combinations guarded
- Hardened `localStorage` parsing in `statsSlice`
- Defensive checks added in `quizSlice`
- No silent crashes allowed

### Performance & Cleanup

- Audited Zustand state updates for minimal immutable mutation
- Eliminated redundant `localStorage` writes
- Stabilized callbacks in `QuestionCard`
- Prevented unnecessary re-renders in header components
- Corrected hook ordering to respect React Rules of Hooks

### Documentation

- README fully aligned with v1.2 state
- PROJECT_CONTEXT.md expanded and formalized
- Retry flow documented as deterministic state machine extension
- Architectural invariants explicitly defined

---

## Verified

- Store-level logic tests passing
- Integration tests passing
- Timer behavior validated
- QuestionCard interactions validated
- Modal rendering verified
- Retry invariants enforced

---

## Breaking Changes

None.

---

# [v1.1] – Data Consistency & UX Alignment

## Overview

v1.1 stabilized the internal data model and aligned UI behavior with state structure.

---

## Added

- `lastResult` structural alignment
- Retry entry and exit condition hardening
- Additional test coverage for:
  - `lastResult`
  - Result modal rendering

---

## Fixed

- UI–data semantic inconsistency around `weakCount`
- Retry mode reset behavior
- Inconsistent result handling

---

## Refined

- Label consistency
- Indicator clarity
- Internal state predictability

---

## Breaking Changes

None.

---

# [v1.0] – Initial Stable Release

## Overview

Initial feature-complete release.

---

## Features

- Full quiz flow
- Multiple-choice question engine
- Score and accuracy calculation
- Difficulty selection
- Question limit configuration
- Timer support
- Sound effects
- Streak tracking
- Best score tracking
- Weak question tracking
- Retry incorrect questions
- Light/Dark theme
- Local question data
- Optional Public Trivia API support

---

## Architecture

- Vite + React
- Zustand single global store
- Slice-based state isolation
- localStorage persistence

---

## Known Limitations

- No backend
- No authentication
- No server persistence
- No analytics
- No deployment automation

---

# Release Policy

- Every release must be documented.
- No architectural drift without explicit versioning.
- All behavior changes must be deterministic.
- All state transitions must be validated by tests.

---

End of Changelog.
