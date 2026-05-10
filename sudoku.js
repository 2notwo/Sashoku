const board = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const solution = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

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

//Loop through all 81 cells and appends a div for each one to the board element. If the cell is 0 leave the text empty, other wise show number
function drawBoard() {
  const boardEl = document.getElementById("board");

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
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
            if (checkWin()) {
              // show win screen
            }
          }
        });
      } else {
        cell.textContent = getCell(row, col);
      }
      boardEl.appendChild(cell);
    }
  }
}

drawBoard();
