import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import GridShape from "../../components/common/GridShape";
import GoogleLogin from "../../api/Auth/GoogleLogin";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import axiosInstance from "../../api/axiosInstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { email, password };
    try {
      const response = await axiosInstance.post(`/auth/login`, data);
      const responseData = response.data as { data: { user: { _id: string; email: string }; access_token: string } }; // Add type assertion
      console.log("Login successful:", responseData);
      toast.success("Login successful", {
        position: "top-center",
      });
      // Store the token and user ID in localStorage
      localStorage.setItem("authToken", responseData.data.access_token);
      localStorage.setItem("userId", responseData.data.user._id);
      // Navigate to the admin page
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="relative flex w-full h-screen overflow-hidden bg-gray-900 z-1 dark:bg-gray-900">
      <div className="flex flex-col flex-1 p-4 rounded-2xl sm:rounded-none sm:border-0 sm:p-6">
        <div className="w-full max-w-md pt-5 mx-auto sm:py-8">
          <Link
            to="/"
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
            Back to Home page
          </Link>
        </div>
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto p-2">
          <div className="mb-4 sm:mb-6 text-center">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              LOGIN
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? <EyeCloseIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <GoogleLogin />
        </div>
      </div>
      <div className="relative items-center justify-center flex-1 hidden p-6 z-1 bg-brand-950 dark:bg-white/5 lg:flex">
        {/* <!-- ===== Common Grid Shape Start ===== --> */}
        <GridShape />
        {/* <!-- ===== Common Grid Shape End ===== --> */}
        <div className="flex flex-col items-center max-w-xs">
          <Link to="" className="block mb-4">
            <img src="./images/logo/auth-logo.svg" alt="Logo" />
          </Link>
          <p className="text-center text-gray-400 dark:text-white/60">
            Welcome to Billiard Club
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;