import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';

// Async thunks
export const fetchClients = createAsyncThunk(
	'clients/fetchClients',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get('/api/clients');
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message);
		}
	}
);

export const addClient = createAsyncThunk(
	'clients/addClient',
	async (clientData, { rejectWithValue }) => {
		try {
			const response = await axios.post('/clients', clientData);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message);
		}
	}
);

export const editClient = createAsyncThunk(
	'clients/editClient',
	async (clientData, { rejectWithValue }) => {
		try {
			const response = await axios.put(`api/clients/${clientData.id}`, clientData);
			return response.data;
		} catch (err) {
			console.error(err)
			return rejectWithValue(err.response?.data || err.message);
		}
	}
);

export const deleteClient = createAsyncThunk(
	'clients/deleteClient',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`/api/clients/${id}`);
			console.log(response.data.message)
			return id;
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message);
		}
	}
);

// Slice
const clientsSlice = createSlice({
	name: 'clients',
	initialState: {
		clients: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchClients.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchClients.fulfilled, (state, action) => {
				state.loading = false;
				state.clients = action.payload;
			})
			.addCase(fetchClients.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(addClient.fulfilled, (state, action) => {
				state.clients.push(action.payload);
			})

			.addCase(editClient.fulfilled, (state, action) => {
				const index = state.clients.findIndex(c => c.id === action.payload.id);
				if (index !== -1) state.clients[index] = action.payload;
			})

			.addCase(deleteClient.fulfilled, (state, action) => {
				state.clients = state.clients.filter(c => c.id !== action.payload);
			});
	},
});

export default clientsSlice.reducer;
