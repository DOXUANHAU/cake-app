import { AUTH_CONFIG } from "@/config";
import { verifyAuthToken } from "@/lib/jwt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function DataPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_CONFIG.tokenCookieName)?.value;

  let data = null;
  if (token) {
    try {
      data = await verifyAuthToken(token);
    } catch {
      redirect("/login");
    }
  }

  if (!token || !data) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Protected Data Page</h1>
      <p>This page is only accessible if you are logged in.</p>
    </div>
  );
}
