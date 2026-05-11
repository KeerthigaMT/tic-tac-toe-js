"use strict";

window.addEventListener('load', app);

let gameBoard = ['', '', '', '', '', '', '', '', '']; 
let turn = 0; // Keeps track if X or O player's turn
let winner = false;

// CREATE PLAYER
const player = (name) => {
  return {name};
};

 let playerX = player("");
 let playerY = player("");

 // INITIALIZE APP
function app() {
  document.querySelector('.input-field').focus();

  const addPlayerForm = document.getElementById('player-form');
  addPlayerForm.addEventListener('submit', addPlayers);

  let replayButton = document.querySelector('.replay-btn');
  replayButton.addEventListener('click', resetBoard);
  
  // Add input event listeners to clear error message
  const player1Input = document.getElementById('player1');
  const player2Input = document.getElementById('player2');
  player1Input.addEventListener('input', clearFormError);
  player2Input.addEventListener('input', clearFormError);
  player1Input.addEventListener('focus', clearFormError);
  player2Input.addEventListener('focus', clearFormError);
}

// Clear form error message
function clearFormError() {
  const errorContainer = document.getElementById('form-error');
  errorContainer.textContent = '';
  errorContainer.style.display = 'none';
}

// Show form error message
function showFormError(message) {
  const errorContainer = document.getElementById('form-error');
  errorContainer.textContent = message;
  errorContainer.style.display = 'block';
}

// Add PLAYERS
function addPlayers(event) {
  event.preventDefault();

  // Get and trim player names
  const player1Name = this.player1.value.trim();
  const player2Name = this.player2.value.trim();

  // Check if names are empty or only whitespace
  if (player1Name === '' || player2Name === '') {
    showFormError('Please enter a name for each player');
    return;
  }

  // Check if names exceed maximum length
  const maxLength = 20;
  if (player1Name.length > maxLength || player2Name.length > maxLength) {
    showFormError(`Names must be between 1 and ${maxLength} characters`);
    return;
  }

  const playerFormContainer = document.querySelector('.enter-players');
  const boardMain = document.querySelector('.board__main');
  playerFormContainer.classList.add('hide-container');
  boardMain.classList.remove('hide-container');

  playerX.name = player1Name;
  playerY.name = player2Name;
  buildBoard();
}

// RETURN CURRENT PLAYER
function currentPlayer() {
  return turn % 2 === 0 ? 'X' : 'O';
}

// Resize squares in event browser is resized
window.addEventListener("resize", onResize);
function onResize() {
  let allCells = document.querySelectorAll('.board__cell');
  let cellHeight = allCells[0].offsetWidth;
  
  allCells.forEach( cell => {
    cell.style.height = `${cellHeight}px`;
  });
}

// Build Board
function buildBoard() {
  let resetContainer = document.querySelector('.reset');
  resetContainer.classList.remove('reset--hidden');

  onResize();
  addCellClickListener();
  changeBoardHeaderNames();
}

// CELL CLICK EVENT FOR PLAYER TO ATTEMPT TO MAKE MOVE
function makeMove(event) {
  console.log(turn);
  
  let currentCell = parseInt(event.currentTarget.firstElementChild.dataset.id);
  let cellToAddToken = document.querySelector(`[data-id='${currentCell}']`);
  let cellContainer = event.currentTarget;
  
  if (cellToAddToken.innerHTML !== '') {
    console.log('This cell is already taken.');
    return;
  } else {
    const player = currentPlayer();
    cellToAddToken.textContent = player;
    gameBoard[currentCell] = player;
    
    // Update aria-label for screen readers
    const row = cellContainer.getAttribute('data-row');
    const col = cellContainer.getAttribute('data-col');
    cellContainer.setAttribute('aria-label', `Row ${row}, Column ${col}, ${player}`);
  }
    
  // CHECK IF WE HAVE A WINNER
  const hasWinner = isWinner();
  
  // Only check for tie if there's no winner
  if (!hasWinner) {
    checkIfTie();
  }
    
  // Update turn count so next player can choose
  turn ++;

  // CHANGE BOARD HEADER INFO
  changeBoardHeaderNames();
}

function checkIfTie() {
  // Check if board is full (all 9 cells occupied) and no winner
  const boardFull = gameBoard.every(cell => cell !== '');
  
  if (boardFull && !winner) {
    let currentPlayerText = document.querySelector('.board___player-turn');
    currentPlayerText.textContent = '';
    
    const tieDiv = document.createElement('div');
    tieDiv.className = 'congratulations';
    tieDiv.textContent = "It's a tie!";
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'u-r-winner';
    messageDiv.textContent = 'Game over - no winner';
    
    currentPlayerText.appendChild(tieDiv);
    currentPlayerText.appendChild(messageDiv);
    
    // Announce to screen readers
    announceToScreenReader("It's a tie! Game over with no winner.");
    
    removeCellClickListener();
    return true;
  }
  
  return false;
}

function isWinner() {
  const winningSequences = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningSequences.length; i++) {
    const winningCombos = winningSequences[i];
    let cell1 = winningCombos[0];
    let cell2 = winningCombos[1];
    let cell3 = winningCombos[2];
    
    if (
      gameBoard[cell1] === currentPlayer() &&
      gameBoard[cell2] === currentPlayer() &&
      gameBoard[cell3] === currentPlayer()
    ) {
      const cells = document.querySelectorAll('.board__cell');
      
      cells.forEach( cell => {
        let cellId = cell.firstElementChild.dataset.id;	

        if (cellId == cell1 || cellId == cell2 || cellId == cell3 ) {
          cell.classList.add('board__cell--winner');
        }
      });

      let currentPlayerText = document.querySelector('.board___player-turn');
      currentPlayerText.textContent = '';
      
      const congratsDiv = document.createElement('div');
      congratsDiv.className = 'congratulations';
      const winnerName = currentPlayer() === 'X' ? playerX.name : playerY.name;
      congratsDiv.textContent = 'Congratulations ' + winnerName;
      
      const winnerDiv = document.createElement('div');
      winnerDiv.className = 'u-r-winner';
      winnerDiv.textContent = 'You are our winner!';
      
      currentPlayerText.appendChild(congratsDiv);
      currentPlayerText.appendChild(winnerDiv);
      
      // Announce to screen readers
      announceToScreenReader(`${winnerName} wins! Congratulations!`);
      
      winner = true;
      removeCellClickListener();
      return true;
    }
  }

  return false;
}

function changeBoardHeaderNames() {
  if (!winner) {
    let currentPlayerText = document.querySelector('.board___player-turn');
    currentPlayerText.textContent = '';
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'name--style';
    nameSpan.textContent = currentPlayer() === 'X' ? playerX.name : playerY.name;
    
    const messageText = document.createTextNode(', you are up' + (currentPlayer() === 'X' ? '!' : '.'));
    
    const winnerDiv = document.createElement('div');
    winnerDiv.className = 'u-r-winner';
    
    currentPlayerText.appendChild(nameSpan);
    currentPlayerText.appendChild(messageText);
    currentPlayerText.appendChild(winnerDiv);
  }
}

function resetBoard() {
  console.log('resetting');
  
  gameBoard = ['', '', '', '', '', '', '', '', '']; 
  
  // Reset cell contents and winner styles
  let cellToAddToken = document.querySelectorAll('.letter');
  cellToAddToken.forEach( square => {
    square.textContent = '';
    square.parentElement.classList.remove('board__cell--winner');
  });
  
  // Reset aria-labels for all cells
  const allCells = document.querySelectorAll('.board__cell');
  allCells.forEach( cell => {
    const row = cell.getAttribute('data-row');
    const col = cell.getAttribute('data-col');
    cell.setAttribute('aria-label', `Row ${row}, Column ${col}, empty`);
  });

  turn = 0;
  winner = false;

  let currentPlayerText = document.querySelector('.board___player-turn');
  currentPlayerText.textContent = '';
  
  const nameSpan = document.createElement('span');
  nameSpan.className = 'name--style';
  nameSpan.textContent = playerX.name;
  
  const messageText = document.createTextNode(', you are up!');
  
  const winnerDiv = document.createElement('div');
  winnerDiv.className = 'u-r-winner';
  
  currentPlayerText.appendChild(nameSpan);
  currentPlayerText.appendChild(messageText);
  currentPlayerText.appendChild(winnerDiv);
  
  // Clear screen reader announcement
  const announcement = document.getElementById('game-status-announcement');
  if (announcement) {
    announcement.textContent = '';
  }

  addCellClickListener();
}

function addCellClickListener() {
  const cells = document.querySelectorAll('.board__cell');
  cells.forEach( cell => {
    cell.addEventListener('click', makeMove);
    cell.addEventListener('keydown', handleCellKeydown);
  });
}

function removeCellClickListener() {
  let allCells = document.querySelectorAll('.board__cell');
  allCells.forEach( cell => {
    cell.removeEventListener('click', makeMove);
    cell.removeEventListener('keydown', handleCellKeydown);
  });
}

// Handle keyboard events on cells (Enter or Space key)
function handleCellKeydown(event) {
  // Only handle Enter or Space keys
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault(); // Prevent page scroll on Space
    makeMove(event);
  }
}

// Announce game state changes to screen readers
function announceToScreenReader(message) {
  const announcement = document.getElementById('game-status-announcement');
  if (announcement) {
    // Clear and set new message
    announcement.textContent = '';
    // Small delay to ensure screen readers pick up the change
    setTimeout(() => {
      announcement.textContent = message;
    }, 100);
  }
}

