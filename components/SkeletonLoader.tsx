'use client';

import React from 'react';

export default function SkeletonLoader({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 animate-pulse">
          <div className="w-full h-48 bg-slate-800 rounded-xl"></div>
          <div className="h-4 bg-slate-800 rounded w-2/3"></div>
          <div className="h-4 bg-slate-800 rounded w-1/2"></div>
          <div className="h-10 bg-slate-800 rounded-lg w-full mt-4"></div>
        </div>
      ))}
    </div>
  );
}
