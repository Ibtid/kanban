import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/login", userData);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || "Login failed"));
  }
};

export const registerUser = (userData, navigate) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/register", {
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.confirmPassword, // Laravel requires this
    });

    dispatch(loginSuccess(response.data)); // Assuming you store token after registration
  } catch (error) {
    dispatch(loginFailure(error.response?.data || "Registration failed"));
  }
};




export default authSlice.reducer;
