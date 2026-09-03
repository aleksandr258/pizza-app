import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useAppSelector } from '../../store/hooks';
import CartIcon from '../../assets/cart-icon.svg?react';
import { selectCounter } from '../../store/cart/cart.slice';
import { baseApi } from '../../api/baseApi';


export function Layout(){
	const navigate = useNavigate( );
	const dispatch = useDispatch<AppDispatch>();
	const productCounter = useAppSelector(selectCounter);
	const logout = () => {
		dispatch({type: 'user/logout'});
		dispatch(baseApi.util.resetApiState());
		navigate('/auth/login');
	};	

	return<div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<UserProfile 
				avatarSrc='src/assets/Intersect.png'>
			</UserProfile>

			<div className={styles['menu']}>
				<NavLink to="/" className={( {isActive} ) => cn(styles['link'], {
					[styles['active']]: isActive
				})}>
					<img src="src/assets/menu-icon.svg" alt="menu icon" />
				Меню
				</NavLink>
				<NavLink to="/cart" className={ ({isActive}) => cn(styles['link'], {
					[styles['active']]: isActive
				})}>
					<div className='relative'>
						<CartIcon className='text-[#D5D5D9]'></CartIcon>
						<span className='absolute  -top-4 -right-1 text-sm'>{ productCounter > 0 && productCounter}</span>
					</div>
					Корзина
				</NavLink>
			</div>

			<Button className={styles['exit']} onClick={logout}>
				<img src="src/assets/on-icon.svg" alt="exit button" />
				Выход
			</Button>
		</div>

		<div className={styles['content']}>
			<Outlet/>
		</div>
	</div>;
}