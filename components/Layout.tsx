import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Star, ShieldCheck, Truck, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-500 selection:text-black">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-2xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 group-hover:from-yellow-400 group-hover:to-yellow-600 transition-all">
                Kabaka Star
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Shop', 'About', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-sm font-bold uppercase tracking-widest hover:text-yellow-500 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-500 after:transition-all hover:after:w-full"
                >
                  {item}
                </Link>
              ))}
              <Link to="/admin" className="text-zinc-500 hover:text-white text-xs uppercase tracking-widest border border-zinc-700 px-3 py-1 rounded hover:border-white transition-all">
                Admin
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-zinc-900 border-b border-zinc-800 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-8 space-y-4 flex flex-col items-center">
                {['Home', 'Shop', 'About', 'Contact', 'Admin'].map((item) => (
                  <Link 
                    key={item} 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-xl font-bold uppercase tracking-wider hover:text-yellow-500"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <span className="text-xl font-black uppercase italic">Kabaka Star</span>
              </div>
              <p className="text-zinc-400 max-w-sm">
                Redefining Egyptian streetwear. Luxury fabrics, bold designs, and uncompromising quality. 
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-bold uppercase tracking-wider mb-4">Support</h3>
              <ul className="space-y-2 text-zinc-400">
                <li><Link to="/contact" className="hover:text-yellow-500">Contact Us</Link></li>
                <li><Link to="/contact" className="hover:text-yellow-500">Shipping Policy</Link></li>
                <li><Link to="/contact" className="hover:text-yellow-500">Returns & Exchange</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold uppercase tracking-wider mb-4">Contact</h3>
              <ul className="space-y-2 text-zinc-400">
                <li className="flex items-center gap-2"><Phone size={16}/> +20 115 050 1023</li>
                <li>Cairo, Egypt</li>
              </ul>
              <div className="mt-4">
                 <a 
                    href="https://wa.me/201150501023" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full font-bold transition-all text-sm"
                  >
                    Chat on WhatsApp
                  </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Kabaka Star. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
               <ShieldCheck size={18} />
               <Truck size={18} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
