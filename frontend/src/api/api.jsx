// src/api/api.jsx
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Change for production

export const loginAPI = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/login`,
      credentials
    );
    return response.data; // { user, token }
  } catch (error) {
    // Wrap error message into a new Error object for consistent handling
    const message = error.response?.data?.message || "Login failed";
    throw new Error(message);
  }
};

export const registerUserAPI = async (token, userData) => {
  const res = await axios.post(`${API_BASE_URL}/users/register`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getUsersAPI = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getUserAPI = async (token, userId) => {
  const res = await axios.get(`${API_BASE_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateUserAPI = async (token, userId, updateData) => {
  const res = await axios.put(`${API_BASE_URL}/users/${userId}`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteUserAPI = async (token, userId) => {
  const res = await axios.delete(`${API_BASE_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
