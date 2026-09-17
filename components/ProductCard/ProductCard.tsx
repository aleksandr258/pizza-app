import styles from './ProductCard.module.css';
import { CardProps } from './ProductCard.prop';
import { useDispatch } from 'react-redux';
import CartIcon from '../../assets/cart-icon.svg?react';


function ProductCard({ product }: CardProps ) {
	const dispatch = useDispatch();

	return (
		<Link to={`/product/${product.id}`} className={styles['link']}>
			<div className={ styles['card-wrapper']}>
				<div className='relative rounded-2xl min-h-[165px] bg-cover bg-center bg-no-repeat' style={{backgroundImage: `url('${product.image}')`}}>
					<div className={styles['price']}>
						{product.price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart']} 
						onClick={(e) => {
							e.preventDefault();
							dispatch(cartActions.addProduct(product));
						}}>
						<CartIcon className='text-white'></CartIcon>
					</button>
					<div className={styles['rating']}>
						{product.rating}&nbsp;
						<img src='src/assets/star.svg' alt="icon rating"/>
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