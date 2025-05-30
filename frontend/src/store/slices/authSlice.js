// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios"; // your pre-configured axios with withCredentials: true

// Async: fetch authenticated user
export const fetchUser = createAsyncThunk(
	"auth/fetchUser",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get("/api/user");
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data?.message || "Not authenticated"
			);
		}
	}
);

// Async: logout user
export const logoutUser = createAsyncThunk(
	"auth/logoutUser",
	async (_, thunkAPI) => {
		try {
			const response = await axios.post("/api/logout");
			console.log(response.data.message);
			return true;
		} catch (error) {
			return thunkAPI.rejectWithValue("Logout failed");
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		isAuthenticated: false,
		role: null,
		loading: true,
		error: null,
	},
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.role = action.payload.role;
			state.error = null;
		},
		clearUser(state) {
			state.user = null;
			state.isAuthenticated = false;
			state.role = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuthenticated = true;
				state.role = action.payload.role;
				state.loading = false;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.user = null;
				state.isAuthenticated = false;
				state.role = null;
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
				state.isAuthenticated = false;
				state.role = null;
			});
	},
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
