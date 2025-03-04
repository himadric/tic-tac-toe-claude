// src/components/StatusMessage/StatusMessage.jsx
import React from "react";

const StatusMessage = ({ gameStatus, isXNext, winner }) => {
  return (
    <div className="mb-4 text-center">
      {gameStatus === "ongoing" ? (
        <p className="text-xl">
          {isXNext ? "Your turn (X)" : "AI thinking... (O)"}
        </p>
      ) : (
        <p className="text-2xl font-bold">
          {winner === "X"
            ? "You win!"
            : winner === "O"
            ? "AI wins!"
            : "It's a draw!"}
        </p>
      )}
    </div>
  );
};

export default StatusMessage;
