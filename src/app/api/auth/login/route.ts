"use server";

import logger from "@/lib/logger";
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
          message: "Invalid input data for login request",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const user = await authLogin.login(body);

    return NextResponse.json(
      { message: "User logged in successfully", user },
      { status: 200 },
    );
  } catch (error) {
    // logger.error("Login error:" + (error as Error).message);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
