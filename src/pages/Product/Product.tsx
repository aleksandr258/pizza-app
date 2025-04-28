import { Await, useLoaderData } from 'react-router-dom';
import type { Product as ProductType } from '../../interfaces/product.interface';
import { Suspense } from 'react';

export function Product(){

	const data = useLoaderData() as ProductType;
	return<>
		<Suspense fallback={'Загружаю'}>

			<Await 
				resolve={data}
				errorElement={<div>Не можем отобразить продукт</div>}
			>
				{(resolvedData: ProductType) => (
					<div>Product name: {resolvedData.name}</div>
				)}

				
			</Await>
		</Suspense>
	</>;
}