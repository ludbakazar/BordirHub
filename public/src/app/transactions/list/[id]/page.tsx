"use client";

import Btn from "@/components/btn";
import { transactionDetailProps, transactionProps } from "@/type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad with zero
  const year = date.getFullYear(); // Get full year
  return `${day}/${month}/${year}`; // Return formatted date
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "text-orange-500"; // Color for pending status
    case "completed":
      return "text-green-500"; // Color for completed status
    case "canceled":
      return "text-red-500"; // Color for canceled status
    default:
      return "text-gray-500"; // Default color for other statuses
  }
};

export default function DetailList() {
  const params = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<transactionDetailProps[]>();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`/api/transactions/${params.id}`);
        const data = await response.json();
        setTransaction(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransaction();
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg h-5/6 w-2/4 flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Detail Transaction
        </h1>
        <div className="flex justify-between mb-2">
          <h1>
            Tanggal:{" "}
            {transaction && transaction[0]?.createdAt
              ? formatDate(transaction[0].createdAt)
              : "N/A"}
          </h1>
          <h1>Status : {transaction && transaction[0]?.status}</h1>
        </div>

        <form action="" className="flex flex-col flex-grow">
          <div className="overflow-x-auto flex-grow">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 border-b text-left text-gray-600">
                    No
                  </th>
                  <th className="py-3 px-4 border-b text-left text-gray-600">
                    Service
                  </th>
                  <th className="py-3 px-4 border-b text-left text-gray-600">
                    Quantity
                  </th>
                  <th className="py-3 px-4 border-b text-left text-gray-600">
                    Harga
                  </th>
                </tr>
              </thead>
              <tbody>
                {transaction?.map((t, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-3 px-4 border-b text-black-700">
                      {i + 1}
                    </td>
                    <td className="py-3 px-4 border-b text-black-700">
                      {t.service.nama}
                    </td>
                    <td className="py-3 px-4 border-b text-black-700">
                      {t.detail.qty}
                    </td>
                    <td className="py-3 px-4 border-b text-black-700">
                      {t.detail.price}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="py-3 px-4 border-b"></td>
                  <td className="py-3 px-4 border-b"></td>
                  <td className="py-3 px-4 border-b">Total</td>
                  <td className="py-3 px-4 border-b text-black-700">0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-6">
            <Btn
              status={
                (transaction && transaction[0]?.status) || "defaultStatus"
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}
