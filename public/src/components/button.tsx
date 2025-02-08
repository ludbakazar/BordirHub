"use client";

import { useFormStatus } from "react-dom";

export function ButtonSubmit({ type }: any) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
    >
      {type}
    </button>
  );
}
