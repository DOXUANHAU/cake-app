// lib/apiClient.ts
import axios, { AxiosRequestConfig, Method } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

function resolveUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;

  const normalizedPath = url.startsWith("/") ? url : `/${url}`;
  return BASE_URL ? `${BASE_URL}${normalizedPath}` : normalizedPath;
}

type RequestOptions<TBody = unknown> = {
  method?: Method;
  data?: TBody;
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
  withCredentials?: boolean;
  signal?: AbortSignal;
  timeout?: number;
};

type RequestConfigOptions<TBody = unknown> = Omit<
  RequestOptions<TBody>,
  "method" | "data"
>;

async function request<TResponse, TBody = unknown>(
  url: string,
  options: RequestOptions<TBody> = {},
): Promise<TResponse> {
  const {
    method = "GET",
    data,
    params,
    headers,
    withCredentials = true,
    signal,
    timeout,
  } = options;

  try {
    const response = await axios<TResponse>({
      url: resolveUrl(url),
      method,
      params,
      withCredentials,
      signal,
      timeout,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      data,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      const errorMessage =
        typeof responseData === "string"
          ? responseData
          : responseData?.message || error.message;
      throw new Error(errorMessage || "API request failed with Axios");
    }
    throw new Error("An unknown error occurred during API request");
  }
}

export const apiClient = {
  request,
  get: <TResponse>(url: string, options?: RequestConfigOptions) =>
    request<TResponse>(url, { method: "GET", ...options }),
  post: <TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    options?: RequestConfigOptions<TBody>,
  ) => request<TResponse, TBody>(url, { method: "POST", data, ...options }),
  put: <TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    options?: RequestConfigOptions<TBody>,
  ) => request<TResponse, TBody>(url, { method: "PUT", data, ...options }),
  patch: <TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    options?: RequestConfigOptions<TBody>,
  ) => request<TResponse, TBody>(url, { method: "PATCH", data, ...options }),
  delete: <TResponse>(url: string, options?: RequestConfigOptions) =>
    request<TResponse>(url, { method: "DELETE", ...options }),
};
