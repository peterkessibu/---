"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  ListCheck,
  Package,
  Users,
  BarChart2,
  Tag,
  Settings,
  Menu,
  X,
  Store,
} from "lucide-react";
import Homepage from "./components/homepage";
import InventoryTrackingPage from "../inventory/page";
import ProductPage from "../products/page";
import AnalyticsPage from "../analytics/page";
import SettingsPage from "../settings/page";
import DiscountsPage from "../discounts/page";
import CustomersPage from "../customers/page";
import StorePreview from "../preview/page";

// Components for each section
function HomeSection() {
  return (
    <div>
      <Homepage />
    </div>
  );
}
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
      <InventoryTrackingPage />
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
  { name: "Home", icon: Home, component: HomeSection },
  { name: "Online Store", icon: Store, component: OnlineStoreSection },
  { name: "Products", icon: Package, component: ProductSection },
  { name: "Inventory", icon: ListCheck, component: InventorySection },
  { name: "Customers", icon: Users, component: CustomersSection },
  { name: "Discounts", icon: Tag, component: DiscountsSection },
  { name: "Analytics", icon: BarChart2, component: AnalyticsSection },
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
      <main className="flex-1 p-8 overflow-auto">
        {ActiveComponent && <ActiveComponent />}{" "}
      </main>
    </div>
  );
}
