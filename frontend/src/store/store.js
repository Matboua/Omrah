// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import clientsReducer from "./slices/clientsReducer";

export default configureStore({
	reducer: {
		auth: authReducer,
		clients: clientsReducer,
	},
});
