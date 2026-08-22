import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error } from './pages/Error/Error.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import { Login } from './pages/Login/Login.tsx';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { RequireAuth } from './Helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Register } from './pages/Register/Register.tsx';


const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));


const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><Layout/></RequireAuth>,
		children: [
			{
				path: '/',
				element: <Suspense fallback={<>Загрузка...</>}><Menu/></Suspense>
			},
			{
				path: '/cart',
				element: <Cart/>
			},
			{ 
				path: '/product/:id',
				element: <Product/>,
				errorElement: <>Ошибка</>
			}
		]
	},
	
	{
		path: '/auth',
		element: <AuthLayout/>,
		children: [
			{
				path: 'login',
				element: <Login/>
			},
			{
				path: 'register',
				element: <Register/>
			}
		]
	}
	,
	{
		path: '*',
		element: <Error/>
	}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={ router }/>
		</Provider>
	</StrictMode>
);
