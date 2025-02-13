import { serviceType } from "@/type";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import Swal from "sweetalert2";

export default function TableListService({
  services,
  index,
  fetchServices,
}: {
  services: serviceType;
  index: number;
  fetchServices: () => void;
}) {
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
      console.log(error);
    }
  };
  return (
    <tr className="hover:bg-gray-100">
      <th className="p-4 border-b ">{index + 1}</th>
      <td className="p-4 border-b">{services.nama}</td>
      <td className="p-5 border-b flex justify-start space-x-2">
        <button
          onClick={() => console.log(services.kode)}
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
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
