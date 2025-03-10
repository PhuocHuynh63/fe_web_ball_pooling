import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne from "../../components/tables/BasicTableOne";
import PageMeta from "../../components/common/PageMeta";
import Modal from "./Modal";
import UsernameModal from "./UsernameModal";
import CreateTableModal from "./CreateTableModal";
import axiosInstance from "../../api/axiosInstance";

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

const BasicTables: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const [tables, setTables] = useState<BilliardTable[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [isCreateTableModalOpen, setIsCreateTableModalOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

//---------------Fetch table-------------------------------
  useEffect(() => {
    if (storeId) {
      axiosInstance.get(`/api/stores/${storeId}/tables`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then((response) => {
        setTables(response.data as BilliardTable[]);
      });
    }
  }, [storeId]);
//---------------Create table-------------------------------
  const handleCreateTable = (tableData: { qrCode: string; status: string; tableType: { type_name: string; compatible_mode: string[] } }) => {
    const token = localStorage.getItem("token");
    if (token && storeId) {
      axiosInstance.post(`/pooltables`, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
        setTables([...tables, response.data as BilliardTable]);
        setIsCreateTableModalOpen(false);
      });
    }
  };


//---------------Username Save-------------------------------
  const handleUsernameSave = (username: string) => {
    setUsername(username);
    localStorage.setItem("username", username);
    setIsUsernameModalOpen(false);
    setIsModalOpen(true);
  };

//-------------Modal solo & team---------------------------------
  const handleTableClick = (tableId: number) => {
    setSelectedTableId(tableId);
    if (!username) {
      setIsUsernameModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTableId(null);
  };
//-----------------StorageChange-----------------------------
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setIsUsernameModalOpen(true);
    }

    const handleStorageChange = () => {
      const updatedUsername = localStorage.getItem("username");
      if (updatedUsername) {
        setUsername(updatedUsername);
      } else {
        setUsername(null);
        setIsUsernameModalOpen(true);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
//====================================================================
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
          <BasicTableOne tables={tables} onTableClick={handleTableClick} />
        </ComponentCard>
      </div>
      <UsernameModal
        isOpen={isUsernameModalOpen}
        onClose={() => setIsUsernameModalOpen(false)}
        onSave={handleUsernameSave}
      />
      <CreateTableModal
        isOpen={isCreateTableModalOpen}
        onClose={() => setIsCreateTableModalOpen(false)}
        onSave={handleCreateTable}
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

export default BasicTables;
