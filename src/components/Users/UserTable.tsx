import React, { useState } from "react";
import UserForm from "./UserForm";

interface User {
  id: number;
  name: string;
  email: string;
}

const initialUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleCreate = (user: { name: string; email: string }) => {
    const newUser = { id: users.length + 1, ...user };
    setUsers([...users, newUser]);
    setIsCreating(false);
  };

  const handleUpdate = (updatedUser: { name: string; email: string }) => {
    setUsers(users.map(user => (user.id === editingUser?.id ? { ...user, ...updatedUser } : user)));
    setEditingUser(null);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Users</h2>
        <button
          onClick={() => {
            setEditingUser(null);
            setIsCreating(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Create
        </button>
      </div>
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-right text-gray-800 dark:text-gray-200">Name</th>
            <th className="py-2 px-4 border-b text-right text-gray-800 dark:text-gray-200">Email</th>
            <th className="py-2 px-4 border-b text-right text-gray-800 dark:text-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b text-right text-gray-800 dark:text-gray-200">{user.name}</td>
              <td className="py-2 px-4 border-b text-right text-gray-800 dark:text-gray-200">{user.email}</td>
              <td className="py-2 px-4 border-b text-right text-gray-800 dark:text-gray-200">
                <button
                  onClick={() => {
                    setEditingUser(user);
                    setIsCreating(false);
                  }}
                  className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        {isCreating || editingUser ? (
          <>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{editingUser ? "Edit User" : "Create User"}</h3>
            <UserForm onSubmit={editingUser ? handleUpdate : handleCreate} initialData={editingUser || undefined} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default UserTable;