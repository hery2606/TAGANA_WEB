"use client";

import { useState } from "react";
import Navbar from "./navbar";
import { InfoModal } from "./modals";
import dynamic from "next/dynamic";

// Import PetaSriharjo secara dynamic untuk menghindari SSR issues dengan Leaflet
const PetaSriharjo = dynamic(() => import("./petasriharjo"), {
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
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Map/Image Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Container */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-[#044BB1]">
              {/* Header */}
              <div className="bg-linear-to-r from-[#044BB1] to-[#0566d6] px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
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
                  Peta Zona Bahaya Sriharjo
                </h2>
              </div>

              {/* Map/Image Display */}
              <div className="relative bg-linear-to-br from-gray-100 to-gray-200" style={{ height: "600px" }}>
                <PetaSriharjo />
              </div>

              {/* Map Info Footer */}
              <div className="bg-gray-50 px-6 py-3 border-t">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#044BB1]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Klik pada area peta untuk melihat detail zona
                </p>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-red-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Zona Bahaya Tinggi</p>
                    <p className="text-3xl font-bold text-red-500 mt-1">12</p>
                    <p className="text-xs text-gray-400 mt-1">Area</p>
                  </div>
                  <div className="bg-red-100 rounded-full p-3">
                    <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-yellow-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Zona Waspada</p>
                    <p className="text-3xl font-bold text-yellow-500 mt-1">28</p>
                    <p className="text-xs text-gray-400 mt-1">Area</p>
                  </div>
                  <div className="bg-yellow-100 rounded-full p-3">
                    <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Zona Aman</p>
                    <p className="text-3xl font-bold text-green-500 mt-1">45</p>
                    <p className="text-xs text-gray-400 mt-1">Area</p>
                  </div>
                  <div className="bg-green-100 rounded-full p-3">
                    <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Legend & Info */}
          <div className="space-y-6">
            {/* Legend Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-[#044BB1]">
              <div className="bg-linear-to-r from-[#044BB1] to-[#0566d6] px-6 py-4">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Legenda Zona
                </h3>
              </div>

              <div className="p-6 space-y-4">
                {/* Zona Bahaya Tinggi */}
                <div className="bg-linear-to-r from-red-50 to-red-100 rounded-xl p-4 border-l-4 border-red-500 hover:shadow-md transition-shadow duration-200">
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

                {/* Zona Waspada */}
                <div className="bg-linear-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 border-l-4 border-yellow-500 hover:shadow-md transition-shadow duration-200">
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

                {/* Zona Aman */}
                <div className="bg-linear-to-r from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-500 hover:shadow-md transition-shadow duration-200">
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

                {/* Additional Legend Items */}
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Titik Evakuasi</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Pos Siaga</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Posko TAGANA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-linear-to-r from-[#044BB1] to-[#0566d6] text-white rounded-xl px-6 py-4 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Informasi Lengkap</span>
              </div>
            </button>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#044BB1]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Statistik Cepat
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-600">Total Dusun</span>
                  <span className="font-bold text-[#044BB1]">15</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-600">RT/RW</span>
                  <span className="font-bold text-green-600">85 / 12</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-gray-600">Anggota TAGANA</span>
                  <span className="font-bold text-purple-600">42</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
