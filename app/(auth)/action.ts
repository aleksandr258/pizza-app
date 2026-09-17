'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export async function loginUser(formData: FormData) {
	try{
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			throw new Error('Пожалуйста, заполните все поля');
		}

		const data = {
			email: email,
			password: password
		};

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		if (!res.ok){
			throw new Error('Ошибка при создании пользователя');
		}
		const accessToken = (await res.json()).access_token;
		(await cookies()).set('token', accessToken);
		// return await res.json();

	}catch(error){
		console.error('Ошибка при создании пользователя:', error);
		throw error;
	}
	redirect('/menu');
}

export async function registerUser(formData: FormData) {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const name = formData.get('name') as string;

	if (!email || !password || !name) {
		throw new Error('Пожалуйста, заполните все поля');
	}
	try{
		
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
			method: 'POST',
			 headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				name: name,
				password: password
			})
		});console.log(res);
		if (!res.ok){
			console.log(res);
			throw new Error('Ошибка при создании пользователя');
		}
		const responseBody = await res.json();
		const accessToken = responseBody.access_token;
		(await cookies()).set('token', accessToken);

	}catch(error){
		console.error('Ошибка при создании пользователя:', error);
		throw error;
	}
	redirect('/menu');
}

export async function logoutUser(){
	(await cookies()).delete('token');
	redirect('/login');
}