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
      <td className="py-2 px-4 border-b">{i + 1}</td>
      <td className="py-2 px-4 border-b">
        {createdAtDate.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </td>
      <td className="py-2 px-4 border-b">{transaction.status}</td>
      <td className="py-2 px-4 border-b">{transaction.totalAmount}</td>
      <td className="py-2 px-4 border-b">
        <a
          href={`/transactions/list/${transaction._id}`}
          className="text-white-500 hover:text-base-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
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
