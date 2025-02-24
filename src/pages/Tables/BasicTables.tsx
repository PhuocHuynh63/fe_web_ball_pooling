import React from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne from "../../components/tables/BasicTableOne";
import PageMeta from "../../components/common/PageMeta";
import GuestHeader from "../../layout/GuestHeader";
import GuestLayout from "../../layout/GuestLayout";

const tables = [
  { id: 1, name: "Table 1" },
  { id: 2, name: "Table 2" },
  { id: 3, name: "Table 3" },
  { id: 4, name: "Table 4" },
];

const BasicTables: React.FC = () => {
  const navigate = useNavigate();

  const handleTableClick = (tableId: number) => {
    navigate(`/waiting-room/${tableId}`);
  };

  return (
    <>
      <GuestHeader />
      <div className="flex">
        <GuestLayout />
        <div className="flex-1 p-4">
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
          <div className="grid grid-cols-2 gap-4 p-4">
            {tables.map((table) => (
              <div
                key={table.id}
                className="p-4 bg-gray-300 rounded-lg cursor-pointer hover:bg-gray-400"
                onClick={() => handleTableClick(table.id)}
              >
                {table.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicTables;
