export interface Product {
  id: number;
  productName: string;
  price: number;
  imageUrl: string;
  quantity?: number;
  deleted: boolean;
}
