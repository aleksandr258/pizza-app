import { useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import { AxiosError } from 'axios';
import { ProductList } from './MenuList/MenuList';
import { getProducts } from '../../api/product';


function Menu(){
	const [products, SetProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false); 
	const [error, setError] = useState<string | undefined>();
	const getMenu = async () => {
		try{
			setIsLoading(true);
			const data = await getProducts();
			SetProducts(data);
			setIsLoading(false);
		}catch(err){
			console.error(err);
			if (err instanceof AxiosError){
				setError(err.message);
			}
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getMenu();
	}, []);

	return<>
		<div className={styles['head']}>
			<Headling>Меню</Headling>
			<Search placeholder='Введите блюдо или состав'/>
		</div>
		<div>
			{error && <>{error}</>}
			{!isLoading && <ProductList products={products}/>}
		</div>
	</>;
}

export default Menu;