import React from "react";

interface BilliardBallsProps {
  ballColors: string[];
  selectedBalls: number[];
  handleBallClick: (num: number) => void;
}

const BilliardBalls: React.FC<BilliardBallsProps> = ({
  ballColors,
  selectedBalls,
  handleBallClick,
}) => {
  return (
    <div className="bg-gray-700 p-2 rounded-xl mb-4 flex w-full">
      {/* Các Bi-a ball (chiếm 4/5 chiều ngang) */}
      <div className="grid grid-cols-7 gap-2 flex-[4]">
        {[1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15].map((num, index) => (
          <button
            key={num}
            className={`w-12 h-12 text-lg flex items-center justify-center rounded-full 
            border-2 border-gray-600 shadow-md transform transition-all duration-200
            ${ballColors[index]} 
            ${selectedBalls.includes(num) ? "opacity-40 scale-90" : "hover:scale-105"}
            `}
            onClick={() => handleBallClick(num)}
            disabled={selectedBalls.includes(num)}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Bi-a ball số 8 (chiếm 1/5 chiều ngang) */}
      <div className="flex items-center justify-center flex-[1]">
        <button
          className={`w-24 h-24 text-2xl flex items-center justify-center rounded-full border-4 border-gray-600 
          shadow-lg transform transition-all duration-200 bg-black text-white
          ${selectedBalls.includes(8) ? "opacity-40 scale-90" : "hover:scale-110"}
          ${selectedBalls.length < 14 ? "cursor-not-allowed opacity-30" : ""}
          `}
          onClick={() => handleBallClick(8)}
          disabled={selectedBalls.includes(8) || selectedBalls.length < 14}
        >
          8
        </button>
      </div>
    </div>
  );
};

export default BilliardBalls;