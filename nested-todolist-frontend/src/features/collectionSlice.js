import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCollections,
  createCollection,
  deleteCollection,
  togglefavorite,
  getCollection,
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
export const fetchCollection = createAsyncThunk(
  "collection/fetch",
  async (collectionId, { rejectWithValue }) => {
    try {
      return await getCollection(collectionId);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const toggleFavorite = createAsyncThunk(
  "collections/toggleFavorite",
  async ({ collectionId, favorite }, { rejectWithValue }) => {
    try {
      const response = await togglefavorite(collectionId, favorite);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update favorite status"
      );
    }
  }
);

export const addCollection = createAsyncThunk(
  "collections/addCollection",
  async (collectionData, { rejectWithValue }) => {
    try {
      return await createCollection(collectionData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeCollection = createAsyncThunk(
  "collections/removeCollection",
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
    collection: null,
  },
  reducers: {
    toggleFavoriteOptimistic: (state, action) => {
      const { collectionId } = action.payload;
      const collection = state.collections.find((c) => c._id === collectionId);
      if (collection) {
        collection.favorite = !collection.favorite;
      }
    },
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
        state.collections.push(action.payload.data);
      })
      .addCase(removeCollection.fulfilled, (state, action) => {
        state.collections = state.collections.filter(
          (c) => c._id !== action.payload
        );
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedCollection = action.payload;
        const index = state.collections.findIndex(
          (c) => c._id === updatedCollection._id
        );
        if (index !== -1) {
          state.collections[index] = {
            ...state.collections[index],
            updatedCollection,
          };
        }
      })
      .addCase(fetchCollection.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.collection = action.payload;
      })
      .addCase(fetchCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { toggleFavoriteOptimistic } = collectionSlice.actions;
export default collectionSlice.reducer;
