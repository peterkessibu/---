"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormCarousel() {
  const [currentForm, setCurrentForm] = useState(0);

  // Form data (4 categories of questions)
  const forms = [
    { id: 1, content: <BusinessIdeaForm /> },
    { id: 2, content: <TargetAudienceForm /> },
    { id: 3, content: <ProductSelectionForm /> },
    { id: 4, content: <MarketingStrategyForm /> },
  ];

  const nextForm = () => {
    setCurrentForm((prev) => Math.min(prev + 1, forms.length - 1));
  };

  const skipForm = () => {
    setCurrentForm((prev) => Math.min(prev + 1, forms.length - 1));
  };

  const router = useRouter();

  const handleContinue = () => {
    if (currentForm === forms.length - 1) {
      router.push("/api/auth/sign-in");
    } else {
      nextForm();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          {forms.map((form, index) => (
            <div key={form.id} className="mr-2">
              <input
                type="radio"
                checked={index === currentForm}
                readOnly
                className="w-4 h-4 text-blue-600"
              />
              <label className="ml-1 text-gray-700">{index + 1}</label>
            </div>
          ))}
        </div>

        {/* Form Content */}
        {forms[currentForm].content}

        {/* Navigation Buttons */}
        <div className="flex justify-end mt-8 space-x-4">
          {currentForm < forms.length - 1 && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={skipForm}
            >
              Skip
            </button>
          )}
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={handleContinue}
          >
            {currentForm === forms.length - 1 ? "Continue" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

function BusinessIdeaForm() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        What&apos;s your business idea?
      </h2>
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        placeholder="Describe your business idea"
      />
    </div>
  );
}

function TargetAudienceForm() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Who is your target audience?
      </h2>
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        placeholder="Define your target audience"
      />
    </div>
  );
}

function ProductSelectionForm() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        What products will you sell?
      </h2>
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        placeholder="List the products you plan to sell"
      />
    </div>
  );
}

function MarketingStrategyForm() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        How will you market your shop?
      </h2>
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        placeholder="Outline your marketing strategy"
      />
    </div>
  );
}
