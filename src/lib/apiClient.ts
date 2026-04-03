// lib/apiClient.ts
import { RegisterUserDto } from "@/dto/register/users";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

function resolveUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;

  const normalizedPath = url.startsWith("/") ? url : `/${url}`;
  return BASE_URL ? `${BASE_URL}${normalizedPath}` : normalizedPath;
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const method = options?.method || "GET";
  const body = options?.body;

  try {
    const response = await axios({
      url: resolveUrl(url),
      method,
      headers: {
        "Content-Type": "application/json",
      },
      data: body ? JSON.parse(body as string) : undefined,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "API request failed with Axios",
      );
    }
    throw new Error("An unknown error occurred during API request");
  }
}
export const apiClient = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: RegisterUserDto | Record<string, unknown>) =>
    request<T>(url, { method: "POST", body: JSON.stringify(data) }),
  put: <T>(url: string, data: RegisterUserDto | Record<string, unknown>) =>
    request<T>(url, { method: "PUT", body: JSON.stringify(data) }),
  delete: <T>(url: string) => request<T>(url, { method: "DELETE" }),
};
