"use client";

import { useState, useMemo } from "react";
import { beritaBencanaData, BeritaBencana } from "@/data/beritaBencana";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BeritaBencanaPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(true);
  const [dateFilter, setDateFilter] = useState<{
    start: string;
    end: string;
  }>({
    start: "",
    end: "",
  });

  const categories = ["Semua", "Banjir", "Longsor", "Gempa", "Angin Puting Beliung", "Kebakaran", "Lainnya"];
  const statuses = ["Semua", "Terjadi", "Ditangani", "Selesai"];

  // Filter berita
  const filteredBerita = useMemo(() => {
    return beritaBencanaData.filter((berita) => {
      const matchCategory = selectedCategory === "Semua" || berita.category === selectedCategory;
      const matchStatus = selectedStatus === "Semua" || berita.status === selectedStatus;
      const matchSearch = berita.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         berita.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         berita.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchDate = true;
      if (dateFilter.start && dateFilter.end) {
        const beritaDate = new Date(berita.date);
        const startDate = new Date(dateFilter.start);
        const endDate = new Date(dateFilter.end);
        matchDate = beritaDate >= startDate && beritaDate <= endDate;
      }

      return matchCategory && matchStatus && matchSearch && matchDate;
    });
  }, [selectedCategory, selectedStatus, searchQuery, dateFilter]);

  const getCategoryColor = (category: string) => {
    const colors = {
      "Banjir": "bg-blue-100 text-blue-700 border-blue-300",
      "Longsor": "bg-amber-100 text-amber-700 border-amber-300",
      "Gempa": "bg-red-100 text-red-700 border-red-300",
      "Angin Puting Beliung": "bg-purple-100 text-purple-700 border-purple-300",
      "Kebakaran": "bg-orange-100 text-orange-700 border-orange-300",
      "Lainnya": "bg-gray-100 text-gray-700 border-gray-300",
    };
    return colors[category as keyof typeof colors] || colors.Lainnya;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Terjadi": "bg-red-500",
      "Ditangani": "bg-yellow-500",
      "Selesai": "bg-green-500",
    };
    return colors[status as keyof typeof colors] || colors.Terjadi;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-200 ">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#044BB1] to-[#0566d6] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Berita Bencana</h1>
              <p className="text-blue-100">Informasi terkini tentang bencana di Desa Sriharjo</p>
            </div>
            <button
              onClick={() => router.push('/home')}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Kembali</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="mb-8">
          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center space-x-2 border border-gray-200"
          >
            <svg className="w-5 h-5 text-[#044BB1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="font-medium">Filter</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${showFilter ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Filter Panel - Collapsible */}
          {showFilter && (
            <div className="bg-white rounded-xl shadow-lg p-6 mt-4 animate-fadeIn">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-[#044BB1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter Berita
              </h2>

              {/* Search Bar */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Cari Berita</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari berdasarkan judul, lokasi, atau deskripsi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#044BB1] focus:border-transparent"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Bencana</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#044BB1] focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#044BB1] focus:border-transparent"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={dateFilter.start}
                    onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#044BB1] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Akhir</label>
                  <input
                    type="date"
                    value={dateFilter.end}
                    onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#044BB1] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Reset Filter Button */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    setSelectedCategory("Semua");
                    setSelectedStatus("Semua");
                    setSearchQuery("");
                    setDateFilter({ start: "", end: "" });
                  }}
                  className="text-[#044BB1] hover:text-[#033a8c] font-medium flex items-center space-x-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Reset Filter</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan <span className="font-bold text-[#044BB1]">{filteredBerita.length}</span> berita
          </p>
        </div>

        {/* News Grid */}
        {filteredBerita.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak Ada Berita Ditemukan</h3>
            <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian Anda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBerita.map((berita) => (
              <div
                key={berita.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <div className={`${getStatusColor(berita.status)} px-3 py-1 rounded-full flex items-center space-x-1`}>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-semibold">{berita.status}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(berita.category)}`}>
                      {berita.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-[#044BB1] transition-colors">
                    {berita.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {berita.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{berita.location}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(berita.date)} • {berita.time} WIB</span>
                    </div>
                  </div>

                  {/* Casualties & Damage Info */}
                  {(berita.casualties || berita.damage) && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-1">
                      {berita.casualties && Object.keys(berita.casualties).length > 0 && (
                        <div className="flex items-start text-xs">
                          <svg className="w-4 h-4 mr-2 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <div>
                            {berita.casualties.meninggal && <span className="block text-red-700 font-semibold">Meninggal: {berita.casualties.meninggal}</span>}
                            {berita.casualties.lukaBerat && <span className="block text-orange-700 font-semibold">Luka Berat: {berita.casualties.lukaBerat}</span>}
                            {berita.casualties.lukaRingan && <span className="block text-yellow-700 font-semibold">Luka Ringan: {berita.casualties.lukaRingan}</span>}
                          </div>
                        </div>
                      )}
                      {berita.damage?.rumah && (
                        <div className="flex items-center text-xs text-gray-700">
                          <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span>Rumah Rusak: {berita.damage.rumah} unit</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Read More Button */}
                  <button
                    onClick={() => router.push(`/BeritaBencana/${berita.id}`)}
                    className="w-full bg-[#044BB1] hover:bg-[#033a8c] text-white py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Baca Selengkapnya</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
