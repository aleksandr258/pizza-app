import Link from 'next/link';
// import { cartActions } from '../../store/cart/cart.slice';
// import { useGetProductByIdQuery } from '../../api/baseApi';
// import { useParams } from 'react-router-dom';
import Image from 'next/image';
import { AddToCart } from './_components/AddToCart';
import { IProduct } from '@/types/product.interface';
import { PREFIX } from '@/src-legacy/Helpers/API';



export default async function Product({ params }: { params: Promise<{ id: string }> }) {
	// const navigate = useNavigate();
	const { id } = await params;
	// const { id } = useParams<{ id: string }>();
	// const dispatch = useDispatch();
	// const { data, isLoading, error } = useGetProductByIdQuery( Number(id), {skip: !id} );
	const res = await fetch(`${PREFIX}/products/${id}`);
	const data = await res.json() as IProduct;
	// if (isLoading){
	// 	return <div>Загрузка...</div>;
	// }

	// if (error){
	// 	return <div>Ошибка при загрузке продукта</div>;
	// }

	// if (!data){
	// 	return <div>Продукт не найден</div>;
	// }

	return(
		<div className='flex flex-col'>
			<div
			 className='flex justify-between items-center' >
				<Link href='/' className='flex items-center justify-center w-[38px] h-[38px] shadow-lg bg-white rounded-xl'>
					<Image src='/back-button.svg' width={10} height={10} alt='back button'/>
				</Link>
				<h1 className='text-4xl font-semibold'>{data.name}</h1>
				<AddToCart product={data}/>
				{/* <Button className='flex items-center gap-2' onClick={() => dispatch(cartActions.addProduct(data))}>
					<CartIcon className='text-white'></CartIcon>
					<span>В корзину</span>
				</Button> */}
			</div>
			<div className='flex justify-center mt-[41px] '>
				<div>
					{/* <img src={data.image} alt="product image" className='w-[323px] h-[248px] rounded-xl'/> */}
					<Image src={data.image} alt="product image" width={323} height={248} className='rounded-xl'/>
				</div>
				<div className='flex flex-col min-w-[242px] ml-[48px] gap-[17px]'>
					<dl className='flex border-b justify-between border-[#F1F2F3]'>
						<dt>Цена</dt>
						<dd>{data.price}</dd>
					</dl>
					<dl className='flex justify-between mb-[35px]'>
						<dt>Рейтинг</dt>
						<dd className='flex items-center justify-center w-[51px] flex-row shadow-lg rounded-xl bg-white gap-1'>
							<span className='font-semibold text-xs'>{data.rating}</span>
							{/* <img src={Rating} alt="rating icon" /> */}
							<Image src='/star.svg' width={10} height={10} alt='rating icon'/>
						</dd>
					</dl>
					<div className='flex flex-col '>
						<h3 className='font-semibold text-secondary mb-[12px]'>Состав</h3>
						<ul className='ml-4'>
							{data.ingredients.map((ingredient) => 
								<li className='list-disc font-normal text-secondary'>{ingredient}</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}