import React from "react";

interface TableInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableData: {
    qrCode: string;
    status: string;
    tableType: {
      type_name: string;
      compatible_mode: string[];
    };
  } | null;
}

const TableInfoModal: React.FC<TableInfoModalProps> = ({ isOpen, onClose, tableData }) => {
  if (!isOpen || !tableData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Table Information</h2>
        <p><strong>QR Code:</strong> {tableData.qrCode}</p>
        <p><strong>Status:</strong> {tableData.status}</p>
        <p><strong>Type Name:</strong> {tableData.tableType.type_name}</p>
        <p><strong>Compatible Modes:</strong> {tableData.tableType.compatible_mode.join(", ")}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TableInfoModal;