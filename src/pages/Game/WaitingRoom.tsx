import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WaitingRoomTable from "../../components/Game/WaitingRoomTable";


const WaitingRoom: React.FC = () => {
  const { tableId } = useParams<{ tableId: string }>();
  const [players, setPlayers] = useState<{ id: string; name: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing players for the table from local storage
    const existingPlayers: { id: string; name: string }[] = JSON.parse(localStorage.getItem(`table-${tableId}`) || "[]");
    setPlayers(existingPlayers);
  }, [tableId]);

  const handleAddPlayer = (bidaTableId: string) => {
    localStorage.setItem("bidaTableId", bidaTableId);
    navigate("/qrCode");
  };

  const handleSettingMatch = () => {
    navigate("/setting");
  };

  const handleStartMatch = () => {
    navigate("/scoreboard");
  };

  const handleBackToTables = () => {
    navigate(-1);
  };

  const handleDeletePlayer = (id: string) => {
    const updatedPlayers = players.filter(player => player.id !== id);
    setPlayers(updatedPlayers);
    localStorage.setItem(`table-${tableId}`, JSON.stringify(updatedPlayers));
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-blue-900">
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
        {tableId && <WaitingRoomTable tableId={tableId} />}
        <button
          className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
          onClick={() => tableId && handleAddPlayer(tableId)}
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
