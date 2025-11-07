"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const contributors = [
    { name: "Heri", role: "Developer" },
    { name: "Naufal Adna", role: "Developer" },
    { name: "Sagara", role: "Developer" }
  ];

  return (
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
              <div className="relative w-16 h-16 bg-linear-to-br from-[#044BB1] via-[#0555c4] to-[#0566d6] rounded-full flex items-center justify-center shadow-xl">
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

          {/* Right side - Contributors Dropdown Menu */}
          <div className="relative dropdown-container">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#044BB1] to-[#0566d6] text-white rounded-lg hover:shadow-lg transition-all duration-300 group"
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span className="font-semibold text-sm">Kontributor</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-gray-100 overflow-hidden animate-fade-in">
                <div className="bg-gradient-to-r from-[#044BB1] to-[#0566d6] px-4 py-3">
                  <h3 className="text-white font-bold text-sm flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    Tim Pengembang
                  </h3>
                </div>
                <div className="py-2">
                  {contributors.map((contributor, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-blue-50 transition-colors duration-200 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#044BB1] to-[#0566d6] rounded-full flex items-center justify-center text-white font-bold shadow-md">
                          {contributor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">
                            {contributor.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {contributor.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-xs text-gray-600 text-center">
                    © 2025 TAGANA Sriharjo
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
    </nav>
  );
}
