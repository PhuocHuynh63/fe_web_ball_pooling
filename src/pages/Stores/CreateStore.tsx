import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import axiosInstance from "../../api/axiosInstance";

const CreateStore: React.FC = () => {
  const navigate = useNavigate();
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreAddress, setNewStoreAddress] = useState("");
  const [newStoreManager, setNewStoreManager] = useState("");
  interface StoreData {
    name: string;
    address: string;
    manager: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  }

  const [storeData, setStoreData] = useState<StoreData | null>(null);

  const handleCreateStore = async () => {
    const userId = localStorage.getItem("userId");
    if (newStoreName.trim() && newStoreAddress.trim() && newStoreManager.trim() && userId) {
      try {
        const response = await axiosInstance.post(
          "/stores",
          {
            name: newStoreName,
            address: newStoreAddress,
            manager: newStoreManager,
          },
          { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
        );
        const data = response.data as { data: StoreData };
        setStoreData(data.data);
        console.log("Store created successfully:", response.data); // Log the response data
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

      {storeData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Store Created Successfully</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {storeData.name}</p>
              <p><strong>Address:</strong> {storeData.address}</p>
              <p><strong>Manager ID:</strong> {storeData.manager}</p>
              <p><strong>Store ID:</strong> {storeData._id}</p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => navigate("/stores")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateStore;