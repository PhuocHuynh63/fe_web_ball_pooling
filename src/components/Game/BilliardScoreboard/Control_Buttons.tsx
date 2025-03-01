import React from "react";
import { RotateCcw, Pause, Play, SkipForward, AlertTriangle } from "lucide-react";

interface ControlButtonsProps {
  isPaused: boolean;
  handleUndo: () => void;
  handlePause: () => void;
  handleEndTurn: () => void;
  handleFoul: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  isPaused,
  handleUndo,
  handlePause,
  handleEndTurn,
  handleFoul,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-colors text-lg"
        onClick={handleUndo}
      >
        <RotateCcw className="w-6 h-6" />
        <span>Undo</span>
      </button>

      <button
        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-colors text-lg"
        onClick={handlePause}
      >
        {isPaused ? (
          <>
            <Play className="w-6 h-6" />
            <span>Resume</span>
          </>
        ) : (
          <>
            <Pause className="w-6 h-6" />
            <span>Pause</span>
          </>
        )}
      </button>

      <button
        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-colors text-lg"
        onClick={handleEndTurn}
      >
        <SkipForward className="w-6 h-6" />
        <span>End Turn</span>
      </button>

      <button
        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-colors text-lg"
        onClick={handleFoul}
      >
        <AlertTriangle className="w-6 h-6" />
        <span>Foul</span>
      </button>
    </div>
  );
};

export default ControlButtons;