import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { CardProps } from './ProductCard.prop';


function ProductCard(props: CardProps) {
	return (
		<Link to={'/'} className={styles['link']}>
			<div className={ styles['card-wrapper']}>
				<div className={styles['card-head']} style={{backgroundImage: `url('${props.image}')`}}>
					<div className={styles['price']}>
						{props.price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart']}>
						<img src="src/assets/cart-icon.svg" alt="cart icon" />
					</button>
					<div className={styles['rating']}>
						{props.productRating}&nbsp;
						<img src='src/assets/star.svg' alt="icon rating"/>
					</div>

				</div>
				<div className={ styles['card-footer']}>
					<div className={styles['title']}>{props.title}</div>
					<div className={styles['description']}>{props.description}</div>
				</div>

			</div>
		</Link>

	);
}

export default ProductCard;