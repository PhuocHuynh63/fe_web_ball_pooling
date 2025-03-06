import React, { useState } from "react";

interface UsernameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (username: string) => void;
}

const UsernameModal: React.FC<UsernameModalProps> = ({ isOpen, onClose, onSave }) => {
  const [username, setUsername] = useState("");

  const handleSave = () => {
    if (username.trim()) {
      onSave(username);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enter Username</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Enter your username"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsernameModal;