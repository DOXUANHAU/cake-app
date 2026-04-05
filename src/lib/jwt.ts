import jwt, { type SignOptions } from "jsonwebtoken";
import { StoredUser } from "@/types/models/userModel";

export type AuthTokenPayload = {
  userId: string;
  email: string;
  name: string;
  role: StoredUser["role"];
};

const JWT_EXPIRES_IN: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"] | undefined) ??
  "7d";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET is required in production");
    }

    return "dev_jwt_secret_change_me";
  }

  return secret;
}

export function signAuthToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN });
}
