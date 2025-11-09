"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InfoModal } from '@/components/ui/modal_desa';
import Image from "next/image";

export default function Navbar() {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Update the last update time
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setLastUpdate(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? "shadow-2xl border-b-2" : "shadow-lg border-b-4"
        } border-[#2e68b8ab]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left side - Logo & Title */}
            <div className="flex items-center space-x-3 group">
              {/* Logo with glow effect */}
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-[#044BB1] to-[#0566d6] rounded-full blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
                <div className="border border-blue-700 border-4 relative w-16 h-16 bg-linear-to-br from-[#044BB1] via-[#0555c4] to-[#0566d6] rounded-full flex items-center justify-center shadow-xl">
                  <Image
                    src="/tagana_logo.png"
                    alt="Tagana Logo"
                    width={60}
                    height={60}
                    className="object-contain w-14 h-14"
                    priority
                  />
                </div>
              </div>

              {/* Title with gradient */}
              <div className="flex flex-col">
                <h1 className="text-2xl sm:text-3xl font-black bg-linear-to-r from-[#044BB1] to-[#0566d6] bg-clip-text text-transparent tracking-tight leading-tight drop-shadow-sm">
                  TAGANA
                </h1>
                <div className="flex items-center space-x-1 -mt-1">
                  <div className="w-1.5 h-1.5 bg-[#044BB1] rounded-full"></div>
                  <p className="text-sm text-gray-600 font-bold tracking-wide">
                    Sriharjo
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Started Page Button */}
            <button
              onClick={() => setInfoModalOpen(true)}
              className="flex cursor-pointer items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#044BB1] to-[#0566d6] text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="font-semibold">Info</span>
            </button>
          </div>
        </div>

        {/* Decorative bottom border */}
      </nav>

      {/* Info Modal */}
      <InfoModal 
        isOpen={infoModalOpen} 
        onClose={() => setInfoModalOpen(false)} 
      />
    </>
  );
}
