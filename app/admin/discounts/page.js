"use client"

import React, { useState } from "react"
import { PlusIcon, MinusIcon, CalendarIcon, TagIcon, ShoppingBagIcon, Trash2Icon } from "lucide-react"

export default function PromotionManagement() {
  const [promotions, setPromotions] = useState([])
  const [newPromotion, setNewPromotion] = useState({
    name: "",
    type: "daily",
    target: "category",
    targetValue: "",
    discountType: "percentage",
    value: "",
    active: false,
  })

  const handleInputChange = (name, value) => {
    setNewPromotion((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPromotions((prev) => [...prev, { ...newPromotion, id: Date.now() }])
    setNewPromotion({
      name: "",
      type: "daily",
      target: "category",
      targetValue: "",
      discountType: "percentage",
      value: "",
      active: false,
    })
  }

  const togglePromotionStatus = (id) => {
    setPromotions((prev) =>
      prev.map((promo) =>
        promo.id === id ? { ...promo, active: !promo.active } : promo
      )
    )
  }

  const deletePromotion = (id) => {
    setPromotions((prev) => prev.filter((promo) => promo.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Promotion Management</h1>

      {/* Add New Promotion Card */}
      <div className="bg-white shadow-md rounded-lg">
        <div className="p-4 md:p-6 border-b">
          <h2 className="text-xl font-semibold">Add New Promotion</h2>
          <p className="text-gray-500">Create a new promotion for your store</p>
        </div>
        <div className="p-4 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Promotion Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Promotion Name</label>
                <input
                  id="name"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  value={newPromotion.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              {/* Promotion Type */}
              <div className="space-y-2">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Promotion Type</label>
                <select
                  id="type"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  value={newPromotion.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekend">Weekend</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              {/* Target */}
              <div className="space-y-2">
                <label htmlFor="target" className="block text-sm font-medium text-gray-700">Target</label>
                <select
                  id="target"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  value={newPromotion.target}
                  onChange={(e) => handleInputChange("target", e.target.value)}
                >
                  <option value="category">Category</option>
                  <option value="item">Specific Item</option>
                </select>
              </div>
              {/* Target Value */}
              <div className="space-y-2">
                <label htmlFor="targetValue" className="block text-sm font-medium text-gray-700">Target Value</label>
                <input
                  id="targetValue"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  value={newPromotion.targetValue}
                  onChange={(e) => handleInputChange("targetValue", e.target.value)}
                  required
                  placeholder={newPromotion.target === "category" ? "e.g. Electronics" : "e.g. Product SKU"}
                />
              </div>
              {/* Discount Type */}
              <div className="space-y-2">
                <label htmlFor="discountType" className="block text-sm font-medium text-gray-700">Discount Type</label>
                <select
                  id="discountType"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  value={newPromotion.discountType}
                  onChange={(e) => handleInputChange("discountType", e.target.value)}
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              {/* Discount Value */}
              <div className="space-y-2">
                <label htmlFor="value" className="block text-sm font-medium text-gray-700">Discount Value</label>
                <input
                  id="value"
                  type="number"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  value={newPromotion.value}
                  onChange={(e) => handleInputChange("value", e.target.value)}
                  required
                  placeholder={newPromotion.discountType === "percentage" ? "e.g. 15" : "e.g. 10"}
                />
              </div>
            </div>
            {/* Active Switch */}
            <div className="flex items-center space-x-2">
              <input
                id="active"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={newPromotion.active}
                onChange={(e) => handleInputChange("active", e.target.checked)}
              />
              <label htmlFor="active" className="text-sm font-medium text-gray-700">Active</label>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Promotion
            </button>
          </form>
        </div>
      </div>

      {/* Active Promotions Card */}
      <div className="bg-white shadow-md rounded-lg">
        <div className="p-4 md:p-6 border-b">
          <h2 className="text-xl font-semibold">Active Promotions</h2>
          <p className="text-gray-500">Manage your current promotions</p>
        </div>
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {promotions.map((promo) => (
              <div key={promo.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="mb-2">
                  <h3 className="text-lg font-medium">{promo.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    {promo.type === "daily" && <CalendarIcon className="mr-1 h-4 w-4" />}
                    {promo.type === "weekend" && <CalendarIcon className="mr-1 h-4 w-4" />}
                    {promo.type === "custom" && <TagIcon className="mr-1 h-4 w-4" />}
                    {promo.type.charAt(0).toUpperCase() + promo.type.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <ShoppingBagIcon className="mr-1 h-4 w-4" />
                    {promo.target === "category" ? "Category: " : "Item: "}
                    {promo.targetValue}
                  </p>
                  <p className="text-sm font-semibold mt-2">
                    {promo.discountType === "percentage" ? `${promo.value}% off` : `$${promo.value} off`}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${promo.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {promo.active ? "Active" : "Inactive"}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => togglePromotionStatus(promo.id)}
                      className={`px-3 py-1 text-sm rounded-md flex items-center ${promo.active
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    >
                      {promo.active ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => deletePromotion(promo.id)}
                      className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center"
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
