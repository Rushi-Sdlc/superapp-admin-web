import React from 'react';
import logo from '../../src/assets/logo.png';

interface HeaderProps {
  toggleSidebar: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, title }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-20 h-16">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="w-auto h-10 flex-shrink-0">
          <img
            src={logo}
            alt="App logo"
            className="h-full w-auto object-contain"
          />
        </div>

        {/* Toggle + Title Grouped */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle menu"
            className="text-gray-800 text-xl focus:outline-none hover:text-gray-600 transition-colors"
            onClick={toggleSidebar}
          >
            <i className="fas fa-bars"></i>
          </button>

          <h1 className="font-semibold text-gray-900 text-base md:text-lg truncate max-w-[140px] sm:max-w-[200px] md:max-w-[260px] lg:max-w-sm">
            {title}
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 md:gap-6">
        <button
          aria-label="Chat"
          className="text-gray-500 hover:text-gray-700 text-lg focus:outline-none transition-colors"
        >
          <i className="far fa-comment-alt"></i>
        </button>

        <button
          aria-label="Notifications"
          className="text-gray-500 hover:text-gray-700 text-lg focus:outline-none transition-colors"
        >
          <i className="far fa-bell"></i>
        </button>

        <div className="flex items-center gap-2 cursor-pointer select-none group">
          <div className="relative w-8 h-8">
            <img
              src="https://storage.googleapis.com/a1aa/image/9cb78551-fc58-45ef-d44f-556210541bcb.jpg"
              alt="User avatar"
              className="w-full h-full rounded-full object-cover border-2 border-transparent group-hover:border-gray-200 transition-all"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
          </div>
          <div className="hidden sm:block text-right leading-tight">
            <p className="text-gray-900 font-semibold text-sm">Admin Login</p>
            <p className="text-gray-400 text-xs truncate max-w-[120px]">
              www.ipap.com
            </p>
          </div>
          <i className="fas fa-chevron-down text-gray-400 text-xs hidden sm:block"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
