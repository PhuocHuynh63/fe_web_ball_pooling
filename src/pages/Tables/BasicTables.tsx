import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne from "../../components/tables/BasicTableOne";
import PageMeta from "../../components/common/PageMeta";
import Modal from "./Modal";


const tables = [
  { id: 1, name: "Table 1" },
  { id: 2, name: "Table 2" },
  { id: 3, name: "Table 3" },
  { id: 4, name: "Table 4" },
];

const BasicTables: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Basic Tables" />
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <BasicTableOne onTableClick={handleTableClick} />
        </ComponentCard>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTeamClick={handleTeamClick}
        onSoloClick={handleSoloClick}
      />
    </>
  );
};

export default BasicTables;
