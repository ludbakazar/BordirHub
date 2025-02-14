"use client";

import TableListService from "@/components/listService";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ListService() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loading

  const fetchServices = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch("http://localhost:3000/api/services", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchServices();
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
              <h1 className="text-3xl font-bold">List Service</h1>
            </div>
          </div>
          <div className="overflow-x-auto w-full max-w-4xl mt-10">
            <div className="bg-white shadow-lg rounded-lg">
              <table className="table-auto w-full text-left border-collapse">
                {/* head */}
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="p-4 border-b">No</th>
                    <th className="p-4 border-b">Name</th>
                    <th className="p-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {services.map((service, index) => (
                    <TableListService
                      key={index}
                      services={service}
                      index={index}
                      fetchServices={fetchServices}
                    />
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
