import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import { FormEvent } from 'react';
import { PREFIX } from '../../Helpers/API';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { LoginResponse } from '../../interfaces/auth.interface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/user.slice';

export type LoginForm = {
	email:{
		value: string;
	};
	password: {
		value: string;
	}
}

export function Login(){
	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const submit = async (e: FormEvent ) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const {email, password} = target;
		console.log(email.value, password.value);
		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		try {
			const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email,
				password
			});
			localStorage.setItem('jwt', data.access_token);
			dispatch(userActions.addJwt(data.access_token));
			navigate('/');
			console.log(data);
		} catch (error) {
			if (error instanceof AxiosError){
				console.log(error);
				setError(error.response?.data.message);
			}
		}
	};

	return (
		<div className='flex flex-col  max-w-[324px] ml-[88px]' >
			<Headling>Вход</Headling>
			{error && <div className='text-red-500 text-center'>{error}</div>}
			<form action="" className='flex flex-col mt-8 mb-4 gap-[30px]' onSubmit={submit}>
				<div className='flex flex-col gap-2'>
					<label htmlFor="email" className='text-[color:#C4C4C4] font-lg font-normal'>Ваш email</label>
					<Input type="text" name='email' id='email' placeholder='Введите email' className=' h-[65px]'/>
				</div>
				<div className='flex flex-col mt-4 gap-2'>
					<label htmlFor="password"  className='text-[color:#C4C4C4] font-lg font-normal'>Ваш пароль</label>
					<Input type='password' name='password' id='password' placeholder='Введите пароль' className=' h-[65px]'/>
				</div>
				<Button appearance='big' children={'Вход'} className='w-[248px] block mx-auto '/>
			</form>
			<div className='flex flex-col items-center'>
				<div className='text-sm font-semibold text-[color:var(--text-secondary-color)]'>Нет аккаунта?</div>
				<Link to='/auth/register' className='text-[color:var(--primary-color)]'>Зарегистрироваться</Link>
			</div>
		</div>
	);
}