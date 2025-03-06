import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import axiosInstance from "../../api/axiosInstance";

const CreateStore: React.FC = () => {
  const navigate = useNavigate();
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreStatus, setNewStoreStatus] = useState("open");
  const [newStoreAddress, setNewStoreAddress] = useState("");
  const [newStoreManager, setNewStoreManager] = useState("");

  const handleCreateStore = async () => {
    const userId = localStorage.getItem("userId");
    if (newStoreName.trim() && newStoreAddress.trim() && newStoreManager.trim() && userId) {
      try {
        const response = await axiosInstance.post(
          "/stores",
          {
            name: newStoreName,
            status: newStoreStatus,
            address: newStoreAddress,
            manager: newStoreManager,
            userId: userId, // Include userId in the request payload
          },
          { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
        );
        navigate("/stores"); // Navigate back to the Store Management page after creating the store
      } catch (error) {
        console.error("Error creating store:", error);
      }
    }
  };

  return (
    <>
      <PageMeta
        title="Create Store | TailAdmin - Next.js Admin Dashboard Template"
        description="This is the Create Store page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Create Store" />
      <div className="relative space-y-6">
        <ComponentCard title="Create Store">
          <div className="flex flex-col space-y-4 mb-4">
            <input
              type="text"
              value={newStoreName}
              onChange={(e) => setNewStoreName(e.target.value)}
              className="border p-2 w-full"
              placeholder="Enter new store name"
            />
            <input
              type="text"
              value={newStoreStatus}
              onChange={(e) => setNewStoreStatus(e.target.value)}
              className="border p-2 w-full"
              placeholder="Enter store status"
            />
            <input
              type="text"
              value={newStoreAddress}
              onChange={(e) => setNewStoreAddress(e.target.value)}
              className="border p-2 w-full"
              placeholder="Enter store address"
            />
            <input
              type="text"
              value={newStoreManager}
              onChange={(e) => setNewStoreManager(e.target.value)}
              className="border p-2 w-full"
              placeholder="Enter store manager ID"
            />
            <button
              onClick={handleCreateStore}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Create Store
            </button>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default CreateStore;