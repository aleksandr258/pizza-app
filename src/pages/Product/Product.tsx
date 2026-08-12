import { Await, useLoaderData } from 'react-router-dom';
import type { Product as ProductType } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import BackIcon from '../../assets/back-button.svg';
import Rating from '../../assets/star.svg';
import Cart from '../../assets/cart-icon.svg';
import { cartActions } from '../../store/cart/cart.slice'
import { useDispatch } from 'react-redux';	

export function Product(){
	const navigate = useNavigate();
	const data = useLoaderData() as ProductType;
	const dispatch = useDispatch();



	return<>
		<Suspense fallback={'Загружаю'}>
			<Await 
				resolve={data}
				errorElement={<div>Не можем отобразить продукт</div>}
			>
				{() => (
					<div className='flex flex-col'>
						<div className='flex justify-between items-center' >
							<button 
								onClick={() => navigate('/')} 
								className='flex items-center justify-center w-[38px] h-[38px] shadow-lg bg-white rounded-xl'>
									<img src={BackIcon} alt="Back button" />
							</button>
							<h1 className='text-4xl font-semibold'>{data.name}</h1>
							<Button className='flex items-center gap-2' onClick={() => dispatch(cartActions.addProduct(data))}><img src={Cart} alt=""/><span>В корзину</span></Button>
						</div>
						<div className='flex justify-center mt-[41px] '>
							<div>
								<img src={data.image} alt="product image" className='w-[323px] h-[248px] rounded-xl'/>
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
										<img src={Rating} alt="rating icon" />
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

				)}
			</Await>
		</Suspense>
	</>;
}