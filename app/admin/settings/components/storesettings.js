"use client";

import { useState } from "react";
import InputField from "./input";

export default function StoreSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    timezone: "UTC",
    storeName: "",
    currency: "",
    paymentMethods: [],
    deliveryServices: [],
  });
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    { id: "momo", label: "Mobile Money" },
    { id: "telecel", label: "Telecel Cash" },
    { id: "at", label: "AT Cash" },
  ];

  const deliveryServices = [
    { id: "speedaf", label: "Speedaf" },
    { id: "other", label: "Other" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value),
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (formData.storeName.length < 2) {
      newErrors.storeName = "Store name must be at least 2 characters";
    }
    if (formData.paymentMethods.length === 0) {
      newErrors.paymentMethods = "Select at least one payment method";
    }
    if (formData.deliveryServices.length === 0) {
      newErrors.deliveryServices = "Select at least one delivery service";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      console.log(formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div>
        <InputField label="Timezone" name="timezone" as="select" value={formData.timezone} onChange={handleInputChange} options={["UTC", "EST", "PST"]} />
      </div>
      <div>
        <InputField label="Store Name" name="storeName" required value={formData.storeName} onChange={handleInputChange} errors={errors} />
      </div>
      <div>
        <InputField label="Currency" name="currency" as="select" value={formData.currency} onChange={handleInputChange} options={["USD", "EUR", "GBP"]} />
      </div>
      <div>
        <fieldset>
          <legend className="text-sm font-medium text-gray-700">Payment Methods</legend>
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center">
              <input type="checkbox" id={method.id} name="paymentMethods" value={method.id} onChange={handleCheckboxChange} checked={formData.paymentMethods.includes(method.id)} />
              <label htmlFor={method.id} className="ml-2">{method.label}</label>
            </div>
          ))}
        </fieldset>
        {errors.paymentMethods && <p className="text-red-600">{errors.paymentMethods}</p>}
      </div>
      <div>
        <fieldset>
          <legend className="text-sm font-medium text-gray-700">Delivery Services</legend>
          {deliveryServices.map((service) => (
            <div key={service.id} className="flex items-center">
              <input type="checkbox" id={service.id} name="deliveryServices" value={service.id} onChange={handleCheckboxChange} checked={formData.deliveryServices.includes(service.id)} />
              <label htmlFor={service.id} className="ml-2">{service.label}</label>
            </div>
          ))}
        </fieldset>
        {errors.deliveryServices && <p className="text-red-600">{errors.deliveryServices}</p>}
      </div>
      <button type="submit" disabled={isLoading} className={`mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {isLoading ? 'Saving...' : 'Save Store Settings'}
      </button>
    </form>
  );
}
