"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./analyticscard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./analyticsselect";
import {
  DollarSign,
  Users,
  ShoppingCart,
  RefreshCcw,
} from "lucide-react";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState({});
  const [dateRange, setDateRange] = useState("7d");
  const [activeTab, setActiveTab] = useState("invoice");
  const [invoiceHistory, setInvoiceHistory] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics");
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);

  const totalSales = analytics.product_added || 0;
  const totalProfit = analytics.discount_added || 0;
  const totalSessions = analytics.settings_updated || 0;
  const totalOrders = Object.values(analytics).reduce(
    (sum, value) => sum + value,
    0,
  );

  const refreshData = async () => {
    try {
      const response = await fetch("/api/analytics");
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Error refreshing analytics data:", error);
    }
  };

  const fetchHistory = async (type) => {
    if (!startDate || !endDate) return;

    try {
      const response = await fetch(`/api/${type}-history?start=${startDate}&end=${endDate}`);
      const data = await response.json();
      if (type === "invoice") {
        setInvoiceHistory(data);
      } else {
        setOrderHistory(data);
      }
    } catch (error) {
      console.error(`Error fetching ${type} history:`, error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="flex flex-col md:flex-row md:justify-between mb-6">
        <Select
          value={dateRange}
          onValueChange={setDateRange}
          className="ml-4 mb-4 md:mb-0"
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
        <button
          onClick={refreshData}
          className="ml-4 p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
          aria-label="Refresh data"
        >
          <RefreshCcw className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalSales.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalProfit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +15.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Online Store Sessions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalSessions.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalOrders.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mb-8">
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveTab("invoice")}
            className={`p-2 rounded shadow transition ${activeTab === "invoice" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
          >
            Invoice History
          </button>
          <button
            onClick={() => setActiveTab("order")}
            className={`p-2 rounded shadow transition ${activeTab === "order" ? "bg-purple-500 text-white" : "bg-gray-200"
              }`}
          >
            Order ID History
          </button>
        </div>
        <div className="mb-4 flex space-x-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded"
            placeholder="Start Date"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded"
            placeholder="End Date"
          />
          <button
            onClick={() => fetchHistory(activeTab)}
            className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
          >
            Fetch {activeTab === "invoice" ? "Invoice" : "Order ID"} History
          </button>
        </div>
        {activeTab === "invoice" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Invoice History</h2>
            {invoiceHistory.length > 0 ? (
              <ul>
                {invoiceHistory.map((invoice) => (
                  <li key={invoice.id}>{invoice.details}</li>
                ))}
              </ul>
            ) : (
              <p>No invoice history available for the selected date range.</p>
            )}
          </div>
        )}
        {activeTab === "order" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Order ID History</h2>
            {orderHistory.length > 0 ? (
              <ul>
                {orderHistory.map((order) => (
                  <li key={order.id}>{order.details}</li>
                ))}
              </ul>
            ) : (
              <p>No order ID history available for the selected date range.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}