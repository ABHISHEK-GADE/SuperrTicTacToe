let currentPlayer;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const statusElement = document.getElementById('status');
const gameBoardElement = document.getElementById('game-board');

// Function to initialize the game board
function initGame() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        gameBoardElement.appendChild(cell);
    }

    // Randomly choose the starting player as 'X' or 'O'
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to handle cell click
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameBoard[index] === '' && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            statusElement.textContent = `Player ${currentPlayer} wins!`;
        } else if (gameBoard.every(cell => cell !== '')) {
            statusElement.textContent = 'It\'s a tie!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusElement.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}



// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    statusElement.textContent = 'Player X\'s turn';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

// Initialize the game
initGame();
