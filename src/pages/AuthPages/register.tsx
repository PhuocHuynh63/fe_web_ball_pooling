import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("role", role);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post("http://14.225.212.212:8080/api/v1/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Đúng định dạng
        },
      });
      console.log("Registration successful:", response.data);
      toast.success("Registration successful", {
        position: "top-center",
      });
      // Redirect or perform other actions after successful registration
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed", {
        position: "bottom-center",
      });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  };

  return (
    <div className="relative flex w-full h-screen overflow-hidden bg-gray-900 z-1 dark:bg-gray-900">
      <div className="flex flex-col flex-1 p-4 rounded-2xl sm:rounded-none sm:border-0 sm:p-6">
      <div className="w-full max-w-md pt-5 mx-auto sm:py-8">
          <Link
            to="/auth"
            className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <svg
              className="stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M12.7083 5L7.5 10.2083L12.7083 15.4167"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Sign In
          </Link>
        </div>
        <div className="flex justify-between items-center w-full max-w-md pt-5 mx-auto sm:py-8">
          <div className="relative mx-auto">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleAvatarChange}
            />
            <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 flex items-center justify-center h-full">Upload Avatar</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto p-2">
          <form onSubmit={handleRegister} className="space-y-3">
            <div className="mb-3 p-2">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Username<span className="text-error-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 p-2">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address<span className="text-error-500">*</span>
              </label>
              <input
                type="email"
                className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 p-2">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Password<span className="text-error-500">*</span>
              </label>
              <input
                type="password"
                className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 p-2">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone<span className="text-error-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
                placeholder="Enter phone number"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 p-2">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Role<span className="text-error-500">*</span>
              </label>
              <select
                className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select role</option>
                <option value="user">User</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="w-full px-3 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
