import React, { useState, useEffect } from 'react';

const Footer = () => {
    const [aboutUs, setAboutUs] = useState('');
    const [contactUs, setContactUs] = useState({});
    const [storeName, setStoreName] = useState('');
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        // Fetch "About Us" from API
        fetch('/api/store-settings')
            .then(response => response.json())
            .then(data => {
                setAboutUs(data.aboutUs);
                setStoreName(data.storeName);
            });

        // Fetch "Contact Us" from API
        fetch('/api/personal-settings')
            .then(response => response.json())
            .then(data => setContactUs(data.contactUs));
    }, []);

    return (
        <footer className="bg-gray-800 text-white mt-12">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-sm">{aboutUs}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition-colors">
                                    Shipping Information
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-blue-400 transition-colors">
                                    Returns & Exchanges
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="text-sm mb-2">Email: {contactUs.email}</p>
                        <p className="text-sm mb-2">Phone: {contactUs.phone}</p>
                        <p className="text-sm">Address: {contactUs.address}</p>
                    </div>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm">
                    © {currentYear} {storeName}. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;