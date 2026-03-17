import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  url.hostname = "cashcalcs.com";
  url.port = "";
  url.pathname = "/savings-goal" + url.pathname;
  if (url.pathname === "/savings-goal/") url.pathname = "/savings-goal";
  return NextResponse.redirect(url, 301);
}
