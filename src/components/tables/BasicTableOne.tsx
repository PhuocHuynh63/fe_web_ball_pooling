import React from "react";
import Badge from "../ui/badge/Badge";

interface BilliardTable {
  id: number;
  tableNumber: string;
  status: string;
  players: {
    image: string;
    name: string;
  }[];
  gameType: string;
  duration: string;
}

interface BasicTableOneProps {
  tables: BilliardTable[];
  onTableClick: (tableId: number) => void;
}

export default function BasicTableOne({ tables, onTableClick }: BasicTableOneProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tables.map((table) => (
        <div
          key={table.id}
          onClick={() => onTableClick(table.id)}
          className="relative p-4 border border-gray-200 rounded-lg bg-white dark:border-white/[0.05] dark:bg-white/[0.03] flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-gray-300 dark:hover:border-white/[0.1]"
        >
          <div className="absolute top-2 right-2">
            <Badge
              size="sm"
              color={table.status === "Now" ? "success" : "error"}
            >
              {table.status}
            </Badge>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div>
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {table.tableNumber}
                </span>
                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {table.gameType}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                Players
              </span>
              <div className="flex -space-x-2">
                {table.players.map((player, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                  >
                    <img src={player.image} alt={player.name} />
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                Duration
              </span>
              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                {table.duration}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
