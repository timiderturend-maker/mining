import React from 'react';
import { MOCK_PRODUCTS } from '../mock';
import ProductCard from './ProductCard';

export default function ProductGrid({ title, products = MOCK_PRODUCTS }) {
  return (
    <section className="max-w-[1600px] mx-auto px-4 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          <div className="w-2 h-6 bg-red-600 rounded-full"></div>
          {title}
        </h2>
        <button className="text-zinc-400 hover:text-white font-bold text-sm bg-zinc-900 hover:bg-zinc-800 py-2 px-4 rounded transition-colors border border-zinc-800">
          Alle ansehen
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
