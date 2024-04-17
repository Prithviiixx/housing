"use client";
import { useState, useEffect } from "react";

import { API_URL } from "@/lib/constants";
import Card from "@/components/Card";

const HomePage = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [category, setCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setProperties(data);
                setFilteredProperties(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProperties();
    }, []);

    useEffect(() => {
        let filtered = properties;
        if (category) {
            filtered = filtered.filter((product) => product.category === category);
        }
        if (sortOrder === "asc") {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
            filtered = filtered.sort((a, b) => b.price - a.price);
        }
        if (searchTerm) {
            filtered = filtered.filter(
                (product) =>
                    product.property_name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredProperties(filtered);
    }, [category, sortOrder, searchTerm, properties]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleShowEmailForm = () => {
        setShowEmailForm(true);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSendData = async () => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        try {
            const data = filteredProperties;
            data.forEach(function (obj) {
                delete obj.image;
            });

            const response = await fetch(`${API_URL}/queue`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    emailid: email,
                    properties: data,
                }),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Properties</h1>
            <div className="mb-6 flex justify-center">
                <div className="mr-4">
                    <label htmlFor="category" className="mr-2">
                        Filter by Category:
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={handleCategoryChange}
                        className="border border-gray-400 p-2 rounded"
                    >
                        <option value="">All</option>
                        {Array.from(
                            new Set(properties.map((property) => property.category))
                        ).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mr-4">
                    <label htmlFor="sort" className="mr-2">
                        Sort by Price:
                    </label>
                    <select
                        id="sort"
                        value={sortOrder}
                        onChange={handleSortChange}
                        className="border border-gray-400 p-2 rounded"
                    >
                        <option value="">None</option>
                        <option value="asc">High to Low</option>
                        <option value="desc">Low to High</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="search" className="mr-2">
                        Search:
                    </label>
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by name or description"
                        className="border border-gray-400 p-2 rounded"
                    />
                </div>
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={handleShowEmailForm}
            >
                Send this data
            </button>
            {showEmailForm && (
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                        className="border border-gray-400 p-2 rounded mr-2"
                    />
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSendData}
                    >
                        Send
                    </button>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                    <Card key={property.id} property={property} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
