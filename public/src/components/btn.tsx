import { get } from "http";

export default function Btn({ status }: { status: string }) {
  const getStatusBtn = (status: string) => {
    switch (status) {
      case "pending":
        return "Update";
      case "completed":
        return "Print";
      case "canceled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <button className="mt-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200">
      {getStatusBtn(status)}
    </button>
  );
}
