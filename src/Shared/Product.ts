export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity?: number;
  rating?: {
    rate: number;
    count: number;
  };
}