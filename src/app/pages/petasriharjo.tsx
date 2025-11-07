"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap, Polygon, LayersControl, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { InfoModal } from "../components/modals_desa";
import { desaBoundary } from "../data/PetaSriharjoBoundary";
import { dusunData } from "../data/datadususn";



// Fix default marker icon issue in Next.js
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/marker-icon-2x.png",
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
  });
}

// Define the Dusun interface for type safety
interface Dusun {
  id: number;
  name: string;
  position: [number, number];
  population: number; // Jumlah Penduduk total
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

// Data dusun di Sriharjo dengan koordinat yang akurat dan data demografi dari DAFTAR RUTA IKS 2025
// dusunData is now imported from ../data/datadususn

// Custom marker icons based on risk level
const createCustomIcon = (riskLevel: string) => {
  const colors = {
    low: "#10b981", // green
    medium: "#f59e0b", // yellow/orange
    high: "#ef4444", // red
  };

  const color = colors[riskLevel as keyof typeof colors] || colors.medium;

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="position: relative;">
        <div style="
          width: 36px;
          height: 36px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 10px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 14px;
            height: 14px;
            background: white;
            border-radius: 50%;
            transform: rotate(45deg);
          "></div>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

interface DusunModalProps {
  isOpen: boolean;
  onClose: () => void;
  dusun: Dusun | null;
}

function DusunModal({ isOpen, onClose, dusun }: DusunModalProps) {
  const router = useRouter();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !dusun) return null;

  // Create a non-null alias so TypeScript knows this is defined for the rest of the component
  const d = dusun as Dusun;

  const riskColors = {
    low: {
      bg: "bg-green-50",
      border: "border-green-500",
      text: "text-green-700",
      badge: "bg-green-500",
    },
    medium: {
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      text: "text-yellow-700",
      badge: "bg-yellow-500",
    },
    high: {
      bg: "bg-red-50",
      border: "border-red-500",
      text: "text-red-700",
      badge: "bg-red-500",
    },
  };

  const risk = riskColors[d.riskLevel as keyof typeof riskColors];

  const handleViewDetail = () => {
    if (d) {
      router.push(`/pages/detail_dusun?id=${d.id}`);
    }
  };

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 bg-black/15 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-[#044BB1] to-[#0566d6] text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 rounded-lg p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">{d.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Risk Level Badge */}
          <div
            className={`${risk.bg} rounded-xl p-4 border-l-4 ${risk.border}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Status Risiko Bencana
                </p>
                <div className="flex items-center space-x-2">
                  <div
                    className={`${risk.badge} w-3 h-3 rounded-full animate-pulse`}
                  ></div>
                  <span className={`${risk.text} font-bold text-lg capitalize`}>
                    {d.riskLevel === "low"
                      ? "Rendah"
                      : d.riskLevel === "medium"
                      ? "Sedang"
                      : "Tinggi"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Total Penduduk
                </p>
                <p className="text-3xl font-bold text-[#044BB1]">
                  {d.population}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-[#044BB1]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Deskripsi
            </h3>
            <p className="text-gray-700 leading-relaxed">{d.description}</p>
          </div>

          {/* Koordinat */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-[#044BB1]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              Koordinat
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Latitude</p>
                <p className="font-mono font-semibold text-[#044BB1]">
                  {d.position[0].toFixed(4)}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Longitude</p>
                <p className="font-mono font-semibold text-[#044BB1]">
                  {d.position[1].toFixed(4)}
                </p>
              </div>
            </div>
          </div>

          {/* Demographic Data */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-[#044BB1]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 12h.01M12 12h.01M15 12h.01M12 17h.01M15 17h.01M12 7h.01M15 7h.01M12 12h.01M15 12h.01"
                />
              </svg>
              Data Demografi (DAFTAR RUTA IKS 2025)
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-600">Jumlah KK:</span>
                <span className="font-semibold">{d.jumlahKK}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-600">Jumlah Laki-laki:</span>
                <span className="font-semibold">{d.jumlahLakiLaki}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-600">Jumlah Perempuan:</span>
                <span className="font-semibold">{d.jumlahPerempuan}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-600">Jumlah Balita:</span>
                <span className="font-semibold">{d.jumlahBalita}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-600">Jumlah Lansia:</span>
                <span className="font-semibold">{d.jumlahLansia}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-600">Jumlah Ibu Hamil:</span>
                <span className="font-semibold">{d.jumlahIbuHamil}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-600">Penyandang Disabilitas:</span>
                <span className="font-semibold">{d.jumlahPenyandangDisabilitas}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-600">Penduduk Miskin:</span>
                <span className="font-semibold">{d.jumlahPendudukMiskin}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleViewDetail}
              className="flex-1 bg-[#044BB1] hover:bg-[#033a8c] text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Lihat Detail Lengkap</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-semibold transition-all duration-200"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component to handle map centering and boundaries
function MapController({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 0.5 });

    // Calculate bounds from desaBoundary
    const bounds = L.latLngBounds(desaBoundary);
    const paddedBounds = bounds.pad(0.1); // Add 10% padding

    // Set max bounds to restrict panning
    map.setMaxBounds(paddedBounds);

    // Set min/max zoom levels
    map.setMinZoom(14);
    map.setMaxZoom(20);
  }, [map, center, zoom]);

  return null;
}

// Component for grayscale overlay outside boundary
function BoundaryOverlay() {
  const map = useMap();

  useEffect(() => {
    // Create outer boundary (world boundary)
    const worldBounds: [number, number][] = [
      [-90, -180],
      [-90, 180],
      [90, 180],
      [90, -180],
      [-90, -180],
    ];

    // Create polygon with hole (inverse of Sriharjo boundary)
    const overlayPolygon = L.polygon([worldBounds, desaBoundary], {
      color: "transparent",
      fillColor: "#000000",
      fillOpacity: 0.3,
      stroke: false,
      interactive: false,
    });

    overlayPolygon.addTo(map);

    // Add grayscale filter to tiles outside boundary
    const style = document.createElement("style");
    style.textContent = `
      .leaflet-tile-container {
        filter: none;
      }
      .boundary-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 400;
        background: linear-gradient(
          rgba(0,0,0,0.2) 0%,
          rgba(0,0,0,0.1) 50%,
          rgba(0,0,0,0.2) 100%
        );
        mix-blend-mode: multiply;
      }
    `;
    document.head.appendChild(style);

    return () => {
      map.removeLayer(overlayPolygon);
      document.head.removeChild(style);
    };
  }, [map]);

  return null;
}

interface PetaSriharjoProps {
  selectedDusunId?: number | null;
  onDusunSelect?: (id: number | null) => void;
}

export default function PetaSriharjo({ selectedDusunId = null, onDusunSelect }: PetaSriharjoProps) {
  const router = useRouter();
  const [selectedDusun, setSelectedDusun] = useState<Dusun | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    -7.946, 110.404,
  ]);
  const [mapZoom, setMapZoom] = useState(14);

  useEffect(() => {
    setMapReady(true);
  }, []);

  // Calculate center point of Sriharjo boundary
  const calculateBoundaryCenter = (): [number, number] => {
    const lats = desaBoundary.map((coord) => coord[0]);
    const lngs = desaBoundary.map((coord) => coord[1]);
    const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
    const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
    return [centerLat, centerLng];
  };

  const boundaryCenter = calculateBoundaryCenter();

  const handleResetToSriharjo = () => {
    setMapCenter(boundaryCenter);
    setMapZoom(14);
  };

  const handleViewDetailFromPopup = (dusun: Dusun) => {
    router.push(`/pages/detail_dusun?id=${dusun.id}`);
  };

  const handleOpenModalFromPopup = (dusun: Dusun) => {
    setSelectedDusun(dusun);
  };

  // Update map when selectedDusunId changes from parent
  useEffect(() => {
    if (selectedDusunId === null) {
      setMapCenter(boundaryCenter);
      setMapZoom(14);
    } else {
      const selectedDusun = dusunData.find(d => d.id === selectedDusunId);
      if (selectedDusun) {
        setMapCenter(selectedDusun.position);
        setMapZoom(17);
      }
    }
  }, [selectedDusunId, boundaryCenter]);

  // Filter markers berdasarkan dusun yang dipilih
  const filteredDusunData = selectedDusunId 
    ? dusunData.filter(d => d.id === selectedDusunId)
    : dusunData;

  if (!mapReady) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#044BB1] mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Memuat Peta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={boundaryCenter}
        zoom={14}
        className="w-full h-full rounded-xl"
        style={{ height: "100%", width: "100%", zIndex: 1 }}
        zoomControl={false}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
      >
        <MapController center={mapCenter} zoom={mapZoom} />
        <BoundaryOverlay />

        {/* All Controls Container - Same z-index level */}
        <div className="leaflet-control-container" style={{ zIndex: 500 }}>
          {/* Zoom Controls */}
          <div className="leaflet-top leaflet-left">
            <div className="leaflet-control-zoom leaflet-bar leaflet-control bg-white shadow-lg border border-gray-200">
              <a
                className="leaflet-control-zoom-in text-[#044BB1] hover:bg-gray-50"
                href="#"
                title="Zoom in"
                onClick={(e) => {
                  e.preventDefault();
                  const map = (e.target as any).closest(
                    ".leaflet-container"
                  )?._leaflet_map;
                  if (map) map.zoomIn();
                }}
              >
                +
              </a>
              <a
                className="leaflet-control-zoom-out text-[#044BB1] hover:bg-gray-50"
                href="#"
                title="Zoom out"
                onClick={(e) => {
                  e.preventDefault();
                  const map = (e.target as any).closest(
                    ".leaflet-container"
                  )?._leaflet_map;
                  if (map) map.zoomOut();
                }}
              >
                −
              </a>
            </div>
          </div>

          {/* Map Controls - Top Right */}
          

          {/* Legend - Bottom Left */}
          <div className="leaflet-bottom leaflet-left">
            <div className="leaflet-control bg-white rounded-xl shadow-xl p-4 max-w-xs border border-gray-200 mb-2 ml-2">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-[#044BB1]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
                Legenda
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
                  <span className="text-sm text-gray-700">Zona Aman</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow"></div>
                  <span className="text-sm text-gray-700">Zona Waspada</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow"></div>
                  <span className="text-sm text-gray-700">Zona Bahaya</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex items-center space-x-2">
                    
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer Control with Satellite and Street View */}
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="Peta Jalan">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer checked name="Satelit">
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={18}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satelit + Label">
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={18}
            />
            <TileLayer
              attribution=""
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Terrain">
            <TileLayer
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              maxZoom={17}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Batas Desa - Enhanced styling */}
        <Polyline
          positions={desaBoundary}
          pathOptions={{
            color: "#FFFF00",
            weight: 4,
            opacity: 1,
            dashArray: "10, 5",
            lineCap: "round",
            lineJoin: "round",
          }}
        />

        {/* Area Highlight inside boundary */}
        <Polygon
          positions={desaBoundary}
          pathOptions={{
            color: "transparent",
            fillColor: "#044BB1",
            fillOpacity: 0.08,
            weight: 0,
          }}
        />

        {/* Markers untuk setiap dusun dengan label permanen - FILTERED */}
        {filteredDusunData.map((dusun) => (
          <Marker
            key={dusun.id}
            position={dusun.position}
            icon={createCustomIcon(dusun.riskLevel)}
          >
            {/* Tooltip permanen menampilkan nama dusun */}
            <Tooltip
              permanent
              direction="top"
              offset={[0, -40]}
              className="custom-tooltip"
            >
              <div
                style={{
                  background: "white",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                  border: `2px solid ${
                    dusun.riskLevel === "low"
                      ? "#10b981"
                      : dusun.riskLevel === "medium"
                      ? "#f59e0b"
                      : "#ef4444"
                  }`,
                  fontWeight: "bold",
                  fontSize: "11px",
                  color: "#1f2937",
                  whiteSpace: "nowrap",
                }}
              >
                {dusun.name.replace("Dusun ", "")}
              </div>
            </Tooltip>

            {/* Popup detail saat marker diklik */}
            <Popup maxWidth={280}>
              <div className="p-2 min-w-[220px]">
                <h3 className="font-bold text-[#044BB1] mb-2 text-base">
                  {dusun.name}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <p className="text-gray-700">
                      <span className="font-semibold">Penduduk:</span>{" "}
                      {dusun.population} jiwa
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-gray-700">
                      <span className="font-semibold">Risiko:</span>{" "}
                      <span
                        className={`font-bold ${
                          dusun.riskLevel === "low"
                            ? "text-green-600"
                            : dusun.riskLevel === "medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {dusun.riskLevel === "low"
                          ? "Rendah"
                          : dusun.riskLevel === "medium"
                          ? "Sedang"
                          : "Tinggi"}
                      </span>
                    </p>
                  </div>
                  {/* Add demographic info summary */}
                  <div className="border-t pt-2 mt-2">
                    <p className="text-xs font-medium text-gray-600 mb-1">Demografi:</p>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <span className="text-gray-700">KK: {dusun.jumlahKK}</span>
                      <span className="text-gray-700">Balita: {dusun.jumlahBalita}</span>
                      <span className="text-gray-700">Lansia: {dusun.jumlahLansia}</span>
                      <span className="text-gray-700">Miskin: {dusun.jumlahPendudukMiskin}</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 pt-1">
                    <svg
                      className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {dusun.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleOpenModalFromPopup(dusun)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center space-x-1"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>Info Lengkap</span>
                  </button>
                  <button
                    onClick={() => handleViewDetailFromPopup(dusun)}
                    className="flex-1 bg-[#044BB1] hover:bg-[#033a8c] text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center space-x-1"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Detail Halaman</span>
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Add custom CSS for tooltips */}
      <style jsx global>{`
        .custom-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .custom-tooltip::before {
          display: none !important;
        }
        .leaflet-tooltip-left.custom-tooltip::before,
        .leaflet-tooltip-right.custom-tooltip::before {
          display: none !important;
        }
      `}</style>

      {/* Boundary Overlay Div - Lower z-index than controls */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(
                ellipse at center,
                transparent 40%,
                rgba(0,0,0,0.1) 60%,
                rgba(0,0,0,0.2) 80%,
                rgba(0,0,0,0.5) 100%
              )
            `,
            mixBlendMode: "multiply",
          }}
        />
      </div>

      {/* Modals - Highest z-index */}
      <DusunModal
        isOpen={selectedDusun !== null}
        onClose={() => setSelectedDusun(null)}
        dusun={selectedDusun}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
}