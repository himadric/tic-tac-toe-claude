// src/components/TicTacToe/TicTacToe.jsx
import React, { useState, useEffect } from "react";
import Board from "../Board/Board";
import Confetti from "../Confetti/Confetti";
import DifficultySelector from "../Controls/DifficultySelector";
import ResetButton from "../Controls/ResetButton";
import StatusMessage from "../StatusMessage/StatusMessage";
import { calculateWinner } from "../../utils/gameLogic";
import { makeAIMove } from "../../utils/aiPlayer";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState("ongoing");
  const [difficulty, setDifficulty] = useState("medium");
  const [confetti, setConfetti] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus("ongoing");
    setConfetti(false);
    setWinner(null);
    setWinningLine(null);
  };

  // Handle player move
  const handleSquareClick = (index) => {
    // Return if square already filled or game is over
    if (board[index] || gameStatus !== "ongoing" || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);
  };

  // AI Move Logic
  useEffect(() => {
    if (!isXNext && gameStatus === "ongoing") {
      const timer = setTimeout(() => {
        const newBoard = [...board];
        const move = makeAIMove(newBoard, difficulty);

        if (move !== null) {
          newBoard[move] = "O";
          setBoard(newBoard);
          setIsXNext(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, gameStatus, board, difficulty]);

  // Check game status after every move
  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setGameStatus("ended");
      setWinner(result.winner);
      setWinningLine(result.line);

      if (result.winner !== "draw") {
        setConfetti(true);
        // Remove confetti after 3 seconds
        const timer = setTimeout(() => {
          setConfetti(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [board]);

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    // Only reset the game if it's already over
    if (gameStatus === "ended") {
      resetGame();
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl relative">
      <h1 className="mb-4 text-3xl font-bold text-center">Tic Tac Toe</h1>

      <DifficultySelector
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
      />

      <Board
        squares={board}
        onClick={handleSquareClick}
        winningLine={winningLine}
      />

      <StatusMessage
        gameStatus={gameStatus}
        isXNext={isXNext}
        winner={winner}
      />

      <ResetButton onClick={resetGame} />

      <Confetti active={confetti} />
    </div>
  );
};

export default TicTacToe;
