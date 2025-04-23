import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';
import styles from './MenuList.module.css';

export function ProductList({products}: MenuListProps){
	return <div className={styles['product-cards-wrap']}>
		{products.map(p => (
			<ProductCard
				key={p.id}
				productId={p.id}
				price={p.price}
				productRating={p.rating}
				image={p.image}
				description={p.ingredients.join(', ')}
				name={p.name}
			/>
		))}
	</div>; 
}