"use client";

import ListExpense from "@/components/listExpense";
import { expenseType } from "@/type";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Oprational() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/expenses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setExpenses(data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-start bg-gray-100">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="loader">Loading...</div>{" "}
          {/* Ganti dengan spinner atau loading component */}
          {/* Contoh spinner menggunakan Tailwind CSS */}
          <div className="loader border-t-transparent border-solid rounded-full border-4 border-gray-800 h-16 w-16 animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center w-full max-w-4xl mt-10">
            <div className="flex-none">
              <button
                onClick={() => redirect("/services")}
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                Kembali
              </button>
            </div>
            <div className="flex-1 text-center">
              <h1 className="text-3xl font-bold">Oprational</h1>
            </div>
            <div className="flex-none">
              <button
                onClick={() => redirect("/services")}
                className="bg-blue-800 text-white px-4 py-2 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto w-full max-w-4xl mt-10">
            <div className="bg-white shadow-lg rounded-lg">
              <table className="table-auto w-full text-left border-collapse">
                {/* head */}
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="p-4 border-b">No</th>
                    <th className="p-4 border-b">Tanggal</th>
                    <th className="p-4 border-b">Nama Pengeluaran</th>
                    <th className="p-4 border-b">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {expenses.map((expense, index) => (
                    <ListExpense key={index} expense={expense} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
