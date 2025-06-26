// components/Loader.tsx
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F172A] text-white">
      {/* Logo or Brand Initials */}
      <div className="mb-6 text-4xl font-bold tracking-widest text-accent animate-pulse">
        SUPERAPP
      </div>

      {/* Spinner */}
      <div className="relative w-16 h-16">
        <svg
          className="absolute w-full h-full animate-spin-slow"
          viewBox="0 0 50 50"
        >
          <circle
            className="text-gray-700"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            opacity="0.2"
          />
          <path
            className="text-accent"
            fill="currentColor"
            d="M25 5
            a 20 20 0 0 1 0 40
            a 20 20 0 0 1 0 -40"
          />
        </svg>
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-sm tracking-wider text-gray-400">
        Powering your digital world...
      </p>
    </div>
  );
};

export default Loader;
