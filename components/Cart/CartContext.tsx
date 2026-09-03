"use client";
import { IProduct } from '@/types/product.interface';
import { createContext, type Dispatch} from 'react';


export interface CartItem extends IProduct {
	quantity: number;
}

export type CartActions = 
	{ type: 'add', payload: IProduct}
	| { type: 'remove', payload: number}
	| { type: 'clearCart'}
	|	{ type: 'clearProduct', payload: number}

export type CartState = {
	items: CartItem[],
	total: number
}

export type CartContextValue =  CartState & {
	dispatch: Dispatch<CartActions>
}

export const cartContext = createContext<CartContextValue | undefined>(undefined);
