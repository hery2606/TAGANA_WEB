// Define the RT data interface
export interface RTData {
  rt: string;
  nama: string | null;
  lp: string | null;
}

// Import disaster interfaces and data
import { DisasterDetail, getDisasterDataForDusun } from './DataBencana';

// Re-export DisasterDetail for convenience
export type { DisasterDetail };

// Define the Dusun interface for type safety
export interface Dusun {
  id: number;
  name: string;
  position: [number, number];
  population: number;
  riskLevel: string;
  description: string;
  jumlahKK: number;
  jumlahLakiLaki: number;
  jumlahPerempuan: number;
  jumlahBalita: number;
  jumlahLansia: number;
  jumlahIbuHamil: number;
  jumlahPenyandangDisabilitas: number;
  jumlahPendudukMiskin: number;
  rtData: RTData[];
  disasters: DisasterDetail[];
}

// RT Data for each dusun
export const rtDataByDusun: { [key: string]: RTData[] } = {
  "Miri": [
    {"rt": "001", "nama": "A. Panyangko", "lp": null},
    {"rt": "002", "nama": "Dwi Setyaninghi", "lp": "P"},
    {"rt": "003", "nama": "M. Ikhwanul", "lp": null},
    {"rt": "004", "nama": "Sanusi", "lp": null},
    {"rt": "005", "nama": "Subaryadi", "lp": null}
  ],
  "Jati": [
    {"rt": "001", "nama": null, "lp": null},
    {"rt": "002", "nama": "Ngadino", "lp": null},
    {"rt": "003", "nama": "Tri (tidak jelas)", "lp": null},
    {"rt": "004", "nama": "Alib Biyono", "lp": null},
    {"rt": "005", "nama": "Sugeng", "lp": null},
    {"rt": "006", "nama": "Widayat", "lp": null},
    {"rt": "007", "nama": "Kuswadi", "lp": "L"}
  ],
  "Mojohuro": [
    {"rt": "001", "nama": "Susilo D. Nugroho", "lp": "L"},
    {"rt": "002", "nama": "Subrata", "lp": null},
    {"rt": "003", "nama": "Sugiman", "lp": null},
    {"rt": "004", "nama": "Parjiono", "lp": null},
    {"rt": "005", "nama": "Miholo", "lp": null},
    {"rt": "006", "nama": "Slamet", "lp": "L"}
  ],
  "Pelemadu": [
    {"rt": "001", "nama": "Trianto", "lp": null},
    {"rt": "002", "nama": "Bagus P.", "lp": null},
    {"rt": "003", "nama": "Sumar Wahdi", "lp": null},
    {"rt": "004", "nama": "Sabari", "lp": null},
    {"rt": "005", "nama": "Miyanto", "lp": null},
    {"rt": "006", "nama": "Sumanto", "lp": "L"}
  ],
  "Sungapan": [
    {"rt": "001", "nama": "Suradi", "lp": "L"},
    {"rt": "002", "nama": "Parjiyono", "lp": null},
    {"rt": "003", "nama": "Joko Purwanto", "lp": null},
    {"rt": "004", "nama": null, "lp": null}
  ],
  "Gondosuli": [
    {"rt": "001", "nama": "Suyarti", "lp": null},
    {"rt": "002", "nama": "Badawi", "lp": null},
    {"rt": "003", "nama": "Anjar Yanto", "lp": null},
    {"rt": "004", "nama": "Dwi Purnomo", "lp": null}
  ],
  "Trukan": [
    {"rt": "001", "nama": "Supriyanto", "lp": null},
    {"rt": "002", "nama": "Ponidi", "lp": null},
    {"rt": "003", "nama": "Maryono", "lp": null},
    {"rt": "004", "nama": "Ardi S.", "lp": null}
  ],
  "Dogongan": [
    {"rt": "001", "nama": "Hen Jas Urdat", "lp": null},
    {"rt": "002", "nama": "Bambang", "lp": null},
    {"rt": "003", "nama": "Suyadi", "lp": null}
  ],
  "Ketos": [
    {"rt": "001", "nama": "Mulyono", "lp": null},
    {"rt": "002", "nama": "Supriyadi", "lp": null},
    {"rt": "003", "nama": "Meyanto", "lp": null},
    {"rt": "004", "nama": "K. Tunianto", "lp": null}
  ],
  "Ngrancah": [
    {"rt": "001", "nama": "Ubani", "lp": null},
    {"rt": "002", "nama": "Pangaji", "lp": null},
    {"rt": "003", "nama": "Arimadi", "lp": null},
    {"rt": "004", "nama": "Hidayat S.", "lp": null}
  ],
  "Pengkol": [
    {"rt": "001", "nama": "Turmadi", "lp": "L"},
    {"rt": "002", "nama": "Sulemi", "lp": null},
    {"rt": "003", "nama": "Sukiyo", "lp": "L"}
  ],
  "Sompok": [
    {"rt": "001", "nama": "Sukipto", "lp": null},
    {"rt": "002", "nama": "Smi Rumi", "lp": null},
    {"rt": "003", "nama": "Parman", "lp": null},
    {"rt": "004", "nama": "Sani Y.", "lp": null},
    {"rt": "005", "nama": "Tukimin", "lp": null},
    {"rt": "006", "nama": "Sanidi", "lp": null}
  ],
  "Wunut": [
    {"rt": "001", "nama": "Musimin", "lp": null},
    {"rt": "002", "nama": "Paryono", "lp": null},
    {"rt": "003", "nama": "Waluyo", "lp": null},
    {"rt": "004", "nama": "Mujirah", "lp": null},
    {"rt": "005", "nama": "Sudari", "lp": "L"},
    {"rt": "006", "nama": "Sobandi", "lp": null},
    {"rt": "007", "nama": "Narimo", "lp": null}
  ]
};



// Helper function to get RT data for a dusun
export const getRTDataForDusun = (dusunName: string): RTData[] => {
  return rtDataByDusun[dusunName] || [];
};

// Main dusun data with integrated RT data and disaster data
export const dusunData: Dusun[] = [
  {
    id: 1,
    name: "Dusun Miri",
    position: [-7.9380459, 110.3718411] as [number, number],
    population: 954,
    riskLevel: "low",
    description: "Dusun Miri adalah bagian dari Desa Sriharjo, yang merupakan gabungan dari tiga kelurahan lama: Mojohuro, Dogongan, dan Kedungmiri. Desa Sriharjo sendiri terkenal dengan keindahan alamnya yang masih asri, suasana pedesaan yang tenang, dan kegiatan pertanian tradisional, serta kaya akan budaya lokal.",
    jumlahKK: 339,
    jumlahLakiLaki: 485,
    jumlahPerempuan: 469,
    jumlahBalita: 25,
    jumlahLansia: 197,
    jumlahIbuHamil: 5,
    jumlahPenyandangDisabilitas: 14,
    jumlahPendudukMiskin: 84,
    rtData: getRTDataForDusun("Miri"),
    disasters: getDisasterDataForDusun("Miri")
  },
  {
    id: 2,
    name: "Dusun Jati",
    position: [-7.9446043, 110.3746045] as [number, number],
    population: 1143,
    riskLevel: "medium",
    description: "Dusun Jati adalah salah satu pedukuhan di Kalurahan Sriharjo, Kecamatan Imogiri, Kabupaten Bantul. Dusun ini berada di wilayah yang subur, dengan ciri khas suasana pedesaan yang tenang, pertanian, dan keramahan penduduk, serta merupakan bagian dari kalurahan yang memiliki sejarah panjang dari penggabungan tiga desa lama. Dusun Jati sendiri terdiri dari 7 RT.",
    jumlahKK: 415,
    jumlahLakiLaki: 564,
    jumlahPerempuan: 579,
    jumlahBalita: 52,
    jumlahLansia: 230,
    jumlahIbuHamil: 8,
    jumlahPenyandangDisabilitas: 18,
    jumlahPendudukMiskin: 123,
    rtData: getRTDataForDusun("Jati"),
    disasters: getDisasterDataForDusun("Jati")
  },
  {
    id: 3,
    name: "Dusun Mojohuro",
    position: [-7.9442949, 110.3728514] as [number, number],
    population: 914,
    riskLevel: "medium",
    description: "Dusun Mojohuro adalah bagian dari Kalurahan Sriharjo, yang terletak di Kecamatan Imogiri, Bantul, Daerah Istimewa Yogyakarta. Wilayah ini memiliki sejarah penting karena menjadi pusat pemerintahan awal Kalurahan Sriharjo setelah penggabungan tiga desa. Mojohuro dikenal sebagai wilayah yang subur dan merupakan salah satu padukuhan di Sriharjo, yang juga menjadi bagian dari desa wisata dan memiliki potensi pertanian yang besar.",
    jumlahKK: 344,
    jumlahLakiLaki: 483,
    jumlahPerempuan: 431,
    jumlahBalita: 45,
    jumlahLansia: 194,
    jumlahIbuHamil: 2,
    jumlahPenyandangDisabilitas: 15,
    jumlahPendudukMiskin: 70,
    rtData: getRTDataForDusun("Mojohuro"),
    disasters: getDisasterDataForDusun("Mojohuro")
  },
  {
    id: 4,
    name: "Dusun Pelemadu",
    position: [-7.9466149, 110.3681175] as [number, number],
    population: 1168,
    riskLevel: "low",
    description: "Dusun Pelemadu di Desa Sriharjo, Imogiri, Bantul, dikenal sebagai sentra produksi peyek dan memiliki destinasi wisata keluarga bernama Lembah Sorory. Peyek yang diproduksi oleh sebagian besar warga dusun ini menjadi sumber penghasilan utama, dengan berbagai variasi seperti peyek kacang, kedelai, kacang hijau, teri, dan udang. Sementara itu, Lembah Sorory adalah tempat wisata alam yang memanfaatkan lahan di pinggir Sungai Opak yang sebelumnya tidak terurus menjadi area dengan suasana sejuk, banyak pohon bambu, dan berbagai wahana permainan.",
    jumlahKK: 443,
    jumlahLakiLaki: 567,
    jumlahPerempuan: 601,
    jumlahBalita: 44,
    jumlahLansia: 241,
    jumlahIbuHamil: 2,
    jumlahPenyandangDisabilitas: 16,
    jumlahPendudukMiskin: 87,
    rtData: getRTDataForDusun("Pelemadu"),
    disasters: getDisasterDataForDusun("Pelemadu")
  },
  {
    id: 5,
    name: "Dusun Sungapan",
    position: [-7.952379, 110.3688622] as [number, number],
    population: 475,
    riskLevel: "medium",
    description: "Dusun Sungapan merupakan salah satu pedukuhan yang terletak di Desa Sriharjo, Kecamatan Imogiri, Kabupaten Bantul, Daerah Istimewa Yogyakarta. Dusun ini dikenal sebagai wilayah yang masyarakatnya menjunjung tinggi nilai gotong royong dan kebersamaan dalam berbagai kegiatan sosial maupun pembangunan lingkungan. Warga Sungapan aktif melaksanakan kerja bakti untuk menjaga kebersihan serta memperindah lingkungan, terutama di sekitar kawasan 'jembatan baru' yang menjadi salah satu potensi wisata lokal.",
    jumlahKK: 179,
    jumlahLakiLaki: 217,
    jumlahPerempuan: 258,
    jumlahBalita: 16,
    jumlahLansia: 82,
    jumlahIbuHamil: 1,
    jumlahPenyandangDisabilitas: 10,
    jumlahPendudukMiskin: 141,
    rtData: getRTDataForDusun("Sungapan"),
    disasters: getDisasterDataForDusun("Sungapan")
  },
  {
    id: 6,
    name: "Dusun Gondosuli",
    position: [-7.9508624, 110.3733306] as [number, number],
    population: 460,
    riskLevel: "high",
    description: "Dusun Gondosuli adalah salah satu pedukuhan di Desa Sriharjo, Kecamatan Imogiri, Kabupaten Bantul, Daerah Istimewa Yogyakarta — tepatnya satu dari 13 dusun yang membentuk desa tersebut. Dusun ini memiliki karakter yang kuat dalam budaya lokal, salah satu buktinya adalah tradisi tahunan 'Mbang Gadhungan' di mana warga mengelilingi kampung sambil bersenandung sebagai ungkapan syukur atas hasil bumi dan ternak.",
    jumlahKK: 180,
    jumlahLakiLaki: 223,
    jumlahPerempuan: 237,
    jumlahBalita: 22,
    jumlahLansia: 122,
    jumlahIbuHamil: 1,
    jumlahPenyandangDisabilitas: 5,
    jumlahPendudukMiskin: 47,
    rtData: getRTDataForDusun("Gondosuli"),
    disasters: getDisasterDataForDusun("Gondosuli")
  },
  {
    id: 7,
    name: "Dusun Trukan",
    position: [-7.9532895, 110.3763096] as [number, number],
    population: 695,
    riskLevel: "high",
    description: "Dusun Trukan merupakan salah satu pedukuhan di Desa Sriharjo, Kecamatan Imogiri, Kabupaten Bantul. Warga Trukan terkenal dengan keberadaan organisasi seni tradisional seperti Jatilan Trukan yang aktif melestarikan kesenian kuda lumping. Dalam aspek sosial-kultural, Trukan rutin menggelar acara adat seperti 'merti dusun' yang diselenggarakan sebagai ungkapan syukur dan kekompakan warga—contohnya acara gabungan dengan Dusun Gondosuli pada tahun 2018. Selain it, pembangunan fasilitas umum seperti balai dusun juga menjadi salah satu fokus bersama warga dan pemerintah desa untuk mendukung kegiatan masyarakat di Trukan.",
    jumlahKK: 249,
    jumlahLakiLaki: 354,
    jumlahPerempuan: 341,
    jumlahBalita: 40,
    jumlahLansia: 147,
    jumlahIbuHamil: 2,
    jumlahPenyandangDisabilitas: 6,
    jumlahPendudukMiskin: 81,
    rtData: getRTDataForDusun("Trukan"),
    disasters: getDisasterDataForDusun("Trukan")
  },
  {
    id: 8,
    name: "Dusun Dogongan",
    position: [-7.9480565, 110.3777991] as [number, number],
    population: 532,
    riskLevel: "high",
    description: "Dusun Dogongan adalah salah satu kalurahan lama yang sekarang menjadi bagian dari Kalurahan Sriharjo, di Kecamatan Imogiri, Kabupaten Bantul, Yogyakarta. Kalurahan Sriharjo dibentuk pada tahun 1946 dari penggabungan tiga kalurahan lama, yaitu Mojohuro, Dogongan, dan Kedungmiri. Meskipun saat ini sudah menjadi satu kalurahan, sejarahnya masih melekat dengan wilayah tersebut.",
    jumlahKK: 190,
    jumlahLakiLaki: 257,
    jumlahPerempuan: 275,
    jumlahBalita: 23,
    jumlahLansia: 98,
    jumlahIbuHamil: 2,
    jumlahPenyandangDisabilitas: 6,
    jumlahPendudukMiskin: 86,
    rtData: getRTDataForDusun("Dogongan"),
    disasters: getDisasterDataForDusun("Dogongan")
  },
  {
    id: 9,
    name: "Dusun Ketos",
    position: [-7.9463378, 110.3814805] as [number, number],
    population: 543,
    riskLevel: "medium",
    description: "Dusun Ketos merupakan salah satu pedukuhan di Desa Sriharjo, Kecamatan Imogiri, Kabupaten Bantul. Dusun ini dikenal dengan lingkungan yang masih asri dan masyarakatnya yang memegang kuat nilai kebersamaan serta gotong royong. Warga Ketos aktif dalam kegiatan sosial seperti kerja bakti, ronda malam, dan kegiatan keagamaan. Selain itu, beberapa warga juga mengembangkan usaha kecil di bidang pertanian dan peternakan yang menjadi sumber penghidupan utama. Potensi alam dan semangat warganya menjadikan Dusun Ketos terus berkembang dalam upaya menjaga keseimbangan antara tradisi dan kemajuan.",
    jumlahKK: 215,
    jumlahLakiLaki: 260,
    jumlahPerempuan: 283,
    jumlahBalita: 20,
    jumlahLansia: 121,
    jumlahIbuHamil: 1,
    jumlahPenyandangDisabilitas: 4,
    jumlahPendudukMiskin: 89,
    rtData: getRTDataForDusun("Ketos"),
    disasters: getDisasterDataForDusun("Ketos")
  },
  {
    id: 10,
    name: "Dusun Ngrancah",
    position: [-7.948198, 110.385714] as [number, number],
    population: 638,
    riskLevel: "medium",
    description: "Dusun Ngrancah terletak di wilayah selatan Desa Sriharjo dan dikenal sebagai dusun yang memiliki keakraban sosial yang tinggi. Warga Ngrancah banyak bergerak di sektor pertanian dan kerajinan lokal. Kegiatan masyarakat sering berpusat di balai dusun sebagai tempat musyawarah, arisan, dan kegiatan kebudayaan seperti merti dusun dan kesenian tradisional. Ngrancah memiliki lingkungan yang sejuk dengan pemandangan perbukitan khas Imogiri, menjadikannya tempat yang nyaman serta sarat dengan nilai-nilai kebersamaan antarwarga.",
    jumlahKK: 243,
    jumlahLakiLaki: 307,
    jumlahPerempuan: 331,
    jumlahBalita: 18,
    jumlahLansia: 167,
    jumlahIbuHamil: 3,
    jumlahPenyandangDisabilitas: 15,
    jumlahPendudukMiskin: 92,
    rtData: getRTDataForDusun("Ngrancah"),
    disasters: getDisasterDataForDusun("Ngrancah")
  },
  {
    id: 11,
    name: "Dusun Pengkol",
    position: [-7.9450995, 110.3979074] as [number, number],
    population: 288,
    riskLevel: "medium",
    description: "Dusun Pengkol merupakan wilayah yang memiliki karakter masyarakat pekerja keras dan kreatif. Mayoritas penduduknya bekerja di sektor pertanian dan usaha kecil menengah, dengan beberapa warga mengembangkan produk olahan hasil pertanian. Dusun ini juga aktif dalam kegiatan pemberdayaan masyarakat dan pembinaan generasi muda melalui karang taruna serta kegiatan sosial. Nilai gotong royong masih sangat dijaga, terlihat dari aktivitas rutin seperti bersih lingkungan, perbaikan jalan, dan kegiatan keagamaan bersama. Dusun Pengkol menjadi contoh pedukuhan yang mengedepankan keseimbangan antara kerja keras, solidaritas, dan tradisi.",
    jumlahKK: 111,
    jumlahLakiLaki: 141,
    jumlahPerempuan: 147,
    jumlahBalita: 8,
    jumlahLansia: 72,
    jumlahIbuHamil: 1,
    jumlahPenyandangDisabilitas: 5,
    jumlahPendudukMiskin: 32,
    rtData: getRTDataForDusun("Pengkol"),
    disasters: getDisasterDataForDusun("Pengkol")
  },
  {
    id: 12,
    name: "Dusun Sompok",
    position: [-7.9413773, 110.4065744] as [number, number],
    population: 1007,
    riskLevel: "medium",
    description: "Dusun Sompok di Sriharjo, Bantul, dikenal sebagai daerah yang mengembangkan potensi wisatanya, baik alam maupun edukasi, di antaranya adalah Sompok Trekking dengan jalur pendakian perbukitan alami, pemandangan laut selatan, dan Podjok Edukasi Sompok yang menawarkan pengalaman hidup pedesaan dan potensi pertanian. Warga setempat, termasuk pemuda dan ibu-ibu, aktif menata kawasan dan menyiapkan layanan seperti wisata kuliner tradisional dan atraksi budaya, seperti gejog lesung dan jatilan.",
    jumlahKK: 359,
    jumlahLakiLaki: 500,
    jumlahPerempuan: 507,
    jumlahBalita: 53,
    jumlahLansia: 202,
    jumlahIbuHamil: 3,
    jumlahPenyandangDisabilitas: 15,
    jumlahPendudukMiskin: 147,
    rtData: getRTDataForDusun("Sompok"),
    disasters: getDisasterDataForDusun("Sompok")
  },
  {
    id: 13,
    name: "Dusun Wunut",
    position: [-7.9493849, 110.4268761] as [number, number],
    population: 600,
    riskLevel: "medium",
    description: "Dusun Wunut memiliki suasana pedesaan yang tenang dengan masyarakat yang hidup rukun dan menjunjung tinggi nilai kekeluargaan. Sebagian besar penduduk Wunut bermata pencaharian sebagai petani dan buruh tani. Dusun ini juga dikenal karena kegiatan sosial yang aktif, seperti posyandu, kelompok tani, dan kegiatan kebersihan lingkungan. Selain itu, Wunut memiliki potensi alam yang dapat dikembangkan menjadi daya tarik wisata pedesaan, berkat pemandangan sawah dan lingkungan yang masih alami. Masyarakatnya menjaga kelestarian budaya lokal dan terus berupaya meningkatkan kesejahteraan melalui kerja sama dan semangat kebersamaan.",
    jumlahKK: 226,
    jumlahLakiLaki: 294,
    jumlahPerempuan: 306,
    jumlahBalita: 30,
    jumlahLansia: 130,
    jumlahIbuHamil: 6,
    jumlahPenyandangDisabilitas: 2,
    jumlahPendudukMiskin: 232,
    rtData: getRTDataForDusun("Wunut"),
    disasters: getDisasterDataForDusun("Wunut")
  }
];

// Export all data in one object for easy access
export const allData = {
  dusunData,
  rtDataByDusun,
  getRTDataForDusun
};

export default dusunData;