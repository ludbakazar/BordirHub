"use client";
import { redirect } from "next/navigation";

export default function Services() {
  return (
    <div className="h-screen  bg-gray-100 ">
      <div className="grid grid-cols-3 gap-4 py-20 px-20">
        <div
          onClick={() => redirect("/services/create")}
          className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
        >
          <div className="card bg-base-100 text-primary-content w-96 h-48 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="card-body flex items-center justify-center">
              <h2 className="card-title text-white text-2xl font-bold">
                TAMBAH SERVICE
              </h2>
            </div>
          </div>
        </div>

        <div
          onClick={() => redirect("/services/listservice")}
          className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
        >
          <div className="card bg-base-100 text-primary-content w-96 h-48 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="card-body flex items-center justify-center">
              <h2 className="card-title text-white text-2xl font-bold">
                LIST SERVICE
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
