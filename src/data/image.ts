export interface DusunImage {
  id: number;
  name: string;
  imagePath: string;
  altText: string;
}

// Mapping gambar untuk setiap dusun
export const dusunImages: DusunImage[] = [
  {
    id: 1,
    name: "Dusun Miri",
    imagePath: "/gambar_desa1.jpeg",
    altText: "Pemandangan Dusun Miri"
  },
  {
    id: 2,
    name: "Dusun Jati",
    imagePath: "/jati.png",
    altText: "Pemandangan Dusun Jati"
  },
  {
    id: 3,
    name: "Dusun Mojohuro",
    imagePath: "/mojohuro.png",
    altText: "Pemandangan Dusun Mojohuro"
  },
  {
    id: 4,
    name: "Dusun Pelemadu",
    imagePath: "/pelemadu.png",
    altText: "Pemandangan Dusun Pelemadu"
  },
  {
    id: 5,
    name: "Dusun Sungapan",
    imagePath: "/sungapan.png",
    altText: "Pemandangan Dusun Sungapan"
  },
  {
    id: 6,
    name: "Dusun Gondosuli",
    imagePath: "/gondosuli.png",
    altText: "Pemandangan Dusun Gondosuli"
  },
  {
    id: 7,
    name: "Dusun Trukan",
    imagePath: "/trukan.png",
    altText: "Pemandangan Dusun Trukan"
  },
  {
    id: 8,
    name: "Dusun Dogongan",
    imagePath: "/dogongan.png",
    altText: "Pemandangan Dusun Dogongan"
  },
  {
    id: 9,
    name: "Dusun Ketos",
    imagePath: "/ketos.png",
    altText: "Pemandangan Dusun Ketos"
  },
  {
    id: 10,
    name: "Dusun Ngrancah",
    imagePath: "/gambar_desa1.jpeg",
    altText: "Pemandangan Dusun Ngrancah"
  },
  {
    id: 11,
    name: "Dusun Pengkol",
    imagePath: "/pengkol.png",
    altText: "Pemandangan Dusun Pengkol"
  },
  {
    id: 12,
    name: "Dusun Sompok",
    imagePath: "/sompok.png",
    altText: "Pemandangan Dusun Sompok"
  },
  {
    id: 13,
    name: "Dusun Wunut",
    imagePath: "/wunut.png",
    altText: "Pemandangan Dusun Wunut"
  },
];

// Default fallback image
export const defaultDusunImage = {
  imagePath: "/images/dusun/default.jpeg",
  altText: "Pemandangan Desa Sriharjo"
};

// Helper function untuk mendapatkan gambar berdasarkan ID dusun
export const getDusunImageById = (id: number): string => {
  const dusunImage = dusunImages.find(img => img.id === id);
  return dusunImage?.imagePath || defaultDusunImage.imagePath;
};

// Helper function untuk mendapatkan gambar berdasarkan nama dusun
export const getDusunImageByName = (name: string): string => {
  const dusunImage = dusunImages.find(img => img.name === name);
  return dusunImage?.imagePath || defaultDusunImage.imagePath;
};

// Helper function untuk mendapatkan alt text
export const getDusunAltText = (id: number): string => {
  const dusunImage = dusunImages.find(img => img.id === id);
  return dusunImage?.altText || defaultDusunImage.altText;
};
