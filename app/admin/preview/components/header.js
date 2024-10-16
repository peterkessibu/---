import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useRouter } from 'next/router';

const Header = ({ user, setUser, cart, toggleCart, cartOpen, cartRef, totalItems }) => {
    const [storeName, setStoreName] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Fetch store name from API
        fetch('/api/store-settings')
            .then(response => response.json())
            .then(data => setStoreName(data.storeName));
    }, []);

    const handleSignIn = () => setUser({ name: 'John Doe' });
    const handleSignOut = () => setUser(null);
    const handleSignUp = () => alert('Sign up functionality to be implemented');
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <header className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{storeName}</h1>
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="py-1 px-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        </div>
                        {user ? (
                            <>
                                <span>Welcome, {user.name}</span>
                                <button onClick={handleSignOut} className="hover:text-blue-400 transition-colors">
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleSignUp} className="hover:text-blue-400 transition-colors">
                                    Sign Up
                                </button>
                                <button onClick={handleSignIn} className="hover:text-blue-400 transition-colors">
                                    Sign In
                                </button>
                            </>
                        )}
                        <div className="relative" ref={cartRef}>
                            <button onClick={toggleCart} className="relative">
                                <ShoppingCart className="w-6 h-6" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                            {cartOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10">
                                    {/* Cart items */}
                                </div>
                            )}
                        </div>
                    </div>
                    <button className="md:hidden" onClick={toggleMobileMenu}>
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
            {mobileMenuOpen && (
                <div className="md:hidden bg-gray-700 py-2">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col space-y-2">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="py-1 px-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {user ? (
                                <>
                                    <span>Welcome, {user.name}</span>
                                    <button onClick={handleSignOut} className="hover:text-blue-400 transition-colors">
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleSignUp} className="hover:text-blue-400 transition-colors">
                                        Sign Up
                                    </button>
                                    <button onClick={handleSignIn} className="hover:text-blue-400 transition-colors">
                                        Sign In
                                    </button>
                                </>
                            )}
                            <button className="relative self-start">
                                <ShoppingCart className="w-6 h-6" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {cart.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;