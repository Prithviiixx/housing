"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { API_URL } from '@/lib/constants';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';

const ProductPage = ({ params }) => {
    const id = params.propertyid
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`${API_URL}/product/${id}`);
                const data = await response.json();
                setProperty(data);
            } catch (error) {
                redirect('/')
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [id]);

    if (!property) {
        return <div>Loading...</div>;
    }

    const propertyImages = JSON.parse(property.image)
    const { category, city, description, id: productId, image, pincode, price, property_name, property_type } = property;

    return (
        <div className="container mx-auto py-8 relative">
            <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                    <Carousel showArrows={true} showThumbs={false}>
                        {propertyImages.map((img, index) => (
                            <div key={index}>
                                <img src={`data:image/jpeg;base64,${img}`} alt={`Image ${index}`} className="w-full h-auto object-contain rounded-lg shadow-md max-h-96" />
                                <p className="legend">Image {index + 1}</p>
                            </div>

                        ))}
                    </Carousel>
                </div>
                <div className="w-full md:w-1/2 absolute top-0 right-0 md:relative md:top-auto md:right-auto md:ml-8">
                    <h1 className="text-3xl font-bold mb-2">{property_name}</h1>
                    <p className="text-gray-700 mb-2">{category}</p>
                    <p className="text-gray-600 mb-4">{description}</p>
                    <p className="text-gray-800 font-bold text-xl">${price}</p>
                    <p className="text-gray-600 mb-2">City: {city}</p>
                    <p className="text-gray-600 mb-2">Pincode: {pincode}</p>
                    <p className="text-gray-600 mb-2">Property Type: {property_type}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
