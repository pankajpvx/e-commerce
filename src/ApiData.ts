export interface rating {
  count: number;
  rate: number;
}

export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  title: string;
  price: number;
  rating: rating;
}
