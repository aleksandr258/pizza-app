import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';
import { ProfileResponse } from '@/types/profile.interface';

export const getCurrentUser = cache(async (): Promise<ProfileResponse | null>=> {
	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value;
	if (!token){
		return null;
	}
	try{
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		if (!res.ok){
			return null;
		}
		return res.json();
	}catch(err){
		console.error('Ошибка при получении профиля пользователя:', err);
		return null;
	}
});

// export async function getTokenFromCookies(){
// 	const cookieStore = await cookies();
// 	const token = cookieStore.get('token')?.value;

// 	if (!token){
// 		return null;
// 	}
// 	return token;
// }