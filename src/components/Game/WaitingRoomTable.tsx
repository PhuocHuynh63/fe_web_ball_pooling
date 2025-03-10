import React, { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

interface WaitingRoomTableProps {
  tableId: string;
}

interface Player {
  id: string;
  name: string;
}

const WaitingRoomTable: React.FC<WaitingRoomTableProps> = ({ tableId }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      // Fetch existing players for the table from the server
      axiosInstance.get(`/teams/${tableId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setPlayers(response.data as Player[]);
      }).catch((error) => {
        console.error("Error fetching players:", error);
      });
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
      }).catch((error) => {
        console.error("Error deleting player:", error);
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