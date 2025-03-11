import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne from "../../components/tables/BasicTableOne";
import PageMeta from "../../components/common/PageMeta";
import Modal from "./Modal";
import CreateTableModal from "./CreateTableModal";
import TableInfoModal from "./TableInfoModal";

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
  type_name: string;
}

const TableStore: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const [tables, setTables] = useState<BilliardTable[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateTableModalOpen, setIsCreateTableModalOpen] = useState(false);
  const [isTableInfoModalOpen, setIsTableInfoModalOpen] = useState(false);
  const [newTableData, setNewTableData] = useState<any>(null);


  const handleTableClick = (tableId: number) => {
    setSelectedTableId(tableId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTableId(null);
  };

  const handleTeamClick = () => {
    if (selectedTableId !== null) {
      navigate(`/team-waiting-room/${selectedTableId}`);
    }
    handleCloseModal();
  };

  const handleSoloClick = () => {
    if (selectedTableId !== null) {
      navigate(`/waiting-room/${selectedTableId}`);
    }
    handleCloseModal();
  };

  const handleSaveTable = (tableData: any) => {
    setTables([...tables, tableData as BilliardTable]);
    setNewTableData(tableData);
    setIsTableInfoModalOpen(true);
  };

  // Filter and map tables to only display specific fields
  const filteredTables = tables
    .filter(table => table.status === "available" && ["8-ball", "9-ball"].includes(table.gameType) && table.type_name === "Standard")
    .map((table, index) => ({
      ...table,
      tableNumber: `Table ${index + 1}`
    }));

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Basic Tables" />
      <div className="relative space-y-6">
        <button
          onClick={() => setIsCreateTableModalOpen(true)}
          className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Create
        </button>
        <ComponentCard title="Basic Table 1">
          <BasicTableOne tables={filteredTables} onTableClick={handleTableClick} />
        </ComponentCard>
      </div>
      <CreateTableModal
        isOpen={isCreateTableModalOpen}
        onClose={() => setIsCreateTableModalOpen(false)}
        onSave={handleSaveTable}
      />
      <TableInfoModal
        isOpen={isTableInfoModalOpen}
        onClose={() => setIsTableInfoModalOpen(false)}
        tableData={newTableData}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTeamClick={handleTeamClick}
        onSoloClick={handleSoloClick}
      />
    </>
  );
};

export default TableStore;
