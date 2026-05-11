import { describe, it, expect } from 'vitest';
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

describe('gameEngine smoke tests', () => {
  it('should export WINNING_SEQUENCES constant', () => {
    expect(WINNING_SEQUENCES).toBeDefined();
    expect(WINNING_SEQUENCES).toHaveLength(8);
  });

  it('should get current player X on turn 0', () => {
    expect(getCurrentPlayer(0)).toBe('X');
  });

  it('should get current player O on turn 1', () => {
    expect(getCurrentPlayer(1)).toBe('O');
  });

  it('should create an empty board with 9 cells', () => {
    const board = createEmptyBoard();
    expect(board).toHaveLength(9);
    expect(board.every(cell => cell === '')).toBe(true);
  });

  it('should validate empty cell as valid move', () => {
    const board = createEmptyBoard();
    expect(isValidMove(board, 0)).toBe(true);
  });

  it('should validate occupied cell as invalid move', () => {
    const board = createEmptyBoard();
    board[0] = 'X';
    expect(isValidMove(board, 0)).toBe(false);
  });

  it('should make a valid move', () => {
    const board = createEmptyBoard();
    const result = makeMove(board, 0, 'X');
    expect(result).toBe(true);
    expect(board[0]).toBe('X');
  });

  it('should reject invalid move on occupied cell', () => {
    const board = createEmptyBoard();
    board[0] = 'X';
    const result = makeMove(board, 0, 'O');
    expect(result).toBe(false);
    expect(board[0]).toBe('X');
  });

  it('should detect horizontal winner', () => {
    const board = ['X', 'X', 'X', '', '', '', '', '', ''];
    const winner = checkWinner(board, 'X');
    expect(winner).toEqual([0, 1, 2]);
  });

  it('should return null when no winner', () => {
    const board = createEmptyBoard();
    const winner = checkWinner(board, 'X');
    expect(winner).toBeNull();
  });

  it('should detect tie on full board', () => {
    const board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
    expect(isTie(board)).toBe(true);
  });

  it('should not detect tie on empty board', () => {
    const board = createEmptyBoard();
    expect(isTie(board)).toBe(false);
  });

  it('should return playing status for empty board', () => {
    const board = createEmptyBoard();
    const state = getGameState(board, 0);
    expect(state.status).toBe('playing');
    expect(state.winner).toBeNull();
  });

  it('should return won status for winning board', () => {
    const board = ['X', 'X', 'X', '', '', '', '', '', ''];
    const state = getGameState(board, 0);
    expect(state.status).toBe('won');
    expect(state.winner).toBe('X');
    expect(state.winningSequence).toEqual([0, 1, 2]);
  });

  it('should return tie status for full board with no winner', () => {
    const board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
    const state = getGameState(board, 8);
    expect(state.status).toBe('tie');
    expect(state.winner).toBeNull();
  });
});
