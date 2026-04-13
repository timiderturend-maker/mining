import React from 'react';
import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0b] border-t border-zinc-900 mt-16 pt-16 pb-8 text-zinc-400">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-black text-xl tracking-tighter">E</span>
              </div>
              <span className="text-white font-black text-2xl tracking-tight">EDEN</span>
            </div>
            <p className="text-sm text-zinc-500 mb-6 max-w-sm">
              Die führende Bitcoin Cloud Mining Plattform. Sichere, zuverlässige und transparente Hashrate-Verträge sowie Hardware-Hosting weltweit.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-zinc-900 hover:bg-red-600 hover:text-white rounded flex items-center justify-center transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-zinc-900 hover:bg-red-600 hover:text-white rounded flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-zinc-900 hover:bg-red-600 hover:text-white rounded flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-zinc-900 hover:bg-red-600 hover:text-white rounded flex items-center justify-center transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black mb-4 uppercase text-sm tracking-wider">Kaufen</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-red-500 transition-colors">Cloud Mining Verträge</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">ASIC Hardware</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Hosting Lösungen</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">VIP Pakete</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Gutscheinkarten</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-4 uppercase text-sm tracking-wider">Über Eden</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-red-500 transition-colors">Über uns</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Rechenzentren</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Karriere</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">News & Blog</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-4 uppercase text-sm tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-red-500 transition-colors">Support Center</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Nutzungsbedingungen</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Datenschutz</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Rückerstattung</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2025 Eden Cloud Mining. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4 opacity-50">
            {/* Payment Icons Simulation */}
            <div className="bg-zinc-800 px-3 py-1.5 rounded text-white font-bold">VISA</div>
            <div className="bg-zinc-800 px-3 py-1.5 rounded text-white font-bold">MASTERCARD</div>
            <div className="bg-zinc-800 px-3 py-1.5 rounded text-white font-bold">BITCOIN</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
