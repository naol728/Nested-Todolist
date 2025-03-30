import apiClient from "./apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const AUTH_ENDPOINT = "/users";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, rejectWithValue) => {
    try {
      const response = await apiClient.post(
        `${AUTH_ENDPOINT}/register`,
        userData
      );
      return response.data;
    } catch (err) {
      rejectWithValue(err.response?.data || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `${AUTH_ENDPOINT}/login`,
        credentials
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

export const authenticate = async () => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  if (!token) throw new Error("No token found");

  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await apiClient.get("/users/auth"); // Calls API
  return response.data; // Returns { user }
};
