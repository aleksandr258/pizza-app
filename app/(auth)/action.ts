'use server';
import { cookies } from 'next/headers';

import { PREFIX } from '@/src-legacy/Helpers/API';

export async function loginUser(data: { email: string, password: string}) {
	try{
		const res = await fetch(`${PREFIX}auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		if (!res.ok){
			throw new Error('Ошибка при создании пользователя');
		}
		const accessToken = (await res.json()).accessToken;
		await cookies().set('token', accessToken);
		return await res.json();

	}catch(error){
		console.error('Ошибка при создании пользователя:', error);
		throw error;
	}
}

export async function registerUser(data: {username: string, email: string, password: string}) {

}
