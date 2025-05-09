// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import clientsReducer, { fetchClients } from "./slices/clientsReducer";

const store = configureStore({
	reducer: {
		auth: authReducer,
		clients: clientsReducer,
	},
});

// Function to load data from json-server and sync with Laravel
export const loadInitialData = async () => {
	// Load data from JSON server
	await store.dispatch(fetchClients());
};

// Load the initial data when the app starts
loadInitialData();

export default store;
