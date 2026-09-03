import { useContext } from 'react';
import { cartContext } from './CartContext';

export function useCart() {
	const ctx = useContext(cartContext);
	if (!ctx){
		throw new Error('useCart must be used within a CartProvider');
	}
	return ctx;
}