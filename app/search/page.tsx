// app/search/page.tsx
'use client';

import { useState } from 'react';
import { Search, Package, Loader2, Plus } from 'lucide-react';

interface SearchResult {
  partNumber: string;
  description: string;
  manufacturer?: string;
  price?: number;
  availability: number;
  image?: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!res.ok) throw new Error('Search failed');

      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      setError('Failed to search. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Package className="w-10 h-10 text-emerald-500" />
          <div>
            <h1 className="text-4xl font-bold">Rotary Corp Parts Search</h1>
            <p className="text-zinc-400">Search real-time pricing and availability</p>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-4 mb-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter part number, description, or keyword..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 px-10 rounded-2xl font-semibold flex items-center gap-3 disabled:opacity-50 transition-colors"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
            Search
          </button>
        </form>

        {error && <p className="text-red-400 mb-6">{error}</p>}

        {/* Results Table */}
        {results.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="px-8 py-5 text-left font-medium text-zinc-400">Part #</th>
                  <th className="px-8 py-5 text-left font-medium text-zinc-400">Description</th>
                  <th className="px-8 py-5 text-left font-medium text-zinc-400">Manufacturer</th>
                  <th className="px-8 py-5 text-right font-medium text-zinc-400">Price</th>
                  <th className="px-8 py-5 text-center font-medium text-zinc-400">Stock</th>
                  <th className="px-8 py-5 w-40"></th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, index) => (
                  <tr key={index} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                    <td className="px-8 py-5 font-mono">{item.partNumber}</td>
                    <td className="px-8 py-5">{item.description}</td>
                    <td className="px-8 py-5 text-zinc-400">{item.manufacturer || 'Rotary'}</td>
                    <td className="px-8 py-5 text-right font-semibold">
                      ${item.price?.toFixed(2) || '—'}
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`inline-block px-4 py-1 rounded-full text-sm ${
                        item.availability > 20 
                          ? 'bg-emerald-900/50 text-emerald-400' 
                          : 'bg-amber-900/50 text-amber-400'
                      }`}>
                        {item.availability} available
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <button className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium">
                        <Plus className="w-4 h-4" />
                        Add to Quote
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {results.length === 0 && query && !loading && (
          <p className="text-zinc-400 text-center py-20">No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
}