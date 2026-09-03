import Button from '../../components/ui/Button/Button';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import Link from 'next/link';
import Image from 'next/image';
import { CartProvider } from '@/components/Cart/CartProvider';
import CartCounter from '@/components/Cart/CartCounter';




export default function Layout({children}: {children: React.ReactNode}) {

	// const productCounter = useAppSelector(selectCounter);


	return(
		<CartProvider>
			<div className='flex h-screen'>
				<div className='flex flex-col border-r border-[color:var(--separator-color)] pr-[25px] pl-[25px] pb-[67px]'>
					<UserProfile 
						avatarSrc='/profile-img.png'>
					</UserProfile>

					<div className='flex flex-col gap-4 mt-[31px] mb-[31px]'>
						{/* <NavLink to="/" className={( {isActive} ) => cn(styles['link'], {
					[styles['active']]: isActive
				})}>
					<Link href={''}></Link>
					<img src="src/assets/menu-icon.svg" alt="menu icon" />
				Меню
				</NavLink> */}
						<Link href={''} className='flex items-center gap-2'>
							<Image
								src="/menu-icon.svg"
								alt="menu icon"
								width={24}
								height={24}
							/>
					Меню
						</Link>
						<Link href="/cart" className='flex items-center gap-2'>
							<div className='relative'>
								<Image
									className='text-[#D5D5D9]'
									src="/cart-icon.svg"
									alt="cart icon"
									width={24}
									height={24}
								/>
								<CartCounter/>
								{/* <span className='absolute  -top-4 -right-1 text-sm'>1</span> */}
							</div>
					Корзина
						</Link>
						{/* <NavLink to="/cart" className={ ({isActive}) => cn(styles['link'], {
					[styles['active']]: isActive
				})}>
					<div className='relative'>
						<CartIcon className='text-[#D5D5D9]'></CartIcon>
						<span className='absolute  -top-4 -right-1 text-sm'>{ productCounter > 0 && productCounter}</span>
					</div>
					Корзина
				</NavLink> */}
					</div>

					<Button  className='flex mt-auto justify-center gap-2 w-[117px]'>
						<Image
							src='on-icon.svg'
							alt="exit button"
							width={26}
							height={26}
						/>
						<span>Выход</span>
					</Button>
				</div>

				<div>
					{children}
				</div>
			</div>
		</CartProvider>

	);
}