'use client';

import { useState } from 'react';
import { Search, Package, Loader2 } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
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
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Package className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold">Rotary Corp Parts Search</h1>
      </div>

      <form onSubmit={handleSearch} className="flex gap-4 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Part number, description, OEM cross-reference..."
          className="flex-1 px-5 py-4 text-lg border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-medium flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {results.length > 0 && (
        <div className="bg-white border rounded-3xl overflow-hidden shadow">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">Part #</th>
                <th className="px-6 py-4 text-left">Description</th>
                <th className="px-6 py-4 text-left">Manufacturer / OEM</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4 text-center">Availability</th>
                <th className="px-6 py-4 w-32"></th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{item.partNumber}</td>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.manufacturer}</td>
                  <td className="px-6 py-4 text-right font-medium">${item.price?.toFixed(2) || '—'}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs ${item.availability > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.availability > 0 ? `${item.availability} in stock` : 'Call for availability'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-green-600 hover:underline text-sm font-medium">Add to Quote</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}