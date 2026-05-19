// Seed and random function
const today = new Date();
const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
const random = mulberry32(seed)

//empty board
const board = Array(9).fill(null).map(() => Array(9).fill(0));

//solve board
solve(board);

//copy solution from board
const solution = board.map(row => [...row]);

// Remove numbers to make puzzle
removeNumbers(board, 30);

// Shuffle numbers so they are tried in a random order each time.
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// https://stackoverflow.com/a/47593316
// A simple pseudo-random number generator that can be seeded, so the same seed will always produce the same sequence of numbers.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function getCell(row, col) {
  return board[row][col];
}

function isEmpty(row, col) {
  return board[row][col] === 0;
}

function checkWin() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`,
      );
      const input = cell.querySelector("input");

      if (input === null) {
        // pre-filled cell, skip it
      } else {
        if (parseInt(input.value) !== solution[row][col]) {
          return false;
        }
      }
    }
  }
  return true;
}

function isValid(board, row, col, num) {
  //row check
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) {
      return false;
    }
  }
  //column check
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }
  //box check
  //get cords for top left of box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}

function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (let num of nums) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) {
              return true;
            }
            board[row][col] = 0; // it pretends the cell was never filled so the next attempt treats it as empty. Without this the board would get corrupted with wrong numbers.
          }
        }
        return false; // it tells the previous solve call "this path didn't work, try something different". The previous call then resets its cell to 0 and tries the next number.
      }
    }
  }
  return true; // once there are no empty cells left the loop finishes without ever hitting return false, so it falls through to return true. That true bubbles up through every recursive call like a chain reaction — each waiting solve sees true and immediately returns true itself, all the way back to the original call.
}

function removeNumbers(board, count) {
  let removed = 0;
  while (removed < count) {
    const row = Math.floor(random() * 9);
    const col = Math.floor(random() * 9);
    if (board[row][col] !== 0) {
      board[row][col] = 0;
      removed++;
    }
  }
}

//Loop through all 81 cells and appends a div for each one to the board element. If the cell is 0 leave the text empty, other wise show number
function drawBoard() {
  const boardEl = document.getElementById("board");

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {

      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;

      if ((col + 1) % 3 === 0 && col !== 8) {
        cell.classList.add("border-right");
      }
      if ((row + 1) % 3 === 0 && row !== 8) {
        cell.classList.add("border-bottom");
      }

      if (isEmpty(row, col)) {
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        cell.appendChild(input);

        input.addEventListener("input", function () {
          const r = parseInt(cell.dataset.row);
          const c = parseInt(cell.dataset.col);
          if (parseInt(input.value) === solution[r][c]) {
            console.log("correct!");
          } else {
            console.log("Wrong...");
          }
          const allInputs = document.querySelectorAll("input");
          let boardComplete = true;

          for (let i = 0; i < allInputs.length; i++) {
            if (allInputs[i].value === "") {
              boardComplete = false;
              break;
            }
          }

          if (boardComplete) {
            console.log("board complete");
            if (checkWin()) {
              console.log("checkwin returned true");
              const winScreen = document.getElementById("win-screen");
              winScreen.removeAttribute("hidden");
            } else {
              console.log("checkwin false");
            }
          } else {
            console.log("board not complete");
          }
        });
      } else {
        cell.classList.add("cell-fixed");
        cell.textContent = getCell(row, col);
      }
      boardEl.appendChild(cell);
    }
  }
}

drawBoard();