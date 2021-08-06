import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signupUser = createAsyncThunk(
	'users/signupUser',
	async ({ name, email, password }, thunkAPI) => {
		try {
			const response = await fetch('/api/users', {
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
		const response = await fetch('/api/users/login', {
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
	return fetch('/api/users/logout', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	}).then((res) => res.json());
});

//FETCH USER PROFILE
export const fetchUserProfile = createAsyncThunk('users/fetchUserProfile', async (_, thunkAPI) => {
	const token = localStorage.getItem('token');
	try {
		const response = await fetch('/api/users/me', {
			method: 'GET',
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
		return thunkAPI.rejectWithValue(e.response.data);
	}
});

//UPLOAD PROFILE PIC
export const uploadProfilePic = createAsyncThunk(
	'users/uploadProfilePic',
	async (avatar, thunkAPI) => {
		const token = localStorage.getItem('token');

		return axios
			.post('/api/users/me/avatar', avatar, {
				headers: {
					'content-type': 'multipart/form-data',
					authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.json());
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		profile: null,
		isAuthenticated: false,
		status: null,
		profileFetchStatus: null,
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
		[fetchUserProfile.fulfilled]: (state, { payload }) => {
			state.profile = payload;
			state.profileFetchStatus = 'success';
		},
		[fetchUserProfile.pending]: (state, action) => {
			state.profileFetchStatus = 'loading';
		},
		[fetchUserProfile.rejected]: (state, action) => {
			state.profileFetchStatus = 'failed';
		},
		[uploadProfilePic.fulfilled]: (state, { payload }) => {},
	},
});
export const { logout } = userSlice.actions;
export const selectUser = (state) => state.user.profile;
export const selectUserFetchStatus = (state) => state.user.profileFetchStatus;
