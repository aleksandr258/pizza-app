import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from '../storage';
import axios from 'axios';
import { LoginResponse, RegisterResponse } from '../../interfaces/auth.interface';
import { PREFIX } from '../../Helpers/API';


export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState{
	jwt: string | null;	
}

export interface UserState {
	jwt: string | null;	
	error: null | string;
}

const initialState: UserState = {
	jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
	error: null
};

export const login = createAsyncThunk('user/login', 
	async (params: { email: string, password: string }) => {
		const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
			email: params.email,
			password: params.password
		});	
		return data;
	}
);

export const register = createAsyncThunk('user/register',
	async (params: { email: string, name: string, password: string}) => {
		const { data } = await axios.post<RegisterResponse>(`${PREFIX}/auth/register`, {
			email: params.email,
			name: params.name,
			password: params.password
		});
		return data;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		addJwt: (state, action: PayloadAction<string>) => {
			state.jwt = action.payload;
		},
		logout: ( state ) => {
			state.jwt = null;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, ( state, action: PayloadAction<LoginResponse>) => {
				state.jwt = action.payload.access_token;
			})
			.addCase(register.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
				state.jwt = action.payload.access_token;
			})
			.addCase(register.rejected, (state, action) => {
				state.error = action.error?.message ?? 'unknown error';
			});

	}
});

export default userSlice.reducer;
export const userActions  = userSlice.actions; 