document.addEventListener("DOMContentLoaded", () => {
  const playersContainer = document.getElementById("players");
  const user1 = document.getElementById("user1");
  const user2 = document.getElementById("user2");
  const rollButton = document.getElementById("rollButton");
  const removeSumButton = document.getElementById("removeSumButton");
  const removeNumbersButton = document.getElementById("removeNumbersButton");
  const skipTurnButton = document.getElementById("skipTurnButton");
  const message = document.getElementById("message");

  let players = [];
  let currentPlayerIndex = 0;
  let diceResult1 = 0;
  let diceResult2 = 0;
  let sumOfNumber = 0;

  function initializeGame() {
    players = [
      { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    ];
    renderPlayers(players); 
    rollButton.disabled = false;
    removeSumButton.disabled = true;
    removeNumbersButton.disabled = true;
    skipTurnButton.disabled = true;
    message.textContent = `Ход игрока ${currentPlayerIndex + 1}`;
  }

  function rollDice() {
    diceResult1 = Math.floor(Math.random() * 6) + 1;
    diceResult2 = Math.floor(Math.random() * 6) + 1;
    sumOfNumber = diceResult1 + diceResult2;
    user1.textContent = diceResult1;
    user2.textContent = diceResult2;
    sum.textContent = sumOfNumber;
    rollButton.disabled = true;
    removeSumButton.disabled = false;
    removeNumbersButton.disabled = false;
    skipTurnButton.disabled = false;
  }

  function removeSum() {
    const sum = sumOfNumber;
    const player = players[currentPlayerIndex];
    if (player.numbers.includes(sum)) {
      player.numbers = player.numbers.filter((num) => num !== sum);
      checkWin();
      nextTurn();
    } else {
      message.textContent = `Сумма ${sum} не найдена у игрока ${
        currentPlayerIndex + 1
      }`;
    }
  }

  function removeNumbers() {
    const player = players[currentPlayerIndex];
    player.numbers = player.numbers.filter(
      (num) => num !== diceResult1 && num !== diceResult2
    );
    checkWin();
    nextTurn();
  }

  function skipTurn() {
    nextTurn();
  }

  function checkWin() {
    if (players[currentPlayerIndex].numbers.length === 0) {
      message.textContent = `Игрок ${currentPlayerIndex + 1} победил!`;
      rollButton.disabled = true;
      removeSumButton.disabled = true;
      removeNumbersButton.disabled = true;
      skipTurnButton.disabled = true;
    } else {
      renderPlayers(players); 
    }
  }

  function nextTurn() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    message.textContent = `Ход игрока ${currentPlayerIndex + 1}`;
    rollButton.disabled = false;
    removeSumButton.disabled = true;
    removeNumbersButton.disabled = true;
    skipTurnButton.disabled = true;
  }

  rollButton.addEventListener("click", rollDice);
  removeSumButton.addEventListener("click", removeSum);
  removeNumbersButton.addEventListener("click", removeNumbers);
  skipTurnButton.addEventListener("click", skipTurn);

  initializeGame();
});