// app/page.tsx
'use client';

import Link from 'next/link';
import { Package, Search } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-8">
          <Package className="w-24 h-24 text-emerald-500" />
        </div>
        
        <h1 className="text-6xl font-bold text-white mb-4 tracking-tighter">
          CSM Small Engine Pro
        </h1>
        
        <p className="text-2xl text-zinc-400 mb-12">
          Parts Search • Quotes • Payments
        </p>

        <Link
          href="/search"
          className="inline-flex items-center gap-4 bg-emerald-600 hover:bg-emerald-700 
                     text-white px-12 py-6 rounded-2xl text-2xl font-semibold 
                     transition-all active:scale-95 shadow-lg shadow-emerald-900/50"
        >
          <Search className="w-8 h-8" />
          Start Parts Search
        </Link>

        <p className="mt-10 text-zinc-500 text-sm">
          Connected to CSM Small Engine Pro • Built with Next.js
        </p>
      </div>
    </div>
  );
}