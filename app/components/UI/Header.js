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
        <header className="p-4 flex items-center justify-between bg-white">
            <Link className="flex items-center" href="#">
                <ShoppingCart className="h-6 w-6" />
                <span className="ml-2 text-lg font-semibold">Acme Inc</span>
            </Link>

            {/* Menu for larger screens */}
            <nav className="hidden md:flex space-x-4">
                {/* Use #anchors for sections like Features and FAQs */}
                <a className="text-black hover:underline" href="#features">Features</a>
                <Link className="text-black hover:underline" href="/pricing">Pricing</Link>
                <a className="text-black hover:underline" href="#faqs">FAQs</a>
                <Link className="text-black hover:underline" href="#">Sign In</Link>
                <Link className="text-black hover:underline" href="/start">Start free trial</Link>
            </nav>

            {/* Mobile Menu Icon */}
            <button
                className="md:hidden block"
                onClick={toggleMenu}
            >
                <Menu className="h-6 w-6" />
            </button>

            {/* Dropdown Menu for Mobile */}
            {isMenuOpen && (
                <div className="absolute top-16 right-0 mr-2 bg-white shadow-lg rounded-md py-2 w-48 md:hidden">
                    {/* Mobile links */}
                    <a className="block px-4 py-2 text-black hover:bg-gray-100" href="#features">Features</a>
                    <Link className="block px-4 py-2 text-black hover:bg-gray-100" href="/pricing">Pricing</Link>
                    <a className="block px-4 py-2 text-black hover:bg-gray-100" href="#faqs">FAQs</a>
                    <Link className="block px-4 py-2 text-black hover:bg-gray-100" href="#">Login</Link>
                    <Link className="block px-4 py-2 text-black hover:bg-gray-100" href="/start">Start free trial</Link>
                </div>
            )}
        </header>
    );
}
