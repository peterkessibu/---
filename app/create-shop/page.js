'use client';
import { useState } from 'react';

export default function FormCarousel() {
    // State to track the current form index
    const [currentForm, setCurrentForm] = useState(0);

    // Form data (4 steps in the carousel)
    const forms = [
        { id: 1, content: <Form1 /> },
        { id: 2, content: <Form2 /> },
        { id: 3, content: <Form3 /> },
        { id: 4, content: <Form4 /> },
    ];

    // Function to handle skipping and navigating forms
    const nextForm = () => {
        setCurrentForm((prev) => Math.min(prev + 1, forms.length - 1));
    };

    const skipForm = () => {
        setCurrentForm((prev) => Math.min(prev + 1, forms.length - 1));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
                {/* Form progress indicator */}
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
                        onClick={nextForm}
                    >
                        {currentForm === forms.length - 1 ? 'Continue' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Form1() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Form 1</h2>
            <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
            />
        </div>
    );
}

function Form2() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Form 2</h2>
            <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
            />
        </div>
    );
}

function Form3() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Form 3</h2>
            <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
            />
        </div>
    );
}

function Form4() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Form 4</h2>
            <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your phone number"
            />
        </div>
    );
}
