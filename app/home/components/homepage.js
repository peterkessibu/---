import { useState } from "react";
import { Check, ChevronRight, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function Homepage() {
  const tasks = [
    "Add your first product",
    "Add a custom domain",
    "Customize your online store",
    "Name your store",
    "Set your shipping rates",
    "Set up a payment provider",
    "Place a test order",
  ];

  // State to track which tasks are completed
  const [completedTasks, setCompletedTasks] = useState([]);

  // Function to handle task completion
  const handleCompleteTask = (task) => {
    if (!completedTasks.includes(task)) {
      setCompletedTasks([...completedTasks, task]);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-4">
        Get ready to sell!
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Here's your personalized guide to get started. As your business grows,
        you'll receive fresh tips and insights here.
      </p>

      <div className="bg-white border border-gray-300 rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-300 bg-gradient-to-r from-blue-100 to-blue-50 rounded-t-xl">
          <h2 className="text-xl font-semibold text-blue-800">Setup Guide</h2>
          <p className="text-sm text-gray-600">
            Follow this guide to get your store up and running smoothly.
          </p>
          <div className="mt-4 flex items-center text-sm text-gray-700">
            <Check className="w-5 h-5 mr-2 text-green-600" />
            <span>
              {completedTasks.length} / {tasks.length} tasks completed
            </span>
          </div>
        </div>

        <div className="p-6">
          {tasks.map((task, index) => (
            <div
              key={index}
              className={`flex items-center py-3 px-2 border-t border-gray-200 rounded-lg transition-all duration-200 hover:bg-blue-50 ${completedTasks.includes(task) ? "bg-green-50" : ""}`}
            >
              <div
                className={`w-7 h-7 rounded-full border-2 ${completedTasks.includes(task) ? "border-green-600 bg-green-100" : "border-gray-300"} flex items-center justify-center mr-4 cursor-pointer hover:border-blue-400`}
                onClick={() => handleCompleteTask(task)}
              >
                {completedTasks.includes(task) ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <ShoppingBag className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <span
                className={`flex-grow text-md font-medium ${completedTasks.includes(task) ? "line-through text-gray-400" : "text-gray-700"}`}
              >
                {task}
              </span>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>
          ))}

          <div className="flex items-start mt-8 bg-blue-50 p-4 rounded-lg shadow-inner">
            <div className="flex-grow">
              <h3 className="text-md font-semibold text-blue-700">
                Add your first product
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Write a description, add photos, and set pricing for the
                products you plan to sell.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition-all"
                onClick={() => handleCompleteTask("Add your first product")}
              >
                Add Product
              </button>
            </div>
            <div className="ml-4 flex-shrink-0">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Product placeholder"
                width={100}
                height={100}
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
