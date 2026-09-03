import { Outlet } from 'react-router-dom';




export function AuthLayout(){
	return (
		<div className='auth-layout container mx-auto flex min-h-screen'>
			<div className="content flex-1 flex justify-center items-center border-r border-[color:var(--separator-color)] ">
				<img src="/logo.svg" alt="логотип компании" className=''/>
			</div>
			<div className='flex-1 flex justify-center items-center flex-col'>
				<div className='w-full flex items-center justify-center'>
					<Outlet/>
				</div>
			</div>
			

		</div>
	);
		
		
}
