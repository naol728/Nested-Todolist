import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCollections,
  createCollection,
  deleteCollection,
} from "../services/collectionService";

export const fetchCollections = createAsyncThunk(
  "collections/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllCollections();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCollection = createAsyncThunk(
  "collections/add",
  async (collectionData, { rejectWithValue }) => {
    try {
      return await createCollection(collectionData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeCollection = createAsyncThunk(
  "collections/delete",
  async (collectionId, { rejectWithValue }) => {
    try {
      await deleteCollection(collectionId);
      return collectionId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const collectionSlice = createSlice({
  name: "collections",
  initialState: {
    collections: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.collections = action.payload;
        state.loading = false;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addCollection.fulfilled, (state, action) => {
        state.collections.push(action.payload);
      })
      .addCase(removeCollection.fulfilled, (state, action) => {
        state.collections = state.collections.filter(
          (c) => c._id !== action.payload
        );
      });
  },
});

export default collectionSlice.reducer;
