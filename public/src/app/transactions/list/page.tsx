"use client";

import ListTransaction from "@/components/listTransaction";
import { useEffect, useState } from "react";

export default function List() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const response = await fetch("/api/transactions", {
      method: "GET",
    });

    const data = await response.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg h-5/6 w-2/4 flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-6">
          List Transaction
        </h1>
        <form action="" className="flex flex-col flex-grow">
          <div className="overflow-x-auto flex-grow">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border-b">No</th>
                  <th className="py-2 px-4 border-b">Tanggal</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Harga</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, i) => (
                  <ListTransaction key={i} transaction={transaction} i={i} />
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
}
