"use server";

import { AUTH_CONFIG } from "@/config/auth.config";
import { signAuthToken } from "@/lib/jwt";
import { loginSchema } from "@/schemas/auth/authSchema";
import { authLogin } from "@/services/authServices";
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

    const user = await authLogin.login(body);

    const token = signAuthToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json(
      {
        message: "User logged in successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 },
    );

    response.cookies.set(AUTH_CONFIG.tokenCookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
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
