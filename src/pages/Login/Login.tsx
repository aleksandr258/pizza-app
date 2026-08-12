import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import { FormEvent, useEffect, useState } from 'react';
import { useLoginUserMutation } from '../../api/baseApi';
import { useAppDispatch, useAppSelector} from '../../store/hooks';
import { userActions } from '../../store/user/user.slice';
import { isFetchBaseQueryError, getErrorMessage } from '../../api/apiError';


export type LoginForm = {
	email:{
		value: string;
	};
	password: {
		value: string;
	}
}

export function Login(){
	const [disableButton, setDisable] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [loginUser, {error}] = useLoginUserMutation();
	const jwt = useAppSelector(s => s.user.jwt);

	useEffect(() => {
		if (jwt){
			navigate('/');
		}

	},[jwt, navigate]);

	const submit = async (e: FormEvent ) => {
		e.preventDefault();
		setDisable(true);
		const target = e.target as typeof e.target & LoginForm;
		const {email, password} = target;
		console.log(email.value, password.value);
		try{
			const res = await loginUser({
				email: email.value,
				password: password.value
			}).unwrap();
		
			console.log(res);
			dispatch(userActions.addJwt(res.access_token));
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


	return (
		<div className='flex flex-col  max-w-[324px] ml-[88px]' >
			<Headling>Вход</Headling>
			{isFetchBaseQueryError(error) && <div className='text-red-500 text-center'>{getErrorMessage(error)}</div>}
			<form action="" className='flex flex-col mt-8 mb-4 gap-[30px]' onSubmit={submit}>
				<div className='flex flex-col gap-2'>
					<label htmlFor="email" className='text-[color:#C4C4C4] font-lg font-normal'>Ваш email</label>
					<Input type="text" name='email' id='email' placeholder='Введите email' className=' h-[65px]'/>
				</div>
				<div className='flex flex-col mt-4 gap-2'>
					<label htmlFor="password"  className='text-[color:#C4C4C4] font-lg font-normal'>Ваш пароль</label>
					<Input type='password' name='password' id='password' placeholder='Введите пароль' className=' h-[65px]'/>
				</div>
				<Button appearance='big' disabled={disableButton} children={'Вход'} className='w-[248px] block mx-auto'/>
			</form>
			<div className='flex flex-col items-center'>
				<div className='text-sm font-semibold text-[color:var(--text-secondary-color)]'>Нет аккаунта?</div>
				<Link to='/auth/register' className='text-[color:var(--primary-color)]'>Зарегистрироваться</Link>
			</div>
		</div>
	);
}