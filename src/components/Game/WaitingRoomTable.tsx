import React, { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import { io } from "socket.io-client";
import axiosInstance from "../../api/axiosInstance";

const socket = io("http://localhost:8080"); // Replace with your server URL

interface WaitingRoomTableProps {
  tableId: string;
}

interface Player {
  id: string;
  name: string;
}

const WaitingRoomTable: React.FC<WaitingRoomTableProps> = ({ tableId }) => {
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "Player 1" } // Initial player for simulation
  ]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      // Fetch existing players for the table from the server
      axiosInstance.get(`/teams/${tableId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setPlayers(response.data as Player[]);
      });

      // Join the socket room
      socket.emit("joinRoom", tableId);

      // Listen for player updates
      socket.on("updatePlayers", (updatedPlayers: Player[]) => {
        setPlayers(updatedPlayers);
      });

      return () => {
        // Leave the socket room on component unmount
        socket.emit("leaveRoom", tableId);
        socket.off("updatePlayers");
      };
    } else {
      console.error("No authentication token found");
    }
  }, [tableId]);

  const handleDeletePlayer = (id: string) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const updatedPlayers = players.filter((player) => player.id !== id);
      setPlayers(updatedPlayers);
      axiosInstance.delete(`/teams/${tableId}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        socket.emit("updatePlayers", { tableId, players: updatedPlayers });
      });
    } else {
      console.error("No authentication token found");
    }
  };

  return (
    <table className="w-full">
      <tbody>
        {players.map((player, index) => (
          <tr key={player.id} className="border-b border-gray-700">
            <td className="py-2 px-4">
              {player.name}
              {index === 0 && <Star className="inline-block ml-2 text-yellow-400 fill-current" />}
            </td>
            <td className="py-2 px-4 text-right">
              <button onClick={() => handleDeletePlayer(player.id)}>
                <X className="text-red-500" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WaitingRoomTable;