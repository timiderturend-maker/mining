import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-[#0f0f10] min-h-screen font-sans text-zinc-300">
      <Header />
      <main>
        <Hero />
        
        {/* Quick Links / Badges (Kinguin Style) */}
        <section className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6 hidden md:block">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 hover:border-red-600/50 p-4 rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all">
              <span className="w-10 h-10 bg-[#0f0f10] rounded-full flex items-center justify-center text-red-500 text-lg font-black">⚡</span>
              <div>
                <h4 className="text-white font-bold text-sm uppercase">Sofortige Hashrate</h4>
                <p className="text-xs text-zinc-500">Startet in unter 24 Stunden</p>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 hover:border-red-600/50 p-4 rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all">
              <span className="w-10 h-10 bg-[#0f0f10] rounded-full flex items-center justify-center text-red-500 text-lg font-black">🔒</span>
              <div>
                <h4 className="text-white font-bold text-sm uppercase">Sicheres Hosting</h4>
                <p className="text-xs text-zinc-500">100% versicherte Anlagen</p>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 hover:border-red-600/50 p-4 rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all">
              <span className="w-10 h-10 bg-[#0f0f10] rounded-full flex items-center justify-center text-red-500 text-lg font-black">💎</span>
              <div>
                <h4 className="text-white font-bold text-sm uppercase">Tägliche Auszahlung</h4>
                <p className="text-xs text-zinc-500">Direkt in deine Wallet</p>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 hover:border-red-600/50 p-4 rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all">
              <span className="w-10 h-10 bg-[#0f0f10] rounded-full flex items-center justify-center text-red-500 text-lg font-black">🎧</span>
              <div>
                <h4 className="text-white font-bold text-sm uppercase">24/7 Support</h4>
                <p className="text-xs text-zinc-500">Jederzeit Expertenhilfe</p>
              </div>
            </div>
          </div>
        </section>

        <ProductGrid title="Beliebte Verträge" />
        <ProductGrid title="Hardware Angebote" />
        
        {/* Banner Section */}
        <section className="max-w-[1600px] mx-auto px-4 lg:px-8 py-8">
          <div className="relative rounded-2xl overflow-hidden h-[200px] md:h-[300px] cursor-pointer group border border-zinc-800 hover:border-red-500 transition-colors">
            <div className="absolute inset-0 bg-black">
              <img src="https://images.unsplash.com/photo-1658907030290-ce88ebe3a338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHxiaXRjb2lufGVufDB8fHxyZWR8MTc3NjEyMjQwNHww&ixlib=rb-4.1.0&q=85" alt="Banner" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-transparent mix-blend-multiply"></div>
            </div>
            <div className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-lg max-w-2xl leading-tight">ANTMINER S21 VORBESTELLEN</h2>
              <p className="text-zinc-200 text-lg mb-6 max-w-xl font-medium">Sichere dir als Erster 200 TH/s Leistung. Versand in Q1 2026.</p>
              <button className="bg-white hover:bg-zinc-200 text-black font-black py-3 px-8 rounded shadow-xl hover:scale-105 transition-transform uppercase text-sm tracking-wider">Jetzt Vorbestellen</button>
            </div>
          </div>
        </section>
        
        <ProductGrid title="Vorbestellungen & Neuerscheinungen" />
        <ProductGrid title="Hosting Services" />
        
      </main>
      <Footer />
    </div>
  );
}
