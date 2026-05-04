import type { FoodHistory, Analysis, UploadResult } from "../types/food";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const getImageUrl = (image: string) =>
  image.startsWith("http") ? image : `${BASE_URL}/images/${image}`;

// export const loginUser = async (email: string, password: string) => {
//   const res = await fetch(`${BASE_URL}/api/user/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   return res.json() as Promise<{ status: number; data?: { user: string; token: string }; message?: string }>;
// };

// export const registerUser = async (name: string, email: string, password: string) => {
//   const res = await fetch(`${BASE_URL}/api/user/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, email, password }),
//   });
//   return res.json() as Promise<{ status: number; data?: { user: string; token: string }; message?: string }>;
// };

export const uploadFood = async (file: File, token: string) => {
  const fd = new FormData();
  fd.append("image", file);

  const res = await fetch(`${BASE_URL}/api/food/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  });

  return res.json() as Promise<UploadResult>;
};

export const getHistory = async (token: string) => {
  const res = await fetch(`${BASE_URL}/api/food/my-foods`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.json() as Promise<{ success: boolean; data: FoodHistory[] }>;
};

export type { Analysis };