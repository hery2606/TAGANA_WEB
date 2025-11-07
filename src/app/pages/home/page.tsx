"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNavigateToPeta = () => {
    router.push("/pages/peta");
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/disaster-sriharjo.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full">
          {/* Main Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <span className="inline-block bg-[#044BB1] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                TAGANA SRIHARJO
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                Selamat Datang di Desa Sriharjo
              </h1>
              <p className="text-gray-600">
                Kec. Imogiri, Kab. Bantul, D.I. Yogyakarta
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-center mb-8 leading-relaxed">
              Desa Sriharjo merupakan salah satu desa di Kecamatan Imogiri yang memiliki potensi wisata alam indah 
              namun juga rawan terhadap bencana alam. TAGANA Sriharjo siap membantu masyarakat dalam menghadapi 
              dan menanggulangi bencana.
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <div className="text-2xl mb-2">🏘️</div>
                <h3 className="font-semibold text-[#044BB1] text-sm">Lokasi</h3>
                <p className="text-xs text-gray-600 mt-1">Imogiri, Bantul</p>
              </div>

              <div className="bg-green-50 p-4 rounded-xl text-center">
                <div className="text-2xl mb-2">👥</div>
                <h3 className="font-semibold text-[#044BB1] text-sm">TAGANA</h3>
                <p className="text-xs text-gray-600 mt-1">Tim Siaga Bencana</p>
              </div>

              <div className="bg-red-50 p-4 rounded-xl text-center">
                <div className="text-2xl mb-2">🚨</div>
                <h3 className="font-semibold text-[#044BB1] text-sm">Siaga 24/7</h3>
                <p className="text-xs text-gray-600 mt-1">Monitoring Bencana</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleNavigateToPeta}
                className="flex-1 bg-[#044BB1] hover:bg-[#033a8c] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>🗺️</span>
                <span>Lihat Peta Bencana</span>
              </button>

              <button
                onClick={() => router.push("/pages/contact")}
                className="flex-1 bg-white border-2 border-[#044BB1] text-[#044BB1] hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>📞</span>
                <span>Hubungi Kami</span>
              </button>
            </div>

            {/* Emergency Contact */}
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-gray-600 mb-1">Darurat? Hubungi:</p>
              <a 
                href="tel:112" 
                className="text-xl font-bold text-red-600 hover:text-red-700"
              >
                📱 112
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
