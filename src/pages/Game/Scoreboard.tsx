import React from "react";
import { useScoreboard } from "../../components/Game/scoreboardFunctions";

const BilliardScoreboard: React.FC = () => {
  const {
    scores,
    selectedBalls,
    isLandscape,
    handleSelectBall,
    handleUndo,
  } = useScoreboard();

  const players = [
    { id: "player1", score: scores.player1 },
    { id: "player2", score: scores.player2 },
    { id: "player3", score: scores.player3 },
    { id: "player4", score: scores.player4 },
  ];

  return (
    <div className={`flex flex-col ${isLandscape ? "flex-row space-x-4" : "space-y-4"} p-4 items-center justify-center min-h-screen bg-gray-800 text-white`}>
      <div className="flex flex-col items-center">
        {players.slice(0, 2).map(player => (
          <h2 key={player.id} className="text-xl font-bold">{player.id.toUpperCase()}: {player.score}</h2>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {[...Array(15).keys()].map(i => (
          <button
            key={i + 1}
            onClick={() => handleSelectBall(i + 1)}
            className={`w-12 h-12 rounded-full text-center ${selectedBalls.includes(i + 1) ? "bg-gray-500" : "bg-blue-500"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="flex flex-col space-y-2">
        <button onClick={handleUndo} className="bg-yellow-500 px-4 py-2 rounded">Undo</button>
        <button className="bg-red-500 px-4 py-2 rounded">Foul</button>
        <button className="bg-green-500 px-4 py-2 rounded">End Turn</button>
      </div>
      <div className="absolute bottom-0 left-0 p-4">
        {players[2] && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold">{players[2].id.toUpperCase()}: {players[2].score}</h2>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 right-0 p-4">
        {players[3] && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold">{players[3].id.toUpperCase()}: {players[3].score}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default BilliardScoreboard;
