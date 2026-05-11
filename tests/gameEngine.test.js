import { describe, it, expect, beforeEach } from 'vitest';
import {
  getCurrentPlayer,
  isValidMove,
  makeMove,
  checkWinner,
  isTie,
  createEmptyBoard,
  getGameState,
  WINNING_SEQUENCES
} from '../js/gameEngine.js';

describe('gameEngine', () => {
  describe('WINNING_SEQUENCES constant', () => {
    it('should export all 8 winning sequences', () => {
      expect(WINNING_SEQUENCES).toBeDefined();
      expect(WINNING_SEQUENCES).toHaveLength(8);
    });

    it('should include 3 row sequences', () => {
      expect(WINNING_SEQUENCES).toContainEqual([0, 1, 2]);
      expect(WINNING_SEQUENCES).toContainEqual([3, 4, 5]);
      expect(WINNING_SEQUENCES).toContainEqual([6, 7, 8]);
    });

    it('should include 3 column sequences', () => {
      expect(WINNING_SEQUENCES).toContainEqual([0, 3, 6]);
      expect(WINNING_SEQUENCES).toContainEqual([1, 4, 7]);
      expect(WINNING_SEQUENCES).toContainEqual([2, 5, 8]);
    });

    it('should include 2 diagonal sequences', () => {
      expect(WINNING_SEQUENCES).toContainEqual([0, 4, 8]);
      expect(WINNING_SEQUENCES).toContainEqual([2, 4, 6]);
    });
  });

  describe('createEmptyBoard', () => {
    it('should create a board with 9 cells', () => {
      const board = createEmptyBoard();
      expect(board).toHaveLength(9);
    });

    it('should create a board with all empty strings', () => {
      const board = createEmptyBoard();
      expect(board.every(cell => cell === '')).toBe(true);
    });

    it('should return a new array each time', () => {
      const board1 = createEmptyBoard();
      const board2 = createEmptyBoard();
      expect(board1).not.toBe(board2);
    });
  });

  describe('getCurrentPlayer', () => {
    it('should return X on turn 0', () => {
      expect(getCurrentPlayer(0)).toBe('X');
    });

    it('should return O on turn 1', () => {
      expect(getCurrentPlayer(1)).toBe('O');
    });

    it('should return X on turn 2', () => {
      expect(getCurrentPlayer(2)).toBe('X');
    });

    it('should return O on turn 3', () => {
      expect(getCurrentPlayer(3)).toBe('O');
    });

    it('should alternate correctly for even turns (X)', () => {
      expect(getCurrentPlayer(0)).toBe('X');
      expect(getCurrentPlayer(4)).toBe('X');
      expect(getCurrentPlayer(8)).toBe('X');
    });

    it('should alternate correctly for odd turns (O)', () => {
      expect(getCurrentPlayer(1)).toBe('O');
      expect(getCurrentPlayer(5)).toBe('O');
      expect(getCurrentPlayer(9)).toBe('O');
    });
  });

  describe('isValidMove', () => {
    let board;

    beforeEach(() => {
      board = createEmptyBoard();
    });

    it('should return true for empty cell', () => {
      expect(isValidMove(board, 0)).toBe(true);
      expect(isValidMove(board, 4)).toBe(true);
      expect(isValidMove(board, 8)).toBe(true);
    });

    it('should return false for occupied cell', () => {
      board[0] = 'X';
      board[4] = 'O';
      expect(isValidMove(board, 0)).toBe(false);
      expect(isValidMove(board, 4)).toBe(false);
    });

    it('should return false for invalid cell index (negative)', () => {
      expect(isValidMove(board, -1)).toBe(false);
    });

    it('should return false for invalid cell index (too large)', () => {
      expect(isValidMove(board, 9)).toBe(false);
      expect(isValidMove(board, 10)).toBe(false);
    });

    it('should validate all empty cells on new board', () => {
      for (let i = 0; i < 9; i++) {
        expect(isValidMove(board, i)).toBe(true);
      }
    });
  });

  describe('makeMove', () => {
    let board;

    beforeEach(() => {
      board = createEmptyBoard();
    });

    it('should place X on empty cell and return true', () => {
      const result = makeMove(board, 0, 'X');
      expect(result).toBe(true);
      expect(board[0]).toBe('X');
    });

    it('should place O on empty cell and return true', () => {
      const result = makeMove(board, 4, 'O');
      expect(result).toBe(true);
      expect(board[4]).toBe('O');
    });

    it('should reject move on occupied cell and return false', () => {
      board[0] = 'X';
      const result = makeMove(board, 0, 'O');
      expect(result).toBe(false);
      expect(board[0]).toBe('X'); // Original value unchanged
    });

    it('should not modify board when move is invalid', () => {
      board[5] = 'O';
      const originalBoard = [...board];
      makeMove(board, 5, 'X');
      expect(board).toEqual(originalBoard);
    });

    it('should handle sequential moves correctly', () => {
      expect(makeMove(board, 0, 'X')).toBe(true);
      expect(makeMove(board, 1, 'O')).toBe(true);
      expect(makeMove(board, 2, 'X')).toBe(true);
      expect(board[0]).toBe('X');
      expect(board[1]).toBe('O');
      expect(board[2]).toBe('X');
    });
  });

  describe('checkWinner - Row Wins', () => {
    it('should detect X winning on top row (0,1,2)', () => {
      const board = ['X', 'X', 'X', '', '', '', '', '', ''];
      const result = checkWinner(board, 'X');
      expect(result).toEqual([0, 1, 2]);
    });

    it('should detect O winning on top row (0,1,2)', () => {
      const board = ['O', 'O', 'O', '', '', '', '', '', ''];
      const result = checkWinner(board, 'O');
      expect(result).toEqual([0, 1, 2]);
    });

    it('should detect X winning on middle row (3,4,5)', () => {
      const board = ['', '', '', 'X', 'X', 'X', '', '', ''];
      const result = checkWinner(board, 'X');
      expect(result).toEqual([3, 4, 5]);
    });

    it('should detect O winning on middle row (3,4,5)', () => {
      const board = ['', '', '', 'O', 'O', 'O', '', '', ''];
      const result = checkWinner(board, 'O');
      expect(result).toEqual([3, 4, 5]);
    });

    it('should detect X winning on bottom row (6,7,8)', () => {
      const board = ['', '', '', '', '', '', 'X', 'X', 'X'];
      const result = checkWinner(board, 'X');
      expect(result).toEqual([6, 7, 8]);
    });

    it('should detect O winning on bottom row (6,7,8)', () => {
      const board = ['', '', '', '', '', '', 'O', 'O', 'O'];
      const result = checkWinner(board, 'O');
      expect(result).toEqual([6, 7, 8]);
    });
  });

  describe('checkWinner - Column Wins', () => {
    it('should detect X winning on left column (0,3,6)', () => {
      const board = ['X', '', '', 'X', '', '', 'X', '', ''];
      const result = checkWinner(board, 'X');
      expect(result).toEqual([0, 3, 6]);
    });

    it('should detect O winning on left column (0,3,6)', () => {
      const board = ['O', '', '', 'O', '', '', 'O', '', ''];
      const result = checkWinner(board, 'O');
      expect(result).toEqual([0, 3, 6]);
    });

    it('should detect X winning on middle column (1,4,7)', () => {
      const board = ['', 'X', '', '', 'X', '', '', 'X', ''];
      const result = checkWinner(board, 'X');
      expect(result).toEqual([1, 4, 7]);
    });

    it('should detect O winning on middle column (1,4,7)', () => {
      const board = ['', 'O', '', '', 'O', '', '', 'O', ''];
      const result = checkWinner(board, 'O');
      expect(result).toEqual([1, 4, 7]);
    });

    it('should detect X winning on right column (2,5,8)', () => {
      const board = ['', '', 'X', '', '', 'X', '', '', 'X'];
      const result = checkWinner(board, 'X');
      expect(result).toEqual([2, 5, 8]);
    });

    it('should detect O winning on right column (2,5,8)', () => {
      const board = ['', '', 'O', '', '', 'O', '', '', 'O'];
      const result = checkWinner(board, 'O');
      expect(result).toEqual([2, 5, 8]);
    });
  });

  describe('checkWinner - Diagonal Wins', () => {
    it('should detect X winning on main diagonal (0,4,8)', () => {
      const board = ['X', '', '', '', 'X', '', '', '', 'X'];
      const result = checkWinner(board, 'X');
      expect(result).toEqual([0, 4, 8]);
    });

    it('should detect O winning on main diagonal (0,4,8)', () => {
      const board = ['O', '', '', '', 'O', '', '', '', 'O'];
      const result = checkWinner(board, 'O');
      expect(result).toEqual([0, 4, 8]);
    });

    it('should detect X winning on anti-diagonal (2,4,6)', () => {
      const board = ['', '', 'X', '', 'X', '', 'X', '', ''];
      const result = checkWinner(board, 'X');
      expect(result).toEqual([2, 4, 6]);
    });

    it('should detect O winning on anti-diagonal (2,4,6)', () => {
      const board = ['', '', 'O', '', 'O', '', 'O', '', ''];
      const result = checkWinner(board, 'O');
      expect(result).toEqual([2, 4, 6]);
    });
  });

  describe('checkWinner - No Winner Cases', () => {
    it('should return null for empty board', () => {
      const board = createEmptyBoard();
      expect(checkWinner(board, 'X')).toBeNull();
      expect(checkWinner(board, 'O')).toBeNull();
    });

    it('should return null for partial board with no winner', () => {
      const board = ['X', 'O', '', 'O', 'X', '', '', '', ''];
      expect(checkWinner(board, 'X')).toBeNull();
      expect(checkWinner(board, 'O')).toBeNull();
    });

    it('should return null when checking wrong player', () => {
      const board = ['X', 'X', 'X', '', '', '', '', '', ''];
      expect(checkWinner(board, 'O')).toBeNull();
    });

    it('should return null for tie game (full board, no winner)', () => {
      const board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
      expect(checkWinner(board, 'X')).toBeNull();
      expect(checkWinner(board, 'O')).toBeNull();
    });
  });

  describe('isTie - Critical Edge Cases', () => {
    it('should return true for tie on 9th move with no winner', () => {
      // This is the tie game scenario: board full, no winner
      const board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
      expect(isTie(board)).toBe(true);
    });

    it('should return false when board is not full', () => {
      const board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', ''];
      expect(isTie(board)).toBe(false);
    });

    it('should return false for empty board', () => {
      const board = createEmptyBoard();
      expect(isTie(board)).toBe(false);
    });

    it('should return false for partially filled board', () => {
      const board = ['X', '', 'O', '', 'X', '', '', '', ''];
      expect(isTie(board)).toBe(false);
    });

    it('should return true even if winner exists on full board (isTie only checks fullness)', () => {
      // Note: isTie function only checks if board is full
      // The game logic should check winner BEFORE checking tie
      const board = ['X', 'X', 'X', 'O', 'O', 'X', 'O', 'X', 'O'];
      expect(isTie(board)).toBe(true);
    });
  });

  describe('getGameState - Comprehensive Game State Testing', () => {
    it('should return playing status for empty board', () => {
      const board = createEmptyBoard();
      const state = getGameState(board, 0);
      expect(state.status).toBe('playing');
      expect(state.winner).toBeNull();
      expect(state.winningSequence).toBeNull();
    });

    it('should return playing status for partial game', () => {
      const board = ['X', 'O', '', '', 'X', '', '', '', ''];
      const state = getGameState(board, 3);
      expect(state.status).toBe('playing');
      expect(state.winner).toBeNull();
    });

    it('should return won status when X wins', () => {
      const board = ['X', 'X', 'X', '', '', '', '', '', ''];
      const state = getGameState(board, 0);
      expect(state.status).toBe('won');
      expect(state.winner).toBe('X');
      expect(state.winningSequence).toEqual([0, 1, 2]);
    });

    it('should return won status when O wins', () => {
      const board = ['', '', '', 'O', 'O', 'O', '', '', ''];
      const state = getGameState(board, 1);
      expect(state.status).toBe('won');
      expect(state.winner).toBe('O');
      expect(state.winningSequence).toEqual([3, 4, 5]);
    });

    it('should return tie status for full board with no winner', () => {
      const board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
      const state = getGameState(board, 8);
      expect(state.status).toBe('tie');
      expect(state.winner).toBeNull();
      expect(state.winningSequence).toBeNull();
    });

    it('should prioritize win over tie when both conditions exist (win on 9th move)', () => {
      // Critical test: X wins on move 9 (last cell) - should be 'won', not 'tie'
      const board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
      const state = getGameState(board, 8); // Turn 8 = 9th move (0-indexed)
      expect(state.status).toBe('won');
      expect(state.winner).toBe('X');
      expect(state.winningSequence).toEqual([0, 4, 8]); // Main diagonal
    });

    it('should handle win on last move correctly (win on 9th move scenario)', () => {
      // O wins with bottom row on final move
      const board = ['X', 'X', 'O', 'X', 'O', 'X', 'O', 'O', 'O'];
      const state = getGameState(board, 7); // Turn 7 is O's turn (when O wins)
      expect(state.status).toBe('won');
      expect(state.winner).toBe('O');
      expect(state.winningSequence).toEqual([6, 7, 8]);
    });
  });

  describe('Invalid Move Scenarios', () => {
    it('should reject move on occupied cell', () => {
      const board = createEmptyBoard();
      makeMove(board, 0, 'X');
      const result = makeMove(board, 0, 'O');
      expect(result).toBe(false);
      expect(board[0]).toBe('X');
    });

    it('should not allow overwriting existing move', () => {
      const board = createEmptyBoard();
      makeMove(board, 4, 'O');
      const beforeState = [...board];
      makeMove(board, 4, 'X');
      expect(board).toEqual(beforeState);
    });

    it('should preserve board state when invalid move attempted', () => {
      const board = ['X', '', 'O', '', 'X', '', '', '', 'O'];
      const originalBoard = [...board];
      makeMove(board, 0, 'O'); // Try to overwrite X
      makeMove(board, 2, 'X'); // Try to overwrite O
      makeMove(board, 8, 'X'); // Try to overwrite O
      expect(board).toEqual(originalBoard);
    });
  });

  describe('Game Flow Integration', () => {
    it('should handle complete game leading to X win', () => {
      const board = createEmptyBoard();
      let turn = 0;

      // Simulate game: X wins with top row
      makeMove(board, 0, getCurrentPlayer(turn++)); // X
      makeMove(board, 3, getCurrentPlayer(turn++)); // O
      makeMove(board, 1, getCurrentPlayer(turn++)); // X
      makeMove(board, 4, getCurrentPlayer(turn++)); // O
      makeMove(board, 2, getCurrentPlayer(turn++)); // X wins

      const state = getGameState(board, turn - 1);
      expect(state.status).toBe('won');
      expect(state.winner).toBe('X');
      expect(state.winningSequence).toEqual([0, 1, 2]);
    });

    it('should handle complete game leading to tie', () => {
      const board = createEmptyBoard();
      const moves = [
        { cell: 0, player: 'X' }, // X
        { cell: 1, player: 'O' }, // O
        { cell: 2, player: 'X' }, // X
        { cell: 4, player: 'O' }, // O
        { cell: 3, player: 'X' }, // X
        { cell: 5, player: 'O' }, // O
        { cell: 7, player: 'X' }, // X
        { cell: 6, player: 'O' }, // O
        { cell: 8, player: 'X' }  // X
      ];

      moves.forEach(({ cell, player }) => {
        makeMove(board, cell, player);
      });

      // Board: X O X | X O O | O X X
      const state = getGameState(board, 8);
      expect(state.status).toBe('tie');
      expect(state.winner).toBeNull();
    });

    it('should detect winner before checking tie', () => {
      // Ensure game logic checks winner first, not tie
      const board = createEmptyBoard();
      
      // Fill board so X wins on last move
      const moves = [
        { cell: 0, player: 'X' },
        { cell: 1, player: 'O' },
        { cell: 4, player: 'X' },
        { cell: 2, player: 'O' },
        { cell: 3, player: 'X' },
        { cell: 5, player: 'O' },
        { cell: 6, player: 'X' },
        { cell: 7, player: 'O' },
        { cell: 8, player: 'X' } // X completes diagonal [0,4,8]
      ];

      moves.forEach(({ cell, player }) => {
        makeMove(board, cell, player);
      });

      const state = getGameState(board, 8);
      // Must be 'won', not 'tie', even though board is full
      expect(state.status).toBe('won');
      expect(state.winner).toBe('X');
    });
  });
});
