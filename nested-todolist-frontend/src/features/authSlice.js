import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  authenticate,
  loginuser,
  registerUser,
} from "./../services/authService";

export const authenticateUser = createAsyncThunk(
  "auth/authenticate",
  async (_, { rejectWithValue }) => {
    try {
      return await authenticate();
    } catch (error) {
      return rejectWithValue(error.response?.data || "Authentication failed");
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, rejectWithValue) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return true;
    } catch (error) {
      return rejectWithValue(error || "Logout failed");
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, rejectWithValue) => {
    try {
      const response = await loginuser(credentials);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
