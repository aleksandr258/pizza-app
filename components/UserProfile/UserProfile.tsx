import { UserProfileProp } from './UserProfile.prop';
import Image from 'next/image';

export function UserProfile({avatarSrc}: UserProfileProp ){


	// if (isLoading){
	// 	return (
	// 		<div className='flex flex-col'>
	// 			<div className='w-[90px] h-[90px] rounded-full bg-gray-500 animate-pulse'></div>
	// 			 <div className="w-24 h-4 rounded bg-gray-200 animate-pulse" />
	// 		</div>
	// 	);
	// }
	return(
		<div className='flex flex-col '>
			<Image
				src={avatarSrc}
				alt="user avatar"
				width={90}
				height={90}
				className='w-[90px] h-[90px] object-cover mr-[120px]'
			/>
			<div>
				<div className='text-black font-bold text-xl'>{'test'}</div>
				<div className='text-[#9EA1B1] font-normal text-sm'>{'test2'}</div>
			</div>
		</div>
	);
}