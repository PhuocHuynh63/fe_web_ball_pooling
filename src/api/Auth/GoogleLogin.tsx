import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
/**
 * Handles Google authentication by redirecting to the backend API
 * @returns A function that initiates the Google login process
 */
export const handleGoogleLogin = async () => {
  try {
    const response = await axiosInstance.get(`/auth/google`);
    const responseData = response.data as { data: { user: { _id: string; email: string }; access_token: string } }; // Add type assertion
    console.log("Login successful:", responseData);
    toast.success("Login successful", {
      position: "top-center",
    });
    // Store the token and user ID in localStorage
    // localStorage.setItem("authToken", responseData.data.access_token);
    // localStorage.setItem("userId", responseData.data.user._id);
    // Navigate to the admin page
   
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Login failed", {
      position: "bottom-center",
    });
  }
};

/**
 * Google Login component that provides a button to initiate Google authentication
 */
const GoogleLogin = () => {
  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" className="mr-2">
        <path
          fill="#FFC107"
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        />
        <path
          fill="#FF3D00"
          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
        />
        <path
          fill="#1976D2"
          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        />
      </svg>
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;

