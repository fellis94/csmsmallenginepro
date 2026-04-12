// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface SearchResult {
  partNumber: string;
  description: string;
  manufacturer?: string;
  price?: number;
  availability: number;
  image?: string;
  link?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const searchTerm = query.trim();

    // TODO: Replace this placeholder with real Rotary API call when you get access
    // For now, returning realistic fake results so you can test the UI

    const results: SearchResult[] = [
      {
        partNumber: "12345",
        description: "21\" Mulching Blade for Toro / Lawn-Boy",
        manufacturer: "Rotary",
        price: 14.99,
        availability: 87,
        image: "https://via.placeholder.com/150x150/10b981/ffffff?text=Blade",
      },
      {
        partNumber: "67890",
        description: "Air Filter for Briggs & Stratton Engines",
        manufacturer: "Rotary",
        price: 6.49,
        availability: 124,
        image: "https://via.placeholder.com/150x150/10b981/ffffff?text=Filter",
      },
      {
        partNumber: "54321",
        description: "Spark Plug - Champion RC12YC Equivalent",
        manufacturer: "Rotary",
        price: 3.29,
        availability: 45,
        image: "https://via.placeholder.com/150x150/10b981/ffffff?text=Plug",
      },
    ].filter(item =>
      item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return NextResponse.json({
      results,
      total: results.length,
      query: searchTerm
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
