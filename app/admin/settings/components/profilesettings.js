'use client'

import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'

export default function Component() {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        dateOfBirth: '',
        currentResidence: '',
        studentIdNumber: '',
        schoolEmail: '',
        otherEmail: '',
        phoneNumber: '',
        whatsappNumber: '',
        snapchatUsername: '',
        facebookUsername: '',
    })
    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const validateForm = () => {
        let newErrors = {}
        if (formData.firstName.length < 2) newErrors.firstName = 'First name must be at least 2 characters'
        if (formData.lastName.length < 2) newErrors.lastName = 'Last name must be at least 2 characters'
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
        if (formData.currentResidence.length < 5) newErrors.currentResidence = 'Please enter a valid address'
        if (formData.studentIdNumber.length < 5) newErrors.studentIdNumber = 'Please enter a valid student ID'
        if (!/^\S+@\S+\.\S+$/.test(formData.schoolEmail)) newErrors.schoolEmail = 'Please enter a valid school email'
        if (formData.otherEmail && !/^\S+@\S+\.\S+$/.test(formData.otherEmail)) newErrors.otherEmail = 'Please enter a valid email'
        if (formData.phoneNumber.length < 10) newErrors.phoneNumber = 'Please enter a valid phone number'
        if (formData.whatsappNumber.length < 10) newErrors.whatsappNumber = 'Please enter a valid WhatsApp number'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            setIsLoading(true)
            console.log(formData)
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            setIsLoading(false)
        }
    }

    const InputField = ({ label, name, type = 'text', required = false }) => (
        <div className="space-y-1">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 h-12 text-base rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            />
            {errors[name] && <p className="text-sm text-red-600">{errors[name]}</p>}
        </div>
    )

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <InputField label="First Name" name="firstName" required />
                    <InputField label="Last Name" name="lastName" required />
                    <InputField label="Middle Name" name="middleName" />
                    <div className="space-y-1">
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                            Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 h-12 text-base rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>
                        {errors.dateOfBirth && <p className="text-sm text-red-600">{errors.dateOfBirth}</p>}
                    </div>
                </div>
                <InputField label="Current Residence" name="currentResidence" required />
                <InputField label="Student ID Number" name="studentIdNumber" required />
                <InputField label="School Email" name="schoolEmail" type="email" required />
                <InputField label="Other Email" name="otherEmail" type="email" />
                <InputField label="Phone Number" name="phoneNumber" type="tel" required />
                <InputField label="WhatsApp Number" name="whatsappNumber" type="tel" required />
                <InputField label="Snapchat Username" name="snapchatUsername" />
                <InputField label="Facebook Username" name="facebookUsername" />
            </div>
            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isLoading ? 'Saving...' : 'Save Profile Settings'}
                    </button>
                </div>
            </div>
        </form>
    )
}