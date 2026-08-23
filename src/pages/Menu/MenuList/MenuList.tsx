import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';
import styles from './MenuList.module.css';

export function ProductList({products}: MenuListProps){
	return <div className={styles['product-cards-wrap']}>
		{products.map(p => (
			<ProductCard product={p}/>
		))}
	</div>; 
}