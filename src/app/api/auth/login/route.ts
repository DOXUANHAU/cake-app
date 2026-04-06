"use server";

import { AUTH_CONFIG } from "@/config";
import { signAuthToken } from "@/lib/jwt";
import { loginSchema } from "@/schemas/auth/authSchema";
import { authLogin } from "@/services/authServices";
import { AuthTokenPayload } from "@/types/auth.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate input using  zod
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid credentials from user input",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const user = await authLogin.login(parsed.data);

    const payload: AuthTokenPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const token = await signAuthToken(payload);

    const response = NextResponse.json({ success: true });
    //  set the token in an HTTP-only cookie
    response.cookies.set(AUTH_CONFIG.tokenCookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 10 * 60, // 10 minutes in seconds
      path: "/",
    });

    return response;
  } catch (error) {
    // logger.error("Login error:" + (error as Error).message);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
