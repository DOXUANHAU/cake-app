import { StoredUser } from "./models/userModel";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}
export type AuthTokenPayload = {
  userId: string;
  email: string;
  name: string;
  role: StoredUser["role"];
};
