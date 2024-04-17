"use client";

import React, { useEffect, useState } from "react";

import Expertise from "@/assets/expert.jpeg";
import CustomerService from "@/assets/customerservice.webp";
import WideSelection from "@/assets/ws.jpeg";

import House1 from "@/assets/h1.jpg";
import House2 from "@/assets/h2.jpg";
import House3 from "@/assets/h3.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProperties />
      <WhyChooseUs />
    </div>
  );
}

const HeroSection = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(
          "https://vf0mar3ewj.execute-api.us-east-1.amazonaws.com/quotes"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch quote");
        }
        const data = await response.json();
        const [quoteText, quoteAuthor] = Object.entries(data)[0];
        setQuote(quoteText);
        setAuthor(quoteAuthor);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/hero-bg.jpg")' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-75"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <p>
          {quote && (
            <blockquote>
              "{quote}" - {author}
            </blockquote>
          )}
        </p>
        <h1 className="text-6xl font-bold mb-4">Find Your Dream Home</h1>
        <p className="text-xl mb-8">
          Discover the perfect residential property for you.
        </p>
        <Link
          href="/property"
          className="bg-white text-orange-500 px-6 py-3 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300"
        >
          Explore Properties
        </Link>
      </div>
    </div>
  );
};

const FeaturedProperties = () => {
  return (
    <div className="bg-yellow-500 py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <Image
              src={House1}
              alt="Property 1"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Luxurious Apartment</h3>
              <p className="text-gray-600 mb-4">3 Bedrooms, 2 Bathrooms</p>
              <p className="text-orange-500 font-bold text-2xl">$450,000</p>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors duration-300 mt-4">
                View Details
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <Image
              src={House2}
              alt="Property 2"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Luxurious Apartment</h3>
              <p className="text-gray-600 mb-4">3 Bedrooms, 2 Bathrooms</p>
              <p className="text-orange-500 font-bold text-2xl">$450,000</p>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors duration-300 mt-4">
                View Details
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <Image
              src={House3}
              alt="Property 3"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Luxurious Apartment</h3>
              <p className="text-gray-600 mb-4">3 Bedrooms, 2 Bathrooms</p>
              <p className="text-orange-500 font-bold text-2xl">$450,000</p>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors duration-300 mt-4">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  return (
    <div className="bg-orange-500 py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <Image
              src={Expertise}
              alt="Expertise"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Expertise</h3>
              <p className="text-gray-600 mb-4">
                Our team of experienced real estate professionals has the
                knowledge and expertise to help you find the perfect property.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <Image
              src={CustomerService}
              alt="Customer Service"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Customer Service</h3>
              <p className="text-gray-600 mb-4">
                We prioritize our clients' needs and offer exceptional customer
                service throughout the entire process.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <Image
              src={WideSelection}
              alt="Wide Selection"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600 mb-4">
                Our extensive database of residential properties ensures that
                you'll find the perfect home to suit your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
