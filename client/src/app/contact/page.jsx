import React from 'react';

export default function Contact() {
    return (
        <div className="bg-yellow-500 py-16">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                        <div className="mb-4">
                            <i className="fas fa-map-marker-alt text-orange-500 mr-2"></i>
                            <span className="text-gray-700">123 Main Street, Anytown USA</span>
                        </div>
                        <div className="mb-4">
                            <i className="fas fa-phone text-orange-500 mr-2"></i>
                            <span className="text-gray-700">555-123-4567</span>
                        </div>
                        <div className="mb-4">
                            <i className="fas fa-envelope text-orange-500 mr-2"></i>
                            <span className="text-gray-700">info@residentialproperties.com</span>
                        </div>
                        <div className="mb-4">
                            <i className="fas fa-clock text-orange-500 mr-2"></i>
                            <span className="text-gray-700">Monday - Friday, 9am - 5pm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
