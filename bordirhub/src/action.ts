"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogin = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const res = await fetch(`http://localhost:3000/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
  const response = await res.json();

  if (!res.ok) return redirect(`/login?error=${response.message}`);
  const cookiesStore = await cookies();
  cookiesStore.set({
    name: "authorization",
    value: `Bearer ${response.access_token}`,
  });

  redirect("/");
};

export const handleRegister = async (formData: FormData) => {
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: "user",
  };
  const res = await fetch(`http://localhost:3000/api/services/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
  const response = await res.json();

  if (!res.ok) return redirect(`/register?error=${response.message}`);
  redirect("/login");
};

export const handleLogout = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete("authorization");
  redirect("/login");
};

export const handleCreateService = async (formData: FormData) => {
  const rawFormData = {
    name: formData.get("serviceName"),
  };
  const res = await fetch(`http://localhost:3000/api/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
  const response = await res.json();

  if (!res.ok) return redirect(`/services/create?error=${response.message}`);
  redirect("/services");
};
