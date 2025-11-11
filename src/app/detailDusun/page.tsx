"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { dusunData, rtDataByDusun, getRTDataForDusun } from "@/data/datadususn";
import { getDusunImageById, getDusunAltText } from "@/data/image";
import dynamic from "next/dynamic";
import Image from "next/image";
import { BackButton } from "@/components/ui/back-button";

// Dynamic import untuk Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Fix default marker icon
if (typeof window !== "undefined") {
  const L = require("leaflet");
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/marker-icon-2x.png",
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
  });
}

function DetailDusunContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dusunId = searchParams.get("id");
  const [dusun, setDusun] = useState<any>(null);
  const [mapReady, setMapReady] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (dusunId) {
      const foundDusun = dusunData.find((d) => d.id === parseInt(dusunId));
      setDusun(foundDusun || null);
    }
    setMapReady(true);
  }, [dusunId]);

  if (!dusun) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#044BB1] mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Memuat Data Dusun...</p>
        </div>
      </div>
    );
  }

  const riskColors = {
    low: {
      bg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-700",
      badge: "bg-green-500",
    },
    medium: {
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      text: "text-yellow-700",
      badge: "bg-yellow-500",
    },
    high: {
      bg: "bg-red-100",
      border: "border-red-500",
      text: "text-red-700",
      badge: "bg-red-500",
    },
  };

  const risk = riskColors[dusun.riskLevel as keyof typeof riskColors];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-[#044BB1] to-[#0566d6] text-white shadow-lg relative overflow-hidden">
        {/* Geometric Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-0 w-48 h-48 bg-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-white transform rotate-45"></div>
          <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-white rounded-full"></div>
        </div>
        
        {/* Animated Dots Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
        {[...Array(48)].map((_, i) => (
          <div key={i} className="bg-white rounded-full w-2 h-2 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
        ))}
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BackButton href="/" label="Kembali ke Beranda" />
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-30 rounded-lg p-3 ">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="blue" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{dusun.name}</h1>
              <p className="text-blue-100 text-sm sm:text-base lg:text-lg">Detail Informasi Lengkap Dusun</p>
            </div>
          </div>
        </div>
      </div>

      {/* Village Photo Hero Section */}
      <div className="relative bg-white shadow-md overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Photo Container */}
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-8">
            <Image 
              src={imageError ? "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80" : getDusunImageById(dusun.id)}
              alt={getDusunAltText(dusun.id)}
              width={1200}
              height={800}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              onError={() => {
                console.error(`Image failed to load for ${dusun.name} (ID: ${dusun.id})`);
                setImageError(true);
              }}
              onLoad={() => {
                console.log(`Image loaded successfully for ${dusun.name}`);
              }}
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-3">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold drop-shadow-lg">
                {dusun.name}
              </h2>
              </div>
              <p className="text-white/90 text-sm sm:text-base max-w-2xl drop-shadow-md">
              Dusun dengan populasi {dusun.population} jiwa
              </p>
            </div>
            </div>

          {/* Description Card */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-100 via-white to-blue-100 rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-100 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300/20 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-[#044BB1] to-[#0566d6] rounded-xl p-3 flex-shrink-0 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-xl sm:text-2xl mb-3 flex items-center">
                      Tentang Dusun
                      <span className="ml-2 inline-block w-12 h-1 bg-gradient-to-r from-[#044BB1] to-transparent rounded-full"></span>
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                      {dusun.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Level Card */}
            <div className={`${risk.bg} rounded-2xl p-6 sm:p-8 border-l-4 ${risk.border} shadow-xl hover:shadow-2xl transition-shadow duration-300`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-sm text-gray-600 font-semibold">Status Risiko Bencana</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`${risk.badge} w-4 h-4 rounded-full animate-pulse shadow-lg`}></div>
                    <span className={`${risk.text} font-bold text-2xl sm:text-3xl capitalize`}>
                      {dusun.riskLevel === "low" ? "Rendah" : dusun.riskLevel === "medium" ? "Sedang" : "Tinggi"}
                    </span>
                  </div>
                </div>
                <div className="text-center sm:text-right  rounded-xl p-4 sm:p-6 shadow-lg">
                  <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-2">Total Penduduk</p>
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#044BB1]">{dusun.population}</p>
                  <p className="text-sm text-gray-500 font-medium">jiwa</p>
                </div>
              </div>
            </div>

            {/* Demographic Data Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center text-lg sm:text-xl">
              <div className="bg-gradient-to-br from-[#044BB1] to-[#0566d6] rounded-lg p-2 mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              </div>
              <span className="flex-1">
              Data Demografi
              <span className="block text-sm font-normal text-gray-500 mt-1">(DAFTAR RUTA IKS 2025)</span>
              </span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <StatCard 
              label="Jumlah KK" 
              value={dusun.jumlahKK}
              bgIcon={<svg className="absolute right-2 bottom-2 w-16 h-16 text-blue-100 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>}
              />
              <StatCard 
              label="Laki-laki" 
              value={dusun.jumlahLakiLaki}
              bgIcon={<svg className="absolute right-2 bottom-2 w-16 h-16 text-blue-100 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>}
              />
              <StatCard 
              label="Perempuan" 
              value={dusun.jumlahPerempuan}
              bgIcon={<svg className="absolute right-2 bottom-2 w-16 h-16 text-pink-100 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>}
              />
              <StatCard 
              label="Balita" 
              value={dusun.jumlahBalita}
              bgIcon={<svg className="absolute right-2 bottom-2 w-16 h-16 text-green-100 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" /></svg>}
              />
              <StatCard 
              label="Lansia" 
              value={dusun.jumlahLansia}
              bgIcon={<svg className="absolute right-2 bottom-2 w-16 h-16 text-purple-100 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>}
              />
              <StatCard 
              label="Ibu Hamil" 
              value={dusun.jumlahIbuHamil}
              bgIcon={<svg className="absolute right-2 bottom-2 w-16 h-16 text-red-100 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>}
              />
              <StatCard 
              label="Disabilitas" 
              value={dusun.jumlahPenyandangDisabilitas}
              bgIcon={<svg className="absolute right-2 bottom-2 w-16 h-16 text-orange-100 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 009 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" /></svg>}
              />
              <StatCard 
              label="Penduduk Miskin" 
              value={dusun.jumlahPendudukMiskin}
              bgIcon={<svg className="absolute right-2 bottom-2 w-16 h-16 text-yellow-100 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" /></svg>}
              />
              </div>
            </div>
          </div>

          


          {/* Right Column - Map and Location */}
          <div className="space-y-6">
            {/* Coordinates Card */}
            <div className="bg-white rounded-2xl p-4 shadow-xl">
              <h3 className="font-bold text-gray-800 mb-5 flex items-center text-base sm:text-lg">
                <div className="bg-gradient-to-br from-[#044BB1] to-[#0566d6] rounded-lg p-2 mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                Koordinat Lokasi
              </h3>
              <div className="space-y-2">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-1 border border-blue-200 shadow-sm">
                  <p className="text-xs text-gray-600 mb-1 ml-1.5 font-semibold uppercase tracking-wide">Latitude</p>
                  <p className="font-mono ml-1.5 font-bold text-[#044BB1] text-lg break-all">{dusun.position[0].toFixed(7)}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-1 border border-blue-200 shadow-sm">
                  <p className="text-xs text-gray-600 mb-1 ml-1.5 font-semibold uppercase tracking-wide">Longitude</p>
                  <p className="font-mono ml-1.5 font-bold text-[#044BB1] text-lg break-all">{dusun.position[1].toFixed(7)}</p>
                </div>
              </div>
            </div>

            {/* Map Card */}
            {mapReady && (
              <div className="bg-white rounded-2xl p-5 shadow-xl">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center text-base sm:text-lg">
                <div className="bg-gradient-to-br from-[#044BB1] to-[#0566d6] rounded-lg p-2 mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Tampilan Satelit
              </h3>
              <div className="h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden border-2 border-gray-200 shadow-inner relative z-0">
                <MapContainer center={dusun.position} zoom={15} className="w-full h-full" scrollWheelZoom={false} zoomControl={true}>
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  maxZoom={18}
                />
                <Marker position={dusun.position}>
                  <Popup>
                  <div className="text-center p-2">
                    <p className="font-bold text-[#044BB1] text-lg">{dusun.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{dusun.population} jiwa</p>
                  </div>
                  </Popup>
                </Marker>
                </MapContainer>
              </div>
              </div>
            )}
          </div>
        </div>
             
            {/* Daftar RT */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center text-lg sm:text-xl">
              <div className="bg-gradient-to-br from-[#044BB1] to-[#0566d6] rounded-lg p-2 mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="flex-1">
                Daftar Rukun Tetangga (RT)
                <span className="block text-sm font-normal text-gray-500 mt-1">Informasi RT di {dusun.name}</span>
              </span> 
              </h3>
              
              {dusun.rtData && dusun.rtData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dusun.rtData.map((rt: any, index: number) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                  <div className="bg-gradient-to-br from-[#044BB1] to-[#0566d6] rounded-lg p-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span className="bg-blue-100 text-[#044BB1] text-xs font-bold px-3 py-1 rounded-full">
                    RT {rt.rt}
                  </span>
                  </div>
                  
                  <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Ketua RT</p>
                    <p className="text-base font-bold text-gray-800 truncate">{rt.nama || "Belum ada data"}</p>
                  </div>
                  
                  {rt.lp && (
                    <div className="pt-2 border-t border-blue-100">
                      <p className="text-xs text-gray-500">Jenis Kelamin</p>
                      <p className="text-sm font-semibold text-[#044BB1]">{rt.lp === "L" ? "Laki-laki" : "Perempuan"}</p>
                    </div>
                  )}
                  </div>
                </div>
                ))}
              </div>
              ) : (
              <div className="text-center py-8">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                </div>
                <p className="text-gray-500 font-medium">Data RT belum tersedia</p>
              </div>
              )}
            </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, bgIcon }: { label: string; value: number; bgIcon: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-4 sm:p-5 border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all hover:scale-105 duration-300 cursor-pointer relative overflow-hidden">
      {/* Background Icon */}
      {bgIcon}
      
      {/* Content */}
      <div className="relative z-10">
        <p className="text-xs text-gray-600 mb-2 font-semibold uppercase tracking-wide">{label}</p>
        <p className="text-2xl sm:text-3xl font-bold text-[#044BB1]">{value}</p>
      </div>
    </div>
  );
}

export default function DetailDusunPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#044BB1] mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Memuat Data Dusun...</p>
        </div>
      </div>
    }>
      <DetailDusunContent />
    </Suspense>
  );
}
