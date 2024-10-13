"use client";

import { useState } from "react";
import InputField from "./input";

export default function ProfileSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    currentResidence: "",
    studentIdNumber: "",
    schoolEmail: "",
    otherEmail: "",
    phoneNumber: "",
    whatsappNumber: "",
    snapchatUsername: "",
    facebookUsername: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (formData.firstName.length < 2)
      newErrors.firstName = "First name must be at least 2 characters";
    if (formData.lastName.length < 2)
      newErrors.lastName = "Last name must be at least 2 characters";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (formData.currentResidence.length < 5)
      newErrors.currentResidence = "Please enter a valid address";
    if (formData.studentIdNumber.length < 5)
      newErrors.studentIdNumber = "Please enter a valid student ID";
    if (!/^\S+@\S+\.\S+$/.test(formData.schoolEmail))
      newErrors.schoolEmail = "Please enter a valid school email";
    if (formData.otherEmail && !/^\S+@\S+\.\S+$/.test(formData.otherEmail))
      newErrors.otherEmail = "Please enter a valid email";
    if (formData.phoneNumber.length < 10)
      newErrors.phoneNumber = "Please enter a valid phone number";
    if (formData.whatsappNumber.length < 10)
      newErrors.whatsappNumber = "Please enter a valid WhatsApp number";
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
    <form
      onSubmit={handleSubmit}
      className="space-y-8 w-full mx-auto p-4 bg-white shadow-lg rounded-lg"
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <InputField
            label="First Name"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleInputChange}
            errors={errors}
          />
          <InputField
            label="Last Name"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleInputChange}
            errors={errors}
          />
          <InputField
            label="Middle Name"
            name="middleName"
            value={formData.middleName}
            onChange={handleInputChange}
          />
          <InputField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            required
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            errors={errors}
          />
        </div>
        <InputField
          label="Current Residence"
          name="currentResidence"
          required
          value={formData.currentResidence}
          onChange={handleInputChange}
          errors={errors}
        />
        <InputField
          label="Student ID Number"
          name="studentIdNumber"
          required
          value={formData.studentIdNumber}
          onChange={handleInputChange}
          errors={errors}
        />
        <InputField
          label="School Email"
          name="schoolEmail"
          type="email"
          required
          value={formData.schoolEmail}
          onChange={handleInputChange}
          errors={errors}
        />
        <InputField
          label="Other Email"
          name="otherEmail"
          type="email"
          value={formData.otherEmail}
          onChange={handleInputChange}
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          required
          value={formData.phoneNumber}
          onChange={handleInputChange}
          errors={errors}
        />
        <InputField
          label="WhatsApp Number"
          name="whatsappNumber"
          type="tel"
          required
          value={formData.whatsappNumber}
          onChange={handleInputChange}
          errors={errors}
        />
        <InputField
          label="Snapchat Username"
          name="snapchatUsername"
          value={formData.snapchatUsername}
          onChange={handleInputChange}
        />
        <InputField
          label="Facebook Username"
          name="facebookUsername"
          value={formData.facebookUsername}
          onChange={handleInputChange}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isLoading ? "Saving..." : "Save Profile Settings"}
      </button>
    </form>
  );
}
