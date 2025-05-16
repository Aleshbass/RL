// import { authMiddleware } from "@clerk/nextjs/server";
 
// export default authMiddleware({
//   // Public routes that don't require authentication
//   publicRoutes: [
//     "/",
//     "/courses",
//     "/courses/(.*)",
//     "/api/clerk/avatar/(.*)",
//     "/api/draft-mode/(.*)",
//     "/about",
//     "/blog",
//     "/blog/(.*)",
//     "/robots.txt",
//     "/sitemap.xml",
//     "/api/paystack/webhook",
//     "/search/(.*)"
//   ],
//   // Routes that can be accessed while signed in or not
//   ignoredRoutes: [
//     "/studio(.*)", // Sanity Studio paths
//     "/api/draft-mode/(.*)",
//     "/images/(.*)",
//     "/favicon/(.*)",
//     "/fonts/(.*)",
//     "/image/(.*)"
//   ],
// });
 
// export const config = {
//   matcher: [
//     // Skip all internal paths (_next, static files, api routes, etc)
//     "/((?!_next/static|_next/image|favicon.ico|images|assets|image|fonts|favicon|api/clerk/avatar).*)"
//   ],
//   // This is required for Clerk running at the Edge
//   runtime: "edge"
// };

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};