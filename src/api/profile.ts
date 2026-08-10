import axios from 'axios';
import { ProfileResponse } from '../interfaces/profile.interface';
import { PREFIX } from '../Helpers/API';
import { getAccessToken } from '../Helpers/auth';

export const getProfile = async () => {
	const token = getAccessToken();
	const {data} = await axios.get<ProfileResponse>(`${PREFIX}/user/profile`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return data;
}; 
