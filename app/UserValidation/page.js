// pages/student-validation.js
'use client';
import { useState } from 'react';
import Image from 'next/image';

const StudentValidation = () => {
    const [formData, setFormData] = useState({
        name: '',
        residence: '',
        address: '',
        age: '',
        dob: '',
        studentId: null,
        idCard: null,
    });
    const [error, setError] = useState('');
    const [imagePreviews, setImagePreviews] = useState({ studentId: null, idCard: null });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'age') {
            validateAge(value);
        }
    };

    const validateAge = (age) => {
        const ageNumber = parseInt(age, 10);
        if (ageNumber < 18) {
            setError('Age must be 18 or older.');
        } else {
            setError('');
        }
    };

    const validateImage = (file) => {
        const allowedFormats = ['image/jpeg', 'image/png'];
        const img = new Image();

        return new Promise((resolve, reject) => {
            img.onload = () => {
                if (img.width === 1200 && img.height === 900) {
                    resolve(true);
                } else {
                    reject('Image must be 1200x900 pixels.');
                }
            };

            img.onerror = () => {
                reject('File is not a valid image.');
            };

            if (!allowedFormats.includes(file.type)) {
                reject('Only JPG, JPEG, and PNG formats are allowed.');
            } else {
                img.src = URL.createObjectURL(file);
            }
        });
    };

    const handleFileChange = async (e, name) => {
        const files = e.target.files;
        if (files.length > 0) {
            try {
                await validateImage(files[0]);
                setFormData({ ...formData, [name]: files[0] });
                setImagePreviews({ ...imagePreviews, [name]: URL.createObjectURL(files[0]) });
                setError(''); // Clear any previous error
            } catch (validationError) {
                setError(validationError);
            }
        }
    };

    const handleDrop = async (e, name) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            try {
                await validateImage(files[0]);
                setFormData({ ...formData, [name]: files[0] });
                setImagePreviews({ ...imagePreviews, [name]: URL.createObjectURL(files[0]) });
                setError(''); // Clear any previous error
            } catch (validationError) {
                setError(validationError);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (error) {
            console.log('Error:', error);
            return;
        }
        console.log('Form Data:', formData);
        // Add your form submission logic here
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6 text-center">Student Validation</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-600" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600" htmlFor="residence">Place of Residence</label>
                    <input
                        type="text"
                        id="residence"
                        name="residence"
                        value={formData.residence}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600" htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600" htmlFor="age">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600" htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-600">Student ID Card</label>
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 mb-4"
                        onDrop={(e) => handleDrop(e, 'studentId')}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        {imagePreviews.studentId ? (
                            <img src={imagePreviews.studentId} alt="Student ID Preview" className="h-32 mx-auto mb-2" />
                        ) : (
                            <p>Drag & drop your Student ID Card here, or click to upload.</p>
                        )}
                        <input
                            type="file"
                            id="studentId"
                            name="studentId"
                            onChange={(e) => handleFileChange(e, 'studentId')}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => document.getElementById('studentId').click()}
                            className="mt-2 text-blue-600 underline"
                        >
                            Upload from Device
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-600">Upload ID Card</label>
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500"
                        onDrop={(e) => handleDrop(e, 'idCard')}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        {imagePreviews.idCard ? (
                            <Image src={imagePreviews.idCard} alt="ID Card Preview" width={300} height={300} className="h-32 mx-auto mb-2" />
                        ) : (
                            <p>Drag & drop your ID Card here, or click to upload.</p>
                        )}
                        <input
                            type="file"
                            id="idCard"
                            name="idCard"
                            onChange={(e) => handleFileChange(e, 'idCard')}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => document.getElementById('idCard').click()}
                            className="mt-2 text-blue-600 underline"
                        >
                            Upload from Device
                        </button>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded px-6 py-3 hover:bg-blue-700 transition duration-200"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentValidation;
