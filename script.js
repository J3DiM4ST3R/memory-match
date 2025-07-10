const board = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('time');

const symbols = ['🍎', '🍌', '🍇', '🍓', '🍊', '🍉', '🥝', '🍍'];
let cards = [];
let flippedCards = [];
let lockBoard = false;
let timeLeft = 60;
let timer;
let gameOver = false;

function createBoard() {
  const doubledSymbols = [...symbols, ...symbols]; // Create pairs
  const shuffled = doubledSymbols.sort(() => 0.5 - Math.random());

  board.innerHTML = '';
  flippedCards = [];
  lockBoard = false;
  gameOver = false;
  timeLeft = 60;
  timerDisplay.textContent = timeLeft;
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);

  shuffled.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.innerText = symbol;

    card.addEventListener('click', handleFlip);
    board.appendChild(card);
  });
}

function handleFlip(e) {
  if (gameOver) return;

  const card = e.target;
  if (lockBoard || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    lockBoard = true;
    const [first, second] = flippedCards;

    if (first.dataset.symbol === second.dataset.symbol) {
      flippedCards = [];
      lockBoard = false;

      // Check for win
      const allFlipped = document.querySelectorAll('.card.flipped').length;
      if (allFlipped === symbols.length * 2) {
        clearInterval(timer);
        document.body.classList.add('win-animation');
        setTimeout(() => alert("🎉 You won!"), 300);
        gameOver = true;
      }
    } else {
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        flippedCards = [];
        lockBoard = false;
      }, 800);
    }
  }
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timer);
    lockBoard = true;
    gameOver = true;
    alert("⏰ Time's up! Try again.");
  }
}

resetBtn.addEventListener('click', createBoard);

// Init game on load
createBoard();
