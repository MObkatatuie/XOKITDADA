// Game variables
let currentPlayer = 'X';
let isGameOver = false;
let board = ['', '', '', '', '', '', '', '', ''];

// Function to check for a win
const checkWin = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true; // We have a winner
        }
    }

    return false; // No winner yet
};

// Function to check for a tie
const checkTie = () => {
    return board.every(cell => cell !== '');
};

// Function to handle cell click
const handleCellClick = (event) => {
    const cellIndex = event.target.dataset.index;

    // Check if the cell is empty and the game is not over
    if (board[cellIndex] === '' && !isGameOver) {
        board[cellIndex] = currentPlayer;
        renderBoard();

        // Check for a win
        if (checkWin()) {
            document.getElementById('message').textContent = `${currentPlayer} wins!`;
            isGameOver = true;
        } else if (checkTie()) {
            document.getElementById('message').textContent = 'It\'s a tie!';
            isGameOver = true;
        } else {
            // Switch player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            // If the next move is AI's, make the move
            if (currentPlayer === 'O' && !isGameOver) {
                makeAIMove();
            }
        }
    }
};

// Function to render the game board
const renderBoard = () => {
    const boardElement = document.querySelector('.board');
    boardElement.innerHTML = '';

    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.dataset.index = index;
        boardElement.appendChild(cellElement);
    });
};

// Function for AI to make a move
const makeAIMove = () => {
    // Get empty cells
    const emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    // Randomly choose an empty cell
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const aiMove = emptyCells[randomIndex];

    // Make the AI move after a short delay to make it more human-like
    setTimeout(() => {
        board[aiMove] = currentPlayer;
        renderBoard();

        // Check for a win after AI's move
        if (checkWin()) {
            document.getElementById('message').textContent = 'AI wins!';
            isGameOver = true;
        } else if (checkTie()) {
            document.getElementById('message').textContent = 'It\'s a tie!';
            isGameOver = true;
        } else {
            // Switch player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }, 500);
};

// Function to reset the game
const resetGame = () => {
    currentPlayer = 'X';
    isGameOver = false;
    board = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('message').textContent = '';
    renderBoard();
};

// Function to initialize the game
const initGame = () => {
    const boardElement = document.querySelector('.board');

    // Add event listener to each cell
    boardElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('cell')) {
            handleCellClick(event);
        }
    });
};

// Initialize the game
initGame();
