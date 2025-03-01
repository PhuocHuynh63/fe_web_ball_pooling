import React from "react";
import { Flag } from "lucide-react";

interface EndGameButtonProps {
  handleGameEnd: () => void;
}

const EndGameButton: React.FC<EndGameButtonProps> = ({ handleGameEnd }) => {
  return (
    <div className="flex justify-center">
      <button
        className="flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors text-lg"
        onClick={handleGameEnd}
      >
        <Flag className="w-6 h-6" />
        <span>End Game</span>
      </button>
    </div>
  );
};

export default EndGameButton;