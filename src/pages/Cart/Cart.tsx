import { selectCart, selectTotal, cartActions, cartSlice} from '../../store/cart/cart.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PlusIcon from '../../assets/plus-icon.svg';
import MinusIcon from '../../assets/minus-icon.svg';
import CloseIcon from '../../assets/close-icon.svg';
import Button from '../../components/Button/Button';
import { useCreateOrderMutation } from '../../api/baseApi';
import { isFetchBaseQueryError } from '../../api/apiError';
import { useState } from 'react';
import { OrderCard } from './OrderCard';

export function Cart(){
	const dispatch = useAppDispatch();
	const [isDisable, setDisable] = useState<boolean>(false);
	const cart = useAppSelector(selectCart);
	const total = useAppSelector(selectTotal);
	const [createOrder, { data, error }] = useCreateOrderMutation();

	const submitOrder = async () => {
		setDisable(true);
		const productsArr = cart.cartProducts.map(product => {
			return {
				id: product.id,
				count: product.quantity
			};
		});
		console.log(productsArr);
		try{
			const res = await createOrder({products: productsArr}).unwrap();
			console.log(res);
			dispatch(cartSlice.actions.clearCart());
		}catch(err){
			console.error(err);
			if (isFetchBaseQueryError(err)){
				console.log('FetchBaseQueryError:', err);
				console.log('Status:', err.status);
				console.log('Data:', err.data);
			}
			console.log('Error:', err);
		}finally{
			setDisable(false);
		}
	};

	if (data?.status){
		return <OrderCard></OrderCard>;
	}

	return (
		<>
			<section className='max-w-[617px]'>
				<h1 className='text-4xl font-semibold mb-10'>Корзина</h1>
				<div className='flex flex-col items-center'>
					<div className='flex flex-col gap-4 w-full'>
						<ul className='flex flex-col gap-7'>
							{cart.cartProducts.map(product => 
								<li key={product.id}>
									<div className='flex items-center gap-4 w-full justify-between'>
										<div className='flex items-center gap-5'>
											<img src={product.image} alt="product image" className='w-[82px] h-[82px] shadow-[0px_8px_25px_0px_#E0DBC4E5] object-cover rounded-2xl' />
											<div>
												<h1 className='font-open-sans text-lg font-semibold'>{product.name}</h1>
												<p className='text-primary font-semibold font-open-sans'>{product.price} ₽</p>
											</div>
										</div>
										<div className='flex items-center gap-2'>
											<button onClick={() => dispatch(cartActions.removeProduct(product.id))} className='flex justify-center rounded-full border border-primary w-[28px] h-[28px]'>
												<img  className='w-[10px]' src={MinusIcon}></img>
											</button>
											<span>{product.quantity > 9 ? `0${product.quantity}` : product.quantity}</span>
											<button onClick={() => dispatch(cartActions.addProduct(product))} className='flex justify-center rounded-full  bg-primary w-[28px] h-[28px] shadow-[0px_8.5px_18.21px_0px_#FE724C66]'>
												<img className='w-[10px]' src={PlusIcon}></img>
											</button>
											<button onClick={() => dispatch(cartActions.clearCart())} >
												<img src={CloseIcon}></img>
											</button>
										</div>
									</div>
								</li>
							)}
						</ul>
						
						<div className='flex px-4 gap-4 items-center justify-between w-full mt-8 border border-[#EEEEEE] rounded-3xl h-[60px]'>
							<input type="text" placeholder='Промокод' className='w-full'/>
							<Button className='h-[44px]'>Применить</Button>
						</div>

						<div className='flex flex-col gap-5 mt-7'>
							<div className='border-b border-[#EEEEEE] items-center justify-between flex pb-2'>
								<p>Итог</p>
								<span>{total}</span>
							</div>
							<div className='border-b border-[#EEEEEE] items-center justify-between flex pb-2'>
								<p>Доставка</p>
								<span>100</span>
							</div>
							<div className='items-center justify-between flex'>
								<p>Итог <span className='text-muted'>(2)</span></p>
								<span>{total}</span>
							</div>
						</div>
						
						<div className='flex justify-center mt-8'>
							<Button onClick={() => submitOrder()} disabled={isDisable || cart.cartProducts.length < 1} className='w-full max-w-[248px] h-[60px]'>Оформить</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}