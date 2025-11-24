"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const developers = [
    {
      name: "Naufal Adna",
      role: "mapper & Backend Developer",
      initial: "N",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      name: "Sagara",
      role: "Layout Designer",
      initial: "S",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      name: "Heri",
      role: "Frontend Developer",
      initial: "H",
      color: "from-blue-500 to-blue-600",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#044BB1] via-[#0555c4] to-[#0566d6] text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-row justify-center items-start gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-center space-x-3">
              
              <div>
                <h3 className="text-xl font-bold">TAGANA</h3>
              </div>
            </div>
            <p className="text-sm text-blue-100 ">
              Sistem Informasi Manajemen Bencana untuk Desa Sriharjo, membantu
              koordinasi dan respons cepat dalam situasi darurat.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-400 opacity-30 my-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-blue-100">
            <span>2025 Contributor : Sagara Imam Samudra | Heri Arista | Naufal Adna Garibaldi</span>
          </div>
            
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-400 opacity-30 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-blue-100">
              
              <span>© {currentYear} TAGANA Sriharjo. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-blue-100">
              <span className="hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="text-blue-400">•</span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional decorative wave at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400"></div>
    </footer>
  );
}
