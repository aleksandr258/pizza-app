import OrderPizza from '../../assets/order-pizza.png';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

export function OrderCard(){
	const navigate = useNavigate();
	return(
		<div className='flex flex-col items-center gap-15'>
			<img src={OrderPizza}></img>
			<p className='text-3xl text-center max-w-[320px] font-light font-open-sans'>Ваш заказ успешно оформлен!</p>
			<Button onClick={() => navigate('/')} className='h-[60px] w-full max-w-[248px] '><span className='text-center font-open-sans tracking-wider uppercase'>Сделать новый</span></Button>
		</div>
	);
}