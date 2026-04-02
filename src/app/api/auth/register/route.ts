"use server";

import { NextResponse } from "next/server";

import { AUTH_CONFIG } from "@/config";
import { StoredUser, users } from "@/data/uesrs";
import { RegisterPayload } from "@/types";
import { validateRegister } from "@/utils/validator";
import { UserModel } from "@/types/models/userModel";

export async function POST(request: Request) {
  let body: RegisterPayload;

  try {
    body = (await request.json()) as RegisterPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }

  const payload: RegisterPayload = {
    name: body.name?.trim() ?? "",
    email: body.email?.trim().toLowerCase() ?? "",
    password: body.password ?? "",
    confirmPassword: body.confirmPassword ?? "",
  };

  const validationErrors = validateRegister(payload);
  if (Object.keys(validationErrors).length > 0) {
    return NextResponse.json(
      {
        message: "Validation failed",
        errors: validationErrors,
      },
      { status: 400 },
    );
  }

  const userExists = users.some((user) => user.email === payload.email);
  if (userExists) {
    return NextResponse.json(
      {
        message: "Email already exists",
      },
      { status: 409 },
    );
  }

  const now = new Date().toISOString();
  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role: "user" as const,
    createdAt: now,
    updatedAt: now,
  };

  users.push(newUser);

  const token = crypto.randomUUID();
  const response = NextResponse.json(
    {
      message: "Register successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
      token,
    },
    { status: 201 },
  );

  //   response.cookies.set(AUTH_CONFIG.tokenCookieName, token, {
  //     httpOnly: true,
  //     sameSite: "lax",
  //     path: "/",
  //   });

  return response;
}
