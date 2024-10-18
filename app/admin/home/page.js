"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ListCheck,
  Package,
  Users,
  BarChart2,
  Tag,
  Settings,
  Menu,
  X,
  Store,
  ArrowRight,
  Info,
} from "lucide-react";
import InventoryPage from "../inventory/page";
import ProductPage from "../products/page";
import AnalyticsPage from "../analytics/page";
import SettingsPage from "../settings/page";
import DiscountsPage from "../discounts/page";
import CustomersPage from "../customers/page";
import StorePreview from "../preview/page";

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

function InventorySection() {
  return (
    <div>
      <InventoryPage />
    </div>
  );
}

function CustomersSection() {
  return <CustomersPage />;
}

function AnalyticsSection() {
  return <AnalyticsPage />;
}

function DiscountsSection() {
  return <DiscountsPage />;
}

function SettingsSection() {
  return <SettingsPage />;
}

// Menu items
const menuItems = [
  { name: "Products", icon: Package, component: ProductSection },
  { name: "Inventory", icon: ListCheck, component: InventorySection },
  { name: "Customers", icon: Users, component: CustomersSection },
  { name: "Discounts", icon: Tag, component: DiscountsSection },
  { name: "Analytics", icon: BarChart2, component: AnalyticsSection },
  { name: "Online Store", icon: Store, component: OnlineStoreSection },
  { name: "Settings", icon: Settings, component: SettingsSection },
];

export default function DashboardLayout() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  const toggleAside = () => setIsAsideOpen(!isAsideOpen);

  // Get the component for the active item
  const ActiveComponent = menuItems.find(
    (item) => item.name === activeItem,
  )?.component;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-white rounded-md shadow-md"
        onClick={toggleAside}
        aria-label="Toggle menu"
      >
        {isAsideOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Aside */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
          ${isAsideOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-0
        `}
      >
        <nav className="h-full flex flex-col p-4">
          <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href="#"
              className={`
                flex items-center px-4 py-2 mb-2 rounded-md transition-colors duration-200
                ${activeItem === item.name
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
                }
              `}
              onClick={() => {
                setActiveItem(item.name);
                setIsAsideOpen(false);
              }}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto h-screen">
        {ActiveComponent && <ActiveComponent />}

        {/* Onboarding Info section */}
        {activeItem === "Home" && (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold">Welcome to Your Online Shop Journey</h2>
                <p className="text-gray-500">Here&apos;s what you need to know to get started</p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Your store setup involves 7 key steps</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "0%" }}></div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Add your first product", description: "Create a product listing with details, images, and pricing." },
                    { title: "Add a custom domain", description: "Connect your own domain to give your store a professional look." },
                    { title: "Customize your online store", description: "Choose a theme and customize colors, fonts, and layout." },
                    { title: "Name your store", description: "Pick a unique and memorable name for your online shop." },
                    { title: "Set up a payment provider", description: "Connect a payment gateway to accept online payments." },
                    { title: "Place a test order", description: "Simulate a customer purchase to ensure everything works correctly." },
                  ].map((task, index) => (
                    <div key={index} className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100">
                      <div className="text-lg font-medium">{task.title}</div>
                      <p className="text-gray-600 mt-1">{task.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t">
                <div className="text-sm text-gray-500 mb-4">
                  Your store will be billed at <span className="font-semibold">$29/month</span> after the 14-day free trial
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex justify-center items-center"
                    onClick={() => {
                      setActiveItem("Products");
                      setIsAsideOpen(false);
                    }}
                  >
                    Start building your store <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
