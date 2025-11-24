export interface BeritaBencana {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: "Banjir" | "Longsor" | "Gempa" | "Angin Puting Beliung" | "Kebakaran" | "Lainnya";
  location: string;
  date: string;
  time: string;
  casualties?: {
    meninggal?: number;
    lukaRingan?: number;
    lukaBerat?: number;
    hilang?: number;
  };
  damage?: {
    rumah?: number;
    fasilitas?: string[];
  };
  status: "Terjadi" | "Ditangani" | "Selesai";
  author: string;
}

export const beritaBencanaData: BeritaBencana[] = [
  {
    id: 1,
    title: "Banjir Melanda Dusun Sanggrahan Akibat Hujan Deras",
    description: "Banjir setinggi 1 meter merendam puluhan rumah warga di Dusun Sanggrahan",
    content: `Banjir melanda Dusun Sanggrahan, Desa Sriharjo pada Selasa (15/01/2025) pukul 14.00 WIB akibat hujan deras yang mengguyur wilayah tersebut sejak dini hari. Ketinggian air mencapai 1 meter dan merendam sekitar 45 rumah warga.

Tim TAGANA Sriharjo langsung turun ke lokasi untuk melakukan evakuasi warga yang terdampak. Sebanyak 120 jiwa telah dievakuasi ke posko pengungsian di Balai Desa Sriharjo.

Kepala Desa Sriharjo, Bapak Suryanto menyatakan bahwa bantuan logistik berupa makanan siap saji, air bersih, dan selimut telah disalurkan kepada para pengungsi. Tim medis juga standby untuk memberikan pelayanan kesehatan.

Warga diimbau untuk tetap waspada karena intensitas hujan masih tinggi dan kondisi air di sungai masih dalam level siaga.`,
    image: "/images/banjir-sanggrahan.jpg",
    category: "Banjir",
    location: "Dusun Sanggrahan",
    date: "2025-01-15",
    time: "14:00",
    casualties: {
      lukaRingan: 5,
    },
    damage: {
      rumah: 45,
      fasilitas: ["Jalan utama dusun", "Jembatan penghubung"],
    },
    status: "Ditangani",
    author: "Tim TAGANA Sriharjo",
  },
  {
    id: 2,
    title: "Tanah Longsor di Dusun Jetis Timur",
    description: "Material longsor menimbun 2 rumah warga di lereng Gunung Merapi",
    content: `Tanah longsor terjadi di Dusun Jetis Timur pada Senin (14/01/2025) pukul 03.30 WIB. Material longsor berupa tanah dan bebatuan menimbun 2 unit rumah warga di kaki lereng.

Beruntung tidak ada korban jiwa dalam kejadian ini karena warga sempat mendengar suara gemuruh dan langsung mengungsi. Tim SAR gabungan langsung melakukan pencarian dan evakuasi.

Material longsor diperkirakan mencapai 500 meter kubik. Akses jalan menuju lokasi sempat terputus dan kini sudah dapat dilalui kendaraan kecil.

BPBD Kabupaten Sleman telah mengirimkan bantuan berupa tenda darurat, makanan, dan kebutuhan pokok untuk para pengungsi. Total 15 KK atau 52 jiwa mengungsi di rumah kerabat dan balai dusun.`,
    image: "/images/longsor-jetis.jpg",
    category: "Longsor",
    location: "Dusun Jetis Timur",
    date: "2025-01-14",
    time: "03:30",
    casualties: {
      lukaRingan: 2,
    },
    damage: {
      rumah: 2,
      fasilitas: ["Jalan dusun sepanjang 50 meter"],
    },
    status: "Ditangani",
    author: "Tim TAGANA Sriharjo",
  },
  {
    id: 3,
    title: "Angin Puting Beliung Rusak Puluhan Rumah",
    description: "Angin kencang merusak atap rumah dan menumbangkan pohon di 3 dusun",
    content: `Angin puting beliung melanda wilayah Desa Sriharjo pada Minggu (13/01/2025) sekitar pukul 16.45 WIB. Kejadian berlangsung selama kurang lebih 10 menit namun menimbulkan kerusakan cukup parah.

Tiga dusun terdampak yaitu Dusun Candi, Dusun Jetis Barat, dan Dusun Plumbungan. Total 38 rumah rusak dengan rincian 12 rumah rusak berat dan 26 rumah rusak ringan.

Beberapa pohon besar tumbang dan menimpa 3 unit rumah warga. Jaringan listrik juga sempat padam akibat tiang listrik roboh. PLN telah memperbaiki dan listrik sudah menyala kembali.

Tim TAGANA bersama BPBD melakukan pendataan kerusakan dan menyalurkan bantuan berupa terpal untuk menutup atap yang rusak. Pemerintah Desa akan mengajukan bantuan perbaikan rumah kepada pemerintah kabupaten.`,
    image: "/images/puting-beliung.jpg",
    category: "Angin Puting Beliung",
    location: "Dusun Candi, Jetis Barat, Plumbungan",
    date: "2025-01-13",
    time: "16:45",
    casualties: {
      lukaRingan: 8,
      lukaBerat: 1,
    },
    damage: {
      rumah: 38,
      fasilitas: ["Tiang listrik (3 unit)", "Mushola (1 unit)", "Pos ronda (2 unit)"],
    },
    status: "Ditangani",
    author: "Tim TAGANA Sriharjo",
  },
  {
    id: 4,
    title: "Gempa 4.5 SR Guncang Sleman, Tidak Ada Kerusakan Berarti",
    description: "Getaran gempa terasa hingga wilayah Sriharjo namun tidak menimbulkan kerusakan",
    content: `Gempa bumi berkekuatan 4.5 SR mengguncang Kabupaten Sleman pada Sabtu (12/01/2025) pukul 08.15 WIB. Pusat gempa berada di kedalaman 10 km di wilayah Cangkringan.

Getaran gempa terasa hingga wilayah Desa Sriharjo. Warga sempat panik dan keluar rumah namun tidak ada kerusakan yang berarti. Beberapa warga melaporkan barang-barang di rak bergoyang.

BMKG menyatakan gempa ini tidak berpotensi tsunami. Masyarakat diminta tetap tenang dan waspada terhadap kemungkinan gempa susulan.

Tim TAGANA Sriharjo melakukan patroli ke seluruh dusun untuk memastikan kondisi warga dan tidak ditemukan kerusakan infrastruktur. Kegiatan masyarakat kembali normal setelah 2 jam pasca gempa.`,
    image: "/images/gempa-sleman.jpg",
    category: "Gempa",
    location: "Seluruh Wilayah Sriharjo",
    date: "2025-01-12",
    time: "08:15",
    casualties: {},
    damage: {
      rumah: 0,
      fasilitas: [],
    },
    status: "Selesai",
    author: "Tim TAGANA Sriharjo",
  },
  {
    id: 5,
    title: "Kebakaran Lahan Kering di Dusun Nambongan",
    description: "Api membakar lahan seluas 2 hektar sebelum berhasil dipadamkan",
    content: `Kebakaran lahan kering terjadi di Dusun Nambongan pada Jumat (11/01/2025) pukul 13.20 WIB. Api dengan cepat membakar lahan kering seluas sekitar 2 hektar.

Warga dan Tim TAGANA langsung melakukan pemadaman dengan peralatan sederhana. Mobil pemadam kebakaran dari Puskesmas juga dikerahkan untuk membantu pemadaman.

Api berhasil dipadamkan setelah 3 jam upaya pemadaman. Tidak ada korban jiwa maupun rumah yang terbakar. Penyebab kebakaran diduga dari pembakaran sampah yang tidak terkontrol.

Kepala Dusun menghimbau warga untuk tidak membakar sampah di area terbuka terutama saat musim kemarau. Patroli akan terus dilakukan untuk mencegah kejadian serupa.`,
    image: "/images/kebakaran-lahan.jpg",
    category: "Kebakaran",
    location: "Dusun Nambongan",
    date: "2025-01-11",
    time: "13:20",
    casualties: {},
    damage: {
      fasilitas: ["Lahan pertanian (2 hektar)"],
    },
    status: "Selesai",
    author: "Tim TAGANA Sriharjo",
  },
  {
    id: 6,
    title: "Simulasi Evakuasi Bencana Banjir di Dusun Sanggrahan",
    description: "TAGANA menggelar simulasi untuk meningkatkan kesiapsiagaan warga",
    content: `Tim TAGANA Sriharjo menggelar simulasi evakuasi bencana banjir di Dusun Sanggrahan pada Kamis (10/01/2025). Kegiatan ini diikuti oleh 150 warga dari berbagai kalangan.

Simulasi meliputi prosedur evakuasi, pertolongan pertama, dan penanganan trauma pasca bencana. Warga juga diajarkan cara membuat tas siaga bencana dan jalur evakuasi terdekat.

"Simulasi ini sangat penting mengingat Dusun Sanggrahan berada di area rawan banjir. Dengan simulasi berkala, diharapkan warga siap menghadapi bencana," ujar Koordinator TAGANA.

Pemerintah Desa berencana menggelar simulasi serupa di dusun-dusun lain untuk meningkatkan kesadaran dan kesiapsiagaan masyarakat terhadap bencana.`,
    image: "/images/simulasi-bencana.jpg",
    category: "Lainnya",
    location: "Dusun Sanggrahan",
    date: "2025-01-10",
    time: "09:00",
    casualties: {},
    damage: {},
    status: "Selesai",
    author: "Tim TAGANA Sriharjo",
  },
];
