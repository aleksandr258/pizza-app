import axios from 'axios';
import { Product } from '../interfaces/product.interface';
import { PREFIX } from '../Helpers/API';

export const getProducts = async () => {
	const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
	
	return data;
};
