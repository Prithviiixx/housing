'use client'

import { API_URL } from '@/lib/constants';
import { useState } from 'react'

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        images: [],
        pincode: "",
        city: "",
        property_type: ""
    });

    const categories = ["Rent", "Sell"];

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "images") {
            const newImages = Array.from(files);
            setFormData((prevData) => ({
                ...prevData,
                images: [...prevData.images, ...newImages],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("property_name", formData.name);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        formData.images.forEach((image, index) => {
            formDataToSend.append(`image${index}`, image);
        });
        formDataToSend.append("pincode", formData.pincode);
        formDataToSend.append("city", formData.city);
        formDataToSend.append("property_type", formData.property_type);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {
                console.log("Form data sent successfully");
                setFormData(
                    {
                        name: "",
                        category: "",
                        description: "",
                        price: "",
                        images: [],
                        pincode: "",
                        city: "",
                        property_type: ""
                    }
                )
            } else {
                console.error("Error sending form data");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Add New Property</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block font-bold mb-2">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="description" className="block font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block font-bold mb-2">
                        € Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="pincode" className="block font-bold mb-2">
                        Pincode
                    </label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city" className="block font-bold mb-2">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="property_type" className="block font-bold mb-2">
                        Property Type
                    </label>
                    <input
                        type="text"
                        id="property_type"
                        name="property_type"
                        value={formData.property_type}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="image" className="block font-bold mb-2">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="images"
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full"
                        accept="image/*,jpg"
                        multiple
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 md:col-span-2"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddProduct