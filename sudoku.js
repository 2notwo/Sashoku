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

function getCell(row, col) {
  return board[row][col];
}

function isEmpty(row, col) {
  return board[row][col] === 0;
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

      if (board[row][col] === 0) {
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        cell.appendChild(input);
      } else {
        cell.textContent = board[row][col];
      }
      boardEl.appendChild(cell);
    }
  }
}

drawBoard();
