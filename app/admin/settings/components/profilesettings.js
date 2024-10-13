"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  middleName: z.string().optional(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Please enter a valid date in the format YYYY-MM-DD." }),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]),
  currentResidence: z.string().min(5, { message: "Please enter a valid address." }),
  studentIdNumber: z.string().min(5, { message: "Please enter a valid student ID." }),
  schoolEmail: z.string().email({ message: "Please enter a valid school email." }),
  otherEmail: z.string().email({ message: "Please enter a valid email." }).optional().or(z.literal("")),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  whatsappNumber: z.string().min(10, { message: "Please enter a valid WhatsApp number." }),
  snapchatUsername: z.string().optional(),
  facebookUsername: z.string().optional(),
  instagramUsername: z.string().optional(),
  linkedinUsername: z.string().optional(),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }),
  major: z.string().min(2, { message: "Please enter your major." }),
  graduationYear: z.string().regex(/^\d{4}$/, { message: "Please enter a valid year." }),
  interests: z.array(z.string()).refine((value) => value.length > 0, { message: "Please select at least one interest." }),
  privacySettings: z.object({
    showEmail: z.boolean(),
    showPhone: z.boolean(),
    showSocialMedia: z.boolean(),
  }),
})

export function ProfileSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      dateOfBirth: "",
      gender: "prefer_not_to_say",
      currentResidence: "",
      studentIdNumber: "",
      schoolEmail: "",
      otherEmail: "",
      phoneNumber: "",
      whatsappNumber: "",
      snapchatUsername: "",
      facebookUsername: "",
      instagramUsername: "",
      linkedinUsername: "",
      bio: "",
      major: "",
      graduationYear: "",
      interests: [],
      privacySettings: {
        showEmail: false,
        showPhone: false,
        showSocialMedia: false,
      },
    },
  })

  const onSubmit = (values) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Profile settings updated successfully.")
      console.log(values)
    }, 1000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      <p className="mb-4">Manage your personal information and preferences.</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="tabs flex space-x-4 mb-6">
          <button
            type="button"
            className={`flex-1 py-2 text-center rounded-lg ${activeTab === "personal" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("personal")}
          >
            Personal
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center rounded-lg ${activeTab === "contact" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("contact")}
          >
            Contact
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          {activeTab === "personal" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">Change Picture</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">First Name</label>
                  <input type="text" className="border rounded-lg w-full p-2" placeholder="John" {...form.register('firstName')} />
                </div>
                <div>
                  <label className="block mb-1">Last Name</label>
                  <input type="text" className="border rounded-lg w-full p-2" placeholder="Doe" {...form.register('lastName')} />
                </div>
                <div>
                  <label className="block mb-1">Middle Name</label>
                  <input type="text" className="border rounded-lg w-full p-2" placeholder="(Optional)" {...form.register('middleName')} />
                </div>
                <div>
                  <label className="block mb-1">Date of Birth</label>
                  <input type="date" className="border rounded-lg w-full p-2" {...form.register('dateOfBirth')} />
                </div>
              </div>
              <div>
                <label className="block mb-1">Gender</label>
                <div className="flex space-x-4">
                  {['male', 'female'].map(value => (
                    <div key={value} className="flex items-center">
                      <input type="radio" className="mr-2" value={value} {...form.register('gender')} />
                      <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Current Residence</label>
                <input type="text" className="border rounded-lg w-full p-2" placeholder="123 Campus St, College Town, ST 12345" {...form.register('currentResidence')} />
              </div>
              <div>
                <label className="block mb-1">School Email</label>
                <input type="email" className="border rounded-lg w-full p-2" placeholder="john.doe@university.edu" {...form.register('schoolEmail')} />
              </div>
              <div>
                <label className="block mb-1">Other Email</label>
                <input type="email" className="border rounded-lg w-full p-2" placeholder="johndoe@example.com" {...form.register('otherEmail')} />
              </div>
              <div>
                <label className="block mb-1">Phone Number</label>
                <input type="tel" className="border rounded-lg w-full p-2" placeholder="+1 (555) 123-4567" {...form.register('phoneNumber')} />
              </div>
              <div>
                <label className="block mb-1">WhatsApp Number</label>
                <input type="tel" className="border rounded-lg w-full p-2" placeholder="+1 (555) 123-4567" {...form.register('whatsappNumber')} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['snapchatUsername', 'facebookUsername', 'instagramUsername', 'linkedinUsername'].map(field => (
                  <div key={field}>
                    <label className="block mb-1">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                    <input type="text" className="border rounded-lg w-full p-2" placeholder="johndoe" {...form.register(field)} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  )
}