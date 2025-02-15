"use client";

import { serviceType } from "@/type";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Create() {
  const [rows, setRows] = useState([{ id: 1, kode: "", qty: "" }]);
  const [services, setServices] = useState([]);

  const handleAddRow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newRow = { id: rows.length + 1, kode: "", qty: "" };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id: number) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      const form = {
        services: rows.map(({ id, ...rest }) => rest),
      };

      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      Swal.fire({
        title: "Success",
        text: data.message,
        icon: "success",
      }).then(() => {
        redirect("/transactions");
      });
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setServices(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleServiceChange = (id: number, value: string) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, kode: value } : row
    );
    setRows(updatedRows);
  };

  const handleQtyChange = (id: number, value: string) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, qty: value } : row
    );
    setRows(updatedRows);
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg h-5/6 w-2/4 flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Transaction
        </h1>
        <form action="" className="flex flex-col flex-grow">
          <div className="overflow-x-auto flex-grow">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border-b">No</th>
                  <th className="py-2 px-4 border-b">Service</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{row.id}</td>
                    <td className="py-2 px-4 border-b">
                      <select
                        className="select select-bordered w-full max-w-xs bg-white text-black"
                        value={row.kode}
                        onChange={(e) =>
                          handleServiceChange(row.id, e.target.value)
                        }
                      >
                        <option disabled value="">
                          Pilih Layanan
                        </option>
                        {services.map((service: serviceType) => (
                          <option key={service._id} value={service.kode}>
                            {service.nama}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="number"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs bg-white text-black"
                        value={row.qty}
                        onChange={(e) =>
                          handleQtyChange(row.id, e.target.value)
                        }
                      />
                    </td>

                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleDeleteRow(row.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleAddRow} className="mt-2 btn btn-primary">
              Tambah
            </button>
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={handleSubmit} className="mt-2 btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
