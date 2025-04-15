import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';



export function Layout(){

	return<div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['user-profile']}>
				<img src="src/assets/Intersect.png" alt="profile img"/>
				<div className={styles['user-info']}>
					<div className={styles['name']}>Ваня Иванов</div>
					<div className={styles['mail']}>email.com</div>
				</div>
			</div>

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

			<Button className={styles['exit']}>
				<img src="src/assets/on-icon.svg" alt="exit button" />
				Выход
			</Button>
		</div>

		<div className={styles['content']}>
			<Outlet/>
		</div>
	</div>;
}