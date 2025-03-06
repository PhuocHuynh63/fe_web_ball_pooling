import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import axiosInstance from "../../api/axiosInstance";

interface Store {
  id: number;
  name: string;
  status: string;
  address: string;
  manager: string;
}

const StoreManagement: React.FC = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState<Store[]>([
    {
      id: 1,
      name: "Thuan Twice Hai1",
      status: "open",
      address: "297 Le Van Viet, TP.HCM",
      manager: "67b3445f76ac0a0ff0b20804",
    },
    {
      id: 2,
      name: "Billiard Club 2",
      status: "closed",
      address: "123 Main Street, Hanoi",
      manager: "67b3445f76ac0a0ff0b20805",
    },
    {
      id: 3,
      name: "Billiard Club 3",
      status: "open",
      address: "456 Another St, Da Nang",
      manager: "67b3445f76ac0a0ff0b20806",
    },
  ]);

  // Comment out the useEffect hook to disable fetching stores from the API
  /*
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axiosInstance.get("/stores", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        const data = response.data as { data: Store[] };
        setStores(data.data); // Ensure the response data is correctly parsed
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);
  */

  const handleDeleteStore = async (storeId: number) => {
    const userId = localStorage.getItem("userId");
    try {
      await axiosInstance.delete(`/stores/${storeId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}`, "User-ID": userId },
      });
      setStores(stores.filter((store) => store.id !== storeId));
    } catch (error) {
      console.error("Error deleting store:", error);
    }
  };

  const handleUpdateStore = async (storeId: number, newName: string) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axiosInstance.put(
        `/stores/${storeId}`,
        { name: newName, userId: userId }, // Include userId in the request payload
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );
      const updatedStore = response.data as Store;
      setStores(stores.map((store) => (store.id === storeId ? updatedStore : store)));
    } catch (error) {
      console.error("Error updating store:", error);
    }
  };

  const handleStoreClick = (storeId: number) => {
    navigate(`/table-store/${storeId}`);
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
          <button
            onClick={() => navigate("/create-store")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
          >
            Create Store
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {stores.map((store) => (
              <div key={store.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
                <span className="block font-bold text-lg mb-2">{store.name}</span>
                <span className="block mb-1"><strong>Status:</strong> {store.status}</span>
                <span className="block mb-1 truncate"><strong>Address:</strong> {store.address}</span>
                <span className="block mb-1"><strong>Manager:</strong> {store.manager}</span>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleStoreClick(store.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-2"
                  >
                    View Tables
                  </button>
                  <button
                    onClick={() => handleUpdateStore(store.id, prompt("Enter new name", store.name) || store.name)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteStore(store.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default StoreManagement;