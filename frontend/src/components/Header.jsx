import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, ChevronDown, LogOut, X, Plus, Minus, LayoutDashboard, Copy, Check } from 'lucide-react';
import { MOCK_CATEGORIES } from '../mock';
import { useAuth, api } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, login, logout, loading } = useAuth();
  const { cart, total, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart } = useCart();
  const [checkoutLoading, setCheckoutLoading] = React.useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const btcAddress = "bc1qedencloudminingcommunitysupport9876";

  const handleCopy = () => {
    navigator.clipboard.writeText(btcAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckout = async () => {
    if (!user) {
      login();
      return;
    }
    if (cart.length === 0) return;
    
    setCheckoutLoading(true);
    try {
      const res = await api.post('/cart/checkout', { items: cart, total });
      if (res.data?.message) {
        clearCart();
        setIsCartOpen(false);
        navigate('/dashboard');
      }
    } catch(e) {
      alert('Fehler beim Checkout.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <>
      <header className="bg-[#0f0f10] border-b border-zinc-800 sticky top-0 z-50">
        <div className="bg-red-600 text-white text-xs text-center py-1.5 font-medium tracking-wide">
          BLACK FRIDAY ANGEBOTE - BIS ZU 50% RABATT AUF MINING VERTRÄGE!
        </div>

        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-4 flex items-center justify-between gap-6">
          <div onClick={() => navigate('/')} className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-black text-xl tracking-tighter">E</span>
            </div>
            <span className="text-white font-black text-2xl tracking-tight hidden md:block">EDEN</span>
          </div>

          <div className="flex-grow max-w-3xl hidden md:flex items-center bg-zinc-900 rounded-md border border-zinc-800 focus-within:border-red-500 transition-colors">
            <div className="pl-4 pr-2 text-zinc-400"><Search size={18} /></div>
            <input type="text" placeholder="Suche nach Mining-Verträgen, Hardware oder Begriffen..." className="w-full bg-transparent text-white placeholder-zinc-500 py-3 px-2 outline-none text-sm" />
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-r-md font-bold text-sm transition-colors">Suchen</button>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden lg:flex items-center gap-2 text-zinc-300 hover:text-white cursor-pointer transition-colors text-sm font-semibold">
              <span>EUR €</span><ChevronDown size={14} />
            </div>
            <div className="hidden lg:flex items-center gap-2 text-zinc-300 hover:text-white cursor-pointer transition-colors text-sm font-semibold">
              <span>DE</span><ChevronDown size={14} />
            </div>
            
            <button onClick={() => setIsDonateModalOpen(true)} className="hidden md:flex items-center gap-2 text-zinc-300 hover:text-white cursor-pointer transition-colors text-sm font-semibold border border-zinc-800 hover:border-red-500 px-3 py-1.5 rounded-lg group">
              <Heart size={16} className="text-red-500 group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-red-500 transition-colors">Spenden</span>
            </button>

            {loading ? (
               <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 hover:bg-zinc-800 py-2 px-3 rounded-lg text-zinc-300 hover:text-white cursor-pointer transition-colors group relative">
                  {user.picture ? (
                    <img src={user.picture} alt="Profile" className="w-8 h-8 rounded-full border border-zinc-700" />
                  ) : (
                    <User size={20} />
                  )}
                  <span className="text-sm font-bold hidden md:block max-w-[100px] truncate">{user.name}</span>
                  
                  <div className="absolute top-full right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-2 z-50">
                    <div className="px-4 py-3 border-b border-zinc-800 mb-2">
                      <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                    </div>
                    <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors w-full text-left font-bold">
                      <LayoutDashboard size={16} className="text-red-500" /> Dashboard & Verträge
                    </button>
                    <button onClick={logout} className="flex items-center gap-3 px-4 py-2 mt-1 text-sm text-zinc-400 hover:text-red-500 hover:bg-zinc-800 transition-colors w-full text-left font-bold border-t border-zinc-800/50 pt-2">
                      <LogOut size={16} /> Abmelden
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div onClick={login} className="flex items-center gap-2 hover:bg-zinc-800 py-2 px-3 rounded-lg text-zinc-300 hover:text-white cursor-pointer transition-colors">
                <User size={20} />
                <span className="text-sm font-bold hidden md:block">Anmelden</span>
              </div>
            )}

            <div onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 py-2 px-4 border border-red-600/20 rounded-lg text-white cursor-pointer transition-colors relative group">
              <ShoppingCart size={20} className="text-red-500 group-hover:text-red-400 transition-colors" />
              <span className="text-sm font-bold hidden sm:block">€ {total.toFixed(2)}</span>
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-xs flex items-center justify-center rounded-full text-white font-bold border-2 border-[#0f0f10]">{cart.reduce((s,i)=>s+i.quantity,0)}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 bg-[#0f0f10]">
          <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
            <ul className="flex items-center gap-1 sm:gap-6 overflow-x-auto hide-scrollbar py-2">
              <li className="flex items-center gap-2 text-white font-bold py-2 px-4 bg-red-600 hover:bg-red-700 rounded cursor-pointer text-sm whitespace-nowrap transition-colors">
                <Menu size={16} />
                Kategorien
              </li>
              {MOCK_CATEGORIES.map((cat, idx) => (
                <li key={idx} className="text-zinc-400 hover:text-white font-semibold py-2 px-2 cursor-pointer text-sm whitespace-nowrap transition-colors">{cat}</li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* Cart Sidebar Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}>
          <div 
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#0f0f10] border-l border-zinc-800 shadow-2xl flex flex-col transform transition-transform"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-black flex items-center gap-2">
                <ShoppingCart size={24} className="text-red-600" />
                Warenkorb
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-white bg-zinc-900 p-2 rounded-full hover:bg-red-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-zinc-500 mt-20">
                  <ShoppingCart size={64} className="mx-auto mb-4 opacity-20" />
                  <p>Dein Warenkorb ist leer.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product_id} className="flex gap-4 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800">
                    <div className="w-20 h-20 bg-black rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white line-clamp-2 leading-snug">{item.title}</h4>
                        <p className="text-red-500 font-bold mt-1">€ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-zinc-950 rounded-lg px-2 py-1 border border-zinc-800">
                          <button onClick={() => updateQuantity(item.product_id, -1)} className="text-zinc-400 hover:text-white p-1"><Minus size={14}/></button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product_id, 1)} className="text-zinc-400 hover:text-white p-1"><Plus size={14}/></button>
                        </div>
                        <button onClick={() => removeFromCart(item.product_id)} className="text-zinc-500 hover:text-red-500 text-xs font-bold uppercase transition-colors">Entfernen</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-zinc-800 bg-[#0f0f10]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-400 font-bold">Gesamtsumme</span>
                <span className="text-2xl font-black text-white">€ {total.toFixed(2)}</span>
              </div>
              <button 
                disabled={cart.length === 0 || checkoutLoading}
                onClick={handleCheckout}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl uppercase tracking-wider text-sm transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
              >
                {checkoutLoading ? 'Verarbeite...' : (user ? 'Zur Kasse gehen' : 'Anmelden & Kasse')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Donate Modal */}
      {isDonateModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity" onClick={() => setIsDonateModalOpen(false)}>
          <div 
            className="bg-[#0f0f10] border border-zinc-800 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden transform transition-transform scale-100"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
              <h3 className="text-xl font-black text-white flex items-center gap-3">
                <Heart className="text-red-500" fill="currentColor" size={24} /> Eden Unterstützen
              </h3>
              <button onClick={() => setIsDonateModalOpen(false)} className="text-zinc-500 hover:text-white bg-zinc-900 p-2 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 md:p-8 flex flex-col items-center text-center">
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Dir gefällt unsere Plattform? Unterstütze die Entwicklung und Serverkosten mit einer kleinen Bitcoin-Spende. Jeder Satoshi hilft!
              </p>
              
              <div className="bg-white p-3 rounded-xl mb-6 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=bitcoin:${btcAddress}&color=0f0f10`} 
                  alt="Bitcoin QR Code" 
                  className="w-40 h-40"
                />
              </div>

              <div className="w-full">
                <label className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-2 block text-left">Bitcoin Adresse (BTC)</label>
                <div className="flex items-center gap-2 bg-black border border-zinc-800 rounded-lg p-1">
                  <input 
                    type="text" 
                    readOnly 
                    value={btcAddress} 
                    className="bg-transparent text-sm text-zinc-300 w-full px-3 outline-none font-mono"
                  />
                  <button 
                    onClick={handleCopy}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-md transition-colors flex-shrink-0"
                    title="Adresse kopieren"
                  >
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
