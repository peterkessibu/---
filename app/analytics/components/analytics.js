"use client";

import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker"; // Import the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for the date picker
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

// Sample data for the charts
const initialData = [
  { name: "Jan", sales: 4000, profit: 2400 },
  { name: "Feb", sales: 3000, profit: 1398 },
  { name: "Mar", sales: 2000, profit: 9800 },
  { name: "Apr", sales: 2780, profit: 3908 },
  { name: "May", sales: 1890, profit: 4800 },
  { name: "Jun", sales: 2390, profit: 3800 },
  { name: "Jul", sales: 3490, profit: 4300 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7d");
  const [data, setData] = useState(initialData); // State for data
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date
  const [isCalendarOpen, setCalendarOpen] = useState(false); // State for calendar visibility
  const calendarRef = useRef(null); // Ref for calendar pop-up

  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);
  const totalSessions = 15234; // Sample data
  const totalOrders = 1234; // Sample data

  // Function to refresh data
  const refreshData = () => {
    const newData = initialData.map((item) => ({
      ...item,
      sales: item.sales + Math.floor(Math.random() * 1000),
      profit: item.profit + Math.floor(Math.random() * 500),
    }));
    setData(newData);
  };

  // Function to fetch data based on selected date
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
    refreshData();
    setCalendarOpen(false); // Close calendar after date selection
  };

  // Close calendar when clicking outside of it
  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setCalendarOpen(false);
    }
  };

  // Effect to listen for click events outside of the calendar
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
