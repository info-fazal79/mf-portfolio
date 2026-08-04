'use client';

import React, { useState, useEffect } from 'react';
import { getEbooks, EBook, getSettings } from '@/utils/api';
import SkeletonLoader from '@/components/SkeletonLoader';

export default function EbooksPage() {
  const [ebooks, setEbooks] = useState<EBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [waRedirect, setWaRedirect] = useState('https://chat.whatsapp.com/');
  const [checkoutItem, setCheckoutItem] = useState<EBook | null>(null);
  
  // Checkout Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    async function loadData() {
      const list = await getEbooks();
      setEbooks(list);
      setLoading(false);

      const settings = await getSettings();
      if (settings.whatsapp_free_redirect) {
        setWaRedirect(settings.whatsapp_free_redirect);
      }
    }
    loadData();
  }, []);

  const addToCart = (book: EBook) => {
    // Session/LocalStorage Cart
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const alreadyInCart = currentCart.find((item: any) => item.id === book.id);
    
    if (!alreadyInCart) {
      currentCart.push({ id: book.id, title: book.title, price: book.offer_price || book.regular_price });
      localStorage.setItem('cart', JSON.stringify(currentCart));
      
      // Dispatch event to update header instantly
      window.dispatchEvent(new Event('cart-updated'));
      alert(`"${book.title}" added to your cart!`);
    } else {
      alert("This E-book is already in your cart.");
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you, ${name}! Order processed successfully for: ${checkoutItem?.title}. Check your email.`);
    setCheckoutItem(null);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <main className="bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 text-white min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            E-Book Catalog
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Grow your development expertise with customized blueprints and advanced guide books.
          </p>
        </div>

        {loading ? (
          <SkeletonLoader count={3} />
        ) : ebooks.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No E-books available at this moment. Check back soon.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ebooks.map((book) => (
              <div key={book.id} className="bg-slate-900 border border-slate-850 hover:border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:scale-[1.01] transition duration-300">
                <div className="space-y-4">
                  {/* Book Image */}
                  <div className="w-full h-48 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800 text-slate-650 font-bold text-lg uppercase">
                    E-Book
                  </div>
                  <h3 className="text-lg font-bold text-white">{book.title}</h3>
                  <div className="flex items-center space-x-2 text-sm">
                    {book.status === 'free' ? (
                      <span className="text-emerald-400 font-semibold uppercase tracking-wider">Free</span>
                    ) : (
                      <>
                        <span className="text-blue-400 font-bold text-lg">${book.offer_price}</span>
                        {book.regular_price > book.offer_price && (
                          <span className="text-slate-500 line-through text-xs">${book.regular_price}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  {book.status === 'free' ? (
                    <a 
                      href={waRedirect}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-center transition text-sm"
                    >
                      Download Free
                    </a>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => addToCart(book)}
                        className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition text-xs font-semibold"
                      >
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => setCheckoutItem(book)}
                        className="py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition text-xs font-semibold"
                      >
                        Buy Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Buy Now Checkout Dialog Modal */}
        {checkoutItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden">
              <div className="p-6 border-b border-slate-850 flex items-center justify-between">
                <h3 className="font-bold text-lg text-white">Direct Checkout</h3>
                <button onClick={() => setCheckoutItem(null)} className="text-slate-400 hover:text-white">✕</button>
              </div>
              <form onSubmit={handleCheckout} className="p-6 space-y-4">
                <div className="text-sm text-slate-400">Purchasing: <span className="text-white font-semibold">{checkoutItem.title}</span></div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-400 uppercase">Your Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-sm text-slate-200 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-400 uppercase">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-sm text-slate-200 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-400 uppercase">Phone Number</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-sm text-slate-200 outline-none" />
                </div>
                <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-sm transition">
                  Confirm Purchase (${checkoutItem.offer_price})
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
