import { Await, useLoaderData } from 'react-router-dom';
import type { Product as ProductType } from '../../interfaces/product.interface';
import { Suspense } from 'react';

export function Product(){

	const data = useLoaderData() as { data: ProductType};
	return<>
		<Suspense fallback={'Загружаю'}>

			<Await resolve={data}>
				{({data}:  {data: ProductType}) => (
					<>Product - {data.name}</>
				)}
			</Await>
		</Suspense>
	</>;
}