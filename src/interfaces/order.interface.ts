export interface OrderProductPayload {
  id: number;
  count: number;
}

export interface CreateOrderPayload {
  products: OrderProductPayload[];
}

export interface OrderResponse {
	id: number;
	userId: number;
	status: string;
	createdAt: string;
	data: {
		products: OrderProductPayload[];
	};
}
