import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { selectCart, selectTotal, cartActions} from '../../store/cart/cart.slice';

export function Cart(){
	const dispatch = useDispatch<AppDispatch>();
	const cart = useSelector(selectCart);
	const total = useSelector(selectTotal);


	return (
		<>
			<section>
				<h1>Корзина</h1>
				<div className='flex flex-col items-center'>
					<div>
						<ul className='flex flex-col'>
							{cart.cartProducts.map(product => 
								<li key={product.id}>
									<div>
										<img src={product.image} alt="product image" />
										<div>
											<h1>{product.name}</h1>
											<p>{product.price}</p>
										</div>
										<div>
											<button onClick={() => dispatch(cartActions.addProduct(product))}>+</button>
											<span>{product.quantity > 9 ? `0${product.quantity}` : product.quantity}</span>
											<button onClick={() => dispatch(cartActions.removeProduct(product.id))}>-</button>
										</div>
										
									</div>
								</li>
							)}
						</ul>
						
						<div>
							<input type="text" placeholder='Промокод' />
							<button>Применить</button>
						</div>

						<div>
							<div>
								<p>Итог</p>
								<span>{total}</span>
							</div>
							<div>
								<p>Доставка</p>
								<span>100</span>
							</div>
							<div>
								<p>Итог(2)</p>
								<span>{total}</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}