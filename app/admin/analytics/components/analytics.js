"use client";

import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  Calendar,
} from "lucide-react";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState({});
  const [dateRange, setDateRange] = useState("7d");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
    refreshData();
    setCalendarOpen(false);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setCalendarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="flex flex-col md:flex-row md:justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="relative">
            <button
              onClick={() => setCalendarOpen(!isCalendarOpen)}
              className="flex items-center border rounded-md p-2 bg-white shadow-sm hover:shadow-md transition"
              aria-label="Open calendar"
            >
              <Calendar className="h-5 w-5 text-gray-600" />
            </button>
            {isCalendarOpen && (
              <div
                ref={calendarRef}
                className="absolute z-50 bg-white border rounded-md mt-2 shadow-lg"
                style={{ left: "calc(100% + 0px)", top: "4" }}
              >
                <div className="flex justify-between items-center p-2 border-b">
                  <h2 className="font-medium">Select a Date</h2>
                  <button
                    onClick={() => setCalendarOpen(false)}
                    className="text-gray-500 hover:text-gray-800"
                    aria-label="Close calendar"
                  >
                    &times;
                  </button>
                </div>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="MMMM d, yyyy"
                  maxDate={new Date()}
                  inline
                  className="border-none"
                />
              </div>
            )}
          </div>
        </div>
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
    </div>
  );
}
