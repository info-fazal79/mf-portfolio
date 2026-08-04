'use client';

import React from 'react';

export default function BlogPage() {
  const posts = [
    { title: 'Migrating from WordPress to Headless Next.js', date: 'Aug 2, 2026', category: 'Architecture', desc: 'Learn how to transition monolithic platforms into speed-optimized headless frontends with raw APIs.' },
    { title: 'Optimizing MySQL Database Queries for Scale', date: 'Jul 28, 2026', category: 'Databases', desc: 'Step-by-step techniques to audit index usage, examine explain queries, and accelerate retrieval.' },
    { title: 'Securing File Uploads in PHP 8.x Applications', date: 'Jul 15, 2026', category: 'Security', desc: 'Best practices to sanitise filenames, validate MIME types, and secure directories from script executions.' }
  ];

  return (
    <main className="bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 text-white min-h-screen">
      <div className="max-w-5xl mx-auto space-y-12">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Blog & Tutorials
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Technical guides and architecture blueprints for high-performance development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-850 hover:border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.01] transition duration-300">
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">{post.category}</span>
                <h3 className="text-lg font-bold text-white leading-snug">{post.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{post.desc}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                <span>{post.date}</span>
                <button className="text-blue-400 hover:text-blue-300 font-semibold">Read Article →</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
