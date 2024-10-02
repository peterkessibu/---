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

  // State to track completed tasks
  const [completedTasks, setCompletedTasks] = useState([]);

  // Function to mark tasks as complete
  const handleCompleteTask = (task) => {
    if (!completedTasks.includes(task)) {
      setCompletedTasks([...completedTasks, task]);
    }
  };

  // Calculate progress
  const progress = (completedTasks.length / tasks.length) * 100;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Get ready to sell!
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Here&apos;s your personalized guide to get started. Follow the steps
        below to launch your store and track your progress.
      </p>

      {/* Setup Guide */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
        {/* Header with progress */}
        <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-50">
          <h2 className="text-xl font-semibold text-blue-800">Setup Guide</h2>
          <p className="text-sm text-gray-600">
            Complete the tasks to get your store ready.
          </p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-700">
              {completedTasks.length} of {tasks.length} tasks completed
            </span>
          </div>
        </div>

        {/* Task list */}
        <div className="p-6">
          {tasks.map((task, index) => (
            <div
              key={index}
              className={`flex items-center py-4 px-3 border-t border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors ${
                completedTasks.includes(task) ? "bg-green-50" : ""
              }`}
              onClick={() => handleCompleteTask(task)}
            >
              <div
                className={`w-8 h-8 rounded-full border-2 ${
                  completedTasks.includes(task)
                    ? "border-green-600 bg-green-100"
                    : "border-gray-300"
                } flex items-center justify-center mr-4`}
              >
                {completedTasks.includes(task) ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <ShoppingBag className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <span
                className={`flex-grow text-md font-medium ${
                  completedTasks.includes(task)
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {task}
              </span>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>
          ))}

          {/* Current Task Section */}
          <div className="mt-8 bg-blue-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-md font-semibold text-blue-700">
              Add your first product
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Write a description, add photos, and set pricing for the products
              you plan to sell.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition-all"
              onClick={() => handleCompleteTask("Add your first product")}
            >
              Add Product
            </button>
            <div className="mt-4">
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
