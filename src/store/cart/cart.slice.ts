import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Product } from '../../interfaces/product.interface';
import { RootState } from '../store';



export interface CartItem extends Product {
	quantity: number;
}

export interface Cart {
	cartProducts: CartItem[],
}

const initialState: Cart = {
	cartProducts: []
};

export const selectCart = (store: RootState) => store.cart;
export const selectTotal = (store: RootState) => store.cart.cartProducts.reduce((total, product) => total += product.quantity * product.price, 0);
export const selectCounter = (store: RootState) => store.cart.cartProducts.reduce((counter, product) => counter += product.quantity, 0);

export const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<Product>) => {
			const exist = state.cartProducts.find(item => item.id === action.payload.id);
			if (exist){
				exist.quantity += 1;
			}else {
				state.cartProducts.push({...action.payload, quantity: 1});
			}
		},
		removeProduct: (state, action: PayloadAction<number>) => {
			const findProduct = state.cartProducts.find(product => product.id === action.payload);
			if (findProduct){
				findProduct.quantity -= 1;
				state.cartProducts.filter(product => product.quantity > 0);
			}
			if (findProduct && findProduct.quantity === 0){
				state.cartProducts = state.cartProducts.filter(product => product.id !== action.payload);
			}
		},
		clearCart: (state) => {
			state.cartProducts = [];
		},
		clearProduct: (state, action: PayloadAction<number>) => {
			state.cartProducts = state.cartProducts.filter(product => product.id !== action.payload);
		}
	}
});

export const cartActions = cartSlice.actions;