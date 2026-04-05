import { RegisterUserDto } from "@/dto/register/users";
import { apiClient } from "@/lib/apiClient";
import { LoginPayload } from "@/types";

export const authClientService = {
  register: (data: RegisterUserDto) =>
    apiClient.post("/api/auth/register", data),
  login: (data: LoginPayload) => apiClient.post("/api/auth/login", data),
};
