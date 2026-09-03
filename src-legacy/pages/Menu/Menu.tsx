import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { ProductList } from './MenuList/MenuList';
import { useGetProductsQuery } from '../../api/baseApi';
import { isErrorWithMessage } from '../../api/apiError';
import { ProductCardSkeleton } from '../../components/ProductCard/ProductCardSkeleton';
import { useState } from 'react';

function Menu(){
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const { data, isLoading, error } = useGetProductsQuery();

	const displayedProducts = searchTerm 
		? data?.filter(product => product.name.toLocaleLowerCase().includes(searchTerm.toLowerCase())
			|| product.ingredients.some(ingridient => ingridient.toLowerCase().includes(searchTerm.toLowerCase())))
		: data;


	return<>
		<div className={styles['head']}>
			<Headling>Меню</Headling>
			<Search placeholder='Введите блюдо или состав' onChange={(e) => setSearchTerm(e.target.value)}/>
		</div>
		<div>
			{isLoading && <div className='flex items-center justify-center flex-wrap gap-11'>
				<ProductCardSkeleton/>
				<ProductCardSkeleton/>
				<ProductCardSkeleton/>
				<ProductCardSkeleton/>
			</div>}
			{isErrorWithMessage(error) && <>{error.message}</>}
			{displayedProducts && (
				displayedProducts.length > 0
					? <ProductList products={displayedProducts}/>
					:	<div>Ничего не найдено</div>
			)}
		</div>
	</>;
}

export default Menu;