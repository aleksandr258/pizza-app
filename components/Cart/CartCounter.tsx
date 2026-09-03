"use client";
import { useCart } from '@/components/Cart/useCart';

export default function CartCounter() {
	const cartContext = useCart();

	if (!cartContext) {
		return null;
	}

	return(
		<span className='absolute  -top-4 -right-1 text-sm'>{ cartContext.items.length > 0 ? cartContext.items.length : null}</span>
	);
}