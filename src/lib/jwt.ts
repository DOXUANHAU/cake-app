import { jwtVerify, SignJWT } from "jose";
import { AuthTokenPayload } from "@/types";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export function signAuthToken(payload: AuthTokenPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

export async function verifyAuthToken(
  token: string,
): Promise<AuthTokenPayload> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as AuthTokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

// const JWT_EXPIRES_IN: SignOptions["expiresIn"] =
//   (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"] | undefined) ??
//   "7d";

// function getJwtSecret(): string {
//   const secret = process.env.JWT_SECRET;

//   if (!secret) {
//     if (process.env.NODE_ENV === "production") {
//       throw new Error("JWT_SECRET is required in production");
//     }

//     return "dev_jwt_secret_change_me";
//   }

//   return secret;
// }

// export function signAuthToken(payload: AuthTokenPayload): string {
//   return jwt.sign(payload, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN });
// }
