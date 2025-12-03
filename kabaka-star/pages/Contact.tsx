import React from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen pt-12 pb-24 bg-zinc-950 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic mb-4">Support & Contact</h1>
          <p className="text-zinc-400">We are here to help you 24/7.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-2">
              <Phone className="text-yellow-500"/> Get in Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-zinc-400">
                <MapPin className="shrink-0"/>
                <span>New Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <Mail className="shrink-0"/>
                <span>support@kabakastar.com</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <Phone className="shrink-0"/>
                <span>+20 115 050 1023</span>
              </div>
            </div>
            
            <a 
              href="https://wa.me/201150501023"
              target="_blank"
              rel="noreferrer"
              className="mt-8 w-full bg-green-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-500 transition-colors"
            >
              <MessageCircle /> Chat on WhatsApp
            </a>
          </div>

          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
             <h2 className="text-xl font-bold text-white uppercase mb-6">Store Policies</h2>
             <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
                <p><strong className="text-white block mb-1">Shipping:</strong> Delivery takes 2-5 business days across Egypt. Shipping fees vary by governorate.</p>
                <p><strong className="text-white block mb-1">Returns:</strong> We accept returns within 14 days of purchase if the item is unworn and in original packaging.</p>
                <p><strong className="text-white block mb-1">Exchange:</strong> Size exchange is available. Contact us on WhatsApp to arrange an exchange.</p>
             </div>
          </div>
        </div>

        <form className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
          <h2 className="text-xl font-bold text-white uppercase mb-6">Send us an Email</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input type="text" placeholder="Your Name" className="bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg outline-none focus:border-yellow-500" />
            <input type="email" placeholder="Your Email" className="bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg outline-none focus:border-yellow-500" />
          </div>
          <textarea placeholder="Your Message" className="w-full bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-lg outline-none focus:border-yellow-500 h-32 mb-6" />
          <button className="bg-white text-black px-8 py-3 rounded-lg font-bold uppercase hover:bg-yellow-500 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};
