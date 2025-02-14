import { expenseType } from "@/type";

export default function ListExpense({
  expense,
  index,
}: {
  expense: expenseType;
  index: number;
}) {
  return (
    <tr className="hover:bg-gray-100">
      <th className="p-4 border-b ">{index}</th>
      <td className="p-4 border-b">
        {expense.createdAt
          ? new Date(expense.createdAt).toLocaleDateString("en-GB")
          : "N/A"}
      </td>
      <td className="p-4 border-b">{expense.nama}</td>
      <td className="p-4 border-b">{expense.harga.toLocaleString()}</td>
    </tr>
  );
}
