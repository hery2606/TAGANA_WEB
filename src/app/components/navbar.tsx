"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);

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
    <nav
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-2xl border-b-2" : "shadow-lg border-b-4"
      } border-[#044BB1]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left side - Live Map & Last Update */}
          <div className="flex items-center space-x-3">
            {/* Live Map Badge */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-red-500 to-orange-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-linear-to-r from-[#044BB1] to-[#0566d6] rounded-xl px-4 py-2.5 shadow-lg transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-2">
                  <div className="relative flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></div>
                  </div>
                 
                </div>
              </div>
            </div>

            {/* Last Update Card */}
            
          </div>

          {/* Center - Logo & Title */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-3 group cursor-pointer">
              {/* Logo with glow effect */}
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-[#044BB1] to-[#0566d6] rounded-full blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative w-14 h-14 bg-linear-to-br from-[#044BB1] via-[#0555c4] to-[#0566d6] rounded-full flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 border-2 border-white">
                  {/* You can replace this with an actual logo image */}
                  {/* <span className="text-white font-black text-2xl drop-shadow-lg">T</span> */}
                  {/* Uncomment below to use an image logo */}
                  <img 
                    src="./tagana_logo.png" 
                    alt="Tagana Logo" 
                    className="w-11 h-11 object-contain"
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
          </div>

          {/* Right side - Menu or actions */}
          <div className="flex items-center space-x-3">
            {/* Desktop Menu Button */}
            
            {/* Mobile menu button */}
            
          </div>
        </div>

        
      </div>

      {/* Decorative bottom border */}
      <div className="h-1 bg-linear-to-r from-transparent via-[#044BB1] to-transparent opacity-50"></div>
    </nav>
  );
}
