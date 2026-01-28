let board = [];
let currentPlayer = "X";
let moveCount = 0;
let gameOver = false;
let winCondition = 3;

const initializeBoard = (gridSize, updateStatus) => {
  board = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));
  moveCount = 0;
  gameOver = false;
  updateStatus(`Ход номер 1. Сейчас ходит ${currentPlayer}`);
};

const checkWin = (row, col) => {
  const check = (dx, dy) =>
    1 + countDirection(row, col, dx, dy) + countDirection(row, col, -dx, -dy) >=
    winCondition;

  return check(1, 0) || check(0, 1) || check(1, 1) || check(1, -1);
};

const handleCellClick = (row, col, updateStatus) => {
  if (gameOver) return;

  if (board[row][col] !== "") return;

  board[row][col] = currentPlayer;
  moveCount++;

  if (checkWin(row, col)) {
    updateStatus(`На ходу ${moveCount} победил ${currentPlayer}`);
    gameOver = true;
    return;
  }

  if (moveCount === board.length * board.length) {
    updateStatus(`На ходу ${moveCount} ничья`);
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus(`Ход номер ${moveCount + 1}. Сейчас ходит ${currentPlayer}`);
};

const countDirection = (row, col, dx, dy) => {
  let count = 0;
  let x = row + dx;
  let y = col + dy;

  while (
    x >= 0 &&
    x < board.length &&
    y >= 0 &&
    y < board.length &&
    board[x][y] === currentPlayer
  ) {
    count++;
    x += dx;
    y += dy;
  }

  return count;
};
