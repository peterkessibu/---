"use client";
import { Check, ShoppingCart, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Create a simple Button component
function Button({ children, className, onClick }) {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// PricingHeader component merged into PricingPage
function PricingHeader() {
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
          href="/start"
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
          <Link
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300"
            href="#"
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}

export default function PricingPage() {
  const plans = [
    {
      title: "Basic",
      description: "For small businesses",
      price: "$19/mo",
      features: [
        "Up to 100 products",
        "Up to 5 categories",
        "Inventory limit: 500 items",
        "2% transaction fee",
        "Basic analytics",
      ],
    },
    {
      title: "Pro",
      description: "For growing businesses",
      price: "$49/mo",
      features: [
        "Unlimited products",
        "Up to 20 categories",
        "Inventory limit: 5,000 items",
        "1% transaction fee",
        "Advanced analytics",
      ],
    },
    {
      title: "Enterprise",
      description: "For large businesses",
      price: "$99/mo",
      features: [
        "Unlimited products",
        "Unlimited categories",
        "Inventory limit: 50,000 items",
        "0.5% transaction fee",
        "Premium support",
      ],
    },
  ];

  return (
    <div>
      <PricingHeader />
      <section
        id="pricing"
        className="flex flex-col h-3/4 justify-center items-center w-full"
      >
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
            Choose Your Plan
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.title}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col h-full justify-between"
              >
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-bold">{plan.title}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
                <div className="text-gray-700 text-center">
                  <p className="text-4xl font-bold">{plan.price}</p>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="text-green-500 mr-2 w-12" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 text-center">
                  <Button className="w-full">Choose {plan.title}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
