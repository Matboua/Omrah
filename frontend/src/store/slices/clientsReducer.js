import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchData,
	createItem,
	updateItem,
	deleteItem,
} from "../../config/axios";

// Async thunks for API operations
export const fetchClients = createAsyncThunk(
	"clients/fetchClients",
	async () => {
		return await fetchData("clients");
	}
);

export const addClientAsync = createAsyncThunk(
	"clients/addClient",
	async (clientData) => {
		return await createItem("clients", clientData);
	}
);

export const editClientAsync = createAsyncThunk(
	"clients/editClient",
	async (clientData) => {
		return await updateItem("clients", clientData.id, clientData);
	}
);

export const deleteClientAsync = createAsyncThunk(
	"clients/deleteClient",
	async (id) => {
		await deleteItem("clients", id);
		return id;
	}
);

const clientsSlice = createSlice({
	name: "clients",
	initialState: [],
	reducers: {
		// Keep local reducers for optimistic updates
		addClient: (state, action) => {
			state.push(action.payload);
		},
		editClient: (state, action) => {
			const { id, cin, first_name, last_name, city, phone, email } =
				action.payload;
			const client = state.find((client) => client.id == id);
			if (client) {
				client.cin = cin;
				client.first_name = first_name;
				client.last_name = last_name;
				client.city = city;
				client.phone = phone;
				client.email = email;
			}
		},
		deleteClient: (state, action) => {
			return state.filter((client) => client.id != action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchClients.fulfilled, (state, action) => {
				return action.payload;
			})
			.addCase(addClientAsync.fulfilled, (state, action) => {
				state.push(action.payload);
			})
			.addCase(editClientAsync.fulfilled, (state, action) => {
				const index = state.findIndex(
					(client) => client.id == action.payload.id
				);
				if (index !== -1) {
					state[index] = action.payload;
				}
			})
			.addCase(deleteClientAsync.fulfilled, (state, action) => {
				return state.filter((client) => client.id != action.payload);
			});
	},
});

export const { addClient, editClient, deleteClient } = clientsSlice.actions;
export default clientsSlice.reducer;
