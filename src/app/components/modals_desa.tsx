"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/15 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-[#044BB1] to-[#0566d6] text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-2xl font-bold">Informasi Daerah Sriharjo</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Tentang Daerah */}
          <section className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-[#044BB1]">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-[#044BB1] rounded-lg p-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#044BB1]">Tentang Daerah</h3>
            </div>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                <span className="font-semibold">Sriharjo</span> adalah sebuah desa yang terletak di Kecamatan Imogiri, 
                Kabupaten Bantul, Daerah Istimewa Yogyakarta. Daerah ini memiliki karakteristik geografis yang beragam, 
                dari dataran rendah hingga perbukitan.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-sm text-gray-500">Luas Wilayah</p>
                  <p className="text-lg font-bold text-[#044BB1]">12.5 km²</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-sm text-gray-500">Ketinggian</p>
                  <p className="text-lg font-bold text-[#044BB1]">50-200 mdpl</p>
                </div>
              </div>
            </div>
          </section>

          {/* Bencana yang Sering Terjadi */}
          <section className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-l-4 border-orange-500">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-orange-500 rounded-lg p-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-orange-600">Bencana yang Sering Terjadi</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 rounded-full p-2 mt-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">Tanah Longsor</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Terjadi terutama di daerah perbukitan saat musim hujan. Frekuensi: 2-3 kali/tahun
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">Banjir</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Banjir lokal di area dataran rendah saat intensitas hujan tinggi. Frekuensi: 1-2 kali/tahun
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-100 rounded-full p-2 mt-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">Kekeringan</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Terjadi pada musim kemarau panjang, terutama di daerah perbukitan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Jumlah Penduduk */}
          <section className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-500 rounded-lg p-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-600">Demografi Penduduk</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <p className="text-sm text-gray-500 mb-2">Total Penduduk</p>
                <p className="text-3xl font-bold text-[#044BB1]">8,542</p>
                <p className="text-xs text-gray-400 mt-1">Jiwa</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <p className="text-sm text-gray-500 mb-2">Jumlah KK</p>
                <p className="text-3xl font-bold text-green-600">2,315</p>
                <p className="text-xs text-gray-400 mt-1">Kepala Keluarga</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <p className="text-sm text-gray-500 mb-2">Kepadatan</p>
                <p className="text-3xl font-bold text-orange-500">683</p>
                <p className="text-xs text-gray-400 mt-1">Jiwa/km²</p>
              </div>
            </div>
            
            <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3">Komposisi Usia</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">0-17 tahun</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-[#044BB1] h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">28%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">18-60 tahun</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">62%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">&gt;60 tahun</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500">
              Data per Oktober 2025 | Sumber: Kelurahan Sriharjo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
