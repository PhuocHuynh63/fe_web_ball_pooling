import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WaitingRoomTable from "../../components/Waiting/WaitingRoomTable";

const WaitingRoom = () => {
  const { tableId } = useParams<{ tableId: string }>();
  const [players, setPlayers] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing players for the table from the server or local storage
    const existingPlayers = JSON.parse(localStorage.getItem(`table-${tableId}`) || "[]");
    setPlayers(existingPlayers);
  }, [tableId]);

  const handleAddPlayer = () => {
    const newPlayer = `Player ${players.length + 1}`;
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    localStorage.setItem(`table-${tableId}`, JSON.stringify(updatedPlayers));
  };

  const handleSettingMatch = () => {
    navigate("/setting");
  };

  const handleStartMatch = () => {
    navigate(`/scoreboard/${tableId}`);
  };

  const handleBackToTables = () => {
    navigate("/tables");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-600">
      <div className="absolute top-4 left-4">
        <button
          className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
          onClick={handleBackToTables}
        >
          Back to Tables
        </button>
      </div>
      <div className="w-80 bg-gray-400 p-4 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-bold text-center mb-4">WAITING ROOM - Table {tableId}</h2>
        <div className="bg-black text-white p-2 text-center font-bold rounded-t-lg">PLAYERS</div>
        <WaitingRoomTable players={players} />
        <button
          className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
          onClick={handleAddPlayer}
        >
          Invite player
        </button>
        <button
          className="mt-2 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
          onClick={handleSettingMatch}
        >
          Setting Match
        </button>
        <button
          className="mt-2 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
          onClick={handleStartMatch}
        >
          Start Match
        </button>
      </div>
    </div>
  );
};

export default WaitingRoom;
