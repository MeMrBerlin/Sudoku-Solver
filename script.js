// JavaScript to interact with the HTML Sudoku grid

// Initialize the empty Sudoku grid
function initializeBoard() {
  const board = document.getElementById("sudoku-board");
  for (let row = 0; row < 9; row++) {
    const rowElement = document.createElement("tr");
    for (let col = 0; col < 9; col++) {
      const cellElement = document.createElement("td");
      const inputElement = document.createElement("input");
      inputElement.type = "number";
      inputElement.min = "1";
      inputElement.max = "9";
      inputElement.id = `cell-${row}-${col}`;
      cellElement.appendChild(inputElement);
      rowElement.appendChild(cellElement);
    }
    board.appendChild(rowElement);
  }
}

// Function to reset the board
function resetBoard() {
  const inputs = document.querySelectorAll("#sudoku-board input");
  inputs.forEach((input) => {
    input.value = "";
  });
}

// Get the current board state from the HTML input fields
function getBoard() {
  const board = [];
  for (let row = 0; row < 9; row++) {
    board[row] = [];
    for (let col = 0; col < 9; col++) {
      const value = document.getElementById(`cell-${row}-${col}`).value;
      board[row][col] = value ? parseInt(value) : 0;
    }
  }
  return board;
}

// Set the solved board back to the HTML input fields
function setBoard(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      document.getElementById(`cell-${row}-${col}`).value =
        board[row][col] !== 0 ? board[row][col] : "";
    }
  }
}

// Function to check if it's safe to place a number in a given cell
function isSafe(board, row, col, num) {
  // Check the row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) {
      return false;
    }
  }

  // Check the column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) {
      return false;
    }
  }

  // Check the 3x3 subgrid
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }

  return true;
}

// Backtracking algorithm to solve the Sudoku
function solveSudokuHelper(board) {
  let row = -1;
  let col = -1;
  let isEmpty = true;

  // Find an empty location on the board
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        row = i;
        col = j;
        isEmpty = false;
        break;
      }
    }
    if (!isEmpty) {
      break;
    }
  }

  // If there are no empty cells, the puzzle is solved
  if (isEmpty) {
    return true;
  }

  // Try placing numbers from 1 to 9
  for (let num = 1; num <= 9; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;

      // Recursively try to solve the rest of the board
      if (solveSudokuHelper(board)) {
        return true;
      }

      // If placing the number doesn't lead to a solution, backtrack
      board[row][col] = 0;
    }
  }

  return false;
}

// Function to solve the Sudoku
function solveSudoku() {
  const board = getBoard(); // Get the current board state
  if (solveSudokuHelper(board)) {
    setBoard(board); // Set the solved board back to the input fields
    alert("Sudoku solved successfully!");
  } else {
    alert("No solution exists for the given Sudoku.");
  }
}

// Initialize the board when the page loads
window.onload = initializeBoard;
