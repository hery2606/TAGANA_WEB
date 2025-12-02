// Define disaster detail interface
export interface DisasterDetail {
  type: string;
  severity: "none" | "low" | "medium" | "high";
  description: string;
  icon: string; 
  // icon identifier: flood, landslide, earthquake, volcano, wind, drought
}

// type iconType = "flood" | "landslide" | "earthquake" | "volcano" | "wind" | "drought";




// Disaster data for each dusun
export const disasterDataByDusun: { [key: string]: DisasterDetail[] } = {
  "Miri": [
    { 
      type: "Banjir", 
      severity: "medium", 
      description: "Potensi genangan air saat musim hujan di area lembah", 
      icon: "flood" 
    },
  ],
  "Jati": [
    { 
      type: "Banjir", 
      severity: "medium", 
      description: "Potensi genangan air saat musim hujan di area lembah", 
      icon: "flood" 
    },
   
  ],
  "Mojohuro": [
   
    { 
      type: "Banjir", 
      severity: "low", 
      description: "Genangan ringan di beberapa titik saat hujan deras", 
      icon: "flood" 
    },
   
  ],

  "Pelemadu": [
    { 
      type: "tidak ada bencana", 
      severity: "none", 
      description: "Aman dari bencana alam utama", 
      icon: "none" 
    }
  ],
  "Sungapan": [
    { 
      type: "Banjir", 
      severity: "medium", 
      description: "Rawan banjir dan genangan air tinggi", 
      icon: "flood" 
    },
    
  ],
  "Gondosuli": [
    { 
      type: "Banjir", 
      severity: "high", 
      description: "Rawan banjir bandang saat musim hujan", 
      icon: "flood" 
    },
   
  ],
  "Trukan": [
    { 
      type: "Banjir", 
      severity: "high", 
      description: "Rawan banjir bandang dan luapan sungai", 
      icon: "flood" 
    },
   
  ],
  "Dogongan": [
    { 
      type: "Banjir", 
      severity: "medium", 
      description: "Rawan banjir bandang musim hujan", 
      icon: "flood" 
    },
    
  ],
  "Ketos": [
    { 
      type: "Banjir", 
      severity: "medium", 
      description: "Rawan banjir dan genangan tinggi", 
      icon: "flood" 
    },
    
  ],
  "Ngrancah": [
    { 
      type: "Banjir", 
      severity: "medium", 
      description: "Potensi genangan saat hujan lebat", 
      icon: "flood" 
    },
   
  ],
  "Pengkol": [
    { 
      type: "Banjir", 
      severity: "medium", 
      description: "Potensi banjir saat musim hujan", 
      icon: "flood" 
    },
   
  ],
  "Sompok": [
    { 
      type: "Banjir", 
      severity: "medium", 
      description: "Rawan genangan air saat hujan deras", 
      icon: "flood" 
    },
    
  ],
  "Wunut": [
    { 
      type: "Banjir", 
      severity: "medium", 
      description: "Potensi banjir di area sawah", 
      icon: "flood" 
    },
    
  ]
};

// Helper function to get disaster data for a dusun
export const getDisasterDataForDusun = (dusunName: string): DisasterDetail[] => {
  return disasterDataByDusun[dusunName] || [];
};

// Export disaster types for reference
export const disasterTypes = {
  flood: "Banjir",
  landslide: "Tanah Longsor",
  earthquake: "Gempa Bumi",
  volcano: "Erupsi Merapi",
  wind: "Angin Puting Beliung",
  drought: "Kekeringan"
};

export default disasterDataByDusun;
