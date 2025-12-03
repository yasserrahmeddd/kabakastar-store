import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../services/storage';
import { ShoppingBag, Star, Check, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const products = getProducts();
  const product = products.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [step, setStep] = useState(1); // 1: Details, 2: Checkout Info

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-white">Product not found</div>;
  }

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color.');
      return;
    }
    setStep(2);
  };

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerAddress) {
      alert('Please fill in your details.');
      return;
    }

    const phoneNumber = '201150501023';
    const message = `
*NEW ORDER - KABAKA STAR* 
-------------------------
*Product:* ${product.name}
*Price:* ${product.price} EGP
*Size:* ${selectedSize}
*Color:* ${selectedColor}
-------------------------
*Customer Details:*
*Name:* ${customerName}
*Address:* ${customerAddress}
-------------------------
*Payment:* Cash on Delivery (Request)
    `.trim();

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen pt-12 pb-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="text-zinc-400 hover:text-white flex items-center gap-2 mb-8 uppercase font-bold text-xs tracking-widest">
          <ArrowLeft size={16} /> Back to Shop
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details Section */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex flex-col justify-center"
          >
            {step === 1 ? (
              <>
                <div className="mb-2 text-yellow-500 font-bold uppercase tracking-widest text-sm">{product.category}</div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase italic">{product.name}</h1>
                <div className="text-3xl font-bold text-white mb-8">{product.price.toLocaleString()} EGP</div>

                <div className="prose prose-invert mb-8 text-zinc-400">
                  <p>{product.description}</p>
                </div>

                {/* Colors */}
                <div className="mb-8">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Color</label>
                  <div className="flex gap-4">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`h-10 px-6 rounded-full border text-sm font-bold uppercase transition-all ${
                          selectedColor === color 
                            ? 'border-yellow-500 bg-yellow-500 text-black' 
                            : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-10">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Size</label>
                  <div className="flex flex-wrap gap-4">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-lg border flex items-center justify-center font-bold transition-all ${
                          selectedSize === size 
                            ? 'border-yellow-500 bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.5)]' 
                            : 'border-zinc-700 text-zinc-400 hover:border-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-white text-black h-16 rounded-xl font-black uppercase tracking-widest text-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-3"
                >
                  <ShoppingBag /> Buy Now
                </button>

                <div className="mt-8 flex items-center gap-4 text-xs text-zinc-500 uppercase tracking-widest">
                  <div className="flex items-center gap-1"><ShieldCheck size={14} className="text-green-500"/> Authentic</div>
                  <div className="flex items-center gap-1"><Star size={14} className="text-yellow-500"/> Premium Quality</div>
                </div>
              </>
            ) : (
              // Step 2: Customer Info
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-6">
                   <button onClick={() => setStep(1)} className="text-zinc-500 hover:text-white"><ArrowLeft size={20}/></button>
                   <h2 className="text-2xl font-bold text-white uppercase">Complete Order</h2>
                </div>

                <div className="bg-zinc-800/50 p-4 rounded-lg mb-6 flex gap-4">
                  <img src={product.image} className="w-16 h-20 object-cover rounded" alt="mini"/>
                  <div>
                    <div className="font-bold text-white">{product.name}</div>
                    <div className="text-zinc-400 text-sm">{selectedColor} / {selectedSize}</div>
                    <div className="text-yellow-500 font-bold">{product.price} EGP</div>
                  </div>
                </div>

                <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-500"
                      placeholder="Ahmed Mohamed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Address</label>
                    <textarea 
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-500 h-24 resize-none"
                      placeholder="Street, Building, City..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white h-14 rounded-xl font-bold uppercase tracking-widest hover:bg-green-500 transition-colors flex items-center justify-center gap-3 mt-4"
                  >
                    Confirm via WhatsApp
                  </button>
                  <p className="text-center text-xs text-zinc-500 mt-2">You will be redirected to WhatsApp to send the order.</p>
                </form>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
