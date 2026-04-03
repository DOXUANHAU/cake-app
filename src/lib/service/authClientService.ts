import { RegisterUserDto } from "@/dto/register/users";
import { apiClient } from "@/lib/apiClient";

export const authClientService = {
  register: (data: RegisterUserDto) =>
    apiClient.post("/api/auth/register", data),
};
