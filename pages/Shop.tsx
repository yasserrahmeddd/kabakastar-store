import React, { useState } from 'react';
import { getProducts } from '../services/storage';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../types';
import { Filter } from 'lucide-react';

export const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const products = getProducts();

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic mb-4">
          The Collection
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Explore our latest drops. High-end streetwear designed and crafted in Egypt.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12 sticky top-24 z-30 bg-zinc-950/80 backdrop-blur-sm p-4 rounded-full border border-zinc-800 mx-auto max-w-fit">
        <div className="flex items-center gap-2 text-yellow-500 mr-2">
          <Filter size={18} />
          <span className="font-bold uppercase text-sm">Filter:</span>
        </div>
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-full text-sm font-bold uppercase transition-all ${
            selectedCategory === 'All' 
              ? 'bg-white text-black' 
              : 'bg-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-bold uppercase transition-all ${
              selectedCategory === cat
                ? 'bg-white text-black' 
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-zinc-500">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};
