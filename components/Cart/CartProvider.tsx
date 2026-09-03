"use client";
import { useReducer } from 'react';
import { cartReducer } from './CartReducer';
import { cartContext, CartState } from './CartContext';

const initialState: CartState = {
	items: [],
	total: 0
};


export function CartProvider({children}: { children: React.ReactNode}){
	const [ state, dispatch ] = useReducer(cartReducer, initialState);
	const total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
	return(
		<cartContext.Provider value={{...state, total, dispatch}}>
			{children}
		</cartContext.Provider>
	);

}