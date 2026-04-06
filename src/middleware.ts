import { AUTH_CONFIG } from "@/config/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuthToken } from "./lib/jwt";

// Routes chỉ cho phép khi CHƯA đăng nhập (guest-only routes).
// Nếu người dùng đã đăng nhập mà vào các route này, sẽ bị chuyển hướng sang /data.
const AUTH_ROUTES = ["/", "/home", "/login", "/register"];

// Routes yêu cầu phải có JWT hợp lệ.
// Nếu chưa đăng nhập hoặc token sai, middleware sẽ chuyển về /login.
const PROTECTED_ROUTES = ["/data"];

// Kiểm tra pathname hiện tại có khớp với route cấu hình hay không.
// Hỗ trợ:
// - route "/" chỉ khớp đúng "/"
// - route khác khớp exact hoặc route con (ví dụ /data và /data/abc)
function matchesRoute(pathname: string, route: string) {
  // Trường hợp đặc biệt cho root path: chỉ chấp nhận đúng "/".
  if (route === "/") {
    return pathname === "/";
  }

  // Với route thường: cho phép khớp chính xác hoặc khớp theo tiền tố + "/".
  return pathname === route || pathname.startsWith(`${route}/`);
}

// Xác thực token và trả về true/false để middleware dễ xử lý điều hướng.
// Hàm này không throw ra ngoài; lỗi xác thực sẽ được quy về false.
async function hasValidAuthToken(token?: string): Promise<boolean> {
  // Không có token thì chắc chắn là chưa hợp lệ.
  if (!token) {
    return false;
  }

  try {
    // verifyAuthToken sẽ throw nếu token hết hạn hoặc không hợp lệ.
    await verifyAuthToken(token);
    // Verify thành công -> token hợp lệ.
    return true;
  } catch {
    // Verify thất bại -> token không hợp lệ.
    return false;
  }
}

// Middleware chạy trước khi request tới page/route phù hợp matcher.
// Nhiệm vụ chính: bảo vệ route private và tránh user đã login truy cập route guest-only.
export async function middleware(request: NextRequest) {
  // Lấy JWT từ cookie request hiện tại.
  const token = request.cookies.get(AUTH_CONFIG.tokenCookieName)?.value;
  // pathname hiện tại để xác định user đang truy cập route nào.
  const { pathname } = request.nextUrl;

  // Kiểm tra route hiện tại có phải protected route không.
  const isProtected = PROTECTED_ROUTES.some((r) => matchesRoute(pathname, r));
  // Kiểm tra route hiện tại có phải guest-only auth route không.
  const isAuthRoute = AUTH_ROUTES.some((r) => matchesRoute(pathname, r));
  // Kiểm tra token hiện tại có hợp lệ không.
  const hasValidToken = await hasValidAuthToken(token);

  // Trường hợp 1:
  // User cố vào protected route nhưng không có token hợp lệ -> ép về /login.
  if (isProtected && !hasValidToken) {
    // Tạo URL đích đăng nhập dựa trên request hiện tại.
    const loginUrl = new URL("/login", request.url);
    // Lưu route nguồn để có thể điều hướng lại sau login (nếu cần).
    loginUrl.searchParams.set("from", pathname);
    // Tạo phản hồi redirect sang trang login.
    const response = NextResponse.redirect(loginUrl);
    // Nếu request vẫn gửi kèm token lỗi thì xóa luôn cookie ở response.
    if (token) {
      response.cookies.delete(AUTH_CONFIG.tokenCookieName);
    }
    // Trả redirect ngay, dừng middleware.
    return response;
  }

  // Trường hợp 2:
  // User đã đăng nhập mà cố vào route guest-only -> chuyển sang /data.
  if (isAuthRoute && hasValidToken) {
    // Trả redirect tới trang protected mặc định sau đăng nhập.
    return NextResponse.redirect(new URL("/data", request.url));
  }

  // Trường hợp 3:
  // Route không cần redirect, nhưng token gửi lên không hợp lệ -> dọn cookie.
  if (token && !hasValidToken) {
    // Cho request đi tiếp bình thường.
    const response = NextResponse.next();
    // Xóa token hỏng để tránh ảnh hưởng request sau.
    response.cookies.delete(AUTH_CONFIG.tokenCookieName);
    // Trả response đã cleanup cookie.
    return response;
  }

  // Trường hợp mặc định: cho phép request đi tiếp không thay đổi.
  return NextResponse.next();
}

export const config = {
  // Chỉ chạy middleware tại các route quan tâm (không chạy cho _next, static, api khác).
  matcher: ["/", "/login", "/register", "/data", "/data/:path*"],
};