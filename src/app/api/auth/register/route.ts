"use server";

import { NextRequest, NextResponse } from "next/server";
import { authRegister } from "@/services/authServices";
import { registerSchema } from "@/schemas/auth/authSchema";
import logger from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate input using  zod
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input data", errors: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const user = await authRegister.register(body);
    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 },
    );
  } catch (error) {
    logger.error("Registration error:" + (error as Error).message);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
