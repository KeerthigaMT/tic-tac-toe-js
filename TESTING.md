# Integration & Smoke Test Suite

This document provides comprehensive manual test scenarios to verify all critical user flows of the Tic Tac Toe application. These tests ensure that the UI, game engine, and all features work correctly end-to-end.

## Test Environment Setup

**Prerequisites:**
- Local dev server running (`npm run dev`)
- Browser with developer console open (for error monitoring)
- Screen reader available for accessibility testing (optional but recommended)

**Test Data:**
- Valid player names: "Alice", "Bob", "Player X", "Player O"
- XSS payload: `<img src=x onerror=alert(1)>`
- Empty/whitespace names: "", "   ", "\t\n"

---

## Test Suite Overview

| Test ID | Test Name | Priority | Status |
|---------|-----------|----------|--------|
| TS-001 | Valid Name Entry Flow | P0 | ⬜ |
| TS-002 | XSS Prevention Test | P0 | ⬜ |
| TS-003 | Empty Name Validation | P0 | ⬜ |
| TS-004 | Player X Wins (Row) | P0 | ⬜ |
| TS-005 | Player O Wins (Column) | P0 | ⬜ |
| TS-006 | Player Wins (Diagonal) | P0 | ⬜ |
| TS-007 | Tie on 9th Move | P0 | ⬜ |
| TS-008 | Win on 9th Move | P0 | ⬜ |
| TS-009 | Occupied Cell Rejection | P0 | ⬜ |
| TS-010 | Mid-Game Board Reset | P0 | ⬜ |
| TS-011 | Full Keyboard Navigation | P1 | ⬜ |
| TS-012 | Screen Reader Announcements | P1 | ⬜ |
| TS-013 | Winner Cell Animation | P2 | ⬜ |

---

## Detailed Test Scenarios

### TS-001: Valid Name Entry Flow

**Objective:** Verify that valid player names are accepted and displayed correctly throughout the game.

**Steps:**
1. Navigate to the application in a browser
2. Enter "Alice" in the first input field
3. Enter "Bob" in the second input field
4. Click "SUBMIT" button

**Expected Results:**
- ✅ Form disappears
- ✅ Game board is displayed
- ✅ Turn indicator shows "Alice's turn" or similar
- ✅ Player names are visible in turn indicator as game progresses
- ✅ No JavaScript errors in console

**Actual Results:** _[To be filled during test execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TS-002: XSS Prevention Test

**Objective:** Verify that XSS payloads in player names are rendered as plain text, not executed.

**Steps:**
1. Navigate to the application
2. Enter `<img src=x onerror=alert(1)>` in the first input field
3. Enter "Bob" in the second input field
4. Click "SUBMIT" button
5. Play at least one move
6. Observe the turn indicator and any winner messages

**Expected Results:**
- ✅ No alert dialog appears at any point
- ✅ The literal text `<img src=x onerror=alert(1)>` is displayed in the turn indicator
- ✅ HTML tags are rendered as plain text (visible angle brackets)
- ✅ Game functions normally
- ✅ No JavaScript errors in console

**Actual Results:** _[To be filled during test execution]_

**Status:** ⬜ Pass / ⬜ Fail

**Notes:** This is a critical security test. Any execution of the payload is a FAIL.

---

### TS-003: Empty Name Validation

**Objective:** Verify that empty or whitespace-only names are rejected with a helpful error message.

**Steps:**
1. Navigate to the application
2. Leave both name fields empty
3. Click "SUBMIT" button
4. Observe the error message
5. Enter "Alice" in first field, leave second field empty
6. Click "SUBMIT" button
7. Observe the error message

**Expected Results:**
- ✅ Form submission is prevented
- ✅ Inline error message is displayed (not an alert)
- ✅ Error message is styled with red/pink background
- ✅ Error message text is clear: "Both player names are required and cannot be empty."
- ✅ Form remains visible for correction
- ✅ After entering valid names, form submits successfully

**Actual Results:** _[To be filled during test execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TS-004: Player X Wins (Row)

**Objective:** Verify that X winning via a row is detected, displayed, and highlighted correctly.

**Steps:**
1. Start a new game with names "Alice" (X) and "Bob" (O)
2. Play the following sequence:
   - X clicks cell 0 (top-left)
   - O clicks cell 3 (middle-left)
   - X clicks cell 1 (top-center)
   - O clicks cell 4 (middle-center)
   - X clicks cell 2 (top-right)

**Expected Results:**
- ✅ Cells 0, 1, 2 display "X"
- ✅ Cells 0, 1, 2 have pink background color (#f9738a)
- ✅ Cells 0, 1, 2 display a brief pulse/scale animation
- ✅ Winner message displays: "Alice wins!" or similar
- ✅ Turn indicator updates to show the winner
- ✅ Board becomes unclickable (no further moves allowed)
- ✅ "Play again" button appears
- ✅ No "It's a tie!" message appears

**Actual Results:** _[To be filled during test execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TS-005: Player O Wins (Column)

**Objective:** Verify that O winning via a column is detected, displayed, and highlighted correctly.

**Steps:**
1. Start a new game with names "Alice" (X) and "Bob" (O)
2. Play the following sequence:
   - X clicks cell 0 (top-left)
   - O clicks cell 1 (top-center)
   - X clicks cell 3 (middle-left)
   - O clicks cell 4 (middle-center)
   - X clicks cell 8 (bottom-right)
   - O clicks cell 7 (bottom-center)

**Expected Results:**
- ✅ Cells 1, 4, 7 display "O"
- ✅ Cells 1, 4, 7 have pink background color (#f9738a)
- ✅ Cells 1, 4, 7 display a brief pulse/scale animation
- ✅ Winner message displays: "Bob wins!" or similar
- ✅ Turn indicator updates to show the winner
- ✅ Board becomes unclickable
- ✅ "Play again" button appears

**Actual Results:** _[To be filled during test execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TS-006: Player Wins (Diagonal)

**Objective:** Verify that winning via a diagonal is detected correctly.

**Steps:**
1. Start a new game with names "Alice" (X) and "Bob" (O)
2. Play the following sequence:
   - X clicks cell 0 (top-left)
   - O clicks cell 1 (top-center)
   - X clicks cell 4 (middle-center)
   - O clicks cell 2 (top-right)
   - X clicks cell 8 (bottom-right)

**Expected Results:**
- ✅ Cells 0, 4, 8 display "X"
- ✅ Cells 0, 4, 8 have pink background color
- ✅ Cells 0, 4, 8 display pulse animation
- ✅ Winner message displays for Alice
- ✅ "Play again" button appears

**Actual Results:** _[To be filled during test execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TS-007: Tie on 9th Move (Critical Edge Case)

**Objective:** Verify that a tie is correctly detected when the board fills without a winner.

**Steps:**
1. Start a new game with names "Alice" (X) and "Bob" (O)
2. Play the following sequence to create a tie:
   - X clicks cell 0
   - O clicks cell 1
   - X clicks cell 2
   - O clicks cell 3
   - X clicks cell 5
   - O clicks cell 4
   - X clicks cell 6
   - O clicks cell 8
   - X clicks cell 7

**Expected Results:**
- ✅ All 9 cells are filled
- ✅ No three-in-a-row exists
- ✅ Message displays: "It's a tie!" or similar
- ✅ NO cells are highlighted with pink background
- ✅ NO winner message appears
- ✅ NO alert() dialog appears
- ✅ "Play again" button appears
- ✅ Board becomes unclickable

**Actual Results:** _[To be filled during test execution]_

**Status:** ⬜ Pass / ⬜ Fail

**Notes:** This test verifies the fix for the tie detection bug (WO-004).

---

### TS-008: Win on 9th Move (Critical Edge Case)

**Objective:** Verify that a win on the last move correctly shows only the winner message, not a tie.

**Steps:**
1. Start a new game with names "Alice" (X) and "Bob" (O)
2. Play the following sequence:
   - X clicks cell 0
   - O clicks cell 1
   - X clicks cell 2
   - O clicks cell 3
   - X clicks cell 4
   - O clicks cell 5
   - X clicks cell 6
   - O clicks cell 7
   - X clicks cell 8

**Expected Results:**
- ✅ All 9 cells are filled
- ✅ Cells 0, 4, 8 are highlighted (X wins via main diagonal)
- ✅ Winner message displays for Alice
- ✅ NO "It's a tie!" message appears
- ✅ NO alert() dialog appears
- ✅ "Play again" button appears
- ✅ Winner cells show pulse animation

**Actual Results:** _[To be filled during test execution]_

**Status:** ⬜ Pass / ⬜ Fail

**Notes:** This test ensures that win detection takes precedence over tie detection when both conditions could theoretically be checked.

---

### TS-009: Occupied Cell Rejection

**Objective:** Verify that clicking an already-occupied cell is ignored.

**Steps:**
1. Start a new game
2. X clicks cell 4 (center)
3. Verify cell 4 shows "X"
4. O attempts to click cell 4 again
5. Observe the result

**Expected Results:**
- ✅ Cell 4 still shows "X" (not overwritten)
- ✅ Turn indicator still shows it's O's turn (turn did not advance)
- ✅ Console may log "This cell is already taken." (optional)
- ✅ Game continues normally when O clicks a different cell

**Actual Results:** _[To be filled during test execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TS-010: Mid-Game Board Reset

**Objective:** Verify that clicking "Play again" during an active game resets the board to a clean state.

**Steps:**
1. Start a new game with names "Alice" and "Bob"
2. Play 3-4 moves (do not complete the game)
3. Click "Play again" button
4. Observe the board state
5. Start playing a new game

**Expected Results:**
- ✅ All cells are cleared (empty)
- ✅ All cell background colors reset to default (pink board, no winner highlights)
- ✅ Turn indicator shows the first player's turn
- ✅ Turn counter resets to 0 (X starts)
- ✅ All cells are clickable again
- ✅ Cell aria-labels reset to "empty"
- ✅ Game plays normally from the reset state

**Actual Results:** _[To be filled during test execution]_

**Status:** ⬜ Pass / ⬜ Fail

---

### TS-011: Full Keyboard Navigation

**Objective:** Verify that the entire game can be played using only a keyboard (no mouse).

**Steps:**
1. Navigate to the application
2. Use **Tab** to navigate to the first name input field
3. Type "Alice" and press **Tab** to move to second field
4. Type "Bob" and press **Tab** to focus the SUBMIT button
5. Press **Enter** or **Space** to submit the form
6. Use **Tab** to navigate to the first board cell
7. Press **Enter** or **Space** to place X
8. Use **Tab** to navigate to another cell
9. Press **Enter** or **Space** to place O
10. Continue playing until the game ends using only keyboard
11. Use **Tab** to navigate to "Play again" button and press **Enter**

**Expected Results:**
- ✅ All interactive elements can be reached via Tab
- ✅ Form submits with Enter or Space on the button
- ✅ Board cells show clear focus indicator (orange outline, pink background)
- ✅ Cells respond to both Enter and Space key presses
- ✅ Game plays completely without mouse interaction
- ✅ "Play again" button is keyboard accessible
- ✅ Tab order is logical (left-to-right, top-to-bottom)

**Actual Results:** _[To be filled during test execution]_

**Status:** ⬜ Pass / ⬜ Fail

**Notes:** This test validates WCAG 2.1 Level AA keyboard accessibility (WO-013).

---

### TS-012: Screen Reader Announcements

**Objective:** Verify that screen reader users receive appropriate announcements for game state changes.

**Prerequisites:** Screen reader software (NVDA, JAWS, or VoiceOver)

**Steps:**
1. Enable screen reader
2. Navigate to the application
3. Complete the name entry form
4. Make a move by clicking a cell
5. Listen for turn announcements
6. Play until someone wins
7. Listen for winner announcement
8. Reset the board
9. Play until a tie occurs
10. Listen for tie announcement

**Expected Results:**
- ✅ Turn changes are announced politely: "Alice's turn" / "Bob's turn"
- ✅ Winner is announced assertively: "Alice wins! Congratulations!"
- ✅ Tie is announced assertively: "It's a tie! Game over with no winner."
- ✅ Cell states are announced: "Row 1, Column 1, empty" → "Row 1, Column 1, X"
- ✅ Announcements are clear and not overly verbose
- ✅ ARIA live regions are not announced redundantly

**Actual Results:** _[To be filled during test execution]_

**Status:** ⬜ Pass / ⬜ Fail

**Notes:** This test validates ARIA live region implementation (WO-014).

---

### TS-013: Winner Cell Animation

**Objective:** Verify that winning cells display a subtle pulse animation.

**Steps:**
1. Start a new game
2. Play until X or O wins
3. Observe the three winning cells immediately after the win
4. Use browser DevTools to inspect the animation properties

**Expected Results:**
- ✅ Winning cells display a brief scale/pulse animation
- ✅ Animation plays once (not looping)
- ✅ Animation duration is between 300ms and 800ms (target: 500ms)
- ✅ Cells scale slightly (e.g., to 1.08x) and return to normal
- ✅ A subtle glow/shadow effect is visible during animation
- ✅ Text remains readable throughout the animation
- ✅ Animation settles to the final highlighted state
- ✅ Non-winning cells do not animate

**Actual Results:** _[To be filled during test execution]_

**Status:** ⬜ Pass / ⬜ Fail

**Accessibility Check:**
- ✅ With `prefers-reduced-motion: reduce` enabled in browser settings, animation is disabled

**Notes:** This test validates the CSS pulse animation (WO-022).

---

## Test Execution Log

### Test Run #1

**Date:** _________________  
**Tester:** _________________  
**Environment:** _________________  
**Browser:** _________________  
**Pass Rate:** ____ / 13 tests

**Issues Found:**
1. _[List any bugs, inconsistencies, or failures]_
2. 
3. 

**Notes:**

---

## Regression Test Checklist

Run this quick checklist before any production deployment:

- [ ] Form accepts valid names and rejects empty names
- [ ] XSS payload is rendered as plain text (no script execution)
- [ ] X can win, O can win, tie can occur
- [ ] Win on 9th move shows winner (not tie)
- [ ] Tie on 9th move shows tie (not winner)
- [ ] Winning cells are highlighted and animated
- [ ] Board reset clears all state
- [ ] Full game playable via keyboard only
- [ ] No JavaScript errors in console
- [ ] Application loads and displays correctly

---

## Future Enhancements

The following tests would benefit from automation once the ES module refactor is complete:

1. **Automated Unit Tests for DOM Integration**
   - Use Vitest + jsdom to test `ui.js` rendering functions
   - Mock `gameEngine.js` and verify DOM updates

2. **Automated E2E Tests**
   - Use Playwright or Cypress for full browser automation
   - Record video of test execution
   - Parallel test execution for faster CI

3. **Visual Regression Testing**
   - Screenshot comparison for UI consistency
   - Animation validation

4. **Performance Testing**
   - Lighthouse CI for performance metrics
   - Memory leak detection during repeated games

---

## Appendix: Game Board Cell Reference

```
Cell Layout (data-id):
┌───┬───┬───┐
│ 0 │ 1 │ 2 │  Row 1
├───┼───┼───┤
│ 3 │ 4 │ 5 │  Row 2
├───┼───┼───┤
│ 6 │ 7 │ 8 │  Row 3
└───┴───┴───┘
Col Col Col
 1   2   3

Winning Sequences:
- Rows: [0,1,2], [3,4,5], [6,7,8]
- Columns: [0,3,6], [1,4,7], [2,5,8]
- Diagonals: [0,4,8], [2,4,6]
```

---

## Test Sign-Off

**Tested By:** _________________  
**Date:** _________________  
**Signature:** _________________

**Approved By:** _________________  
**Date:** _________________  
**Signature:** _________________
