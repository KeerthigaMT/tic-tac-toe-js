/**
 * Pure game logic module for Tic Tac Toe
 * Contains state management and game rules without DOM dependencies
 */

/**
 * Winning sequences for Tic Tac Toe
 */
export const WINNING_SEQUENCES = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6]  // diagonal top-right to bottom-left
];

/**
 * Get the current player based on turn number
 * @param {number} turn - Current turn number
 * @returns {string} 'X' or 'O'
 */
export function getCurrentPlayer(turn) {
  return turn % 2 === 0 ? 'X' : 'O';
}

/**
 * Check if a cell is valid for a move
 * @param {Array<string>} board - Game board state
 * @param {number} cellIndex - Cell index (0-8)
 * @returns {boolean} true if cell is empty and index is valid
 */
export function isValidMove(board, cellIndex) {
  if (cellIndex < 0 || cellIndex > 8) {
    return false;
  }
  return board[cellIndex] === '';
}

/**
 * Make a move on the board
 * @param {Array<string>} board - Game board state (will be mutated)
 * @param {number} cellIndex - Cell index (0-8)
 * @param {string} player - Player token ('X' or 'O')
 * @returns {boolean} true if move was successful
 */
export function makeMove(board, cellIndex, player) {
  if (!isValidMove(board, cellIndex)) {
    return false;
  }
  board[cellIndex] = player;
  return true;
}

/**
 * Check if there's a winner
 * @param {Array<string>} board - Game board state
 * @param {string} player - Player to check ('X' or 'O')
 * @returns {Array<number>|null} Winning cell indices or null if no winner
 */
export function checkWinner(board, player) {
  for (const sequence of WINNING_SEQUENCES) {
    const [a, b, c] = sequence;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return sequence;
    }
  }
  return null;
}

/**
 * Check if the game is a tie
 * @param {Array<string>} board - Game board state
 * @returns {boolean} true if board is full and no winner
 */
export function isTie(board) {
  return board.every(cell => cell !== '');
}

/**
 * Reset the board to initial state
 * @returns {Array<string>} Empty board
 */
export function createEmptyBoard() {
  return ['', '', '', '', '', '', '', '', ''];
}

/**
 * Get game state
 * @param {Array<string>} board - Game board state
 * @param {number} turn - Current turn number
 * @returns {Object} Game state with status and details
 */
export function getGameState(board, turn) {
  const currentPlayer = getCurrentPlayer(turn);
  const winningSequence = checkWinner(board, currentPlayer);
  
  if (winningSequence) {
    return {
      status: 'won',
      winner: currentPlayer,
      winningSequence
    };
  }
  
  if (isTie(board)) {
    return {
      status: 'tie',
      winner: null,
      winningSequence: null
    };
  }
  
  return {
    status: 'playing',
    winner: null,
    winningSequence: null
  };
}
