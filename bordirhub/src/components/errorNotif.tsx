"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorNotification() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  if (!error) return <></>;

  return (
    <div className="bg-red-500 text-white font-bold px-8 py-2 gap-2 rounded">
      Error: {error}
    </div>
  );
}
