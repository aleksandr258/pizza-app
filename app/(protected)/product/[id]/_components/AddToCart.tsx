import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import { useCart } from '@/components/Cart/useCart';
import { IProduct } from '@/types/product.interface';

export function AddToCart({ product }: { product: IProduct }) {
	const { dispatch } = useCart();

	return (
		<Button
			className='flex items-center gap-2'
			onClick={() => dispatch({ type: 'add', payload: product })}
		>
			<Image src='/cart-icon.svg' width={16} height={17} alt='cart icon' />
			<span>В корзину</span>
		</Button>
	);
}