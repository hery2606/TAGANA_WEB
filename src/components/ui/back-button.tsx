"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  href: string;
  label: string;
}

export function BackButton({ href, label }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        router.push(href);
      }}
      type="button"
      className="relative inline-flex items-center space-x-2 bg-white text-[#044BB1] rounded-lg px-5 py-3 mb-4 
        transition-all duration-300 ease-in-out
        shadow-md hover:shadow-xl
        transform hover:-translate-y-0.5
        font-semibold group cursor-pointer
        hover:bg-gradient-to-r hover:from-white hover:to-blue-50
        active:transform active:translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
    >
      <div className="relative z-10 flex items-center">
        <svg
          className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300 ease-in-out"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="ml-2 relative">
          <span className="relative z-10 group-hover:text-[#0555c4] transition-colors duration-300">
            {label}
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#044BB1] group-hover:w-full transition-all duration-300 ease-in-out"></span>
        </span>
      </div>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
    </button>
  );
}