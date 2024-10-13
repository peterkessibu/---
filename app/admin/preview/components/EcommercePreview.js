"use client";
import React, { useState, useRef, useEffect } from "react";
import { ShoppingCart, CreditCard, Search, User, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data for products
const ecommerceItems = [
  { id: 1, name: "Wireless Earbuds", unitPrice: 79.99, quantity: 50 },
  { id: 2, name: "Smart Watch", unitPrice: 199.99, quantity: 30 },
  { id: 3, name: "Bluetooth Speaker", unitPrice: 59.99, quantity: 40 },
  { id: 4, name: "Laptop Backpack", unitPrice: 49.99, quantity: 100 },
  { id: 5, name: "Portable Charger", unitPrice: 29.99, quantity: 200 },
  { id: 6, name: "Fitness Tracker", unitPrice: 89.99, quantity: 75 },
];

export default function EcommercePreview({
  initialCart = [],
  initialUser = null,
  storeName = "",
}) {
  const [cart, setCart] = useState(initialCart);
  const [user, setUser] = useState(initialUser);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);
  const router = useRouter();

  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(id);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout!");
    setCartOpen(false);
  };

  const handleSignIn = () => {
    setUser({ name: "John Doe" });
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const handleSignUp = () => {
    alert("Sign up functionality to be implemented");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handlePublish = () => {
    setIsPublished(true);
    const publishedUrl = `/admin/${storeName.toLowerCase().replace(/\s+/g, "_")}`;
    alert(
      `Store published! Access it at: ${window.location.origin}${publishedUrl}`,
    );
    // Optionally, redirect to the published URL
    // router.push(publishedUrl);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setCartOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart
    .reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="space-y-4">
      <div className="border-4 border-blue-500 rounded-lg overflow-hidden">
        <div className="bg-blue-500 text-white py-2 px-4 text-center font-bold">
          Preview Mode
        </div>
        <div className="min-h-screen flex flex-col">
          <header className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">TechGear Store</h1>
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
                      <button
                        onClick={handleSignOut}
                        className="hover:text-blue-400 transition-colors"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleSignUp}
                        className="hover:text-blue-400 transition-colors"
                      >
                        Sign Up
                      </button>
                      <button
                        onClick={handleSignIn}
                        className="hover:text-blue-400 transition-colors"
                      >
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
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2">
                            Your Cart
                          </h3>
                          {cart.length === 0 ? (
                            <div className="text-center py-8">
                              <p className="text-gray-500 mb-4">
                                Your cart is empty
                              </p>
                              <button
                                onClick={() => {
                                  setCartOpen(false);
                                  // You might want to scroll to the products section here
                                }}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                              >
                                Start Shopping
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="max-h-60 overflow-y-auto">
                                {cart.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center mb-4 border-b pb-2"
                                  >
                                    <img
                                      src={`/placeholder.svg?height=50&width=50&text=${item.name}`}
                                      alt={item.name}
                                      className="w-12 h-12 object-cover mr-2"
                                    />
                                    <div className="flex-grow">
                                      <h4 className="text-sm font-semibold">
                                        {item.name}
                                      </h4>
                                      <p className="text-xs text-gray-500">
                                        ${item.unitPrice.toFixed(2)} each
                                      </p>
                                      <div className="flex items-center mt-1">
                                        <button
                                          onClick={() =>
                                            handleUpdateQuantity(
                                              item.id,
                                              item.quantity - 1,
                                            )
                                          }
                                          className="text-gray-500 hover:text-gray-700"
                                        >
                                          -
                                        </button>
                                        <span className="mx-2 text-sm">
                                          {item.quantity}
                                        </span>
                                        <button
                                          onClick={() =>
                                            handleUpdateQuantity(
                                              item.id,
                                              item.quantity + 1,
                                            )
                                          }
                                          className="text-gray-500 hover:text-gray-700"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm font-semibold">
                                        $
                                        {(
                                          item.unitPrice * item.quantity
                                        ).toFixed(2)}
                                      </p>
                                      <button
                                        onClick={() =>
                                          handleRemoveFromCart(item.id)
                                        }
                                        className="text-xs text-red-500 hover:text-red-700"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-4 pt-2 border-t">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-semibold">Total:</span>
                                  <span>${totalPrice}</span>
                                </div>
                                <button
                                  onClick={handleCheckout}
                                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors flex items-center justify-center"
                                >
                                  <CreditCard className="w-5 h-5 mr-2" />{" "}
                                  Checkout
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button className="md:hidden" onClick={toggleMobileMenu}>
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
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
                        <button
                          onClick={handleSignOut}
                          className="hover:text-blue-400 transition-colors"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleSignUp}
                          className="hover:text-blue-400 transition-colors"
                        >
                          Sign Up
                        </button>
                        <button
                          onClick={handleSignIn}
                          className="hover:text-blue-400 transition-colors"
                        >
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

          <nav className="bg-gray-100 shadow-md">
            <div className="container mx-auto px-4 py-2">
              <ul className="flex space-x-4 overflow-x-auto">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 whitespace-nowrap"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 whitespace-nowrap"
                  >
                    Electronics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 whitespace-nowrap"
                  >
                    Accessories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 whitespace-nowrap"
                  >
                    Wearables
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 whitespace-nowrap"
                  >
                    Special Offers
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ecommerceItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={`/placeholder.svg?height=200&width=300&text=${item.name}`}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-2">
                      ${item.unitPrice.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      In stock: {item.quantity}
                    </p>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>

          <footer className="bg-gray-800 text-white mt-12">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">About Us</h3>
                  <p className="text-sm">
                    TechGear Store is your one-stop shop for all your tech
                    needs. We offer a wide range of high-quality electronics and
                    accessories at competitive prices.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm hover:text-blue-400 transition-colors"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm hover:text-blue-400 transition-colors"
                      >
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm hover:text-blue-400 transition-colors"
                      >
                        Shipping Information
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm hover:text-blue-400 transition-colors"
                      >
                        Returns & Exchanges
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                  <p className="text-sm mb-2">
                    Email: support@techgearstore.com
                  </p>
                  <p className="text-sm mb-2">Phone: (555) 123-4567</p>
                  <p className="text-sm">
                    Address: 123 Tech Street, Silicon Valley, CA 94000
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm">
                © 2023 TechGear Store. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handlePublish}
          className={`py-2 px-4 rounded transition-colors ${
            isPublished
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-bold`}
        >
          {isPublished ? "Published" : "Publish Store"}
        </button>
      </div>
    </div>
  );
}
