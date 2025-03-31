import apiClient from "./apiClient";

const AUTH_ENDPOINT = "/users";

export const registerUser = async (userData) => {
  const response = await apiClient.post(`${AUTH_ENDPOINT}/register`, userData);
  return response.data;
};

export const authenticate = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await apiClient.get("/users/auth");
  return response.data;
};

export const loginuser = async (credentials) => {
  const response = await apiClient.post("/users/login", credentials);
  return response.data;
};
