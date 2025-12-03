export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  colors: string[];
  sizes: string[];
  isTrending: boolean;
}

export interface CartItem extends Product {
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export const CATEGORIES = ["Hoodies", "Sweatshirts", "T-Shirts", "Accessories"];
export const SIZES = ["S", "M", "L", "XL", "XXL"];
export const COLORS = ["Black", "White", "Navy", "Beige", "Red", "Olive"];
