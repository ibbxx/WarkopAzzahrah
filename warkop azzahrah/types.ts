
export interface CoffeeItem {
  id: number;
  name: string;
  description: string;
  details: string;
  price: number;
  imageUrl: string;
  category: 'best-seller' | 'new' | 'standard';
  type: 'beverage' | 'food';
  stock: number;
}

export interface Promotion {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}
