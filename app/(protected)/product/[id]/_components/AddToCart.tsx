'use client';
import Button from '@/components/ui/Button/Button';
import { useCart } from '@/components/Cart/useCart';
import { IProduct } from '@/types/product.interface';
import CartIcon from '@/public/cart-icon.svg';

export function AddToCart({ product }: { product: IProduct }) {
	const { dispatch } = useCart();

	return (
		<Button
			className='flex items-center gap-2'
			onClick={() => dispatch({ type: 'add', payload: product })}
		>
			<CartIcon className='text-white'></CartIcon>
			<span>В корзину</span>
		</Button>
	);
}