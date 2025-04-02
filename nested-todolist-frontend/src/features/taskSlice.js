import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTasks, deleteTask, createTask } from "../services/taskService";

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (collectionId, { rejectWithValue }) => {
    try {
      return await getAllTasks(collectionId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/add",
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      console.log(id, taskData);
      return await createTask(id, taskData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeTask = createAsyncThunk(
  "tasks/delete",
  async (taskId, { rejectWithValue }) => {
    try {
      await deleteTask(taskId);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loadingtask: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loadingtask = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loadingtask = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingtask = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
