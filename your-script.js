// Function for AI to make a move using Minimax Algorithm
const makeAIMove = () => {
    // Find the best move using Minimax
    const bestMove = minimax(board, currentPlayer).index;

    // Make the AI move after a short delay to make it more human-like
    setTimeout(() => {
        board[bestMove] = currentPlayer;
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

// Minimax Algorithm
const minimax = (board, player) => {
    // Get empty cells
    const emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    // Check terminal states (win, lose, tie)
    if (checkWin()) {
        return { score: -1 };
    } else if (checkWin('O')) {
        return { score: 1 };
    } else if (emptyCells.length === 0) {
        return { score: 0 };
    }

    // Collect all possible moves and their scores
    const moves = [];
    for (let i = 0; i < emptyCells.length; i++) {
        const move = {};
        move.index = emptyCells[i];
        board[emptyCells[i]] = player;

        if (player === 'O') {
            const result = minimax(board, 'X');
            move.score = result.score;
        } else {
            const result = minimax(board, 'O');
            move.score = result.score;
        }

        // Reset the board after trying a move
        board[emptyCells[i]] = '';
        moves.push(move);
    }

    // Choose the best move
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

    // Return the chosen move and its score
    return moves[bestMove];
};
