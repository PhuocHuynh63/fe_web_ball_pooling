import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTeamClick: () => void;
  onSoloClick: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onTeamClick, onSoloClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Choose Mode</h2>
        <div className="flex space-x-4">
          <button
            onClick={onTeamClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Team
          </button>
          <button
            onClick={onSoloClick}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Solo
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;