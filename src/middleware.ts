import { AUTH_CONFIG } from "@/config/auth.config";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes chỉ cho phép khi CHƯA đăng nhập
const AUTH_ROUTES = ["/", "/login", "/register"];

// Routes yêu cầu phải có JWT
const PROTECTED_ROUTES = ["/data"];

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET is required in production");
    }

    return new TextEncoder().encode("dev_jwt_secret_change_me");
  }

  return new TextEncoder().encode(secret);
}

async function isValidToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getJwtSecret());
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_CONFIG.tokenCookieName)?.value;
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));
  const hasValidToken = token ? await isValidToken(token) : false;

  // Chưa có JWT → cố vào /data → redirect /login
  if (isProtected && !hasValidToken) {
    const response = NextResponse.redirect(new URL("/", request.url));
    if (token) {
      response.cookies.delete(AUTH_CONFIG.tokenCookieName);
    }
    return response;
  }

  // Đã có JWT → cố vào /login hoặc /register → redirect /data
  if (isAuthRoute && hasValidToken) {
    return NextResponse.redirect(new URL("/data", request.url));
  }

  if (token && !hasValidToken) {
    const response = NextResponse.next();
    response.cookies.delete(AUTH_CONFIG.tokenCookieName);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Chạy middleware trên các route này (bỏ qua _next, api, static)
  matcher: ["/", "/login", "/register", "/data/:path*"],
};