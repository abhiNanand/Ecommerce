export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  quantity?: number;
  firebaseId?: string;
  rating?: {
    rate: number;
    count: number;
  };
}
