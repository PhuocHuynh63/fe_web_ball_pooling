import React from "react";

interface WaitingRoomTableProps {
  players: string[];
}

const WaitingRoomTable: React.FC<WaitingRoomTableProps> = ({ players }) => {
  return (
    <div className="bg-gray-300 p-4 rounded-b-lg">
      {players.map((player, index) => (
        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-400">
          <span className="text-black font-bold">{player}</span>
        </div>
      ))}
    </div>
  );
};

export default WaitingRoomTable;