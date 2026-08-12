import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';




export function Layout(){
	const navigate = useNavigate( );
	const disptach = useDispatch<AppDispatch>();

	const logout = () => {
		disptach({type: 'user/logout'});
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
					<img src="src/assets/cart-icon.svg" alt="cart icon" />
				Корзина</NavLink>
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