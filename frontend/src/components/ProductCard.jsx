import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div className="bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-red-600/50 rounded-xl overflow-hidden group transition-all duration-300 flex flex-col h-full shadow-lg relative cursor-pointer">
      
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2 py-1 rounded z-10 shadow-md">
          -{product.discount}%
        </div>
      )}

      {/* Heart Action */}
      <button className="absolute top-3 right-3 w-8 h-8 bg-black/40 hover:bg-red-600 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 backdrop-blur-sm">
        <Heart size={14} />
      </button>

      {/* Image Section (Portrait like game boxes, but adjusted for mining hardware/art) */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0f0f10] p-1">
        <div className="w-full h-full relative rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-2">
          {product.type}
        </div>
        <h3 className="text-white font-bold text-base leading-snug mb-4 group-hover:text-red-500 transition-colors line-clamp-2">
          {product.title}
        </h3>
        
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            {product.originalPrice > product.price && (
              <span className="text-zinc-500 text-xs line-through font-semibold">
                € {product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-white font-black text-xl">
              € {product.price.toFixed(2)}
            </span>
          </div>
          <button className="bg-zinc-800 hover:bg-red-600 text-white p-2.5 rounded-lg transition-colors group/btn relative">
            <ShoppingCart size={18} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
