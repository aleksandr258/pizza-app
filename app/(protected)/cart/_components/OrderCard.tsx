import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import { useRouter } from 'next/navigation';

export function OrderCard(){
	const router = useRouter();

	return(
		<div className='flex flex-col items-center gap-15'>
			{/* <img src={OrderPizza}></img> */}
			<Image src='/order-pizza.png' alt="order pizza" width={200} height={200}></Image>
			<p className='text-3xl text-center max-w-[320px] font-light font-open-sans'>Ваш заказ успешно оформлен!</p>
			<Button onClick={() => router.push('/')} className='h-[60px] w-full max-w-[248px] '><span className='text-center font-open-sans tracking-wider uppercase'>Сделать новый</span></Button>
		</div>
	);
}