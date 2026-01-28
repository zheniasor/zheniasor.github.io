const words = [
  "storm",
  "light",
  "shadow",
  "dream",
  "stone",
  "mirror",
  "fire",
  "cloud",
  "whisper",
  "magic",
  "forest",
  "dust",
  "blade",
  "ice",
  "moon",
  "hunter",
  "echo",
  "ghost",
  "spark",
  "field",
];

let activeWords = [];
let wordLoopTimeout = null;
let gameOver = false;
let speedMultiplier = 1;

function getSpeed(word) {
  if (word.length <= 5) return 40;
  else if (word.length <= 10) return 60;
  else return 80;
}

function stopGame() {
  gameOver = true;
  if (wordLoopTimeout) clearTimeout(wordLoopTimeout);
  activeWords.forEach((w) => {
    clearInterval(w.interval);
    removeWordElement(w.element);
  });
  activeWords = [];
}

function triggerGameOver() {
  stopGame();
  showGameOverScreen();
}

function startGame() {
  gameOver = false;
  hideMainMenu();
  resetUI();
  loopWords();
}

async function loopWords() {
  while (!gameOver) {
    await new Promise((resolve) => {
      wordLoopTimeout = setTimeout(() => {
        createWord();
        resolve();
      }, 1000 + Math.random() * 1000);
    });
  }
}

function createWord() {
  if (gameOver) return;

  const available = words.filter((w) => !activeWords.some((a) => a.text === w));
  if (available.length === 0) return;

  const wordText = available[Math.floor(Math.random() * available.length)];
  const wordElement = createWordElement(wordText);
  const speed = getSpeed(wordText);
  const interval = fallWord(wordElement, speed, wordText);

  activeWords.push({ element: wordElement, text: wordText, interval });
}

function fallWord(word, speed, text) {
  let top = 0;
  const fallInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(fallInterval);
      return;
    }

    top += 2;
    word.style.top = top + "px";

    if (top + word.offsetHeight >= getGameAreaHeight()) {
      clearInterval(fallInterval);
      removeWordElement(word);
      if (!gameOver) triggerGameOver();
    }
  }, speed);

  return fallInterval;
}

function removeActiveWord(wordObj) {
  clearInterval(wordObj.interval);
  wordObj.element.remove();
  activeWords = activeWords.filter((w) => w !== wordObj);
}

function handleInput(typedText) {
  const typed = typedText.trim().toLowerCase();
  const match = activeWords.find((w) => w.text === typed);
  if (match) {
    match.element.classList.add("fadeOut");

    match.element.addEventListener("animationend", () => {
      removeActiveWord(match);
    });

    return true;
  }
  return false;
}
