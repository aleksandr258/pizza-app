import { saveState } from './storage';
import { JWT_PERSISTENT_STATE, userSlice } from './user/user.slice';
import { cartSlice } from './cart/cart.slice';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		cart: cartSlice.reducer,
		[baseApi.reducerPath]: baseApi.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
}); 

store.subscribe(() => {
	saveState({jwt: store.getState().user.jwt}, JWT_PERSISTENT_STATE);	
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;