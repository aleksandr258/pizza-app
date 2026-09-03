"use client";

import styles from './ProductCard.module.css';
import { CardProps } from './ProductCard.prop';
import { useCart } from '@/components/Cart/useCart';
// import { cartActions } from '../../store/cart/cart.slice';
import CartIcon from '../../../../../public/cart-icon.svg';
import Image from 'next/image';
import Link from 'next/link';

function ProductCard({ product }: CardProps ) {
	// const dispatch = useDispatch();
	const cartContext = useCart();

	return (
		<Link href={`/product/${product.id}`} className={styles['link']}>
			<div className={ styles['card-wrapper']}>
				<div className={styles['card-head']} style={{backgroundImage: `url('${product.image}')`}}>
					<div className={styles['price']}>
						{product.price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart']} 
						onClick={(e) => {
							e.preventDefault();
							cartContext.dispatch({type: 'add', payload: product});
						}}
					>
						<CartIcon className='text-white'></CartIcon>
						{/* <Image
							// className='text-white'
							src='/cart-icon.svg'
							alt='cart icon'
							width={16}
							height={17}
						/> */}
					</button>
					<div className={styles['rating']}>
						{product.rating}&nbsp;
						<Image
							src='/star.svg'
							alt="icon rating"
							width={10.27}
							height={9.81}
						/>
					</div>

				</div>
				<div className={ styles['card-footer']}>
					<div className={styles['title']}>{product.name}</div>
					<div className={styles['description']}>{product.ingredients.join(', ')}</div>
				</div>

			</div>
		</Link>

	);
}

export default ProductCard;