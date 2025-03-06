import React, { useState } from "react";

interface CreateTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tableData: { qrCode: string; status: string; tableType: { type_name: string; compatible_mode: string[] } }) => void;
}

const CreateTableModal: React.FC<CreateTableModalProps> = ({ isOpen, onClose, onSave }) => {
  const [qrCode, setQrCode] = useState("");
  const [status, setStatus] = useState("available");
  const [typeName, setTypeName] = useState("Standard");
  const [compatibleMode, setCompatibleMode] = useState<string[]>(["8-ball", "9-ball"]);

  const handleSave = () => {
    if (qrCode.trim()) {
      onSave({ qrCode, status, tableType: { type_name: typeName, compatible_mode: compatibleMode } });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create Table</h2>
        <input
          type="text"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="QR Code"
        />
        <input
          type="text"
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Table Type"
        />
        <input
          type="text"
          value={compatibleMode.join(", ")}
          onChange={(e) => setCompatibleMode(e.target.value.split(", ").map((mode) => mode.trim()))}
          className="border p-2 w-full mb-4"
          placeholder="Compatible Modes (comma separated)"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTableModal;