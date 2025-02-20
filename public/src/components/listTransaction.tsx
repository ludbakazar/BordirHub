"use client";
import { listTransactionType } from "@/type";

export default function ListTransaction({
  transaction,
  i,
}: {
  transaction: listTransactionType;
  i: number;
}) {
  const createdAtDate = new Date(transaction.createdAt);

  return (
    <tr className="hover:bg-gray-100">
      <td className="py-2 px-4 border-b text-center">{i + 1}</td>
      <td className="py-2 px-4 border-b text-center">
        {createdAtDate.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </td>
      <td className="py-2 px-4 border-b text-center">
        <span
          className={`inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full ${
            transaction.status === "Completed"
              ? "bg-green-100 text-green-800"
              : transaction.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : transaction.status === "Cancelled"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {transaction.status}
        </span>
      </td>
      <td className="py-2 px-4 border-b text-center">
        {transaction.totalAmount}
      </td>
      <td className="py-2 px-4 border-b text-center">
        <a
          href={`/transactions/list/${transaction._id}`}
          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mx-auto" // Center the icon
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </a>
      </td>
    </tr>
  );
}
