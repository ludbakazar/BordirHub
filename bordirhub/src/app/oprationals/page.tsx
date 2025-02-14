"use client";

import ErrorNotification from "@/components/errorNotif";
import ListExpense from "@/components/listExpense";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Oprational() {
  interface Expense {
    createdAt: Date;
    nama: string;
    harga: number;
    updatedAt: Date;
  }

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({
    nama: "",
    harga: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState(""); // State untuk filter tanggal
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const [itemsPerPage] = useState(10); // Jumlah item per halaman

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewExpense((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setNewExpense({
        nama: "",
        harga: 0,
      });
      (document.getElementById("my_modal_3") as HTMLDialogElement)?.close();

      Swal.fire({
        title: "Success",
        text: data.message,
        icon: "success",
      });
      fetchExpenses();
    } catch (error: any) {
      console.log(error.message);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Filter expenses berdasarkan tanggal
  const filteredExpenses = filterDate
    ? expenses.filter((expense) => {
        const expenseDate = new Date(expense.createdAt); // Ganti 'date' dengan field yang sesuai
        return expenseDate.toISOString().split("T")[0] === filterDate;
      })
    : expenses;

  // Pagination
  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = filteredExpenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  return (
    <div className="h-screen flex flex-col items-center justify-start bg-gray-100">
      {loading ? (
        <div className="flex items-center justify-center h-full">
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
                onClick={() =>
                  (
                    document.getElementById("my_modal_3") as HTMLDialogElement
                  )?.showModal()
                }
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

              <dialog id="my_modal_3" className="modal">
                <div className="modal-box flex items-center justify-center">
                  <div className=" p-8  w-96">
                    <h1 className="text-white text-2xl font-bold mb-6 text-center">
                      Tambah Oprational
                    </h1>
                    <form
                      onSubmit={handleSubmit}
                      method="dialog"
                      className="flex flex-col"
                    >
                      <ErrorNotification />
                      <br />
                      <label
                        htmlFor="nama"
                        className="text-white font-bold mb-2"
                      >
                        Name
                      </label>

                      <input
                        type="text"
                        id="nama"
                        name="nama"
                        placeholder="Enter oprational name"
                        className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700"
                        value={newExpense.nama}
                        onChange={handleChange}
                      />
                      <br />

                      <label
                        htmlFor="harga"
                        className="text-white font-bold mb-2"
                      >
                        Price
                      </label>

                      <input
                        type="number"
                        id="harga"
                        name="harga"
                        placeholder="Enter oprational price"
                        className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700"
                        value={newExpense.harga}
                        onChange={handleChange}
                      />
                      <button
                        type="submit"
                        className="mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        Save Oprational
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          (
                            document.getElementById(
                              "my_modal_3"
                            ) as HTMLDialogElement
                          )?.close()
                        }
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white hover:bg-gray-700"
                      >
                        ✕
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>

          {/* Filter Tanggal */}
          <div className="flex justify-center mt-4">
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-gray-300 bg-white text-black rounded p-2"
            />
          </div>

          <div className="overflow-x-auto w-full max-w-4xl mt-10">
            <div className="bg-white shadow-lg rounded-lg">
              <table className="table-auto w-full text-left border-collapse">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="p-4 border-b">No</th>
                    <th className="p-4 border-b">Tanggal</th>
                    <th className="p-4 border-b">Nama Pengeluaran</th>
                    <th className="p-4 border-b">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {currentExpenses.map((expense, index) => (
                    <ListExpense
                      key={index}
                      expense={expense}
                      index={index + indexOfFirstExpense + 1}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-800 text-white px-4 py-2 rounded-l"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-gray-800 text-white px-4 py-2 rounded-r"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
