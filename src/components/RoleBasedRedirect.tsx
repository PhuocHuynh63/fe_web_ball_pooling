import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const RoleBasedRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await axiosInstance.get("/api/user/role", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { role } = response.data as { role: string };

          if (role === "admin") {
            navigate("/admin");
          } else if (role === "user") {
            navigate("/users");
          } else if (role === "manager") {
            navigate("/manager");
          } else {
            navigate("/"); // Default to home page if role is not recognized
          }
        } else {
          navigate("/auth"); // Redirect to login if no token is found
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        navigate("/auth"); // Redirect to login on error
      }
    };

    fetchUserRole();
  }, [navigate]);

  return null; // This component does not render anything
};

export default RoleBasedRedirect;