'use client';
import Button from '@/components/ui/Button/Button';

export default function CartError(props: {error: Error & {digest?: string}, reset: () => void}) {
	return(
		<div className='flex flex-col items-center justify-center gap-4 mt-20'>
			<h1 className='text-center text-2xl font-bold'>Ошибка</h1>
			<p className='text-center text-lg'>{props.error.message}</p>
			<Button onClick={props.reset} className='w-full max-w-[248px] h-[60px]'>Попробовать снова</Button>
		</div>
	);
}