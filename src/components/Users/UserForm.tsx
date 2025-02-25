import React, { useState } from "react";

interface UserFormProps {
  onSubmit: (user: { name: string; email: string }) => void;
  initialData?: { name: string; email: string };
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Submit
      </button>
    </form>
  );
};

export default UserForm;