'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { InfoModal } from '@/components/ui/modal_desa';
import { dusunData } from '@/data/datadususn';

const PetaSriharjo = dynamic(() => import('./components/petaSriharjo'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#044BB1] mx-auto mb-3"></div>
        <p className="text-gray-600">Memuat Peta...</p>
      </div>
    </div>
  ),
});

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDusunId, setSelectedDusunId] = useState<number | null>(null);

  useEffect(() => {
    // Force scrollbar to always show on mobile
    document.documentElement.style.overflowY = 'scroll';
    document.body.style.overflowY = 'scroll';
    
    return () => {
      document.documentElement.style.overflowY = '';
      document.body.style.overflowY = '';
    };
  }, []);

  const handleDusunChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedDusunId(value === "" ? null : parseInt(value));
  };

  const handleResetView = () => {
    setSelectedDusunId(null);
  };

  return (
    <>
      <style jsx global>{`
        html, body {
          overflow-y: scroll !important;
          -webkit-overflow-scrolling: touch;
        }
        
        ::-webkit-scrollbar {
          width: 14px;
          height: 14px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #044BB1;
          border-radius: 10px;
          border: 3px solid #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #033a8c;
        }
        
        /* Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: #044BB1 #f1f1f1;
        }
        
        @media (max-width: 768px) {
          ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }
          
          ::-webkit-scrollbar-thumb {
            border: 2px solid #f1f1f1;
          }
          
          html, body {
            overflow-y: scroll !important;
            height: 100%;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <main className="pt-6 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title Section */}
            <div className="text-center mb-6">
              x
            </div>

            
            {/* Map Container */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                {/* Map Header */}
                <div className="bg-[#044BB1] px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                 
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <label htmlFor="dusun-select" className="text-white font-bold text-sm uppercase tracking-wide bg-white/10 px-3 py-1 rounded-full border border-white/20 self-start sm:self-auto whitespace-nowrap">
                     Pilih Dusun:
                    </label>
                    <div className="relative flex-1 group">
                    <select
                      id="dusun-select"
                      value={selectedDusunId ?? ""}
                      onChange={handleDusunChange}
                      className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border-2 border-white/30 bg-gradient-to-r from-white/15 to-white/10 text-white font-semibold text-sm sm:text-base focus:outline-none focus:border-white/60 focus:ring-4 focus:ring-white/20 transition-all duration-300 cursor-pointer appearance-none shadow-lg hover:from-white/20 hover:to-white/15 hover:border-white/40 hover:shadow-xl backdrop-blur-sm"
                    >
                      <option value="" className="bg-[#1a4a9c] text-white py-2">Semua Dusun</option>
                      {dusunData.map((dusun) => (
                      <option key={dusun.id} value={dusun.id} className="bg-[#1a4a9c] text-white py-2">
                         {dusun.name}
                      </option>
                      ))}
                    </select>
                    
                    {/* Custom Dropdown Arrow */}
                    <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-300 group-hover:scale-110">
                      <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                      </svg>
                    </div>

                    {/* Animated Border Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-sm group-hover:blur-0"></div>
                    </div>
                  </div>
                {/* Reset Button */}
                {selectedDusunId !== null && (
                  <button
                  onClick={handleResetView}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                  </button>
                )}
                </div>

              {/* Map Display */}
              <div style={{ height: "600px" }}>
                <PetaSriharjo 
                  selectedDusunId={selectedDusunId}
                  onDusunSelect={setSelectedDusunId}
                />
              </div>

              {/* Map Footer */}
              <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3">

                <li className='text to-blue-700'>klik pada marker untuk melihat detail</li>
              
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#044BB1] hover:bg-[#033a8c] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Info Lengkap Desa
                </button>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Zona Bahaya */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">⚠️</span>
                  <span className="text-3xl font-bold text-red-600">12</span>
                </div>
                <h3 className="font-semibold text-gray-800">Zona Bahaya Tinggi</h3>
                <p className="text-sm text-gray-600">Area Rawan Bencana</p>
              </div>

              {/* Zona Waspada */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">⚡</span>
                  <span className="text-3xl font-bold text-yellow-600">28</span>
                </div>
                <h3 className="font-semibold text-gray-800">Zona Waspada</h3>
                <p className="text-sm text-gray-600">Perlu Perhatian</p>
              </div>

              {/* Zona Aman */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">✅</span>
                  <span className="text-3xl font-bold text-green-600">45</span>
                </div>
                <h3 className="font-semibold text-gray-800">Zona Aman</h3>
                <p className="text-sm text-gray-600">Bebas Risiko</p>
              </div>
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Legenda */}
              <div className="bg-white rounded-xl shadow-[1px_1px_41px_2px_rgba(17,_12,_46,_0.15)] p-6">
                <h1 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  
                  <span>Legenda Zona</span>
                </h1>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-red-100 rounded-lg">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-sm text-red-700">Zona Bahaya Tinggi</p>
                      <p className="text-xs text-red-600">Risiko longsor & banjir tinggi</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-yellow-100 rounded-lg">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-sm text-yellow-700">Zona Waspada</p>
                      <p className="text-xs text-yellow-600">Potensi bahaya sedang</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-100 rounded-lg">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-sm text-green-700">Zona Aman</p>
                      <p className="text-xs text-green-600">Aman dari bencana</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistik Desa */}
              <div className="bg-white rounded-xl shadow-[1px_1px_41px_2px_rgba(17,_12,_46,_0.15)] p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  <span>Statistik Desa</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-100 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Total Dusun</span>
                    <span className="text-lg font-bold text-[#044BB1]">13</span>
                  </div>

                  

                  <div className="flex justify-between items-center p-3 bg-purple-100 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Anggota TAGANA</span>
                    <span className="text-lg font-bold text-purple-600">20</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-orange-100 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Total Penduduk</span>
                    <span className="text-lg font-bold text-orange-600">9.417</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* Footer */}
        <div>
        {/* <Footer /> */}

        </div>

        {/* Modal */}
        <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
}
