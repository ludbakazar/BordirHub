import { serviceType } from "@/type";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
TrashIcon;

export default function TableListService({
  services,
  index,
}: {
  services: serviceType;
  index: number;
}) {
  return (
    <tr className="hover:bg-gray-100">
      <th className="p-4 border-b ">{index + 1}</th>
      <td className="p-4 border-b">{services.nama}</td>
      <td className="p-5 border-b flex justify-start space-x-2">
        <button className="text-blue-500 hover:text-blue-700 flex items-center">
          <PencilIcon className="h-5 w-5" />
        </button>
        <button className="text-red-500 hover:text-red-700 flex items-center">
          <TrashIcon className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
}
