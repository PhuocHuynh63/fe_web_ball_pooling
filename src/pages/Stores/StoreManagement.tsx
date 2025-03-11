import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import axiosInstance from "../../api/axiosInstance";
import StoresTable from "../../components/Stores/StoresTable";

interface Store {
  _id: string;
  name: string;
  status: string;
  address: string;
  manager: string;
  isDeleted: boolean; // Add isDeleted field
}

const StoreManagement: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stores, setStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axiosInstance.get<{ data: Store[] }>("/stores", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
          params: { action: "findAll" },
        });

        // Filter stores to only include those with isDeleted: false
        const filteredStores = response.data.data.filter(store => !store.isDeleted);
        setStores(filteredStores);
        console.log("Get success");
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, [location.search]);

//---------------------------------------------------------------------------------------
  const handleDeleteStore = async (storeId: string) => {
    const userId = localStorage.getItem("userId");
    try {
      await axiosInstance.delete(`/stores/${storeId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}`, "User-ID": userId },
      });
      setStores(stores.filter((store) => store._id !== storeId));
    } catch (error) {
      console.error("Error deleting store:", error);
    }
  };

  const handleUpdateStore = async (storeId: string, newName: string) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axiosInstance.put(
        `/stores/${storeId}`,
        { name: newName, userId: userId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );
      const updatedStore = response.data as Store;
      setStores(stores.map((store) => (store._id === storeId ? updatedStore : store)));
    } catch (error) {
      console.error("Error updating store:", error);
    }
  };

//---------------------------------------------------------------------------------------
  const handleViewTables = (storeId: string) => {
    navigate(`/table-store/${storeId}`);
  };

//---------------------------------------------------------------------------------------
  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get<{ data: Store }>("/stores", {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        params: { action: "findOne", id: searchTerm },
      });

      const store = response.data.data;
      if (!store.isDeleted) {
        setStores([store]);
        console.log("Search success");
      } else {
        setStores([]);
        console.log("Store is deleted");
      }
    } catch (error) {
      console.error("Error searching store:", error);
    }
  };

  return (
    <>
      <PageMeta
        title="Store Management | TailAdmin - Next.js Admin Dashboard Template"
        description="This is the Store Management page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Store Management" />
      <div className="relative space-y-6">
        <ComponentCard title="Manage Stores">
          <div className="flex justify-between mb-4">
            <button
              onClick={() => navigate("/create-store")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Create Store
            </button>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded-lg"
                placeholder="Search by ID or Name"
              />
              <button
                onClick={handleSearch}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Search
              </button>
            </div>
          </div>
          <StoresTable
            stores={stores}
            onViewTables={handleViewTables}
            onUpdateStore={handleUpdateStore}
            onDeleteStore={handleDeleteStore}
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default StoreManagement;