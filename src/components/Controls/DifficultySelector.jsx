// src/components/Controls/DifficultySelector.jsx
import React from "react";

const DifficultySelector = ({ difficulty, onDifficultyChange }) => {
  const difficulties = ["easy", "medium", "hard"];

  return (
    <div className="mb-4 flex justify-center gap-2">
      {difficulties.map((level) => (
        <button
          key={level}
          onClick={() => onDifficultyChange(level)}
          className={`px-3 py-1 rounded capitalize ${
            difficulty === level ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;
