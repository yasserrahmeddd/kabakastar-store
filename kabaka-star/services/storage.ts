import { Product } from '../types';

const STORAGE_KEY = 'kabaka_products_v1';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cyberpunk Gold Hoodie',
    price: 1250,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
    description: 'Premium cotton blend with gold reflective accents.',
    colors: ['Black', 'Gold'],
    sizes: ['M', 'L', 'XL'],
    isTrending: true,
  },
  {
    id: '2',
    name: 'Neon Street Oversized',
    price: 950,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?q=80&w=1000&auto=format&fit=crop',
    description: 'Heavyweight fabric designed for the ultimate streetwear look.',
    colors: ['Black', 'Purple'],
    sizes: ['S', 'M', 'L', 'XL'],
    isTrending: true,
  },
  {
    id: '3',
    name: 'Kabaka Essential Tee',
    price: 450,
    category: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
    description: 'The foundation of your wardrobe. 100% Egyptian Cotton.',
    colors: ['White', 'Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isTrending: false,
  },
  {
    id: '4',
    name: 'Midnight Runner Zip-Up',
    price: 1100,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=1000&auto=format&fit=crop',
    description: 'Tactical zip-up hoodie with water-resistant coating.',
    colors: ['Black', 'Navy'],
    sizes: ['L', 'XL'],
    isTrending: true,
  }
];

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  return JSON.parse(stored);
};

export const saveProduct = (product: Product): void => {
  const products = getProducts();
  const existingIndex = products.findIndex((p) => p.id === product.id);
  
  if (existingIndex >= 0) {
    products[existingIndex] = product;
  } else {
    products.push(product);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const deleteProduct = (id: string): void => {
  const products = getProducts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};
