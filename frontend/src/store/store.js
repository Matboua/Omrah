// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
// import clientsReducer, { fetchClients } from "./slices/clientsReducer";
import clientsReducer from "./slices/clientsReducer"

const store = configureStore({
	reducer: {
		auth: authReducer,
		clients: clientsReducer,
	},
});

export default store;
