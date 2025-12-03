import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-yellow-500/50 transition-colors"
    >
      <div className="aspect-[4/5] overflow-hidden bg-zinc-800 relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </Link>
        {product.isTrending && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-black uppercase px-2 py-1 rounded">
            Trending
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-yellow-500">{product.price.toLocaleString()} EGP</span>
          <Link 
            to={`/product/${product.id}`}
            className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
          >
            <ShoppingCart size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
