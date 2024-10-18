"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Users,
  BarChart2,
  Settings,
  Home,
  Store,
  ArrowRight,
} from "lucide-react";
import ProductPage from "../products/components/products";
import AnalyticsPage from "../analytics/components/analytics";
import SettingsPage from "../settings/components/settings";
import CustomersPage from "../customers/components/customers";
import StorePreview from "../preview/components/preview";
import { Header } from "./components/main-header";

// Components for each section
function OnlineStoreSection() {
  return <StorePreview />;
}

function ProductSection() {
  return (
    <div>
      <ProductPage />
    </div>
  );
}
function CustomersSection() {
  return <CustomersPage />;
}

function AnalyticsSection() {
  return <AnalyticsPage />;
}

function SettingsSection() {
  return <SettingsPage />;
}

// Menu items with names for hover tooltips
const menuItems = [
  { name: "Home", icon: Home, component: null },
  { name: "Products", icon: Package, component: ProductSection },
  { name: "Customers", icon: Users, component: CustomersSection },
  { name: "Analytics", icon: BarChart2, component: AnalyticsSection },
  { name: "Store Preview", icon: Store, component: OnlineStoreSection },
  { name: "Settings", icon: Settings, component: SettingsSection },
];

export default function DashboardLayout() {
  const [activeItem, setActiveItem] = useState("Home");

  // Get the component for the active item
  const ActiveComponent = menuItems.find(
    (item) => item.name === activeItem,
  )?.component;

  return (
    <div className="h-screen bg-gray-100">
      <Header />

      <div className="flex h-[calc(100%-4rem)]">
        {" "}
        {/* Adjust height to exclude header */}
        {/* Static Sidebar */}
        <aside className="w-12 md:w-20 py-2 bg-red-200 shadow-md h-full border-r border-gray-300">
          <nav className="h-full flex flex-col space-y-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href="#"
                className="group relative flex items-center justify-center p-2 rounded-md transition-colors duration-200"
                onClick={() => setActiveItem(item.name)}
              >
                <item.icon
                  className={`h-5 w-5 md:h-6 md:w-6 ${
                    activeItem === item.name ? "text-blue-500" : "text-gray-600"
                  }`}
                />
              </Link>
            ))}
          </nav>
        </aside>
        {/* Main content */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="relative z-10">
            {ActiveComponent && <ActiveComponent />}

            {/* Onboarding Info section */}
            {activeItem === "Home" && (
              <div className="min-h-screen flex items-center justify-center p-2 md:p-4">
                <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl">
                  <div className="p-6 border-b border-gray-300">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                      Welcome to Your Online Shop Journey
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600">
                      Here&apos;s what you need to know to get started
                    </p>
                  </div>
                  <div className="p-6 space-y-4">
                    {[
                      {
                        title: "Add your first product",
                        description:
                          "Create a product listing with details, images, and pricing.",
                      },
                      {
                        title: "Add a custom domain",
                        description:
                          "Connect your own domain to give your store a professional look.",
                      },
                      {
                        title: "Customize your online store",
                        description:
                          "Choose a theme and customize colors, fonts, and layout.",
                      },
                      {
                        title: "Name your store",
                        description:
                          "Pick a unique and memorable name for your online shop.",
                      },
                      {
                        title: "Set up a payment provider",
                        description:
                          "Connect a payment gateway to accept online payments.",
                      },
                      {
                        title: "Place a test order",
                        description:
                          "Simulate a customer purchase to ensure everything works correctly.",
                      },
                    ].map((task, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
                      >
                        <div className="text-sm sm:text-lg font-medium text-gray-700">
                          {task.title}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          {task.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 border-t border-gray-300">
                    <div className="text-xs sm:text-sm text-gray-500 mb-4">
                      Your store will be billed at{" "}
                      <span className="font-semibold">$29/month</span> after the
                      14-day free trial
                    </div>
                    <div className="flex justify-center">
                      <button
                        className="bg-blue-500 text-white p-3 rounded-lg flex justify-center items-center"
                        onClick={() => setActiveItem("Products")}
                      >
                        Start building your store{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
