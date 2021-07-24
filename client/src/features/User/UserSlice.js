import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signupUser = createAsyncThunk(
	'users/signupUser',
	async ({ name, email, password }, thunkAPI) => {
		try {
			const response = await fetch('http://localhost:3090/users', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});
			let data = await response.json();
			if (response.status === 201) {
				localStorage.setItem('token', data.token);
				return { ...data };
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

export const signinUser = createAsyncThunk('users/signinUser', async (data, thunkAPI) => {
	try {
		const response = await fetch('http://localhost:3090/users/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: data.email,
				password: data.password,
			}),
		});
		let res = await response.json();
		if (response.status === 200) {
			localStorage.setItem('token', res.token);
			return { ...res, username: res.user.name };
		} else {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data);
	}
});

export const logoutUser = createAsyncThunk('users/logout', async () => {
	const token = localStorage.getItem('token');
	return fetch('http://localhost:3090/users/logout', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	}).then((res) => res.json());
});

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		isAuthenticated: false,
		status: null,
	},
	reducers: {},
	extraReducers: {
		[signupUser.fulfilled]: (state, { payload }) => {
			state.user = payload.user;
			state.isAuthenticated = true;
			state.status = 'success';
		},
		[signupUser.pending]: (state, action) => {
			state.status = 'loading';
		},
		[signupUser.rejected]: (state, action) => {
			state.status = 'failed';
		},
		[signinUser.fulfilled]: (state, { payload }) => {
			state.user = payload.user;
			state.isAuthenticated = true;
			state.status = 'success';
		},
		[signinUser.pending]: (state, action) => {
			state.status = 'loading';
		},
		[signinUser.rejected]: (state, action) => {
			state.status = 'failed';
		},
		[logoutUser.fulfilled]: (state, action) => {
			state.isAuthenticated = false;
		},
	},
});
export const { logout } = userSlice.actions;
export const userSelector = (state) => state.user;
