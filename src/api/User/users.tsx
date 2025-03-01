import axios from 'axios';

const API_URL = 'https://your-backend-api-url.com'; // Replace with your backend API URL

interface UserProfile {
  id: number;
  name: string;
  email: string;
  username: string;
  // Add other user profile fields as needed
}

// Fetch user profile by ID
export const fetchUserProfile = async (userId: number): Promise<UserProfile> => {
  const response = await axios.get<UserProfile>(`${API_URL}/users/${userId}`);
  return response.data;
};

// Delete user by ID
export const deleteUser = async (userId: number): Promise<void> => {
  await axios.delete(`${API_URL}/users/${userId}`);
};

// Fetch all users
export const fetchAllUsers = async (): Promise<UserProfile[]> => {
  const response = await axios.get<UserProfile[]>(`${API_URL}/users`);
  return response.data;
};

// Fetch user by username
export const fetchUserByUsername = async (username: string): Promise<UserProfile> => {
  const response = await axios.get<UserProfile>(`${API_URL}/users/username/${username}`);
  return response.data;
};

// Fetch user by email
export const fetchUserByEmail = async (email: string): Promise<UserProfile> => {
  const response = await axios.get<UserProfile>(`${API_URL}/users/email/${email}`);
  return response.data;
};
