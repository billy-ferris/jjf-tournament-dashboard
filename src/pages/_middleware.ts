import { NextRequest, NextResponse } from "next/server";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { MW_AUTH, SUPABASE_TOKEN } from "../config";

/**
 * Verifies the user's JWT token and continues with the chain of middlewares, till the actual route is visited if the user is valid, or redirects to `/` if it's not
 */
export async function middleware(request: NextRequest) {
  if (MW_AUTH) await verifyAuth(request);

  // continue the middleware chain https://nextjs.org/docs/api-reference/next/server#nextresponse
  return NextResponse.next();
}

async function verifyAuth(request: NextRequest) {
  const token = request.cookies[SUPABASE_TOKEN];

  // Obtain JWT Secret from Supabase dashboard - 'Settings' -> 'API' -> 'Config' -> 'JWT Secret' and configure in Vercel as `NEXT_PUBLIC_SUPABASE_JWT_SECRET`
  if (
    !token ||
    !(await jwt.verify(token, process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET!))
  ) {
    return NextResponse.redirect("/", 302);
  }
}
