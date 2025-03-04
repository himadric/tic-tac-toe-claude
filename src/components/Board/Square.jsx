// src/components/Board/Square.jsx
import React from "react";
import { X, Circle } from "lucide-react";

const Square = ({ value, onClick, isWinningSquare }) => {
  return (
    <button
      onClick={onClick}
      className={`w-20 h-20 flex items-center justify-center text-4xl font-bold bg-gray-100 border-2 border-gray-300 rounded transition-colors ${
        isWinningSquare ? "bg-green-200 border-green-500" : "hover:bg-gray-200"
      }`}
    >
      {value === "X" && <X size={36} className="text-blue-500" />}
      {value === "O" && <Circle size={36} className="text-red-500" />}
    </button>
  );
};

export default Square;
