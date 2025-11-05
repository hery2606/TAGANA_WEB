'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './navbar';
import { InfoModal } from './modals';

// Dynamic import for Leaflet map to avoid SSR issues
const PetaSriharjo = dynamic(() => import('./petasriharjo'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#044BB1] mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold">Memuat Peta...</p>
      </div>
    </div>
  ),
});

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section - Peta Utama */}
      <section className="relative mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#044BB1] to-[#0566d6] bg-clip-text text-transparent mb-4">
              Peta Zona Bahaya Sriharjo
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Sistem Informasi Geografis untuk monitoring zona rawan bencana dan manajemen kebencanaan di Desa Sriharjo, Kecamatan Imogiri, Kabupaten Bantul
            </p>
          </div>

          {/* Map Container - Full Width */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-[#044BB1]">
            {/* Map Header */}
            <div className="bg-gradient-to-r from-[#044BB1] to-[#0566d6] px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <svg
                    className="w-7 h-7 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  Peta Interaktif Sriharjo
                </h2>
                <div className="flex items-center space-x-2 text-white">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold">Live</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Display - Tinggi Lebih Besar */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200" style={{ height: "70vh", minHeight: "600px" }}>
              <PetaSriharjo />
            </div>

            {/* Map Info Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#044BB1]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Klik pada marker untuk melihat detail dusun
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#044BB1] hover:bg-[#033a8c] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Info Lengkap</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
              Statistik Zona Bahaya
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Data real-time kondisi zona bahaya di seluruh wilayah Desa Sriharjo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-xl p-8 border-l-4 border-red-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-bold mb-2">Zona Bahaya Tinggi</p>
                  <p className="text-4xl font-black text-red-500 mb-1">12</p>
                  <p className="text-sm text-red-400">Area Rawan</p>
                </div>
                <div className="bg-red-500 rounded-full p-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-xl p-8 border-l-4 border-yellow-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-bold mb-2">Zona Waspada</p>
                  <p className="text-4xl font-black text-yellow-500 mb-1">28</p>
                  <p className="text-sm text-yellow-400">Area Waspada</p>
                </div>
                <div className="bg-yellow-500 rounded-full p-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-xl p-8 border-l-4 border-green-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-bold mb-2">Zona Aman</p>
                  <p className="text-4xl font-black text-green-500 mb-1">45</p>
                  <p className="text-sm text-green-400">Area Aman</p>
                </div>
                <div className="bg-green-500 rounded-full p-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Cards Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Legenda Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-[#044BB1]">
              <div className="bg-gradient-to-r from-[#044BB1] to-[#0566d6] px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Legenda Zona
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 border-l-4 border-red-500">
                  <div className="flex items-start space-x-3">
                    <div className="bg-red-500 rounded-lg p-2 mt-1">
                      <div className="w-4 h-4 bg-white rounded"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-red-700 mb-1">Zona Bahaya Tinggi</h4>
                      <p className="text-sm text-red-600">
                        Area dengan risiko longsor dan banjir tinggi. Evakuasi prioritas.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 border-l-4 border-yellow-500">
                  <div className="flex items-start space-x-3">
                    <div className="bg-yellow-500 rounded-lg p-2 mt-1">
                      <div className="w-4 h-4 bg-white rounded"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-yellow-700 mb-1">Zona Waspada</h4>
                      <p className="text-sm text-yellow-600">
                        Area dengan potensi bahaya sedang. Perlu kewaspadaan tinggi.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-500">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 rounded-lg p-2 mt-1">
                      <div className="w-4 h-4 bg-white rounded"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-green-700 mb-1">Zona Aman</h4>
                      <p className="text-sm text-green-600">
                        Area aman dari bencana. Cocok untuk jalur evakuasi.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Titik Evakuasi</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Pos Siaga</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Posko TAGANA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-[#044BB1]">
              <div className="bg-gradient-to-r from-[#044BB1] to-[#0566d6] px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  Statistik Desa
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500">
                  <div>
                    <span className="text-sm text-blue-600 font-medium">Total Dusun</span>
                    <p className="text-2xl font-bold text-blue-700">8</p>
                  </div>
                  <div className="bg-blue-500 rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-l-4 border-green-500">
                  <div>
                    <span className="text-sm text-green-600 font-medium">RT / RW</span>
                    <p className="text-2xl font-bold text-green-700">85 / 12</p>
                  </div>
                  <div className="bg-green-500 rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border-l-4 border-purple-500">
                  <div>
                    <span className="text-sm text-purple-600 font-medium">Anggota TAGANA</span>
                    <p className="text-2xl font-bold text-purple-700">42</p>
                  </div>
                  <div className="bg-purple-500 rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border-l-4 border-orange-500">
                  <div>
                    <span className="text-sm text-orange-600 font-medium">Total Penduduk</span>
                    <p className="text-2xl font-bold text-orange-700">8,542</p>
                  </div>
                  <div className="bg-orange-500 rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
