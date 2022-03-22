export interface CreateOrder {
  userId: number;
}

export interface AddItem {
  orderId: number;
  productId: number;
  quantity: number;
}

export interface User {
  userId: number;
}
