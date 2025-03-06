import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Setting = () => {
  const { tableId } = useParams<{ tableId: string }>();
  const [modeGame, setModeGame] = useState("8 Balls");
  const [teamStartFirst, setTeamStartFirst] = useState("A");
  const [timePerTurn, setTimePerTurn] = useState(0);
  const navigate = useNavigate();

  const handleSave = () => {
    const settingsData = {
      modeGame,
      teamStartFirst,
      timePerTurn,
    };

    // Save settings data to localStorage with table ID
    localStorage.setItem(`settingsData-${tableId}`, JSON.stringify(settingsData));

    navigate(-1); // Navigate back to the previous page (WaitingRoom)
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black bg-opacity-80">
      <div className="w-80 bg-white p-4 rounded-lg shadow-lg text-center">
        <h2 className="text-black text-2xl font-bold mb-4">TABLE {tableId}</h2>
        <label className="block text-left text-gray-700">Mode game</label>
        <select
          className="w-full p-2 mb-2 border rounded"
          value={modeGame}
          onChange={(e) => setModeGame(e.target.value)}
        >
          <option>Bida 8</option>
          <option>Bida 15</option>
        </select>
        <label className="block text-left text-gray-700">Player start first</label>
        <select
          className="w-full p-2 mb-2 border rounded"
          value={teamStartFirst}
          onChange={(e) => setTeamStartFirst(e.target.value)}
        >
          <option>A</option>
          <option>B</option>
        </select>
        <label className="block text-left text-gray-700">Time per turn (second)</label>
        <input
          type="number"
          className="w-full p-2 mb-4 border rounded"
          value={timePerTurn}
          onChange={(e) => setTimePerTurn(Number(e.target.value))}
        />
        <button
          className="w-full bg-gray-700 text-white py-2 rounded-lg"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Setting;