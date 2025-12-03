import React, { useState, useEffect } from 'react';
import { getProducts, saveProduct, deleteProduct } from '../services/storage';
import { Product, CATEGORIES, SIZES, COLORS } from '../types';
import { Plus, Trash2, Edit2, Package, Save, X, Upload } from 'lucide-react';

const EmptyProduct: Product = {
  id: '',
  name: '',
  price: 0,
  category: 'Hoodies',
  image: '',
  description: '',
  colors: [],
  sizes: [],
  isTrending: false
};

export const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>(EmptyProduct);
  const [showLogin, setShowLogin] = useState(true);
  const [password, setPassword] = useState('');

  useEffect(() => {
    refreshProducts();
  }, []);

  const refreshProducts = () => {
    setProducts(getProducts());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Updated password for security
    if (password === 'yassE.r122') {
      setShowLogin(false);
    } else {
      alert('Wrong password');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const productToSave = {
      ...currentProduct,
      id: currentProduct.id || Date.now().toString()
    };
    saveProduct(productToSave);
    setIsEditing(false);
    setCurrentProduct(EmptyProduct);
    refreshProducts();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this product?')) {
      deleteProduct(id);
      refreshProducts();
    }
  };

  const toggleArrayItem = (item: string, field: 'colors' | 'sizes') => {
    const list = currentProduct[field];
    if (list.includes(item)) {
      setCurrentProduct({ ...currentProduct, [field]: list.filter(i => i !== item) });
    } else {
      setCurrentProduct({ ...currentProduct, [field]: [...list, item] });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic check for size (e.g. 2MB limit to avoid easy localStorage overflow)
      if (file.size > 2 * 1024 * 1024) {
          alert("Image is too large. Please use an image under 2MB for optimal performance.");
          return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProduct({ ...currentProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (showLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
        <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-md shadow-2xl shadow-yellow-500/10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center uppercase tracking-widest">Admin Access</h2>
          <input 
            type="password" 
            placeholder="Enter Admin Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg mb-4 focus:outline-none focus:border-yellow-500 transition-colors"
          />
          <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors uppercase tracking-wider">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-white uppercase italic">Admin Dashboard</h1>
          <button 
            onClick={() => { setCurrentProduct(EmptyProduct); setIsEditing(true); }}
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-yellow-400 transition-colors"
          >
            <Plus size={20} /> Add Product
          </button>
        </div>

        {isEditing ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-3xl mx-auto shadow-xl">
             <div className="flex justify-between items-center mb-8">
               <h2 className="text-xl font-bold text-white uppercase tracking-wider">
                 {currentProduct.id ? 'Edit Product' : 'New Product'}
               </h2>
               <button onClick={() => setIsEditing(false)} className="text-zinc-500 hover:text-white"><X/></button>
             </div>
             
             <form onSubmit={handleSave} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Name</label>
                   <input 
                     type="text" 
                     value={currentProduct.name}
                     onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                     className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-yellow-500 outline-none transition-colors"
                     required
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Price (EGP)</label>
                   <input 
                     type="number" 
                     value={currentProduct.price}
                     onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})}
                     className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-yellow-500 outline-none transition-colors"
                     required
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Product Image</label>
                 
                 {/* Preview Area */}
                 {currentProduct.image && (
                    <div className="mb-4 relative h-64 w-full bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 group">
                        <img src={currentProduct.image} alt="Preview" className="w-full h-full object-contain" />
                        <button 
                          type="button"
                          onClick={() => setCurrentProduct({...currentProduct, image: ''})}
                          className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                    </div>
                 )}

                 <div className="flex flex-col md:flex-row gap-4">
                    <label className="flex-1 cursor-pointer bg-zinc-800 hover:bg-zinc-700 border border-dashed border-zinc-600 hover:border-yellow-500 text-zinc-300 transition-all rounded-lg h-14 flex items-center justify-center gap-3">
                        <Upload size={20} />
                        <span className="font-bold text-sm uppercase">Upload from Device</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden" 
                        />
                    </label>
                    
                    <div className="relative flex-1">
                        <input 
                          type="text" 
                          placeholder="Or paste image URL (Optional)"
                          value={currentProduct.image.startsWith('data:') ? '' : currentProduct.image}
                          onChange={e => setCurrentProduct({...currentProduct, image: e.target.value})}
                          className="w-full h-14 bg-zinc-950 border border-zinc-700 text-white px-4 rounded-lg focus:border-yellow-500 outline-none transition-colors"
                        />
                    </div>
                 </div>
                 <p className="text-[10px] text-zinc-600 mt-2">
                    * Upload directly from your phone or laptop. Max recommended size: 2MB.
                 </p>
               </div>

               <div>
                 <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Category</label>
                 <select 
                   value={currentProduct.category}
                   onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})}
                   className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-yellow-500 outline-none transition-colors"
                 >
                   {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                 </select>
               </div>

               <div>
                 <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Available Sizes</label>
                 <div className="flex gap-2 flex-wrap">
                   {SIZES.map(size => (
                     <button
                       key={size}
                       type="button"
                       onClick={() => toggleArrayItem(size, 'sizes')}
                       className={`px-3 py-1 rounded border text-sm font-bold transition-all ${
                         currentProduct.sizes.includes(size) 
                           ? 'bg-yellow-500 text-black border-yellow-500' 
                           : 'text-zinc-400 border-zinc-700 hover:border-zinc-500'
                       }`}
                     >
                       {size}
                     </button>
                   ))}
                 </div>
               </div>

               <div>
                 <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Available Colors</label>
                 <div className="flex gap-2 flex-wrap">
                   {COLORS.map(color => (
                     <button
                       key={color}
                       type="button"
                       onClick={() => toggleArrayItem(color, 'colors')}
                       className={`px-3 py-1 rounded border text-sm font-bold transition-all ${
                         currentProduct.colors.includes(color) 
                           ? 'bg-white text-black border-white' 
                           : 'text-zinc-400 border-zinc-700 hover:border-zinc-500'
                       }`}
                     >
                       {color}
                     </button>
                   ))}
                 </div>
               </div>
               
               <div className="flex items-center gap-2 p-4 bg-zinc-950/50 rounded-lg border border-zinc-800">
                 <input 
                   type="checkbox"
                   id="trending"
                   checked={currentProduct.isTrending}
                   onChange={e => setCurrentProduct({...currentProduct, isTrending: e.target.checked})}
                   className="w-5 h-5 accent-yellow-500 cursor-pointer"
                 />
                 <label htmlFor="trending" className="text-white font-bold text-sm cursor-pointer uppercase">Mark as Trending (Homepage)</label>
               </div>

               <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Description</label>
                  <textarea 
                    value={currentProduct.description}
                    onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:border-yellow-500 outline-none h-32 transition-colors"
                  />
               </div>

               <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-4 rounded-lg uppercase tracking-widest hover:bg-yellow-400 flex justify-center items-center gap-2 transition-colors">
                 <Save size={20} /> Save Product
               </button>
             </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
             {products.length === 0 && (
               <div className="text-center py-20 text-zinc-500">
                 <Package size={48} className="mx-auto mb-4 opacity-50"/>
                 <p>No products yet. Click "Add Product" to start.</p>
               </div>
             )}
             {products.map(product => (
               <div key={product.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col md:flex-row items-center gap-6 group hover:border-zinc-700 transition-colors">
                 <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg bg-zinc-800" />
                 <div className="flex-1 text-center md:text-left">
                   <h3 className="text-white font-bold">{product.name}</h3>
                   <p className="text-yellow-500">{product.price.toLocaleString()} EGP</p>
                   <p className="text-zinc-500 text-xs uppercase">{product.category}</p>
                 </div>
                 <div className="flex gap-2">
                   <button 
                    onClick={() => { setCurrentProduct(product); setIsEditing(true); }}
                    className="p-2 bg-zinc-800 text-white rounded hover:bg-white hover:text-black transition-colors"
                   >
                     <Edit2 size={18} />
                   </button>
                   <button 
                    onClick={() => handleDelete(product.id)}
                    className="p-2 bg-red-900/20 text-red-500 rounded hover:bg-red-600 hover:text-white transition-colors"
                   >
                     <Trash2 size={18} />
                   </button>
                 </div>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};