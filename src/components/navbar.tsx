"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-slate-900 text-white shadow-lg fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          Campusdice.ai
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg">
          <Link href="/" className="hover:text-blue-400 transition">
            Home
          </Link>
        
          <Link href="/course" className="hover:text-blue-400 transition">
            Course
          </Link>
          <Link href="/about" className="hover:text-blue-400 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <Link href="/" className="hover:text-blue-400" onClick={toggleMenu}>
              Home
            </Link>
           
            <Link href="/course" className="hover:text-blue-400" onClick={toggleMenu}>
              Course
            </Link>
            <Link href="/about" className="hover:text-blue-400" onClick={toggleMenu}>
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-400" onClick={toggleMenu}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
