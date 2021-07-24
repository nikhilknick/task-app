import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//FETCH TASKS
export const getTasks = createAsyncThunk('tasks/getTasks', async () => {
	const token = localStorage.getItem('token');
	return fetch('http://localhost:3090/tasks?sortBy=createdAt:desc', {
		method: 'GET',
		headers: new Headers({
			authorization: `Bearer ${token}`,
		}),
	}).then((res) => res.json());
});

export const taskSlice = createSlice({
	name: 'tasks',
	initialState: {
		taskList: [],
		status: null,
	},
	extraReducers: {
		[getTasks.pending]: (state, action) => {
			state.status = 'loading';
		},
		[getTasks.fulfilled]: (state, { payload }) => {
			state.taskList = payload;
			state.status = 'success';
		},
		[getTasks.rejected]: (state, action) => {
			state.status = 'failed';
		},
	},
});
