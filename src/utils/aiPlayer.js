// src/utils/aiPlayer.js
import { calculateWinner, findWinningMove } from "./gameLogic";

/**
 * Make a random move on the board
 * @param {Array} squares - The current board state
 * @returns {number|null} The index of the random move
 */
export const makeRandomMove = (squares) => {
  const emptySquares = squares
    .map((square, index) => (square === null ? index : null))
    .filter((index) => index !== null);

  if (emptySquares.length === 0) return null;

  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};

/**
 * Make the best move according to the selected difficulty
 * @param {Array} squares - The current board state
 * @param {string} difficulty - The difficulty level ('easy', 'medium', 'hard')
 * @returns {number|null} The index of the best move
 */
export const makeAIMove = (squares, difficulty) => {
  switch (difficulty) {
    case "easy":
      return makeRandomMove(squares);
    case "medium":
      // 50% chance of making a smart move
      return Math.random() < 0.5
        ? makeBestMove(squares, 1)
        : makeRandomMove(squares);
    case "hard":
      return makeBestMove(squares, 3);
    default:
      return makeRandomMove(squares);
  }
};

/**
 * Make the best move using minimax algorithm
 * @param {Array} squares - The current board state
 * @param {number} depth - The depth of minimax search
 * @returns {number|null} The index of the best move
 */
export const makeBestMove = (squares, depth) => {
  // First move optimization (take center if available)
  if (
    squares.filter((s) => s !== null).length === 0 ||
    squares.filter((s) => s !== null).length === 1
  ) {
    if (squares[4] === null) return 4;

    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter((c) => squares[c] === null);
    if (availableCorners.length > 0) {
      return availableCorners[
        Math.floor(Math.random() * availableCorners.length)
      ];
    }
  }

  // Check if AI can win
  const aiWinMove = findWinningMove(squares, "O");
  if (aiWinMove !== null) return aiWinMove;

  // Block player's winning move
  const blockMove = findWinningMove(squares, "X");
  if (blockMove !== null) return blockMove;

  // If depth is higher than 1, use minimax
  if (depth > 1) {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        const newBoard = [...squares];
        newBoard[i] = "O";
        const score = minimax(newBoard, depth - 1, false);

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  }

  // Default to random move if no optimal move found
  return makeRandomMove(squares);
};

/**
 * Minimax algorithm implementation
 * @param {Array} squares - The current board state
 * @param {number} depth - The current depth
 * @param {boolean} isMaximizing - Whether to maximize or minimize
 * @returns {number} The score of the board position
 */
export const minimax = (squares, depth, isMaximizing) => {
  const result = calculateWinner(squares);

  if (result) {
    if (result.winner === "O") return 10;
    if (result.winner === "X") return -10;
    if (result.winner === "draw") return 0;
  }

  if (depth === 0) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        const newBoard = [...squares];
        newBoard[i] = "O";
        const score = minimax(newBoard, depth - 1, false);
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        const newBoard = [...squares];
        newBoard[i] = "X";
        const score = minimax(newBoard, depth - 1, true);
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};
