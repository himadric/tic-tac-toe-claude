// src/components/Board/Board.jsx
import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick, winningLine }) => {
  const renderSquare = (index) => {
    const isWinningSquare = winningLine && winningLine.includes(index);

    return (
      <Square
        key={index}
        value={squares[index]}
        onClick={() => onClick(index)}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {[...Array(9)].map((_, index) => renderSquare(index))}
    </div>
  );
};

export default Board;
