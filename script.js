const board = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');

const symbols = ['🍎', '🍌', '🍇', '🍓', '🍊', '🍉', '🥝', '🍍'];
let cards = [];
let flippedCards = [];
let lockBoard = false;

function createBoard() {
  const doubledSymbols = [...symbols, ...symbols]; // Create pairs
  const shuffled = doubledSymbols.sort(() => 0.5 - Math.random());

  board.innerHTML = '';
  flippedCards = [];

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
        setTimeout(() => alert("🎉 You won!"), 300);
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

resetBtn.addEventListener('click', createBoard);

// Init game on load
createBoard();
