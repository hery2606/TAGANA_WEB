"use client";

import { useEffect } from "react";
import { dusunData } from "../data/datadususn";

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

  // Calculate totals from dusunData
  const totalPopulation = dusunData.reduce((sum, dusun) => sum + dusun.population, 0);
  const totalKK = dusunData.reduce((sum, dusun) => sum + dusun.jumlahKK, 0);
  const totalLakiLaki = dusunData.reduce((sum, dusun) => sum + dusun.jumlahLakiLaki, 0);
  const totalPerempuan = dusunData.reduce((sum, dusun) => sum + dusun.jumlahPerempuan, 0);
  const totalBalita = dusunData.reduce((sum, dusun) => sum + dusun.jumlahBalita, 0);
  const totalLansia = dusunData.reduce((sum, dusun) => sum + dusun.jumlahLansia, 0);
  const totalIbuHamil = dusunData.reduce((sum, dusun) => sum + dusun.jumlahIbuHamil, 0);
  const totalDisabilitas = dusunData.reduce((sum, dusun) => sum + dusun.jumlahPenyandangDisabilitas, 0);
  const totalMiskin = dusunData.reduce((sum, dusun) => sum + dusun.jumlahPendudukMiskin, 0);

  // Calculate kepadatan (assuming luas wilayah 12.5 km²)
  const luasWilayah = 12.5;
  const kepadatan = Math.round(totalPopulation / luasWilayah);

  // Calculate age composition percentages
  const totalDewasa = totalPopulation - totalBalita - totalLansia;
  const persentaseBalita = Math.round((totalBalita / totalPopulation) * 100);
  const persentaseDewasa = Math.round((totalDewasa / totalPopulation) * 100);
  const persentaseLansia = Math.round((totalLansia / totalPopulation) * 100);

  // Count risk levels
  const zonaAman = dusunData.filter(d => d.riskLevel === "low").length;
  const zonaWaspada = dusunData.filter(d => d.riskLevel === "medium").length;
  const zonaBahaya = dusunData.filter(d => d.riskLevel === "high").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/15 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-[#044BB1] to-[#0566d6] text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-2xl font-bold">Informasi Desa Sriharjo</h2>
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
              <h3 className="text-xl font-bold text-[#044BB1]">Tentang Desa</h3>
            </div>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                <span className="font-semibold">Sriharjo</span> adalah sebuah desa yang terletak di Kecamatan Imogiri, 
                Kabupaten Bantul, Daerah Istimewa Yogyakarta. Desa ini terdiri dari <span className="font-semibold">{dusunData.length} dusun</span> dengan 
                karakteristik geografis yang beragam, dari dataran rendah hingga perbukitan.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-sm text-gray-500">Luas Wilayah</p>
                  <p className="text-lg font-bold text-[#044BB1]">{luasWilayah} km²</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-sm text-gray-500">Jumlah Dusun</p>
                  <p className="text-lg font-bold text-[#044BB1]">{dusunData.length}</p>
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
              <h3 className="text-xl font-bold text-orange-600">Potensi Bencana & Sebaran Zona</h3>
            </div>
            <div className="space-y-3">
              {/* Zona Risk Summary */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-3">Sebaran Zona Risiko</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 rounded-lg p-3 border-2 border-green-500 text-center">
                    <p className="text-2xl font-bold text-green-600">{zonaAman}</p>
                    <p className="text-xs text-gray-600">Dusun Zona Aman</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3 border-2 border-yellow-500 text-center">
                    <p className="text-2xl font-bold text-yellow-600">{zonaWaspada}</p>
                    <p className="text-xs text-gray-600">Dusun Zona Waspada</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3 border-2 border-red-500 text-center">
                    <p className="text-2xl font-bold text-red-600">{zonaBahaya}</p>
                    <p className="text-xs text-gray-600">Dusun Zona Bahaya</p>
                  </div>
                </div>
              </div>

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
              <h3 className="text-xl font-bold text-green-600">Demografi Penduduk (IKS 2025)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <p className="text-sm text-gray-500 mb-2">Total Penduduk</p>
                <p className="text-3xl font-bold text-[#044BB1]">{totalPopulation.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1">Jiwa</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <p className="text-sm text-gray-500 mb-2">Jumlah KK</p>
                <p className="text-3xl font-bold text-green-600">{totalKK.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1">Kepala Keluarga</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <p className="text-sm text-gray-500 mb-2">Kepadatan</p>
                <p className="text-3xl font-bold text-orange-500">{kepadatan}</p>
                <p className="text-xs text-gray-400 mt-1">Jiwa/km²</p>
              </div>
            </div>
            
            {/* Detailed Demographics */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-3">Komposisi Gender</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Laki-laki</span>
                    <span className="text-lg font-bold text-blue-600">{totalLakiLaki.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Perempuan</span>
                    <span className="text-lg font-bold text-pink-600">{totalPerempuan.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-3">Kelompok Rentan</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Balita (0-5 tahun)</span>
                    <span className="font-semibold text-gray-600">{totalBalita}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lansia (&gt;60 tahun)</span>
                    <span className="font-semibold text-gray-600">{totalLansia}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ibu Hamil</span>
                    <span className="font-semibold text-gray-600">{totalIbuHamil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Penyandang Disabilitas</span>
                    <span className="font-semibold text-gray-600">{totalDisabilitas}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600 font-medium">Penduduk Miskin</span>
                    <span className="font-bold text-orange-600">{totalMiskin}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3">Komposisi Usia</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Balita (0-5 tahun)</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-[#044BB1] h-2 rounded-full" style={{ width: `${persentaseBalita}%` }}></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-12 text-right">{persentaseBalita}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Dewasa (6-60 tahun)</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${persentaseDewasa}%` }}></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-12 text-right">{persentaseDewasa}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Lansia (&gt;60 tahun)</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${persentaseLansia}%` }}></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-12 text-right">{persentaseLansia}%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500">
              Data per IKS 2025 | Sumber: DAFTAR RUTA IKS 2025 Desa Sriharjo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
