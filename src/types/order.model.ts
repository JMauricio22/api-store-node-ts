export interface CreateOrder {
  customerId: number;
}

export interface AddItem {
  orderId: number;
  productId: number;
  quantity: number;
}
