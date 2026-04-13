import React from 'react';
import { Search, ShoppingCart, User, Heart, Menu, ChevronDown } from 'lucide-react';
import { MOCK_CATEGORIES } from '../mock';

export default function Header() {
  return (
    <header className="bg-[#0f0f10] border-b border-zinc-800 sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-red-600 text-white text-xs text-center py-1.5 font-medium tracking-wide">
        BLACK FRIDAY ANGEBOTE - BIS ZU 50% RABATT AUF MINING VERTRÄGE!
      </div>

      {/* Main Header Area */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white font-black text-xl tracking-tighter">E</span>
          </div>
          <span className="text-white font-black text-2xl tracking-tight hidden md:block">EDEN</span>
        </div>

        {/* Search Bar - Kinguin Style */}
        <div className="flex-grow max-w-3xl hidden md:flex items-center bg-zinc-900 rounded-md border border-zinc-800 focus-within:border-red-500 transition-colors">
          <div className="pl-4 pr-2 text-zinc-400">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Suche nach Mining-Verträgen, Hardware oder Begriffen..."
            className="w-full bg-transparent text-white placeholder-zinc-500 py-3 px-2 outline-none text-sm"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-r-md font-bold text-sm transition-colors">
            Suchen
          </button>
        </div>

        {/* Icons Area */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden lg:flex items-center gap-2 text-zinc-300 hover:text-white cursor-pointer transition-colors text-sm font-semibold">
            <span>EUR €</span>
            <ChevronDown size={14} />
          </div>
          <div className="hidden lg:flex items-center gap-2 text-zinc-300 hover:text-white cursor-pointer transition-colors text-sm font-semibold">
            <span>DE</span>
            <ChevronDown size={14} />
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer transition-colors relative">
            <Heart size={20} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-[10px] flex items-center justify-center rounded-full text-white font-bold">2</span>
          </div>
          <div className="flex items-center gap-2 hover:bg-zinc-800 py-2 px-3 rounded-lg text-zinc-300 hover:text-white cursor-pointer transition-colors">
            <User size={20} />
            <span className="text-sm font-bold hidden md:block">Anmelden</span>
          </div>
          <div className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 py-2 px-4 border border-red-600/20 rounded-lg text-white cursor-pointer transition-colors relative group">
            <ShoppingCart size={20} className="text-red-500 group-hover:text-red-400 transition-colors" />
            <span className="text-sm font-bold hidden sm:block">€ 0.00</span>
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-xs flex items-center justify-center rounded-full text-white font-bold border-2 border-[#0f0f10]">0</span>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="border-t border-zinc-800/50 bg-[#0f0f10]">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <ul className="flex items-center gap-1 sm:gap-6 overflow-x-auto hide-scrollbar py-2">
            <li className="flex items-center gap-2 text-white font-bold py-2 px-4 bg-red-600 hover:bg-red-700 rounded cursor-pointer text-sm whitespace-nowrap transition-colors">
              <Menu size={16} />
              Kategorien
            </li>
            {MOCK_CATEGORIES.map((cat, idx) => (
              <li key={idx} className="text-zinc-400 hover:text-white font-semibold py-2 px-2 cursor-pointer text-sm whitespace-nowrap transition-colors">
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
