import { AUTH_CONFIG } from "@/config";
import { NextResponse } from "next/server";

export async function POST() {
	const response = NextResponse.json({ success: true });
	response.cookies.delete(AUTH_CONFIG.tokenCookieName);
	return response;
}
