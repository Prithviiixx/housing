// app/page.js
"use client"

import React, { useState, useEffect } from 'react';

const MutualFundTable = () => {
    const [funds, setFunds] = useState([]);
    const [selectedFund, setSelectedFund] = useState(null);
    const [fundDetails, setFundDetails] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const fetchFunds = async () => {
            try {
                const response = await fetch('https://api.mfapi.in/mf');
                const data = await response.json();
                setFunds(data);
                setTotalPages(Math.ceil(data.length / pageSize));
            } catch (error) {
                console.error('Error fetching funds:', error);
            }
        };

        fetchFunds();
    }, []);

    const fetchFundDetails = async (schemeCode) => {
        try {
            const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);
            const data = await response.json();
            setSelectedFund(data.meta);
            setFundDetails(data.data);
        } catch (error) {
            console.error('Error fetching fund details:', error);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const paginatedFunds = funds.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-2xl font-bold mb-4">Mutual Funds</h1>

            {selectedFund && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">
                        {selectedFund.scheme_name} ({selectedFund.scheme_code})
                    </h2>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <p className="mb-2">
                            <span className="font-bold">Fund House:</span> {selectedFund.fund_house}
                        </p>
                        <p className="mb-2">
                            <span className="font-bold">Scheme Type:</span> {selectedFund.scheme_type}
                        </p>
                        <p className="mb-2">
                            <span className="font-bold">Scheme Category:</span> {selectedFund.scheme_category}
                        </p>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Scheme Name</th>
                            <th className="px-4 py-2 text-left">Scheme Code</th>
                            <th className="px-4 py-2 text-left">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedFunds.map((fund) => (
                            <tr
                                key={fund.schemeCode}
                                className={`border-b ${fund.schemeCode === selectedFund?.scheme_code
                                    ? 'bg-blue-100'
                                    : 'bg-white'
                                    }`}
                                onClick={() => fetchFundDetails(fund.schemeCode)}
                            >
                                <td className="px-4 py-2">{fund.schemeName}</td>
                                <td className="px-4 py-2">{fund.schemeCode}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => fetchFundDetails(fund.schemeCode)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-8">
                <button
                    className={`mx-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="mx-2 px-4 py-2 rounded bg-gray-200">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className={`mx-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MutualFundTable;