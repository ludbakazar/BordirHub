"use client";

import { redirect } from "next/navigation";

export default function Transactions() {
  return (
    <div className="h-screen ">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-3 gap-4 cursor-pointer">
          <div
            onClick={() => redirect("/transactions/create")}
            className="card bg-base-100 text-primary-content w-96 h-60 shadow-xl transition-transform transform hover:scale-105"
          >
            {" "}
            <div className="card-body text-white flex flex-col justify-center items-center">
              <h2 className="card-title text-4xl">Tambah Transaksi</h2>
            </div>
          </div>

          <div
            onClick={() => redirect("/transactions/create")}
            className="card bg-base-100 text-primary-content w-96 h-60 shadow-xl transition-transform transform hover:scale-105"
          >
            {" "}
            <div className="card-body text-white flex flex-col justify-center items-center">
              <h2 className="card-title text-4xl">List Transaksi</h2>
            </div>
          </div>

          <div
            onClick={() => redirect("/transactions/create")}
            className="card bg-base-100 text-primary-content w-96 h-60 shadow-xl transition-transform transform hover:scale-105"
          >
            {" "}
            <div className="card-body text-white flex flex-col justify-center items-center">
              <h2 className="card-title text-4xl">Tambah Transaksi</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
