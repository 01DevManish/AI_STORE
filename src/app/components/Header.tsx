'use client'
import React, { useState } from "react";

import Link from 'next/link';
import { FaRobot, FaChartLine, FaGlobe, FaStore, FaDollarSign, FaUser } from 'react-icons/fa'; // Corrected import

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [userName] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className="bg-[#0d1117] shadow-md  w-full z-10">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo section */}
        <div className="flex items-center space-x-2">
          <Link href="/">
             <span className="text-2xl font-bold">
            <span className="text-white">Store</span>
            <span className="text-indigo-400">.ai</span>
          </span>
          </Link>
         
        </div>

        {/* Centered Menu Items */}
        <div className="hidden md:flex items-center space-x-8 mx-auto">
          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('products')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="text-gray-300 hover:text-indigo-400 font-medium">
              Products
            </button>
            {openDropdown === 'products' && (
              <div className="absolute bg-[#161b22] border border-gray-700 rounded-md shadow-lg mt-2 w-[250px] rounded-[15px] hover:rounded-[15px]">
                <Link href="/New-AIs" className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-[15px] hover:rounded-[15px]">
                  <FaRobot className="inline mr-2" /> New AIs
                </Link>
                <Link href="/Most-Used-AIs" className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-[15px] hover:rounded-[15px]">
                  <FaChartLine className="inline mr-2" /> Most Used AIs
                </Link>
                <Link href="/Most-Saved-AIs" className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-[15px] hover:rounded-[15px]">
                  <FaGlobe className="inline mr-2" /> Most Saved AIs
                </Link>
                <Link href="/AI-Chrome-Extension" className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-[15px] hover:rounded-[15px]">
                  <FaStore className="inline mr-2" /> AI Chrome Extension
                </Link>
                <Link href="/AI-Apps" className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-[15px] hover:rounded-[15px]">
                  <FaDollarSign className="inline mr-2" /> AI Apps
                </Link>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('solutions')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="text-gray-300 hover:text-indigo-400 font-medium">
              Ranking
            </button>
            {openDropdown === 'solutions' && (
              <div className="absolute bg-[#161b22] border border-gray-700 rounded-md shadow-lg mt-2 w-[250px] rounded-[15px] hover:rounded-[15px]">
                <Link href="#" className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-[15px] hover:rounded-[15px]">
                  <FaChartLine className="inline mr-2" /> Top AI By Monthly
                </Link>
                <Link href="#" className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-[15px] hover:rounded-[15px]">
                  <FaGlobe className="inline mr-2" /> Top AI By Category
                </Link>
                <Link href="#" className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-[15px] hover:rounded-[15px]">
                  <FaStore className="inline mr-2" /> Top AI By Regions
                </Link>
                <Link href="#" className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-[15px] hover:rounded-[15px]">
                  <FaDollarSign className="inline mr-2" /> Top AI By Sources
                </Link>
                <Link href="#" className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-[15px] hover:rounded-[15px]">
                  <FaRobot className="inline mr-2" /> Top AI By Revenue
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" className="text-gray-300 hover:text-indigo-400 font-medium">About</Link>
          <Link href="#" className="text-gray-300 hover:text-indigo-400 font-medium">Resources</Link>
        </div>

        {/* Right Aligned Login/Profile Section */}
        <div className="hidden md:block">
          {userName ? (
            <div className="flex flex-col items-center">
              <FaUser className="text-gray-300 hover:text-indigo-400" />
              <span className="text-gray-300">{userName}</span>
            </div>
          ) : (
            <Link href="/login" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Login</Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-indigo-400 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0d1117] space-y-1 p-4">
          {/* Products Dropdown */}
          <div className="relative">
            <button 
              className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md"
              onClick={() => handleMouseEnter('products')}
            >
              Products
            </button>
            {openDropdown === 'products' && (
              <div className="bg-[#161b22] border border-gray-700 rounded-md shadow-lg mt-2 w-[250px] rounded-[15px]">
                <Link href="#" className="block text-gray-300 hover:bg-gray-700 px-4 py-2">
                  <FaRobot className="inline mr-2" /> Product 1
                </Link>
                <Link href="#" className="block text-gray-300 hover:bg-gray-700 px-4 py-2">
                  <FaChartLine className="inline mr-2" /> Product 2
                </Link>
                <Link href="#" className="block text-gray-300 hover:bg-gray-700 px-4 py-2">
                  <FaGlobe className="inline mr-2" /> Product 3
                </Link>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div className="relative">
            <button 
              className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md"
              onClick={() => handleMouseEnter('solutions')}
            >
              Solutions
            </button>
            {openDropdown === 'solutions' && (
              <div className="bg-[#161b22] border border-gray-700 rounded-md shadow-lg mt-2 w-[250px] rounded-[15px]">
                <Link href="#" className="block text-gray-300 hover:bg-gray-700 px-4 py-2">
                  <FaStore className="inline mr-2" /> Solution 1
                </Link>
                <Link href="#" className="block text-gray-300 hover:bg-gray-700 px-4 py-2">
                  <FaDollarSign className="inline mr-2" /> Solution 2
                </Link>
              </div>
            )}
          </div>

          {/* New Mobile-Only Menu Item */}
         

          <Link href="/about" className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md">About</Link>
          <Link href="#" className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md">Resources</Link>
          
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"><Link href="/login" className="block text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md">Login</Link></button>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-5 rounded-lg transition duration-300"><Link href="/login" className="block text-gray-300 hover:bg-gray-700 px-4 py-3 rounded-md">Publish</Link></button>
         

        </div>
        
      )}
    </nav>
  );
};

export default Header;