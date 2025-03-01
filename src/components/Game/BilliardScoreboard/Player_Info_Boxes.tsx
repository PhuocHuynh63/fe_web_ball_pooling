import React from "react";
import { Clock } from "lucide-react";

interface Player {
  username: string;
  avatar: string;
}

interface PlayerInfoBoxesProps {
  players: Player[];
  scores: number[];
  currentPlayer: number;
  timer: number;
  formatTime: (seconds: number) => string;
  getTimerClass: () => string;
}

const PlayerInfoBoxes: React.FC<PlayerInfoBoxesProps> = ({
  players,
  scores,
  currentPlayer,
  timer,
  formatTime,
  getTimerClass,
}) => {
  return (
    <div className="flex justify-between mb-4">
      <div
        className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-300 ${
          currentPlayer === 0
            ? "bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg scale-105"
            : "bg-gray-700"
        }`}
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-600">
          <img
            src={players[0].avatar || "/placeholder.svg"}
            alt="Player 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-white font-bold">{players[0].username}</p>
          <p className="text-3xl font-bold text-white">{scores[0]}</p>
        </div>
        {currentPlayer === 0 && (
          <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
            <Clock className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Timer */}
      <div className="flex justify-center mb-4">
        <div
          className={`text-4xl font-bold px-4 py-2 bg-gray-900 rounded-xl ${getTimerClass()}`}
        >
          {formatTime(timer)}
        </div>
      </div>

      <div
        className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-300 ${
          currentPlayer === 1
            ? "bg-gradient-to-r from-red-900 to-red-700 shadow-lg scale-105"
            : "bg-gray-700"
        }`}
      >
        <div>
          <p className="text-white font-bold text-right">
            {players[1].username}
          </p>
          <p className="text-3xl font-bold text-white text-right">
            {scores[1]}
          </p>
        </div>
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-600">
          <img
            src={players[1].avatar || "/placeholder.svg"}
            alt="Player 2"
            className="w-full h-full object-cover"
          />
        </div>
        {currentPlayer === 1 && (
          <div className="absolute -top-2 -left-2 bg-red-500 rounded-full p-1">
            <Clock className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerInfoBoxes;