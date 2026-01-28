const gameArea = document.getElementById("gameArea");
const inputField = document.getElementById("inputField");
const gameOverScreen = document.getElementById("gameOver");
const mainMenu = document.getElementById("mainMenu");

document.getElementById("restartButton").addEventListener("click", startGame);
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("mainButton").addEventListener("click", () => {
  stopGame();
  showMainMenu();
});

inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (handleInput(inputField.value)) {
      inputField.value = "";
    }
  }
});

function createWordElement(text) {
  const word = document.createElement("div");
  word.className = "word";
  word.innerText = text;
  word.style.left = Math.random() * (gameArea.clientWidth - 100) + "px";
  word.style.top = "0px";
  word.style.position = "absolute";
  gameArea.appendChild(word);
  return word;
}

function removeWordElement(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

function fadeOutWord(element) {
  element.classList.add("fadeOut");
  element.addEventListener("animationend", () => {
    removeWordElement(element);
  });
}

function getGameAreaHeight() {
  return gameArea.clientHeight;
}

function showGameOverScreen() {
  gameOverScreen.style.display = "block";
  inputField.style.display = "none";
  gameArea.style.display = "none";
}

function hideMainMenu() {
  mainMenu.style.display = "none";
  gameOverScreen.style.display = "none";
  gameArea.style.display = "block";
  inputField.style.display = "block";
}

function showMainMenu() {
  mainMenu.style.display = "block";
  gameOverScreen.style.display = "none";
  inputField.style.display = "none";
  gameArea.style.display = "none";
}

function resetUI() {
  inputField.value = "";
  inputField.focus();
}
