"use server";

import { NextRequest, NextResponse } from "next/server";
import { validateRegister } from "@/utils/validator";
import { authRegister } from "@/services/authServices";
import { log } from "console";
import { registerSchema } from "@/schemas/auth/authSchema";

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
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
