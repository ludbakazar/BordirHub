import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenJose } from "./helpers/jwt";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const authorization = cookieStore.get("authorization")?.value;
  if (!authorization) {
    return NextResponse.json(
      {
        mesesage: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }
  const token = authorization.split(" ")[1];
  const decode = await verifyTokenJose<{ _id: string; email: string }>(token);
  if (!decode) {
    return NextResponse.json(
      {
        message: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", decode._id);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  matcher: ["/api/transactions/:path*"],
};
