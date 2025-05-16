// Using a simplified approach that works with Vercel Edge Runtime
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

// Define public routes that don't require authentication
const publicPaths = [
  "/",
  "/courses",
  "/courses/.*",
  "/api/clerk/avatar/.*",
  "/api/draft-mode/.*",
  "/about",
  "/blog",
  "/blog/.*",
  "/robots.txt",
  "/sitemap.xml",
  "/api/paystack/webhook",
  "/search/.*",
  "/studio/.*", // Sanity Studio paths
  "/images/.*",
  "/favicon/.*",
  "/fonts/.*",
  "/image/.*"
];

const isPublic = (path: string) => {
  return publicPaths.find((pp) => path.match(new RegExp(`^${pp}$`))) !== undefined;
};

export default async function middleware(req: NextRequest) {
  // Skip public files and paths
  const path = req.nextUrl.pathname;
  if (
    path.includes(".") || // Skip files with extensions (like .css, .js, etc.)
    path.startsWith("/_next") || 
    path.startsWith("/api/clerk/avatar") || 
    isPublic(path)
  ) {
    return NextResponse.next();
  }

  // Get auth state
  const { userId } = getAuth(req);
  
  // If not signed in, redirect to sign-in page
  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", path);
    return NextResponse.redirect(signInUrl);
  }
  
  return NextResponse.next();
}
 
export const config = {
  runtime: 'experimental-edge',
  matcher: [
    // Skip static files, Next.js internals, and specific resources
    "/((?!_next/static|_next/image|favicon.ico|images/|assets/|fonts/|favicon/|\.(?:jpg|jpeg|gif|png|webp|svg|ico)).*)"
  ]
};
