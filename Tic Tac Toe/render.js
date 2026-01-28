document.addEventListener("DOMContentLoaded", () => {
  const gridSizeInput = document.getElementById("grid-size");
  const winConditionInput = document.getElementById("win-condition");
  const resetButton = document.getElementById("reset-game");
  const gameBoard = document.getElementById("game-board");
  const status = document.getElementById("status");

  let gridSize = parseInt(gridSizeInput.value);
  let winCondition = parseInt(winConditionInput.value);

  const updateStatus = (message) => {
    status.textContent = message;
  };

  const renderBoard = () => {
      gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
    gameBoard.innerHTML = "";
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
      for (let colIndex = 0; colIndex < gridSize; colIndex++) {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.row = rowIndex;
        cellElement.dataset.col = colIndex;
        cellElement.textContent = board[rowIndex][colIndex];
        cellElement.addEventListener("click", (event) => {
          const row = parseInt(event.target.dataset.row);
          const col = parseInt(event.target.dataset.col);
          handleCellClick(row, col, updateStatus);
          renderBoard();
        });
        gameBoard.appendChild(cellElement);
      }
    }
  };

  gridSizeInput.addEventListener("input", () => {
    gridSize = parseInt(gridSizeInput.value);
    initializeBoard(gridSize, updateStatus);
    renderBoard();
  });

  winConditionInput.addEventListener("input", () => {
    winCondition = parseInt(winConditionInput.value);
    initializeBoard(gridSize, updateStatus);
    renderBoard();
  });

  resetButton.addEventListener("click", () => {
    initializeBoard(gridSize, updateStatus);
    renderBoard();
  });

  initializeBoard(gridSize, updateStatus);
  renderBoard();
});
