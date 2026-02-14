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
**Current Version:** v1.2 – Quality & Stability Hardening (Completed)

The application is fully functional, feature complete, accessibility-aligned, performance-audited, and test-verified.

v1.2 focused strictly on stability, correctness, accessibility, performance, and documentation alignment.  
v1.2 hardening phase is now complete.

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

The application guarantees:

- No silent crashes
- Corrupted localStorage never breaks runtime
- Retry mode never pollutes base quiz state
- Stable `lastResult` structure
- Deterministic and explicit state transitions

All transitions are predictable and guarded.

---

# 3. CORE FEATURES

## Quiz Flow

- Start → Questions → Result
- Multiple choice answers
- Score calculation
- Accuracy calculation
- Result screen
- Deterministic retry mode

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

The following always hold:

- Retry never overwrites `lastResult`
- Retry never mutates base quiz history
- `weakQuestions` reflects actual incorrect answers only
- Exiting retry restores deterministic base state

Violation of any invariant is a critical regression.

---

# 5. STATE INTEGRITY GUARANTEES

The following invariants are enforced:

- `lastResult` structure is stable
- `weakQuestions` is always an object
- Retry mode never pollutes normal question pool
- Exiting retry restores `mode = normal`
- localStorage parsing never throws
- Empty question pools never cause runtime crashes
- No redundant localStorage writes
- No unnecessary re-renders in audited components

---

# 6. CURRENT PROJECT STATUS

## v1.1 (Stable Baseline)

Completed:

- Data consistency fixes
- Retry logic stabilization
- lastResult alignment
- Initial test coverage
- Stable release baseline

---

## v1.2 – Quality & Stability Hardening (Completed)

### Weak Question Tracking Improvements

STATUS: COMPLETED

- Consistent updates on wrong answers
- Deterministic retry cleanup
- Corruption guards
- Dedicated unit tests
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

STATUS: COMPLETED

- Empty question pool handling
- Invalid category/difficulty guards
- Hardened localStorage parsing in `statsSlice`
- Defensive guards in `quizSlice`
- No silent runtime crashes

---

### Accessibility Improvements (Non-Visual)

STATUS: COMPLETED

- ARIA labels for icon-only buttons
- Dialog roles and aria attributes for modals
- ESC closes modal
- Enter activates focused buttons
- Focus preservation on modal open/close
- No visual redesign

---

### Performance Review

STATUS: COMPLETED

- Zustand slices audited for minimal immutable updates
- Redundant localStorage writes eliminated
- Stable callbacks introduced in QuestionCard and Header
- Prevented unnecessary re-renders
- Hook ordering corrected
- No behavioral changes introduced

---

### Documentation Alignment

STATUS: COMPLETED

- README aligned with v1.2
- Retry flow formally documented
- Invariants defined and enforced
- Architecture clarified

---

# 7. TESTING STATUS

Test coverage includes:

- Store-level logic tests
- Retry integration tests
- Timer behavior tests
- QuestionCard interaction tests
- lastResult structure validation
- Modal rendering tests
- Basic happy-path smoke test

All tests passing.

---

# 8. KNOWN LIMITATIONS

- No backend
- No authentication
- No server persistence
- No deployment automation
- No analytics

These are intentionally out-of-scope.

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
- Accessibility aligned
- Performance audited
- Test covered
- Stable (v1.2 hardened baseline)

Retry logic is deterministic and protected by integration tests.

All future work must remain aligned with this document.
