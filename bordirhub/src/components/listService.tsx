"use client";
import { serviceType } from "@/type";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import Swal from "sweetalert2";
import ErrorNotification from "./errorNotif";
import { useState } from "react";

export default function TableListService({
  services,
  index,
  fetchServices,
}: {
  services: serviceType;
  index: number;
  fetchServices: () => void;
}) {
  const [editService, setEditService] = useState(services.nama);
  const handleDelete = async (kode: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/services/${kode}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      Swal.fire({
        title: "Success",
        text: data.message,
        icon: "success",
      });
      fetchServices();
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEditService(e.target.value);
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/services/${services.kode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nama: editService }),
        }
      );
      const data = await response.json();

      (document.getElementById("my_modal_3") as HTMLDialogElement)?.close();

      Swal.fire({
        title: "Success",
        text: data.message,
        icon: "success",
      });
      fetchServices();
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <tr className="hover:bg-gray-100">
      <th className="p-4 border-b ">{index + 1}</th>
      <td className="p-4 border-b">{services.nama}</td>
      <td className="p-5 border-b flex justify-start space-x-2">
        <button
          onClick={() =>
            (
              document.getElementById("my_modal_3") as HTMLDialogElement
            )?.showModal()
          }
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          <PencilIcon className="h-5 w-5" />
        </button>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box flex items-center justify-center">
            <div className=" p-8  w-96">
              <h1 className="text-white text-2xl font-bold mb-6 text-center">
                EDIT SERVICE
              </h1>
              <form
                method="dialog"
                className="flex flex-col"
                onSubmit={handleEdit}
              >
                <ErrorNotification />
                <br />
                <label
                  htmlFor="serviceName"
                  className="text-white font-bold mb-2"
                >
                  Service Name
                </label>

                <input
                  type="text"
                  id="serviceName"
                  name="serviceName"
                  placeholder="Enter service name"
                  className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700"
                  value={editService}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Edit Service
                </button>
                <button
                  type="button"
                  onClick={() =>
                    (
                      document.getElementById("my_modal_3") as HTMLDialogElement
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

        <button
          onClick={() => handleDelete(services.kode as string)}
          className="text-red-500 hover:text-red-700 flex items-center"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
}
