"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        background: "black",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center leading-tight">
        <div className="text-white font-bold text-xl">campusdice.ai</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white lading-tight">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>

          <li>
            <Link href="/contact">Contact</Link>
          </li>
          {/* <li>
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              login
            </Link>
          </li> */}
          <li>
            <Link href="/signup" onClick={() => setMenuOpen(false)}> 
              sign up
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-black/70 backdrop-blur-lg flex flex-col space-y-4 px-6 py-4 text-white">
          <li>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>

          <li>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            {/* <Link href="/login" onClick={() => setMenuOpen(false)}>
              login
            </Link> */}
            <Link href="/signup" onClick={() => setMenuOpen(false)}>
              ign up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
