'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormField from '../components/Context/Formcomponents/FormField';
import FileUpload from '../components/Context/Formcomponents/FileUpload';
import Modal from '../components/Context/Formcomponents/Modal';

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
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
    const [isTermsModalOpen, setTermsModalOpen] = useState(false);
    const [privacyContent, setPrivacyContent] = useState('');
    const [termsContent, setTermsContent] = useState('');
    const router = useRouter();

    useEffect(() => {
        const loadPrivacyContent = async () => {
            const response = await fetch('/policies/privacy-policy.md');
            const text = await response.text();
            setPrivacyContent(text);
        };

        const loadTermsContent = async () => {
            const response = await fetch('/policies/terms-and-conditions.md');
            const text = await response.text();
            setTermsContent(text);
        };

        if (isPrivacyModalOpen) {
            loadPrivacyContent();
        }

        if (isTermsModalOpen) {
            loadTermsContent();
        }
    }, [isPrivacyModalOpen, isTermsModalOpen]);

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
                setError('');
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
                setError('');
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
                <FormField
                    label="Name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <FormField
                    label="Place of Residence"
                    type="text"
                    value={formData.residence}
                    onChange={handleChange}
                    required
                />
                <FormField
                    label="Address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <FormField
                    label="Age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
                <FormField
                    label="Date of Birth"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />

                <FileUpload
                    label="Student ID Card"
                    preview={imagePreviews.studentId}
                    onFileChange={(e) => handleFileChange(e, 'studentId')}
                    onDrop={(e) => handleDrop(e, 'studentId')}
                />
                <FileUpload
                    label="Upload ID Card"
                    preview={imagePreviews.idCard}
                    onFileChange={(e) => handleFileChange(e, 'idCard')}
                    onDrop={(e) => handleDrop(e, 'idCard')}
                />

                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={acceptedTerms}
                        onChange={() => setAcceptedTerms(!acceptedTerms)}
                        className="mr-2"
                        required
                    />
                    <label htmlFor="terms" className="text-gray-600">
                        I accept the <button type="button" onClick={() => setPrivacyModalOpen(true)} className="text-blue-600 underline">Privacy Policy</button> and <button type="button" onClick={() => setTermsModalOpen(true)} className="text-blue-600 underline">Terms and Conditions</button>
                    </label>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className={`bg-blue-600 text-white rounded px-6 py-3 hover:bg-blue-700 transition duration-200 ${!acceptedTerms && 'opacity-50 cursor-not-allowed'}`}
                        disabled={!acceptedTerms}
                    >
                        Continue
                    </button>
                </div>
            </form>

            {/* Modals for Privacy Policy and Terms & Conditions */}
            <Modal
                title="Privacy Policy"
                content={<div dangerouslySetInnerHTML={{ __html: privacyContent }} />}
                isOpen={isPrivacyModalOpen}
                onClose={() => setPrivacyModalOpen(false)}
            />
            <Modal
                title="Terms and Conditions"
                content={<div dangerouslySetInnerHTML={{ __html: termsContent }} />}
                isOpen={isTermsModalOpen}
                onClose={() => setTermsModalOpen(false)}
            />
        </div>
    );
};

export default StudentValidation;
