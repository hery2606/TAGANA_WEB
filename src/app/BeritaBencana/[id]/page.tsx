"use client";

import { useParams, useRouter } from "next/navigation";
import { beritaBencanaData } from "@/data/beritaBencana";
import { use } from "react";

export default function DetailBeritaPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  
  const berita = beritaBencanaData.find((b) => b.id === id);

  if (!berita) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Berita Tidak Ditemukan</h1>
          <button
            onClick={() => router.push("/BeritaBencana")}
            className="bg-[#044BB1] text-white px-6 py-2 rounded-lg"
          >
            Kembali ke Berita Bencana
          </button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "Banjir": "bg-blue-100 text-blue-700 border-blue-300",
      "Longsor": "bg-amber-100 text-amber-700 border-amber-300",
      "Gempa": "bg-red-100 text-red-700 border-red-300",
      "Angin Puting Beliung": "bg-purple-100 text-purple-700 border-purple-300",
      "Kebakaran": "bg-orange-100 text-orange-700 border-orange-300",
      "Lainnya": "bg-gray-100 text-gray-700 border-gray-300",
    };
    return colors[category as keyof typeof colors];
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#044BB1] to-[#0566d6] text-white py-6">
        <div className="container mx-auto px-4">
          <button
            onClick={() => router.push("/BeritaBencana")}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Kembali</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Image Placeholder */}
            <div className="relative h-96 bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-32 h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <div className="p-8">
              {/* Category and Status */}
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getCategoryColor(berita.category)}`}>
                  {berita.category}
                </span>
                <span className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${
                  berita.status === "Terjadi" ? "bg-red-500" :
                  berita.status === "Ditangani" ? "bg-yellow-500" : "bg-green-500"
                }`}>
                  {berita.status}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {berita.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(berita.date)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{berita.time} WIB</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>{berita.location}</span>
                </div>
              </div>

              {/* Casualties & Damage */}
              {(berita.casualties || berita.damage) && (
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {berita.casualties && Object.keys(berita.casualties).length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-bold text-red-800 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Korban Jiwa
                      </h3>
                      <div className="space-y-2">
                        {berita.casualties.meninggal && (
                          <div className="flex justify-between text-red-900">
                            <span>Meninggal Dunia:</span>
                            <span className="font-bold">{berita.casualties.meninggal} orang</span>
                          </div>
                        )}
                        {berita.casualties.lukaBerat && (
                          <div className="flex justify-between text-red-800">
                            <span>Luka Berat:</span>
                            <span className="font-bold">{berita.casualties.lukaBerat} orang</span>
                          </div>
                        )}
                        {berita.casualties.lukaRingan && (
                          <div className="flex justify-between text-red-700">
                            <span>Luka Ringan:</span>
                            <span className="font-bold">{berita.casualties.lukaRingan} orang</span>
                          </div>
                        )}
                        {berita.casualties.hilang && (
                          <div className="flex justify-between text-red-900">
                            <span>Hilang:</span>
                            <span className="font-bold">{berita.casualties.hilang} orang</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {berita.damage && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h3 className="font-bold text-orange-800 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Kerusakan
                      </h3>
                      <div className="space-y-2 text-orange-900">
                        {berita.damage.rumah && (
                          <div className="flex justify-between">
                            <span>Rumah Rusak:</span>
                            <span className="font-bold">{berita.damage.rumah} unit</span>
                          </div>
                        )}
                        {berita.damage.fasilitas && berita.damage.fasilitas.length > 0 && (
                          <div>
                            <span className="block mb-1">Fasilitas Umum:</span>
                            <ul className="list-disc list-inside text-sm">
                              {berita.damage.fasilitas.map((f, i) => (
                                <li key={i}>{f}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="prose max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {berita.content}
                </div>
              </div>

              {/* Author */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Oleh: <span className="font-semibold">{berita.author}</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
