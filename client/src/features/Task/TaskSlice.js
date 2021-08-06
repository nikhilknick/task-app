import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//FETCH TASKS
export const getTasks = createAsyncThunk('tasks/getTasks', async () => {
	const token = localStorage.getItem('token');
	return fetch('/api/tasks?sortBy=createdAt:desc', {
		method: 'GET',
		headers: new Headers({
			authorization: `Bearer ${token}`,
		}),
	}).then((res) => res.json());
});

//ADD TASKS
export const addTask = createAsyncThunk(
	'tasks/addTask',
	async ({ description }, { rejectWithValue }) => {
		const token = localStorage.getItem('token');
		try {
			const response = await fetch('/api/tasks', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					description,
				}),
			});
			let data = await response.json();
			if (response.status === 201) {
				return { ...data };
			} else {
				return rejectWithValue(data);
			}
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);

//UPDATE TASK COMPLETION
export const updateTaskCompletion = createAsyncThunk(
	'tasks/updateTaskCompletion',
	async ({ id, completed }, { rejectWithValue }) => {
		const token = localStorage.getItem('token');
		try {
			const response = await fetch(`/api/tasks/${id}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					completed: !completed,
				}),
			});
			let data = await response.json();
			if (response.status === 200) {
				return { ...data };
			} else {
				return rejectWithValue(data);
			}
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);

//DELETE TASK
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, { rejectWithValue }) => {
	const token = localStorage.getItem('token');
	try {
		const response = await fetch(`/api/tasks/${id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		});
		let data = await response.json();
		if (response.status === 200) {
			return { ...data };
		} else {
			return rejectWithValue(data);
		}
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

//EDIT TASK
export const editTask = createAsyncThunk(
	'tasks/editTask',
	async ({ id, taskDescription }, { rejectWithValue }) => {
		const token = localStorage.getItem('token');
		try {
			const response = await fetch(`/api/tasks/${id}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					description: taskDescription,
				}),
			});
			let data = await response.json();
			if (response.status === 200) {
				return { ...data };
			} else {
				return rejectWithValue(data);
			}
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);

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
		[addTask.fulfilled]: (state, { payload }) => {
			state.taskList.unshift(payload);
		},
		[updateTaskCompletion.fulfilled]: (state, { payload }) => {
			const taskIndex = state.taskList.findIndex((task) => task._id === payload._id);
			state.taskList[taskIndex].completed = payload.completed;
		},
		[deleteTask.fulfilled]: (state, { payload }) => {
			state.taskList = state.taskList.filter((task) => task._id !== payload._id);
		},
		[editTask.fulfilled]: (state, { payload }) => {
			const taskIndex = state.taskList.findIndex((task) => task._id === payload._id);
			state.taskList[taskIndex].description = payload.description;
		},
	},
});

export const selectTaskList = (state) => state.task.taskList;
export const selectTaskFetchStatus = (state) => state.task.status;
