import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import  { Product } from '../interfaces/product.interface.ts';
import { RootState } from '../store/store.ts';
import { OrderResponse, CreateOrderPayload} from '../interfaces/order.interface.ts';
import { AuthRegisterPayload, RegisterResponse, LoginResponse} from '../interfaces/auth.interface.ts';
import { ProfileResponse } from '../interfaces/profile.interface.ts';

export const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: fetchBaseQuery({ 
		baseUrl: 'https://purpleschool.ru/pizza-api-demo/',
		prepareHeaders: ( headers, {getState, endpoint}) => {
			const publicEndpoints = ['getProducts', 'getProductById'];
			if (!publicEndpoints.includes(endpoint)){
				const token = (getState() as RootState).user.jwt;
				if( token ) {
					headers.set('Authorization', `Bearer ${token}`);
				}
			}
			return headers;
		}
	}),
	endpoints: (builder) => ({
		getProfile: builder.query<ProfileResponse, void>({
			query:() => 'user/profile'
		}),
		getProducts: builder.query<Product[], void>({
			query: () => 'products'
		}),
		getProductById: builder.query<Product, number>({
			query: (id) => `products/${id}`
		}),
		createOrder: builder.mutation<OrderResponse, CreateOrderPayload>({
			query: (order) => ({
				url: 'order',
				method: 'POST',
				body: order
			})
		}),
		registerUser: builder.mutation<RegisterResponse, AuthRegisterPayload>({
			query: (user) => ({
				url: 'auth/register',
				method: 'POST',
				body: user
			})
		}),
		loginUser: builder.mutation<LoginResponse, {email: string, password: string}>({
			query: (credentials) => ({
				url: 'auth/login',
				method: 'POST',
				body: credentials
			})
		})
	})
});

export const { 
	useGetProfileQuery,
	useGetProductsQuery,
	useGetProductByIdQuery,
	useCreateOrderMutation,
	useRegisterUserMutation,
	useLoginUserMutation
} = baseApi;