export interface GroceryItem {
  name: string;
  img: string;
  price: number;
  quantity: string;
  tags: string[];
}

export interface GroceryOrderItem {
  name: string;
  img: string;
  price: number;
  quantity: string;
  units: number;
}

export interface GroceryOrderPayload {
  type: string;
  payload: GroceryOrderItem;
}
