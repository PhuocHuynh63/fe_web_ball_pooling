"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  status: string;
}

export default function MemberTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://14.225.212.212:8080/api/v1/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data as { data: User[] };
        setUsers(data.data.filter(user => user.role === "user")); // Filter users with role "user"
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  const filteredUsers = Array.isArray(users) ? users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  ) : [];

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleView = async (id: string) => {
    try {
      const response = await axios.get(`http://14.225.212.212:8080/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User Profile:", response.data);
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://14.225.212.212:8080/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`User with ID: ${id} deleted`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300";
      case "staff":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">User Management</h2>

        <div className="flex w-full sm:w-auto gap-3">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-gray-700 dark:text-gray-200"
            />
          </div>

          <button
            onClick={() => navigate("/register")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>New User</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 border-y border-gray-200 dark:border-gray-600">
              <th className="text-left py-4 px-5 text-lg font-semibold text-gray-900 dark:text-gray-200">ID</th>
              <th className="text-left py-4 px-5 text-lg font-semibold text-gray-900 dark:text-gray-200">Name</th>
              <th className="text-left py-4 px-5 text-lg font-semibold text-gray-900 dark:text-gray-200">Phone</th>
              <th className="text-left py-4 px-5 text-lg font-semibold text-gray-900 dark:text-gray-200">Email</th>
              <th className="text-left py-4 px-5 text-lg font-semibold text-gray-900 dark:text-gray-200">Role</th>
              <th className="text-right py-4 px-5 text-lg font-semibold text-gray-900 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {paginatedUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-4 px-5 text-lg text-gray-600 dark:text-gray-300">{user._id}</td>
                <td className="py-4 px-5 text-lg text-gray-900 dark:text-gray-200 font-medium">{user.name}</td>
                <td className="py-4 px-5 text-lg text-gray-600 dark:text-gray-300">{user.phone}</td>
                <td className="py-4 px-5 text-lg text-gray-600 dark:text-gray-300">{user.email}</td>
                <td className="py-4 px-5">
                  <span
                    className={`inline-block px-3 py-2 rounded-full text-lg font-medium ${getRoleBadgeClass(user.role)}`}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-5 text-right space-x-2">
                  <button
                    onClick={() => handleView(user._id)}
                    className="px-4 py-2 text-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-md transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-4 py-2 text-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-600 px-4 py-3 sm:px-6 mt-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredUsers.length)}</span> of{" "}
                <span className="font-medium">{filteredUsers.length}</span> results
              </p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-md p-3 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-lg font-medium rounded-md ${
                    currentPage === i + 1 ? "bg-blue-600 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-md p-3 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

