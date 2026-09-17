
import Headling from '../../../components/ui/Headling/Headling';
import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';
import Link from 'next/link';
import { registerUser } from '../action';

export type RegisterForm = {
	email: {
		value: string
	},
	password: {
		value: string
	},
	name: {
		value: string
	}
}

export default function Register(){
	

	// const submit = async(e: FormEvent) => {
	// 	e.preventDefault();
	// 	setDisable(true);
	// 	const target = e.target as typeof e.target & RegisterForm;
	// 	try{
	// 		const { email, password, name } = target;
	// 		console.log(email.value, password.value, name.value);
	// 		const res = await registerUser({
	// 			'email': email.value,
	// 			'name': name.value,
	// 			'password': password.value
	// 		}).unwrap();
	// 		console.log(res);
	// 		dispatch(userActions.addJwt(res.access_token));
	// 	}catch(err){
	// 		console.error(err);
	// 		if (isFetchBaseQueryError(err)){
	// 			console.log('FetchBaseQueryError:', err);
	// 			console.log('Status:', err.status);
	// 			console.log('Data:', err.data);
	// 		}
	// 		console.log('Error:', err);
	// 	}finally{
	// 		setDisable(false);
	// 	}
	// };

	return (
		<div className='flex flex-col'>
			<Headling className='mb-[31px]'>Регистрация</Headling>
			<form className='flex flex-col gap-4  items-center mb-[31px]' action={registerUser}>
				<div className='flex flex-col w-[324px] gap-2'>
					<label htmlFor="" className='text-muted'>Ваш email</label>
					<Input type="text" name="email" id="email" placeholder='Введите email' className=''/>
				</div>
				<div className='flex flex-col w-[324px] gap-2'>
					<label htmlFor="" className='text-muted'>Ваш пароль</label>
					<Input type="text" name="password" id="password" placeholder='Пароль' className=''/>
				</div>
				<div className='flex flex-col gap-2 w-[324px] mb-[49px]'>
					<label htmlFor="" className='text-muted'>Ваше имя</label>
					<Input type="text" name="name" id="name" placeholder='Имя' className=''/>
				</div>
				<Button appearance='big' children={'Регистрация'} className='w-[248px] h-[60px] uppercase tracking-[0.08em]'/>
			</form>

			<div className='flex flex-col items-center text-sm font-semibold'>
				<div className='text-secondary'>Есть аккаунт?</div>
				<Link href='/login' className='text-primary'>Войти</Link>
			</div>
		</div>
	);
}