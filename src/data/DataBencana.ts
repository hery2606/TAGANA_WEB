// Define disaster detail interface
export interface DisasterDetail {
  type: string;
  severity: "low" | "medium" | "high";
  description: string;
  icon: string; // icon identifier: flood, landslide, earthquake, volcano, wind, drought
}

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
      type: "Gempa Bumi", 
      severity: "low", 
      description: "Wilayah rawan gempa dengan intensitas rendah", 
      icon: "earthquake" 
    },
    { 
      type: "Erupsi Merapi", 
      severity: "low", 
      description: "Potensi abu vulkanik ringan dari Gunung Merapi", 
      icon: "volcano" 
    },
    { 
      type: "Angin Puting Beliung", 
      severity: "low", 
      description: "Cuaca ekstrem musiman sesekali terjadi", 
      icon: "wind" 
    },
    { 
      type: "Kekeringan", 
      severity: "low", 
      description: "Potensi kekeringan saat musim kemarau panjang", 
      icon: "drought" 
    }
  ],
  "Mojohuro": [
    { 
      type: "Gempa Bumi", 
      severity: "low", 
      description: "Wilayah dengan potensi gempa rendah", 
      icon: "earthquake" 
    },
    { 
      type: "Erupsi Merapi", 
      severity: "low", 
      description: "Risiko abu vulkanik minimal", 
      icon: "volcano" 
    },
    { 
      type: "Banjir", 
      severity: "low", 
      description: "Genangan ringan di beberapa titik saat hujan deras", 
      icon: "flood" 
    },
    { 
      type: "Kekeringan", 
      severity: "low", 
      description: "Kekeringan ringan pada musim kemarau", 
      icon: "drought" 
    }
  ],
  "Pelemadu": [
    { 
      type: "Banjir", 
      severity: "medium", 
      description: "Rawan banjir karena dekat Sungai Opak", 
      icon: "flood" 
    },
    { 
      type: "Gempa Bumi", 
      severity: "medium", 
      description: "Wilayah rawan gempa Merapi", 
      icon: "earthquake" 
    },
    { 
      type: "Erupsi Merapi", 
      severity: "medium", 
      description: "Potensi abu vulkanik dan lahar dingin", 
      icon: "volcano" 
    },
    { 
      type: "Tanah Longsor", 
      severity: "low", 
      description: "Potensi longsor kecil di area lereng", 
      icon: "landslide" 
    }
  ],
  "Sungapan": [
    { 
      type: "Banjir", 
      severity: "medium", 
      description: "Rawan banjir dan genangan air tinggi", 
      icon: "flood" 
    },
    { 
      type: "Gempa Bumi", 
      severity: "medium", 
      description: "Wilayah rawan gempa bumi Merapi", 
      icon: "earthquake" 
    },
    { 
      type: "Erupsi Merapi", 
      severity: "medium", 
      description: "Risiko abu vulkanik dan awan panas", 
      icon: "volcano" 
    },
    { 
      type: "Tanah Longsor", 
      severity: "low", 
      description: "Area dengan risiko longsor rendah", 
      icon: "landslide" 
    }
  ],
  "Gondosuli": [
    { 
      type: "Banjir", 
      severity: "high", 
      description: "Rawan banjir bandang saat musim hujan", 
      icon: "flood" 
    },
    { 
      type: "Tanah Longsor", 
      severity: "high", 
      description: "Area lereng berpotensi longsor tinggi", 
      icon: "landslide" 
    },
    { 
      type: "Gempa Bumi", 
      severity: "high", 
      description: "Wilayah sangat rawan gempa Merapi", 
      icon: "earthquake" 
    },
    { 
      type: "Erupsi Merapi", 
      severity: "high", 
      description: "Potensi tinggi terkena abu vulkanik & awan panas", 
      icon: "volcano" 
    }
  ],
  "Trukan": [
    { 
      type: "Banjir", 
      severity: "high", 
      description: "Rawan banjir bandang dan luapan sungai", 
      icon: "flood" 
    },
    { 
      type: "Tanah Longsor", 
      severity: "high", 
      description: "Area lereng terjal rawan longsor", 
      icon: "landslide" 
    },
    { 
      type: "Gempa Bumi", 
      severity: "high", 
      description: "Wilayah sangat rawan gempa", 
      icon: "earthquake" 
    },
    { 
      type: "Erupsi Merapi", 
      severity: "high", 
      description: "Risiko tinggi abu vulkanik dan lahar", 
      icon: "volcano" 
    }
  ],
  "Dogongan": [
    { 
      type: "Banjir", 
      severity: "high", 
      description: "Rawan banjir bandang musim hujan", 
      icon: "flood" 
    },
    { 
      type: "Tanah Longsor", 
      severity: "medium", 
      description: "Potensi longsor di area lereng", 
      icon: "landslide" 
    },
    { 
      type: "Gempa Bumi", 
      severity: "high", 
      description: "Wilayah sangat rawan gempa", 
      icon: "earthquake" 
    },
    { 
      type: "Erupsi Merapi", 
      severity: "high", 
      description: "Potensi tinggi terkena material vulkanik", 
      icon: "volcano" 
    }
  ],
  "Ketos": [
    { 
      type: "Banjir", 
      severity: "high", 
      description: "Rawan banjir dan genangan tinggi", 
      icon: "flood" 
    },
    { 
      type: "Gempa Bumi", 
      severity: "high", 
      description: "Wilayah sangat rawan gempa", 
      icon: "earthquake" 
    },
    { 
      type: "Erupsi Merapi", 
      severity: "high", 
      description: "Risiko tinggi abu vulkanik", 
      icon: "volcano" 
    },
    { 
      type: "Tanah Longsor", 
      severity: "medium", 
      description: "Potensi longsor sedang", 
      icon: "landslide" 
    }
  ],
  "Ngrancah": [
    { 
      type: "Banjir", 
      severity: "medium", 
      description: "Potensi genangan saat hujan lebat", 
      icon: "flood" 
    },
    { 
      type: "Gempa Bumi", 
      severity: "medium", 
      description: "Wilayah rawan gempa Merapi", 
      icon: "earthquake" 
    },
    { 
      type: "Erupsi Merapi", 
      severity: "medium", 
      description: "Potensi abu vulkanik sedang", 
      icon: "volcano" 
    },
    { 
      type: "Tanah Longsor", 
      severity: "low", 
      description: "Risiko longsor rendah", 
      icon: "landslide" 
    }
  ],
  "Pengkol": [
    { 
      type: "Banjir", 
      severity: "medium", 
      description: "Potensi banjir saat musim hujan", 
      icon: "flood" 
    },
    { 
      type: "Gempa Bumi", 
      severity: "medium", 
      description: "Wilayah rawan gempa", 
      icon: "earthquake" 
    },
    { 
      type: "Erupsi Merapi", 
      severity: "medium", 
      description: "Risiko abu vulkanik sedang", 
      icon: "volcano" 
    },
    { 
      type: "Angin Puting Beliung", 
      severity: "low", 
      description: "Cuaca ekstrem musiman", 
      icon: "wind" 
    }
  ],
  "Sompok": [
    { 
      type: "Banjir", 
      severity: "medium", 
      description: "Rawan genangan air saat hujan deras", 
      icon: "flood" 
    },
    { 
      type: "Gempa Bumi", 
      severity: "medium", 
      description: "Wilayah rawan gempa Merapi", 
      icon: "earthquake" 
    },
    { 
      type: "Erupsi Merapi", 
      severity: "medium", 
      description: "Potensi abu vulkanik", 
      icon: "volcano" 
    },
    { 
      type: "Tanah Longsor", 
      severity: "low", 
      description: "Area perbukitan dengan risiko rendah", 
      icon: "landslide" 
    }
  ],
  "Wunut": [
    { 
      type: "Banjir", 
      severity: "medium", 
      description: "Potensi banjir di area sawah", 
      icon: "flood" 
    },
    { 
      type: "Gempa Bumi", 
      severity: "medium", 
      description: "Wilayah rawan gempa", 
      icon: "earthquake" 
    },
    { 
      type: "Erupsi Merapi", 
      severity: "medium", 
      description: "Risiko abu vulkanik sedang", 
      icon: "volcano" 
    },
    { 
      type: "Kekeringan", 
      severity: "low", 
      description: "Kekeringan saat musim kemarau panjang", 
      icon: "drought" 
    }
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
