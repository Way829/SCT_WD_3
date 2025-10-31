const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const pvpBtn = document.getElementById("pvpBtn");
const pvcBtn = document.getElementById("pvcBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;
let vsComputer = false;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => cellClick(index));
});

resetBtn.addEventListener("click", resetGame);
pvpBtn.addEventListener("click", () => setMode(false));
pvcBtn.addEventListener("click", () => setMode(true));

function setMode(pc) {
  vsComputer = pc;
  pvpBtn.classList.toggle("active", !pc);
  pvcBtn.classList.toggle("active", pc);
  resetGame();
}

function cellClick(i) {
  if (!running || board[i] !== "") return;

  board[i] = currentPlayer;
  cells[i].textContent = currentPlayer;

  if (checkWin()) return;
  if (board.every(v => v !== "")) return endGame("Draw!");

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  if (vsComputer && currentPlayer === "O") {
    setTimeout(computerMove, 400);
  }
}

function computerMove() {
  const emptyCells = board.map((v,i)=> v==="" ? i : null).filter(v=>v!==null);
  const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  board[move] = "O";
  cells[move].textContent = "O";
  if (checkWin()) return;
  
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
}

function checkWin() {
  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winningEffect(pattern);
      return true;
    }
  }
  return false;
}

function winningEffect(pattern) {
  pattern.forEach(i => cells[i].classList.add("win"));
  statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
  running = false;
}

function endGame(msg) {
  statusText.textContent = msg;
  running = false;
}

function resetGame() {
  board.fill("");
  running = true;
  currentPlayer = "X";
  statusText.textContent = `Player X's turn`;
  cells.forEach(c => { c.textContent = ""; c.classList.remove("win"); });
}
