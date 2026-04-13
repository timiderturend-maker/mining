import React, { useState, useEffect } from 'react';
import { MOCK_HERO_BANNERS } from '../mock';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % MOCK_HERO_BANNERS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const banner = MOCK_HERO_BANNERS[currentIdx];

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[450px]">
        {/* Main Slider */}
        <div className="relative flex-grow h-[300px] sm:h-[400px] lg:h-full rounded-xl overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-black">
            <img 
              src={banner.image} 
              alt={banner.title}
              className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient Overlay typical for Kinguin */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
          </div>
          
          <div className="absolute top-0 left-0 p-8 md:p-12 w-full md:w-2/3 flex flex-col justify-center h-full">
            {banner.tag && (
              <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded w-max mb-4 uppercase tracking-wider">
                {banner.tag}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 drop-shadow-lg">
              {banner.title}
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl font-medium mb-8 max-w-xl">
              {banner.subtitle}
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded text-lg w-max transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]">
              {banner.buttonText}
            </button>
          </div>

          {/* Slider Controls */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-red-600 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIdx((prev) => (prev - 1 + MOCK_HERO_BANNERS.length) % MOCK_HERO_BANNERS.length);
            }}
          >
            <ChevronLeft size={24} />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-red-600 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIdx((prev) => (prev + 1) % MOCK_HERO_BANNERS.length);
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {MOCK_HERO_BANNERS.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-12 h-1.5 rounded-full transition-all ${idx === currentIdx ? 'bg-red-600' : 'bg-white/30'}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Side Banners (like Kinguin has on the right side sometimes) */}
        <div className="hidden lg:flex w-80 flex-col gap-6">
          <div className="h-[213px] rounded-xl relative overflow-hidden group cursor-pointer bg-zinc-900 border border-zinc-800 hover:border-red-500 transition-colors">
            <img 
              src="https://images.unsplash.com/photo-1635564854661-178add23dcec?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxiaXRjb2lufGVufDB8fHxyZWR8MTc3NjEyMjQwNHww&ixlib=rb-4.1.0&q=85" 
              alt="Promo"
              className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] to-transparent p-6 flex flex-col justify-end">
              <span className="text-red-500 font-bold text-xs uppercase mb-1">Weekly Deal</span>
              <h3 className="text-white font-black text-xl leading-tight">Antminer S19 Pro</h3>
              <p className="text-zinc-400 text-sm mt-1">Starting at € 1,250.00</p>
            </div>
          </div>
          <div className="h-[213px] rounded-xl relative overflow-hidden group cursor-pointer bg-zinc-900 border border-zinc-800 hover:border-red-500 transition-colors">
            <img 
              src="https://images.unsplash.com/photo-1639066648921-82d4500abf1a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByYWNrfGVufDB8fHxibGFja3wxNzc2MTIyNDEwfDA&ixlib=rb-4.1.0&q=85" 
              alt="Promo"
              className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] to-transparent p-6 flex flex-col justify-end">
              <span className="text-red-500 font-bold text-xs uppercase mb-1">New Service</span>
              <h3 className="text-white font-black text-xl leading-tight">VIP Server Hosting</h3>
              <p className="text-zinc-400 text-sm mt-1">99.9% Uptime Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
