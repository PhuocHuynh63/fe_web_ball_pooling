import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star, X } from "lucide-react";

interface Player {
  name: string;
  isReady?: boolean;
  isCaptain?: boolean;
}

interface TeamProps {
  name: string;
  players: Player[];
  color: "red" | "green";
}

export default function TeamWaiting() {
  const { tableId } = useParams<{ tableId: string }>();
  const [players, setPlayers] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing players for the table from the server or local storage
    const existingPlayers = JSON.parse(localStorage.getItem(`table-${tableId}`) || "[]");
    setPlayers(existingPlayers);
  }, [tableId]);

  const [teams, setTeams] = useState<TeamProps[]>([
    {
      name: "TEAM A",
      players: [{ name: "PLAYER 1", isCaptain: true }],
      color: "red",
    },
    {
      name: "TEAM B",
      players: [{ name: "PLAYER 1" }],
      color: "green",
    },
  ]);

  const handleQRcode = (bidaTableId: string) => {
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

  return (
    <div className="flex flex-col h-screen bg-black text-white relative">
      <div className="absolute top-4 left-4">
        <button
          className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
          onClick={handleBackToTables}
        >
          Back to Tables
        </button>
      </div>
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 opacity-50 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=400')",
          filter: "blur(4px)",
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="py-6 text-center">
          <h1 className="text-3xl font-bold tracking-wider">WAITING ROOM</h1>
        </div>

        {/* Teams container */}
        <div className="flex-1 px-4 flex flex-col gap-4">
          {/* Team A */}
          <div className="rounded-lg overflow-hidden">
            <div className="bg-red-800 text-center py-2 font-bold">{teams[0].name}</div>
            <div className="bg-red-700 p-3">
              {teams[0].players.map((player, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-bold text-lg">{player.name}</span>
                  {player.isCaptain && <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />}
                </div>
              ))}
            </div>
          </div>

          {/* Invite button */}
          <button
            className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
            onClick={() => tableId && handleQRcode(tableId)}
          >
            Invite player
          </button>

          {/* Team B */}
          <div className="rounded-lg overflow-hidden">
            <div className="bg-green-800 text-center py-2 font-bold">{teams[1].name}</div>
            <div className="bg-green-700 p-3">
              {teams[1].players.map((player, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-bold text-lg">{player.name}</span>
                  {player.isCaptain && <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />}
                </div>
              ))}
            </div>
          </div>

          {/* Start match button */}
          <button
            className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
            onClick={handleSettingMatch}
          >
            Setting Match
          </button>
          <button
            className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
            onClick={handleStartMatch}
          >
            Start Match
          </button>
        </div>
      </div>
    </div>
  );
}

