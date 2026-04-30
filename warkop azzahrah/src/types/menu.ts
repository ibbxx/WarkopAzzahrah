
export type MenuCategory = 'best-seller' | 'new' | 'standard';

export type MenuType = 'beverage' | 'food';

export type MenuFilter = 'all' | MenuType;

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  details: string;
  price: number;
  imageUrl: string;
  category: MenuCategory;
  type: MenuType;
  stock: number;
}

export interface Promotion {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}
