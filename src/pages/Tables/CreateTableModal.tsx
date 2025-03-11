import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import TableInfoModal from "./TableInfoModal";

interface CreateTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tableData: any) => void;
}

const CreateTableModal: React.FC<CreateTableModalProps> = ({ isOpen, onClose, onSave }) => {
  const [qrCode, setQrCode] = useState("");
  const [status, setStatus] = useState("available");
  const [typeName, setTypeName] = useState("Standard");
  const [compatibleMode, setCompatibleMode] = useState<string[]>(["8-ball", "9-ball"]);
  const [loading, setLoading] = useState(false);
  const [isTableInfoModalOpen, setIsTableInfoModalOpen] = useState(false);
  const [newTableData, setNewTableData] = useState<any>(null);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const storeId = localStorage.getItem("storeId"); // Assuming storeId is stored in localStorage
    if (token && storeId) {
      setLoading(true);
      try {
        const response = await axiosInstance.post(
          `/pooltables`,
          {
            qrCode,
            status,
            tableType: { type_name: typeName, compatible_mode: compatibleMode },
            store: storeId,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onSave(response.data);
        setNewTableData(response.data);
        setIsTableInfoModalOpen(true);
      } catch (error) {
        console.error("Error creating table:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
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
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <TableInfoModal
        isOpen={isTableInfoModalOpen}
        onClose={() => setIsTableInfoModalOpen(false)}
        tableData={newTableData}
      />
    </>
  );
};

export default CreateTableModal;