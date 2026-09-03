"use client";
import Button from '../../../components/ui/Button/Button';
import { useState, useTransition } from 'react';
import { OrderCard } from './_components/OrderCard';
import { useCart } from '@/components/Cart/useCart';
import { PREFIX } from '@/src-legacy/Helpers/API';
import Image from 'next/image';



export default function CartPage(){
	// const [isDisable, setDisable] = useState<boolean>(false);
	const cartContext = useCart();
	const [isPending, startTransition] = useTransition();
	const [ordered, setOrdered] = useState(false);


	const submitOrder = async () => {
		const productsArr = cartContext.items.map(product => {
			return {
				id: product.id,
				count: product.quantity
			};
		});
		startTransition(async () => {
			const res = await fetch(`${PREFIX}/order`, {
				method: 'POST',
				body: JSON.stringify({products: productsArr})
			});
			if (res.ok){
				cartContext.dispatch({type: 'clearCart'});
				setOrdered(true);
			}
			if (!res.ok){	
				console.error('Ошибка при оформлении заказа:', res);
				throw new Error('Ошибка при оформлении заказа');
			}
		});
	};

	// внутри startTransition, в ветке res.ok:


	// после всех хуков, перед основным return:
	if (ordered) return <OrderCard />;
	// if (data?.status){
	// 	return <OrderCard></OrderCard>;
	// }

	// if ( error){
	// 	return <div>Возника ошибка при оформлении заказа: <span className='text-red-500'>{getErrorMessage(error)}</span></div>;
	// }

	return (
		<>
			<section className='max-w-[617px]'>
				<h1 className='text-4xl font-semibold mb-10'>Корзина</h1>
				<div className='flex flex-col items-center'>
					<div className='flex flex-col gap-4 w-full'>
						<ul className='flex flex-col gap-7'>
							{cartContext.items.map(product => 
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
											<button onClick={() => cartContext.dispatch({type: 'remove', payload: product.id})} className='flex justify-center rounded-full border border-primary w-[28px] h-[28px]'>
												{/* <img  className='w-[10px]' src={MinusIcon}></img> */}
												<Image src='/minus-icon.svg' width={10} height={10} alt='minus icon'/>
											</button>
											<span>{product.quantity > 9 ? `0${product.quantity}` : product.quantity}</span>
											<button onClick={() => cartContext.dispatch({type: 'add', payload: product})} className='flex justify-center rounded-full  bg-primary w-[28px] h-[28px] shadow-[0px_8.5px_18.21px_0px_#FE724C66]'>
												{/* <img className='w-[10px]' src={PlusIcon}></img> */}
												<Image
													src='/plus-icon.svg'
													alt="plus icon"
													width={10}
													height={10}
												/>
											</button>
											<button onClick={() => cartContext.dispatch({type: 'clearProduct', payload: product.id})} >
												{/* <img src={CloseIcon}></img> */}
												<Image src='/close-icon.svg' alt="close icon" width={10} height={10}></Image>
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
								<span>{cartContext.total}</span>
							</div>
							<div className='border-b border-[#EEEEEE] items-center justify-between flex pb-2'>
								<p>Доставка</p>
								<span>100</span>
							</div>
							<div className='items-center justify-between flex'>
								<p>Итог <span className='text-muted'>(2)</span></p>
								<span>{cartContext.total}</span>
							</div>
						</div>
						
						<div className='flex justify-center mt-8'>
							<Button onClick={() => submitOrder()} disabled={isPending || cartContext.items.length < 1} className='w-full max-w-[248px] h-[60px]'>Оформить</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}