import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { ProductList } from './MenuList/MenuList';
import { useGetProductsQuery } from '../../api/baseApi';
import { isErrorWithMessage } from '../../api/apiError';
import { ProductCardSkeleton } from '../../components/ProductCard/ProductCardSkeleton';


function Menu(){
	const { data, isLoading, error } = useGetProductsQuery();

	return<>
		<div className={styles['head']}>
			<Headling>Меню</Headling>
			<Search placeholder='Введите блюдо или состав'/>
		</div>
		<div>
			{isLoading && <div className='flex items-center justify-center flex-wrap gap-11'>
				<ProductCardSkeleton/>
				<ProductCardSkeleton/>
				<ProductCardSkeleton/>
				<ProductCardSkeleton/>
			</div>}
			{isErrorWithMessage(error) && <>{error.message}</>}
			{data && <ProductList products={data}/>}
		</div>
	</>;
}

export default Menu;