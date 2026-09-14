import { UserProfileProp } from './UserProfile.prop';
import { useGetProfileQuery } from '../../api/baseApi';

export function UserProfile({avatarSrc}: UserProfileProp ){
	const { data, isLoading } = useGetProfileQuery();

	if (isLoading){
		return (
			<div className='flex flex-col'>
				<div className='w-[90px] h-[90px] rounded-full bg-gray-500 animate-pulse'></div>
				 <div className="w-24 h-4 rounded bg-gray-200 animate-pulse" />
			</div>
		);
	}
	return(
		<div className='flex flex-col '>
			<img src={avatarSrc} alt="" className='w-[90px] h-[90px] object-cover'/>
			<div>
				<div className='text-black font-bold text-xl'>{data?.name}</div>
				<div className='text-[#9EA1B1] font-normal text-sm'>{data?.email}</div>
			</div>
		</div>
	);
}