const makeAIMove = () => {
    // ตรวจสอบการเดาที่ชนะหรือการบล็อก
    const winningMove = findWinningMove('O');
    const blockingMove = findWinningMove('X');

    if (winningMove !== -1) {
        makeMove(winningMove);
    } else if (blockingMove !== -1) {
        makeMove(blockingMove);
    } else {
        // พิจารณาตำแหน่งกลางก่อน, จากนั้นถึงมุม, แล้วถึงขอบ
        const center = 4;
        if (board[center] === '') {
            makeMove(center);
        } else {
            const corners = [0, 2, 6, 8].filter(i => board[i] === '');
            const edges = [1, 3, 5, 7].filter(i => board[i] === '');
            const availableMoves = corners.length > 0 ? corners : edges;
            
            if (availableMoves.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableMoves.length);
                const aiMove = availableMoves[randomIndex];
                makeMove(aiMove);
            }
        }
    }
};

const findWinningMove = (player) => {
    // ตรวจสอบที่เดาที่ชนะหรือการบล็อก
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = player;
            if (checkWin()) {
                board[i] = ''; // รีเซ็ตที่เดา
                return i;
            }
            board[i] = ''; // รีเซ็ตที่เดา
        }
    }
    return -1;
};

const makeMove = (index) => {
    board[index] = 'O';
    renderBoard();
    checkGameStatus();
};
