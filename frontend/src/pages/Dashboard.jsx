import React, { useEffect, useState } from 'react';
import { api, useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Settings, Package, HardDrive, AlertTriangle, Play, Wallet, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('contracts');
  const [dashboardData, setDashboardData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/dashboard');
      setDashboardData(res.data);
    } catch(e) {
      console.error(e);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboard();
    }
  }, [user]);

  const handleStartMining = async (contractId) => {
    try {
      await api.post(`/dashboard/start-mining/${contractId}`);
      // Refresh to get new timestamps
      fetchDashboard();
      alert("Mining erfolgreich gestartet!");
    } catch(e) {
      alert("Fehler beim Starten des Minings.");
    }
  };

  const handlePayout = async () => {
    try {
      const res = await api.post('/dashboard/payout');
      alert(res.data.message);
      fetchDashboard();
    } catch(e) {
      alert(e.response?.data?.detail || "Fehler bei der Auszahlung.");
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f10] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f10] min-h-screen font-sans text-zinc-300">
      <Header />
      <main className="max-w-[1600px] mx-auto px-4 lg:px-8 py-10 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden sticky top-24">
            <div className="p-6 border-b border-zinc-800 flex items-center gap-4">
              <img src={user?.picture || "https://via.placeholder.com/150"} alt="Profile" className="w-12 h-12 rounded-full border-2 border-red-600" />
              <div>
                <h3 className="text-white font-bold">{user?.name}</h3>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Eden Member</p>
              </div>
            </div>
            <nav className="p-4 space-y-2">
              <button 
                onClick={() => setActiveTab('contracts')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'contracts' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
              >
                <HardDrive size={18} /> Meine Miner
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'orders' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
              >
                <Package size={18} /> Bestellhistorie
              </button>
              <button 
                onClick={() => setActiveTab('payouts')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${activeTab === 'payouts' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
              >
                <Wallet size={18} /> Auszahlung
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1">
          {activeTab === 'contracts' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <div className="w-2 h-6 bg-red-600 rounded-full"></div>
                Aktive Verträge & Hardware
              </h2>
              
              {dashboardData?.contracts?.length === 0 ? (
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-10 text-center">
                  <Package size={48} className="mx-auto text-zinc-600 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Keine Miner gefunden</h3>
                  <p className="text-zinc-400 mb-6">Du hast noch keine Verträge oder Hardware gekauft.</p>
                  <button onClick={() => navigate('/')} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors">Zum Shop</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashboardData?.contracts?.map(c => (
                    <div key={c.contract_id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-red-500">{c.type}</span>
                          {c.status === 'ACTIVE' ? (
                            <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Aktiv
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-zinc-400 bg-zinc-800 px-2 py-1 rounded">Inaktiv</span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{c.title}</h3>
                        <p className="text-sm text-zinc-400">Erworben am: {new Date(c.created_at).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                        {c.status === 'INACTIVE' ? (
                          <button 
                            onClick={() => handleStartMining(c.contract_id)}
                            className="w-full bg-white hover:bg-zinc-200 text-black font-black py-2 rounded flex items-center justify-center gap-2 transition-colors uppercase text-sm"
                          >
                            <Play size={16} /> Start Mining
                          </button>
                        ) : (
                          <div className="w-full">
                            <p className="text-xs text-zinc-500 mb-1">Geminete BTC</p>
                            <p className="text-lg font-black text-white">{c.accumulated_btc?.toFixed(8) || "0.00000000"} BTC</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <div className="w-2 h-6 bg-red-600 rounded-full"></div>
                Bestellhistorie
              </h2>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                {dashboardData?.orders?.length === 0 ? (
                  <div className="p-8 text-center text-zinc-500">Noch keine Bestellungen.</div>
                ) : (
                  <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 uppercase text-xs font-bold tracking-wider">
                      <tr>
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Datum</th>
                        <th className="p-4">Produkte</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {dashboardData.orders.map(o => (
                        <tr key={o.order_id} className="hover:bg-zinc-800/50 transition-colors">
                          <td className="p-4 font-mono text-zinc-300">{o.order_id}</td>
                          <td className="p-4 text-zinc-400">{new Date(o.created_at).toLocaleDateString()}</td>
                          <td className="p-4 text-zinc-300">{o.items.length} Artikel</td>
                          <td className="p-4 font-bold text-white">€ {o.total.toFixed(2)}</td>
                          <td className="p-4">
                            <span className="text-green-500 flex items-center gap-1 font-bold text-xs"><CheckCircle size={14}/> {o.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab === 'payouts' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <div className="w-2 h-6 bg-red-600 rounded-full"></div>
                Auszahlung (Payout)
              </h2>

              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <p className="text-zinc-400 mb-2 font-bold uppercase tracking-wider">Gesammeltes Guthaben</p>
                    <p className="text-5xl font-black text-white mb-2">{dashboardData?.total_accumulated_btc?.toFixed(8)} <span className="text-xl text-red-500">BTC</span></p>
                    <p className="text-sm text-zinc-500">Geschätzter Wert schwankt basierend auf dem Marktwert.</p>
                  </div>
                  
                  <div className="bg-black/50 p-6 rounded-xl border border-zinc-800 max-w-sm w-full">
                    {dashboardData?.contracts?.length === 0 ? (
                      <p className="text-zinc-500 text-sm">Du musst erst Mining starten, um Guthaben zu sammeln.</p>
                    ) : dashboardData?.payout_unlocked ? (
                      <div>
                        <div className="flex items-center gap-2 text-green-500 font-bold mb-4">
                          <CheckCircle size={20} /> Auszahlung freigeschaltet
                        </div>
                        <button onClick={handlePayout} className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-lg uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                          Jetzt Auszahlen
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-start gap-3 text-yellow-500 font-bold mb-4">
                          <AlertTriangle size={24} className="flex-shrink-0 mt-1" /> 
                          <span className="text-sm">Deine Auszahlung ist aus Sicherheitsgründen für 90 Tage nach dem ersten Mining-Start gesperrt.</span>
                        </div>
                        <div className="bg-zinc-900 rounded p-3 text-center border border-zinc-800">
                          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Verbleibende Zeit</p>
                          <p className="text-xl font-black text-white flex items-center justify-center gap-2">
                            <Clock size={18} className="text-red-500"/> {dashboardData?.days_until_payout} Tage
                          </p>
                        </div>
                        {dashboardData?.first_mining_start && (
                          <p className="text-xs text-zinc-500 mt-3 text-center">Erster Start: {new Date(dashboardData.first_mining_start).toLocaleDateString()}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h4 className="font-bold text-white mb-4">Auszahlungsregeln (Eden Cloud)</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
                  <li>Mindestens ein Vertrag muss aktiv am Minen sein.</li>
                  <li>Neue Konten unterliegen einer strikten 90-Tage-Sperrfrist ab dem Start des ersten Minings.</li>
                  <li>Danach sind Auszahlungen täglich möglich, sofern der Mindestbetrag erreicht ist.</li>
                  <li>Die Auszahlung erfolgt in Bitcoin (BTC) an die hinterlegte Wallet-Adresse.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </main>
      <Footer />
    </div>
  );
}
