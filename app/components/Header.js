// components/Header.js
import { ShoppingCart, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="p-4 px-6 flex items-center justify-between bg-white shadow-mg mx-12">
      {/* Left side: Logo/ShoppingCart */}
      <div className="flex items-center">
        <Link href="#" className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6 text-gray-900" />
          <span className="text-lg font-semibold text-gray-900">Acme Inc</span>
        </Link>
      </div>

      {/* Centered links for larger screens */}
      <nav className="hidden md:flex space-x-8 flex-grow mx-8">
        <a
          className="text-gray-700 hover:text-blue-500 transition duration-300"
          href="#features"
        >
          Features
        </a>
        <Link
          className="text-gray-700 hover:text-blue-500 transition duration-300"
          href="/pricing"
        >
          Pricing
        </Link>
        <a
          className="text-gray-700 hover:text-blue-500 transition duration-300"
          href="#faqs"
        >
          FAQs
        </a>
      </nav>

      {/* Right side: Login and Start Free Trial (for larger screens) */}
      <div className="hidden md:flex items-center space-x-6">
        <Link
          className="text-gray-700 hover:text-blue-500 transition duration-300"
          href="#"
        >
          Sign In
        </Link>
        <Link
          className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          href="/aboutinfo"
        >
          Start free trial
        </Link>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden items-center">
        {/* "Start Free Trial" button on the left side of menu */}
        <Link
          className="text-white bg-blue-500 px-3 py-2 rounded hover:bg-blue-600 transition duration-300 mr-4"
          href="/aboutinfo"
        >
          Start free trial
        </Link>

        {/* Mobile Menu Icon */}
        <button onClick={toggleMenu}>
          <Menu className="h-6 w-6 text-gray-900" />
        </button>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 mr-2 bg-white shadow-lg rounded-md py-2 w-48 md:hidden z-50">
          <a
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300"
            href="#features"
          >
            Features
          </a>
          <Link
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300"
            href="/pricing"
          >
            Pricing
          </Link>
          <a
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300"
            href="#faqs"
          >
            FAQs
          </a>
          <Link
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300"
            href="/api/auth/sign-in"
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}
