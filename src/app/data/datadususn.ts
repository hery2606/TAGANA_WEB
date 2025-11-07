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
}

export const dusunData: Dusun[] = [
  {
    id: 1,
    name: "Dusun Miri",
    position: [-7.9380459,110.3718411] as [number, number],
    population: 954, // Jumlah Penduduk
    riskLevel: "medium",
    description:
      "Dusun Miri terletak di wilayah tengah Sriharjo dengan aksesibilitas yang baik",
    jumlahKK: 339,
    jumlahLakiLaki: 485,
    jumlahPerempuan: 469,
    jumlahBalita: 25,
    jumlahLansia: 197,
    jumlahIbuHamil: 5,
    jumlahPenyandangDisabilitas: 14,
    jumlahPendudukMiskin: 84,
  },
  {
    id: 2,
    name: "Dusun Jati",
    position: [-7.9446043,110.3746045] as [number, number],
    population: 1143, // Jumlah Penduduk
    riskLevel: "low",
    description:
      "Dusun Jati memiliki kondisi geografis yang relatif aman dari bencana",
    jumlahKK: 415,
    jumlahLakiLaki: 564,
    jumlahPerempuan: 579,
    jumlahBalita: 52,
    jumlahLansia: 230,
    jumlahIbuHamil: 8,
    jumlahPenyandangDisabilitas: 18,
    jumlahPendudukMiskin: 123,
  },
  {
    id: 3,
    name: "Dusun Mojohuro",
    position: [-7.9442949, 110.3728514] as [number, number],
    population: 914, // Jumlah Penduduk
    riskLevel: "low",
    description:
      "Dusun Mojohuro berada di dataran dengan risiko bencana rendah",
    jumlahKK: 344,
    jumlahLakiLaki: 483,
    jumlahPerempuan: 431,
    jumlahBalita: 45,
    jumlahLansia: 194,
    jumlahIbuHamil: 2,
    jumlahPenyandangDisabilitas: 15,
    jumlahPendudukMiskin: 70,
  },
  {
    id: 4,
    name: "Dusun Pelemadu",
    position: [-7.9466149, 110.3681175] as [number, number],
    population: 1168, // Jumlah Penduduk
    riskLevel: "medium",
    description: "Dusun Pelemadu memerlukan kewaspadaan pada musim hujan",
    jumlahKK: 443,
    jumlahLakiLaki: 567,
    jumlahPerempuan: 601,
    jumlahBalita: 44,
    jumlahLansia: 241,
    jumlahIbuHamil: 2,
    jumlahPenyandangDisabilitas: 16,
    jumlahPendudukMiskin: 87,
  },
  {
    id: 5,
    name: "Dusun Sungapan",
    position: [-7.952379, 110.3688622] as [number, number],
    population: 475, // Jumlah Penduduk
    riskLevel: "medium",
    description:
      "Dusun Sungapan terletak di area yang memerlukan pemantauan rutin",
    jumlahKK: 179,
    jumlahLakiLaki: 217,
    jumlahPerempuan: 258,
    jumlahBalita: 16,
    jumlahLansia: 82,
    jumlahIbuHamil: 1,
    jumlahPenyandangDisabilitas: 10,
    jumlahPendudukMiskin: 141,
  },
  {
    id: 6,
    name: "Dusun Gondosuli",
    position: [-7.9508624, 110.3733306] as [number, number],
    population: 460, // Jumlah Penduduk
    riskLevel: "high",
    description:
      "Dusun Gondosuli berada di area rawan dengan risiko tinggi, perlu mitigasi aktif",
    jumlahKK: 180,
    jumlahLakiLaki: 223,
    jumlahPerempuan: 237,
    jumlahBalita: 22,
    jumlahLansia: 122,
    jumlahIbuHamil: 1,
    jumlahPenyandangDisabilitas: 5,
    jumlahPendudukMiskin: 47,
  },
  {
    id: 7,
    name: "Dusun Trukan",
    position: [-7.9532895, 110.3763096] as [number, number],
    population: 695, // Jumlah Penduduk
    riskLevel: "high",
    description:
      "Dusun Trukan memiliki topografi yang memerlukan perhatian khusus",
    jumlahKK: 249,
    jumlahLakiLaki: 354,
    jumlahPerempuan: 341,
    jumlahBalita: 40,
    jumlahLansia: 147,
    jumlahIbuHamil: 2,
    jumlahPenyandangDisabilitas: 6,
    jumlahPendudukMiskin: 81,
  },
  {
    id: 8,
    name: "Dusun Dogongan",
    position: [-7.9480565,110.3777991] as [number, number],
    population: 532, // Jumlah Penduduk
    riskLevel: "high",
    description:
      "Dusun Dogongan berada di zona risiko tinggi, evakuasi prioritas",
    jumlahKK: 190,
    jumlahLakiLaki: 257,
    jumlahPerempuan: 275,
    jumlahBalita: 23,
    jumlahLansia: 98,
    jumlahIbuHamil: 2,
    jumlahPenyandangDisabilitas: 6,
    jumlahPendudukMiskin: 86,
  },
  {
    id: 9,
    name: "Dusun Ketos",
    position: [-7.9463378,110.3814805] as [number, number],
    population: 543, // Jumlah Penduduk
    riskLevel: "high",
    description: "Dusun Ketos terletak di area dengan potensi bahaya tinggi",
    jumlahKK: 215,
    jumlahLakiLaki: 260,
    jumlahPerempuan: 283,
    jumlahBalita: 20,
    jumlahLansia: 121,
    jumlahIbuHamil: 1,
    jumlahPenyandangDisabilitas: 4,
    jumlahPendudukMiskin: 89,
  },
  {
    id: 10,
    name: "Dusun Ngrancah",
    position: [-7.948198, 110.385714] as [number, number], // Koordinat sama dengan Miri? Pastikan ini benar.
    population: 638, // Jumlah Penduduk
    riskLevel: "medium",
    description: "Dusun Ngrancah memerlukan monitoring berkala",
    jumlahKK: 243,
    jumlahLakiLaki: 307,
    jumlahPerempuan: 331,
    jumlahBalita: 18,
    jumlahLansia: 167,
    jumlahIbuHamil: 3,
    jumlahPenyandangDisabilitas: 15,
    jumlahPendudukMiskin: 92,
  },
  {
    id: 11,
    name: "Dusun Pengkol",
    position: [-7.9450995, 110.3979074] as [number, number],
    population: 288, // Jumlah Penduduk
    riskLevel: "medium",
    description: "Dusun Pengkol berada di area transisi dengan risiko sedang",
    jumlahKK: 111,
    jumlahLakiLaki: 141,
    jumlahPerempuan: 147,
    jumlahBalita: 8,
    jumlahLansia: 72,
    jumlahIbuHamil: 1,
    jumlahPenyandangDisabilitas: 5,
    jumlahPendudukMiskin: 32,
  },
  {
    id: 12,
    name: "Dusun Sompok",
    position: [-7.9413773, 110.4065744] as [number, number],
    population: 1007, // Jumlah Penduduk
    riskLevel: "medium",
    description: "Dusun Sompok memiliki kondisi yang relatif aman blslsll",
    jumlahKK: 359,
    jumlahLakiLaki: 500,
    jumlahPerempuan: 507,
    jumlahBalita: 53,
    jumlahLansia: 202,
    jumlahIbuHamil: 3,
    jumlahPenyandangDisabilitas: 15,
    jumlahPendudukMiskin: 147,
  },
  {
    id: 13,
    name: "Dusun Wunut",
    position: [-7.9493849, 110.4268761] as [number, number],
    population: 600, // Jumlah Penduduk
    riskLevel: "medium",
    description:
      "Dusun Wunut memerlukan kewaspadaan pada kondisi cuaca ekstrem",
    jumlahKK: 226,
    jumlahLakiLaki: 294,
    jumlahPerempuan: 306,
    jumlahBalita: 30,
    jumlahLansia: 130,
    jumlahIbuHamil: 6,
    jumlahPenyandangDisabilitas: 2,
    jumlahPendudukMiskin: 232,
  },
];
