import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error } from './pages/Error/Error.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './Helpers/API.ts';


const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));


const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
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
				errorElement: <>Ошибка</>,
				loader: async ({params}) => {
					
					await new Promise<void>((resolve) => {
						setTimeout(() => {
							resolve();
						}, 2000);
					});
					const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					return data;
				}
			}
		]
	},
	{
		path: '*',
		element: <Error/>
	}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
		<RouterProvider router={ router }/>
	</StrictMode>
);
