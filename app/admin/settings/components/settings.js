"use client";
import { useState } from "react";
import { ProfileSettings } from "./profilesettings";
import { StoreSettings } from "./storesettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="w-full">
        <div className="flex space-x-4 mb-6">
          <button
            className={`py-2 px-4 rounded-md ${activeTab === "profile" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Settings
          </button>
          <button
            className={`py-2 px-4 rounded-md ${activeTab === "store" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveTab("store")}
          >
            Online Store Settings
          </button>
        </div>

        <div>
          {activeTab === "profile" && (
            <div>
              <ProfileSettings />
            </div>
          )}
          {activeTab === "store" && (
            <div>
              <StoreSettings />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
