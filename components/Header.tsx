'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  logoUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
}

export default function Header({
  logoUrl = '/api/uploads/logo.png',
  logoWidth = 150,
  logoHeight = 40
}: HeaderProps) {
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Read cart items from localStorage on mount
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };

    updateCartCount();

    // Listen for custom events to update cart count instantly
    window.addEventListener('cart-updated', updateCartCount);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative" style={{ width: logoWidth, height: logoHeight }}>
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              M. Fazal
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/ebooks" className="hover:text-white transition">eBooks</Link>
          <Link href="/projects" className="hover:text-white transition">Projects</Link>
          <Link href="/blog" className="hover:text-white transition">Blog</Link>
          <button 
            onClick={() => {
              const panel = document.getElementById('consultation-sidebar');
              if (panel) panel.classList.remove('translate-x-full');
            }}
            className="hover:text-white transition"
          >
            Contact
          </button>
        </nav>

        {/* Actions (Cart & CTA) */}
        <div className="flex items-center space-x-6">
          <Link href="/ebooks" className="relative p-2 text-slate-300 hover:text-white transition" aria-label="Cart">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          <button 
            onClick={() => {
              const panel = document.getElementById('consultation-sidebar');
              if (panel) panel.classList.remove('translate-x-full');
            }}
            className="hidden sm:inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-blue-500/20 transition"
          >
            Get Consultation
          </button>
        </div>

      </div>
    </header>
  );
}
