import React, { useContext, useEffect, useState } from "react";
import { getTransactions } from "@/services/api";
import { AccessTokenContextInfo } from "@/contexts/AccessTokenContext";
import { UserDataContextInfo } from "@/contexts/UserDataContext";

const Transactions = () => {
    const { accessToken } = useContext(AccessTokenContextInfo);
    const { userData } = useContext(UserDataContextInfo);

    const [page, setPage] = useState(1);
    const [transactions, setTransactions] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (accessToken) {
            fetchTransactions(page);
        }
    }, [page, accessToken]);

    const fetchTransactions = async (pageNo) => {
        try {
            setLoading(true);

            const res = await getTransactions(pageNo, accessToken);

            setTransactions(res.data.transactions || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.error("Failed to fetch transactions:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 lg:p-8">
            <section className="bg-white rounded-3xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Transaction History
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        View all your recent transactions
                    </p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#F5F8FD] text-gray-700">
                                <th className="px-6 py-4 text-left font-semibold">
                                    Description
                                </th>
                                <th className="px-6 py-4 text-left font-semibold">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left font-semibold">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-left font-semibold">
                                    Time
                                </th>
                                <th className="px-6 py-4 text-right font-semibold">
                                    Amount
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-10 text-gray-500"
                                    >
                                        Loading transactions...
                                    </td>
                                </tr>
                            ) : transactions.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-10 text-gray-500"
                                    >
                                        No transactions found
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((transaction) => {
                                    const isSender =
                                        transaction.user1?.toString() ===
                                        userData?.userId?.toString();

                                    return (
                                        <tr
                                            key={transaction._id}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-5 text-gray-700">
                                                {isSender
                                                    ? `Transfer to ${transaction.user2Name}`
                                                    : `Payment received from ${transaction.user1Name}`}
                                            </td>

                                            <td className="px-6 py-5">
                                                <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                                                    Success
                                                </span>
                                            </td>

                                            <td className="px-6 py-5 text-gray-600">
                                                {new Date(
                                                    transaction.createdAt
                                                ).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>

                                            <td className="px-6 py-5 text-gray-600">
                                                {new Date(
                                                    transaction.createdAt
                                                ).toLocaleTimeString("en-IN", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </td>

                                            <td
                                                className={`px-6 py-5 text-right font-semibold ${
                                                    isSender
                                                        ? "text-red-600"
                                                        : "text-green-600"
                                                }`}
                                            >
                                                {isSender
                                                    ? `-₹${transaction.amount.toFixed(
                                                          2
                                                      )}`
                                                    : `+₹${transaction.amount.toFixed(
                                                          2
                                                      )}`}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!loading && transactions.length > 0 && (
                    <div className="flex items-center justify-between p-6 border-t border-gray-200">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        <span className="text-gray-600 font-medium">
                            Page {page} of {totalPages}
                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Transactions;