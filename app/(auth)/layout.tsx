import Image from "next/image";


export default function AuthLayout({children}: {children: React.ReactNode}) {
	return (
		<div className='auth-layout container mx-auto flex min-h-screen'>
			<div className="content flex-1 flex justify-center items-center border-r border-[color:var(--separator-color)] ">
				<Image 
					src='/logo.svg' 
					alt="логотип компании"
					width={200}
					height={200}
				/>
			</div>
			<div className='flex-1 flex justify-center items-center flex-col'>
				<div className='w-full flex items-center justify-center'>
					{children}
				</div>
			</div>
			

		</div>
	);
		
		
}
