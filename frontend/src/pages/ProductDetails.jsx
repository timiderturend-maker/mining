import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ShoppingCart, CheckCircle, Shield, Zap, Info, Package, Server, Heart } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (e) {
        console.error(e);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="bg-[#0f0f10] min-h-screen font-sans text-zinc-300 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="bg-[#0f0f10] min-h-screen font-sans text-zinc-300 flex flex-col">
      <Header />
      <main className="flex-1 max-w-[1600px] mx-auto px-4 lg:px-8 py-10 w-full">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8 font-bold">
          <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/', { state: { category: product.category } })}>{product.category}</span>
          <span>/</span>
          <span className="text-white truncate max-w-xs">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video lg:aspect-[4/3] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 flex items-center justify-center group p-4">
              <div className="absolute inset-0 bg-gradient-to-tr from-black to-transparent opacity-50 z-10 pointer-events-none"></div>
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-black px-3 py-1.5 rounded z-20 shadow-lg">
                  -{product.discount}%
                </div>
              )}
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover object-center rounded-xl opacity-90 group-hover:scale-105 transition-transform duration-700 mix-blend-screen relative z-0" 
              />
            </div>
            
            {/* Extended Description Tabs */}
            <div className="mt-12 hidden lg:block">
              <h3 className="text-xl font-black text-white flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
                Über dieses Produkt
              </h3>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 leading-relaxed text-zinc-400">
                <p className="mb-6">{product.description}</p>
                <p>{product.long_description}</p>
              </div>
            </div>
          </div>

          {/* Product Info & Action */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 md:p-8 flex-1">
              <div className="text-xs font-bold uppercase tracking-wider text-red-500 mb-3 flex justify-between items-center">
                {product.type}
                <button className="text-zinc-500 hover:text-red-500 transition-colors"><Heart size={20}/></button>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-8 border-b border-zinc-800/50 pb-8">
                {product.inStock ? (
                  <span className="flex items-center gap-1.5 text-sm font-bold text-green-500 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                    <CheckCircle size={16} /> Auf Lager ({product.specs.availability})
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm font-bold text-red-500 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                    <Info size={16} /> {product.specs.availability}
                  </span>
                )}
                <div className="flex items-center gap-1 text-yellow-500">
                  {'★'.repeat(Math.floor(product.rating))}
                  <span className="text-zinc-500 text-sm ml-1 font-bold">{product.rating}</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-8">
                {product.originalPrice > product.price && (
                  <p className="text-zinc-500 line-through font-bold mb-1 flex items-center gap-2">
                    Ursprünglich: € {product.originalPrice.toFixed(2)}
                    <span className="no-underline bg-zinc-800 text-white text-xs px-2 py-0.5 rounded">Sie sparen € {(product.originalPrice - product.price).toFixed(2)}</span>
                  </p>
                )}
                <div className="flex items-end gap-3">
                  <span className="text-5xl font-black text-white">€ {product.price.toFixed(2)}</span>
                  <span className="text-zinc-500 font-bold mb-1.5">inkl. MwSt.</span>
                </div>
              </div>

              {/* Action */}
              <button 
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-black py-4 px-6 rounded-xl uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] disabled:shadow-none mb-6"
              >
                <ShoppingCart size={20} /> {product.inStock ? 'In den Warenkorb' : 'Derzeit nicht verfügbar'}
              </button>

              {/* Features / Guarantees */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                    <Zap size={18} />
                  </div>
                  <span className="font-bold leading-tight">Schnelles Setup</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                    <Shield size={18} />
                  </div>
                  <span className="font-bold leading-tight">Sicher & Zertifiziert</span>
                </div>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="mt-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 md:p-8">
              <h4 className="font-black text-white mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                <Server size={18} className="text-red-500" /> Technische Daten
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-zinc-800/50 pb-3">
                  <span className="text-zinc-500 font-bold">Hashrate</span>
                  <span className="text-white font-bold">{product.specs.hashrate}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/50 pb-3">
                  <span className="text-zinc-500 font-bold">Algorithmus</span>
                  <span className="text-white font-bold">{product.specs.algorithm}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/50 pb-3">
                  <span className="text-zinc-500 font-bold">Stromverbrauch</span>
                  <span className="text-white font-bold">{product.specs.power_consumption}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-zinc-500 font-bold">Wartungsgebühr</span>
                  <span className="text-red-500 font-bold">{product.specs.maintenance_fee}</span>
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Mobile Description */}
          <div className="lg:hidden mt-4">
            <h3 className="text-xl font-black text-white flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
              Über dieses Produkt
            </h3>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 leading-relaxed text-zinc-400">
              <p className="mb-4">{product.description}</p>
              <p>{product.long_description}</p>
            </div>
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
