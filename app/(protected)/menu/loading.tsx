import { ProductCardSkeleton } from './_components/ProductCard/ProductCardSkeleton';

export default function Loading(){
	return (
		<div className='flex items-center justify-center flex-wrap gap-11'>
			<ProductCardSkeleton/>
			<ProductCardSkeleton/>
			<ProductCardSkeleton/>
			<ProductCardSkeleton/>
		</div>
	);
}