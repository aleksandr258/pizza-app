import Headling from '../../../components/ui/Headling/Headling';
// import Search from '../../../components/Search/Search';
// import styles from './Menu.module.css';
import { ProductList } from './_components/MenuList';
import { PREFIX } from '@/src-legacy/Helpers/API';

// import { useState } from 'react';

export default async function Menu(){
	// const [ searchTerm, setSearchTerm ] = useState<string>('');
	const data = await fetch(`${PREFIX}/products`);
	const products = await data.json();



	// const displayedProducts = searchTerm 
	// 	? products?.filter(product => product.name.toLocaleLowerCase().includes(searchTerm.toLowerCase())
	// 		|| product.ingredients.some(ingridient => ingridient.toLowerCase().includes(searchTerm.toLowerCase())))
	// 	: data;


	return<div className='pl-9'>
		<div className='flex justify-between'>
			<Headling>Меню</Headling>
			{/* <Search placeholder='Введите блюдо или состав' onChange={(e) => setSearchTerm(e.target.value)}/> */}
		</div>
		<div>
			{/* {isLoading && <div className='flex items-center justify-center flex-wrap gap-11'>
				<ProductCardSkeleton/>
				<ProductCardSkeleton/>
				<ProductCardSkeleton/>
				<ProductCardSkeleton/>
			</div>} */}
			<ProductList products={products}/>
			{/* { {isErrorWithMessage(error) && <>{error.message}</>} */}
			{/* {displayedProducts && ( } */}
			{/* // 	displayedProducts.length > 0
			// 		? <ProductList products={displayedProducts}/>
			// 		:	<div>Ничего не найдено</div>
			// )} */}
		</div>
	</div>;
}

