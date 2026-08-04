'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  linkedinUrl?: string;
  githubUrl?: string;
}

export default function Footer({
  linkedinUrl = 'https://linkedin.com/in/muhammad-fazal',
  githubUrl = 'https://github.com/muhammad-fazal'
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About & Socials */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg">Muhammad Fazal</h3>
          <p className="text-sm text-slate-500">
            Senior Full-Stack Architect delivering bespoke high-performance next-gen web applications.
          </p>
          <div className="flex space-x-4">
            <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition" aria-label="LinkedIn">
              LinkedIn
            </Link>
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition" aria-label="GitHub">
              GitHub
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/ebooks" className="hover:text-white transition">eBooks Store</Link></li>
            <li><Link href="/projects" className="hover:text-white transition">Projects</Link></li>
          </ul>
        </div>

        {/* Resources / Legal */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/blog" className="hover:text-white transition">Blog & Tutorials</Link></li>
            <li>
              <button 
                onClick={() => {
                  const panel = document.getElementById('consultation-sidebar');
                  if (panel) panel.classList.remove('translate-x-full');
                }}
                className="hover:text-white transition text-left"
              >
                Contact Consultation
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Newsletter</h4>
          <p className="text-sm text-slate-500">Subscribe for custom tutorials and architecture tips.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }} className="flex space-x-2">
            <input 
              type="email" 
              placeholder="Your email" 
              required 
              className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white outline-none focus:border-blue-500 flex-1"
            />
            <button type="submit" className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium text-xs transition">
              Join
            </button>
          </form>
        </div>

      </div>

      {/* Footer Bottom bar */}
      <div className="max-w-7xl mx-auto border-t border-slate-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} Muhammad Fazal. All rights reserved. Optimized Headless Architecture.
        </div>
        <button 
          onClick={scrollToTop} 
          className="mt-4 sm:mt-0 p-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-lg hover:text-white transition flex items-center space-x-2"
        >
          <span>Scroll to Top</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
