"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  storeName: z.string().min(2, {
    message: "Store name must be at least 2 characters.",
  }),
  storeDescription: z.string().max(500, {
    message: "Store description must not exceed 500 characters.",
  }),
  timezone: z.string({
    required_error: "Please select a timezone.",
  }),
  currency: z.string({
    required_error: "Please select a currency.",
  }),
  paymentMethods: z.array(z.object({
    method: z.string(),
    phoneNumber: z.string().optional(),
    nameConfirmation: z.string().optional(),
  })).refine((value) => value.some((item) => item.method), {
    message: "You have to select at least one payment method.",
  }),
  deliveryServices: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one delivery service.",
  }),
  orderPrefix: z.string().min(1, {
    message: "Order prefix is required.",
  }),
  allowGuestCheckout: z.boolean(),
  enableReviews: z.boolean(),
  enableWishlist: z.boolean(),
  socialMedia: z.object({
    facebook: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
    instagram: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
    twitter: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  }),
})

export function StoreSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
      storeDescription: "",
      timezone: "GMT",
      currency: "GHS",
      paymentMethods: [],
      deliveryServices: [],
      orderPrefix: "ORD-",
      allowGuestCheckout: false,
      enableReviews: true,
      enableWishlist: true,
      socialMedia: {
        facebook: "",
        instagram: "",
        twitter: "",
      },
    },
  })

  function onSubmit(values) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings updated",
        description: "Your store settings have been successfully updated.",
      })
      console.log(values)
    }, 1000)
  }

  const paymentMethods = [
    { id: "momo", label: "Mobile Money" },
    { id: "telecel", label: "Telecel Cash" },
    { id: "at", label: "AT Cash" },
  ]

  const deliveryServices = [
    { id: "speedaf", label: "Speedaf" },
    { id: "ghanapost", label: "Ghana Post" },
    { id: "other", label: "Other" },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Store Settings</h2>
      <p className="mb-4">Manage your Store information and preferences.</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="tabs flex space-x-4 mb-6">
          <button
            type="button"
            className={`flex-1 py-2 text-center rounded-lg ${activeTab === "general" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center rounded-lg ${activeTab === "payment" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("payment")}
          >
            Payment
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center rounded-lg ${activeTab === "delivery" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("delivery")}
          >
            Delivery
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center rounded-lg ${activeTab === "advanced" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("advanced")}
          >
            Advanced
          </button>
        </div>

        {activeTab === "general" && (
          <div className="border rounded-lg shadow p-6">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-lg font-semibold">Store Settings</h2>
              <p className="text-sm text-gray-500">
                Manage your store&apos;s general settings and preferences.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Store Name</label>
                <input
                  type="text"
                  placeholder="My Awesome Store"
                  {...form.register("storeName")}
                  className="block w-full mt-1 px-3 py-2 border rounded-md"
                />
                <p className="text-xs text-gray-500">
                  This is the name that will be displayed to your customers.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium">Store Description</label>
                <textarea
                  placeholder="Tell customers about your store..."
                  {...form.register("storeDescription")}
                  className="block w-full mt-1 px-3 py-2 border rounded-md resize-none"
                />
                <p className="text-xs text-gray-500">Briefly describe your store and what you sell.</p>
              </div>
              <div>
                <label className="block text-sm font-medium">Timezone</label>
                <select
                  {...form.register("timezone")}
                  className="block w-full mt-1 px-3 py-2 border rounded-md"
                >
                  <option value="GMT">GMT</option>
                </select>
                <p className="text-xs text-gray-500">Choose the timezone for your store operations.</p>
              </div>
              <div>
                <label className="block text-sm font-medium">Currency</label>
                <select
                  {...form.register("currency")}
                  className="block w-full mt-1 px-3 py-2 border rounded-md"
                >
                  <option value="GHS">Ghana Cedis (GHS)</option>
                </select>
                <p className="text-xs text-gray-500">Select the primary currency for your store.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="border rounded-lg shadow p-6">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-lg font-semibold">Payment Methods</h2>
              <p className="text-sm text-gray-500">
                Select the payment methods you want to offer.
              </p>
            </div>
            <div className="space-y-4">
              {paymentMethods.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      {...form.register("paymentMethods")}
                      value={item.id}
                      className="mt-1"
                    />
                    <label className="text-sm font-medium">{item.label}</label>
                  </div>
                  {["momo", "telecel", "at"].includes(item.id) && (
                    <div className="ml-6 space-y-2">
                      <div>
                        <label className="block text-sm font-medium">Phone Number (+233)</label>
                        <input
                          type="text"
                          {...form.register(`paymentMethods.${item.id}.phoneNumber`)}
                          className="block w-full mt-1 px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Name Confirmation</label>
                        <input
                          type="text"
                          {...form.register(`paymentMethods.${item.id}.nameConfirmation`)}
                          className="block w-full mt-1 px-3 py-2 border rounded-md"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "delivery" && (
          <div className="border rounded-lg shadow p-6">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-lg font-semibold">Delivery Services</h2>
              <p className="text-sm text-gray-500">
                Select the delivery services you want to offer.
              </p>
            </div>
            <div className="space-y-4">
              {deliveryServices.map((item) => (
                <div key={item.id} className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    {...form.register("deliveryServices")}
                    value={item.id}
                    className="mt-1"
                  />
                  <label className="text-sm font-medium">{item.label}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "advanced" && (
          <div className="border rounded-lg shadow p-6">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-lg font-semibold">Advanced Settings</h2>
              <p className="text-sm text-gray-500">
                Configure advanced settings for your store.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div>
                  <label className="block text-sm font-medium">Allow Guest Checkout</label>
                  <p className="text-xs text-gray-500">
                    Enable customers to checkout without creating an account.
                  </p>
                </div>
                <input
                  type="checkbox"
                  {...form.register("allowGuestCheckout")}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div>
                  <label className="block text-sm font-medium">Enable Product Reviews</label>
                  <p className="text-xs text-gray-500">
                    Allow customers to leave reviews on your products.
                  </p>
                </div>
                <input
                  type="checkbox"
                  {...form.register("enableReviews")}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div>
                  <label className="block text-sm font-medium">Enable Wishlist</label>
                  <p className="text-xs text-gray-500">
                    Allow customers to create and manage wishlists.
                  </p>
                </div>
                <input
                  type="checkbox"
                  {...form.register("enableWishlist")}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )}

        <div className="text-right">
          <button
            type="submit"
            disabled={isLoading}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  )
}