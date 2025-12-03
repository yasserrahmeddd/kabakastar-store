import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Shield, Zap } from 'lucide-react';
import { getProducts } from '../services/storage';
import { ProductCard } from '../components/ProductCard';

const Hero3DCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - left) / width - 0.5;
    const yPct = (event.clientY - top) / height - 0.5;
    x.set(xPct * 20); // Rotation X
    y.set(yPct * 20); // Rotation Y
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: mouseX,
        rotateX: mouseY, // Inverted for natural feel
        transformStyle: "preserve-3d",
      }}
      className="relative w-full max-w-md aspect-[3/4] rounded-2xl bg-zinc-800 border border-zinc-700 shadow-2xl shadow-yellow-500/10 cursor-pointer"
    >
      <div 
        style={{ transform: "translateZ(50px)" }} 
        className="absolute inset-4 rounded-xl overflow-hidden shadow-inner"
      >
        <img 
          src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop" 
          alt="Hero Hoodie"
          className="w-full h-full object-cover"
        />
      </div>
      <div 
        style={{ transform: "translateZ(80px)" }}
        className="absolute bottom-8 left-8 right-8 bg-zinc-950/80 backdrop-blur-md p-4 rounded-lg border border-zinc-700"
      >
        <h3 className="text-yellow-500 font-bold uppercase tracking-widest text-sm">New Collection</h3>
        <p className="text-white text-xl font-black italic">CYBERPUNK GOLD</p>
      </div>
    </motion.div>
  );
};

export const Home: React.FC = () => {
  const products = getProducts();
  const featuredProducts = products.filter(p => p.isTrending).slice(0, 3);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-zinc-950">
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-yellow-500 font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-yellow-500 block"></span> 
                Established 2024
              </h2>
              <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] italic uppercase mb-6">
                Kabaka <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Star</span>
              </h1>
              <p className="text-zinc-400 text-lg max-w-lg leading-relaxed">
                Elevate your street style with Egypt's premium hoodie brand. 
                Designed for the bold. Crafted for comfort.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4"
            >
              <Link 
                to="/shop" 
                className="group relative px-8 py-4 bg-yellow-500 text-black font-black uppercase tracking-wider overflow-hidden rounded-full"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <span className="relative flex items-center gap-2">
                  Shop Now <ArrowRight size={20} />
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="flex justify-center perspective-1000">
             <Hero3DCard />
          </div>
        </div>

        {/* Scrolling Text Banner */}
        <div className="absolute bottom-0 w-full border-y border-zinc-800 bg-zinc-950/50 backdrop-blur py-4 overflow-hidden">
          <motion.div 
            className="flex whitespace-nowrap gap-12"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-2xl font-black text-transparent bg-clip-text bg-zinc-700 uppercase italic px-4">
                 Kabaka Star &bull; Premium Quality &bull; Egypt's Finest &bull;
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <TrendingUp className="w-8 h-8 text-yellow-500"/>, title: "Trending Styles", desc: "Always ahead of the fashion curve." },
              { icon: <Shield className="w-8 h-8 text-yellow-500"/>, title: "Premium Fabric", desc: "100% Cotton blends for maximum durability." },
              { icon: <Zap className="w-8 h-8 text-yellow-500"/>, title: "Fast Shipping", desc: "Delivery across all Egypt governorates." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900 transition-colors"
              >
                <div className="mb-4 bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-zinc-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-white uppercase italic">Trending Now</h2>
              <div className="h-1 w-24 bg-yellow-500 mt-2"></div>
            </div>
            <Link to="/shop" className="text-zinc-400 hover:text-white flex items-center gap-2 uppercase font-bold tracking-wider text-sm">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
