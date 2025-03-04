// src/utils/gameLogic.js
/**
 * Calculate if there is a winner in the current board state
 * @param {Array} squares - The current board state
 * @returns {Object|null} Winner information or null if no winner
 */
export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }

  // Check for draw
  if (squares.every((square) => square !== null)) {
    return { winner: "draw", line: [] };
  }

  return null;
};

/**
 * Find if there's an immediate winning move for a player
 * @param {Array} squares - The current board state
 * @param {string} player - The player symbol ('X' or 'O')
 * @returns {number|null} The winning move index or null
 */
export const findWinningMove = (squares, player) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Check if two in a row and third is empty
    if (squares[a] === player && squares[b] === player && squares[c] === null)
      return c;
    if (squares[a] === player && squares[c] === player && squares[b] === null)
      return b;
    if (squares[b] === player && squares[c] === player && squares[a] === null)
      return a;
  }

  return null;
};
