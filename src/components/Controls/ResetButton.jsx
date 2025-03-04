// src/components/Controls/ResetButton.jsx
import React from "react";
import { RefreshCw } from "lucide-react";

const ResetButton = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        <RefreshCw size={18} />
        Reset Game
      </button>
    </div>
  );
};

export default ResetButton;
