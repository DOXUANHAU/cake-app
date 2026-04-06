import { NextResponse, NextRequest } from "next/server";
import { verifyAuthToken } from "@/lib/jwt";
import { AUTH_CONFIG } from "@/config";

// This route checks if the user is authenticated by verifying the JWT token from the cookie
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(AUTH_CONFIG.tokenCookieName)?.value;
    // If no token is found, the user is not authenticated
    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    // Verify the token and extract user data
    const userData = await verifyAuthToken(token);
    if (!userData) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({ authenticated: true, user: userData });
  } catch (error) {
    // logger.error("Error verifying auth token:" + (error as Error).message);
    return NextResponse.json({ authenticated: false });
  }
}
