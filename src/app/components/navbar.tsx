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
      } border-[#2e68b8ab]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left side - Live Map & Last Update */}
          <div className="flex items-center space-x-3">
            

            {/* Last Update Card */}
            
          </div>

          {/* Center - Logo & Title */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-3 group ">
              {/* Logo with glow effect */}
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-[#044BB1] to-[#0566d6] rounded-full blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative w-16 h-16 bg-linear-to-br from-[#044BB1] via-[#0555c4] to-[#0566d6] rounded-full flex items-center justify-center shadow-xl ">
                  {/* You can replace this with an actual logo image */}
                  {/* <span className="text-white font-black text-2xl drop-shadow-lg">T</span> */}
                  {/* Uncomment below to use an image logo */}
                  <img 
                    src="./tagana_logo.png" 
                    alt="Tagana Logo" 
                    className="w-14 h-14 object-contain"
                  />
                </div>
              </div>

              {/* Title with gradient */}
              <div className="flex flex-col">
                <h1 className="text-2xl sm:text-3xl font-black bg-linear-to-r from-[#044BB1] to-[#0566d6] bg-clip-text text-transparent tracking-tight leading-tight drop-shadow-sm">
                  TAGANA ppk
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
            <div>
              {/* Placeholder for future mobile menu button */}
              
            </div>
            
          </div>
        </div>

        
      </div>

      {/* Decorative bottom border */}
    </nav>
  );
}
