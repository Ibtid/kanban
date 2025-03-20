import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchTasksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createTaskStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks.push(action.payload);
    },
    createTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTaskStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    updateTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTaskStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    deleteTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskStart,
  createTaskSuccess,
  createTaskFailure,
  updateTaskStart,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskStart,
  deleteTaskSuccess,
  deleteTaskFailure,
} = tasksSlice.actions;

// Fetch tasks
export const fetchTasks = () => async (dispatch, getState) => {
  dispatch(fetchTasksStart());
  try {
    const token = getState().auth.token;
    const response = await axios.get("http://127.0.0.1:8000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchTasksSuccess(response.data));
  } catch (error) {
    dispatch(fetchTasksFailure(error.response?.data?.message || "Failed to fetch tasks"));
  }
};

// Create task
export const createTask = (taskData) => async (dispatch, getState) => {
  dispatch(createTaskStart());
  try {
    const token = getState().auth.token;
    const response = await axios.post("http://127.0.0.1:8000/api/tasks", taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(createTaskSuccess(response.data));
  } catch (error) {
    dispatch(createTaskFailure(error.response?.data?.message || "Failed to create task"));
  }
};

// Update task
export const updateTask = (task) => async (dispatch, getState) => {
  dispatch(updateTaskStart());
  try {
    const token = getState().auth.token;
    const response = await axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}`, task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(updateTaskSuccess(response.data));
  } catch (error) {
    dispatch(updateTaskFailure(error.response?.data?.message || "Failed to update task"));
  }
};

export const deleteTask = (taskId) => async (dispatch, getState) => {
  dispatch(deleteTaskStart());
  try {
    const token = getState().auth.token;
    await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(deleteTaskSuccess(taskId));
  } catch (error) {
    dispatch(deleteTaskFailure(error.response?.data?.message || "Failed to delete task"));
  }
};

export default tasksSlice.reducer;
