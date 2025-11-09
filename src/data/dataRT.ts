export interface RT {
  id: number;
  name: string;
  NomorRT: string;
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

export const dusunData: RT[] = [
  {
    id: 1,
    name: "Dusun Miri",
    NomorRT: "01",
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
];