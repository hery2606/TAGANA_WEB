// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { dusunData, Dusun } from "../data/datadususn";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix default marker icon
// if (typeof window !== "undefined") {
//   delete (L.Icon.Default.prototype as any)._getIconUrl;
//   L.Icon.Default.mergeOptions({
//     iconRetinaUrl: "/marker-icon-2x.png",
//     iconUrl: "/marker-icon.png",
//     shadowUrl: "/marker-shadow.png",
//   });
// }

// export default function DetailDusun() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const dusunId = searchParams.get("id");
//   const [dusun, setDusun] = useState<Dusun | null>(null);
//   const [mapReady, setMapReady] = useState(false);

//   useEffect(() => {
//     if (dusunId) {
//       const foundDusun = dusunData.find((d) => d.id === parseInt(dusunId));
//       setDusun(foundDusun || null);
//     }
//     setMapReady(true);
//   }, [dusunId]);

//   if (!dusun) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#044BB1] mx-auto mb-4"></div>
//           <p className="text-gray-600 font-semibold">Memuat Data Dusun...</p>
//         </div>
//       </div>
//     );
//   }

//   const riskColors = {
//     low: {
//       bg: "bg-green-50",
//       border: "border-green-500",
//       text: "text-green-700",
//       badge: "bg-green-500",
//     },
//     medium: {
//       bg: "bg-yellow-50",
//       border: "border-yellow-500",
//       text: "text-yellow-700",
//       badge: "bg-yellow-500",
//     },
//     high: {
//       bg: "bg-red-50",
//       border: "border-red-500",
//       text: "text-red-700",
//       badge: "bg-red-500",
//     },
//   };

//   const risk = riskColors[dusun.riskLevel as keyof typeof riskColors];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#044BB1] to-[#0566d6] text-white shadow-lg">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <button
//             onClick={() => router.push("/")}
//             className="flex items-center space-x-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg px-4 py-2 mb-4 transition-all duration-200"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//             </svg>
//             <span className="font-semibold">Kembali ke Beranda</span>
//           </button>
//           <div className="flex items-center space-x-4">
//             <div className="bg-white bg-opacity-20 rounded-lg p-3">
//               <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//             </div>
//             <div>
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{dusun.name}</h1>
//               <p className="text-blue-100 text-sm sm:text-base lg:text-lg">Detail Informasi Lengkap Dusun</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Info Cards */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Risk Level Card */}
//             <div className={`${risk.bg} rounded-xl p-6 border-l-4 ${risk.border} shadow-lg`}>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600 font-medium mb-1">Status Risiko Bencana</p>
//                   <div className="flex items-center space-x-2">
//                     <div className={`${risk.badge} w-3 h-3 rounded-full animate-pulse`}></div>
//                     <span className={`${risk.text} font-bold text-2xl capitalize`}>
//                       {dusun.riskLevel === "low" ? "Rendah" : dusun.riskLevel === "medium" ? "Sedang" : "Tinggi"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm text-gray-600 font-medium mb-1">Total Penduduk</p>
//                   <p className="text-4xl font-bold text-[#044BB1]">{dusun.population}</p>
//                   <p className="text-xs text-gray-500">jiwa</p>
//                 </div>
//               </div>
//             </div>

//             {/* Description Card */}
//             <div className="bg-white rounded-xl p-6 shadow-lg">
//               <h3 className="font-bold text-gray-800 mb-3 flex items-center text-lg">
//                 <svg className="w-6 h-6 mr-2 text-[#044BB1]" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                 </svg>
//                 Deskripsi
//               </h3>
//               <p className="text-gray-700 leading-relaxed">{dusun.description}</p>
//             </div>

//             {/* Demographic Data Card */}
//             <div className="bg-white rounded-xl p-6 shadow-lg">
//               <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
//                 <svg className="w-6 h-6 mr-2 text-[#044BB1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//                 Data Demografi (DAFTAR RUTA IKS 2025)
//               </h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <StatCard label="Jumlah KK" value={dusun.jumlahKK} icon="🏠" />
//                 <StatCard label="Laki-laki" value={dusun.jumlahLakiLaki} icon="👨" />
//                 <StatCard label="Perempuan" value={dusun.jumlahPerempuan} icon="👩" />
//                 <StatCard label="Balita" value={dusun.jumlahBalita} icon="👶" />
//                 <StatCard label="Lansia" value={dusun.jumlahLansia} icon="👴" />
//                 <StatCard label="Ibu Hamil" value={dusun.jumlahIbuHamil} icon="🤰" />
//                 <StatCard label="Disabilitas" value={dusun.jumlahPenyandangDisabilitas} icon="♿" />
//                 <StatCard label="Penduduk Miskin" value={dusun.jumlahPendudukMiskin} icon="💰" />
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Map and Location */}
//           <div className="space-y-6">
//             {/* Coordinates Card */}
//             <div className="bg-white rounded-xl p-6 shadow-lg">
//               <h3 className="font-bold text-gray-800 mb-4 flex items-center">
//                 <svg className="w-5 h-5 mr-2 text-[#044BB1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                 </svg>
//                 Koordinat Lokasi
//               </h3>
//               <div className="space-y-3">
//                 <div className="bg-blue-50 rounded-lg p-3">
//                   <p className="text-xs text-gray-500 mb-1">Latitude</p>
//                   <p className="font-mono font-semibold text-[#044BB1] text-lg">{dusun.position[0].toFixed(6)}</p>
//                 </div>
//                 <div className="bg-blue-50 rounded-lg p-3">
//                   <p className="text-xs text-gray-500 mb-1">Longitude</p>
//                   <p className="font-mono font-semibold text-[#044BB1] text-lg">{dusun.position[1].toFixed(6)}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Map Card */}
//             {mapReady && (
//               <div className="bg-white rounded-xl p-4 shadow-lg">
//                 <h3 className="font-bold text-gray-800 mb-3 flex items-center">
//                   <svg className="w-5 h-5 mr-2 text-[#044BB1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                   </svg>
//                   Lokasi di Peta
//                 </h3>
//                 <div className="h-64 rounded-lg overflow-hidden">
//                   <MapContainer center={dusun.position} zoom={15} className="w-full h-full">
//                     <TileLayer
//                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />
//                     <Marker position={dusun.position}>
//                       <Popup>{dusun.name}</Popup>
//                     </Marker>
//                   </MapContainer>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
//   return (
//     <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
//       <div className="text-2xl mb-1">{icon}</div>
//       <p className="text-xs text-gray-500 mb-1">{label}</p>
//       <p className="text-2xl font-bold text-[#044BB1]">{value}</p>
//     </div>
//   );
// }
