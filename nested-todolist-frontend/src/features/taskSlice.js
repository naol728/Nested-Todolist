import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllTasks,
  deleteTask,
  createTask,
  addsubtask,
  updateTask,
  getTask,
} from "../services/taskService";

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

export const fetchTask = createAsyncThunk(
  "tasks/fetchsingle",
  async (taskid, { rejectWithValue }) => {
    try {
      const response = await getTask(taskid);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addSubtask = createAsyncThunk(
  "tasks/addSubtask",
  async ({ taskid, taskData }, { rejectWithValue }) => {
    try {
      const response = await addsubtask(taskid, taskData);

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editTask = createAsyncThunk(
  "tasks/edit",
  async ({ taskid, taskData }, { rejectWithValue }) => {
    try {
      const response = await updateTask(taskid, taskData);
      return response;
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
export const toggleChecked = createAsyncThunk(
  "tasks/checked",
  async (task, { rejectWithValue }) => {
    try {
      const taskData = {
        ...task,
        completed: !task.completed,
      };
      const response = await updateTask(task._id, taskData);
      return response;
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
    task: null,
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
      })
      .addCase(addSubtask.fulfilled, (state, action) => {
        console.log(action.payload);
        // state.tasks.push(action.payload);
      })
      .addCase(fetchTask.pending, (state, action) => {
        // state.task = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        // state.task = action.payload;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.task = action.payload;
      });
  },
});

export default taskSlice.reducer;
