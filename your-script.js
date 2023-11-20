let currentPlayer = 'X';
let isGameOver = false;
let board = ['', '', '', '', '', '', '', '', ''];

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

const checkTie = () => {
    return board.every(cell => cell !== '');
};

const handleCellClick = (event) => {
    const cellIndex = event.target.dataset.index;

    if (board[cellIndex] === '' && !isGameOver) {
        board[cellIndex] = currentPlayer;
        renderBoard();

        if (checkWin()) {
            document.getElementById('message').textContent = `${currentPlayer} wins!`;
            isGameOver = true;
        } else if (checkTie()) {
            document.getElementById('message').textContent = 'It\'s a tie!';
            isGameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O' && !isGameOver) {
                makeAIMove();
            }
        }
    }
};

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

const makeAIMove = () => {
    const bestMove = minimax(board, 'O').index;
    board[bestMove] = 'O';
    renderBoard();

    if (checkWin()) {
        document.getElementById('message').textContent = 'AI wins!';
        isGameOver = true;
    } else if (checkTie()) {
        document.getElementById('message').textContent = 'It\'s a tie!';
        isGameOver = true;
    } else {
        currentPlayer = 'X';
    }
};

const minimax = (board, player) => {
    const availableMoves = emptyCells(board);

    if (checkWin(board, 'X')) {
        return { score: -1 };
    } else if (checkWin(board, 'O')) {
        return { score: 1 };
    } else if (availableMoves.length === 0) {
        return { score: 0 };
    }

    const moves = [];
    for (let i = 0; i < availableMoves.length; i++) {
        const move = {};
        move.index = board[availableMoves[i]];
        board[availableMoves[i]] = player;

        if (player === 'O') {
            const result = minimax(board, 'X');
            move.score = result.score;
        } else {
            const result = minimax(board, 'O');
            move.score = result.score;
        }

        board[availableMoves[i]] = '';
        moves.push(move);
    }

    let bestMove;
    if (player === 'O') {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
};

