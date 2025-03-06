import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";

const CreateMatchForm: React.FC = () => {
  const [status, setStatus] = useState("active");
  const [modeGame, setModeGame] = useState("8-ball");
  const [pooltable, setPooltable] = useState("");
  const [endAt, setEndAt] = useState("");
  const [deletedAt, setDeletedAt] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      status,
      mode_game: modeGame,
      pooltable,
      endAt,
      deletedAt,
    };

    try {
      const response = await axiosInstance.post("/matches", data);
      console.log("Match created successfully:", response.data);
      toast.success("Match created successfully", {
        position: "top-center",
      });
      // Redirect or perform other actions after successful match creation
    } catch (error) {
      console.error("Error creating match:", error);
      toast.error("Error creating match", {
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <input
          type="text"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="modeGame" className="block text-sm font-medium text-gray-700">
          Mode Game
        </label>
        <input
          type="text"
          id="modeGame"
          value={modeGame}
          onChange={(e) => setModeGame(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="pooltable" className="block text-sm font-medium text-gray-700">
          Pool Table
        </label>
        <input
          type="text"
          id="pooltable"
          value={pooltable}
          onChange={(e) => setPooltable(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="endAt" className="block text-sm font-medium text-gray-700">
          End At
        </label>
        <input
          type="datetime-local"
          id="endAt"
          value={endAt}
          onChange={(e) => setEndAt(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="deletedAt" className="block text-sm font-medium text-gray-700">
          Deleted At
        </label>
        <input
          type="datetime-local"
          id="deletedAt"
          value={deletedAt || ""}
          onChange={(e) => setDeletedAt(e.target.value || null)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Match
        </button>
      </div>
    </form>
  );
};

export default CreateMatchForm;