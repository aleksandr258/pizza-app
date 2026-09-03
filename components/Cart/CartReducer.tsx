import { CartActions, CartState } from './CartContext';




export function cartReducer(state: CartState, action: CartActions){
	switch(action.type){
	case 'add':{
		const exist = state.items.find(item => item.id === action.payload.id);
		if (exist){
			return {
				...state,
				items: state.items.map(item =>
					item.id === action.payload.id ? {...item, quantity: item.quantity + 1} : item
				)
			};
		}else {
			return{
				...state,
				items: [...state.items, {...action.payload, quantity: 1}]
			};
		}
		
	}
	case 'remove': {
		const findProduct = state.items.find(product => product.id === action.payload);
		if (findProduct){
			if (findProduct && findProduct.quantity === 0){
				return{
					...state,
					items: state.items.filter(product => product.id !== action.payload)
				};
			}
			findProduct.quantity -= 1;
			// state.ite
			// ms.filter(product => product.quantity > 0);
			return {
				...state,
				items: state.items.filter(product => product.quantity > 0)
			};
		}
		return state;
		
	}
	case 'clearProduct': {

		return {
			...state,
			items: state.items.filter(item => item.id !== action.payload)
		};
	}
	case 'clearCart': {
		return {
			...state,
			items: []
		};
	}
	}
}