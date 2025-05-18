import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { SanityLive } from "@/sanity/lib/live";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import ClerkRedirects from "@/components/ClerkRedirects";
import Script from "next/script";

export const metadata: Metadata = {
  title: "RehabifyLearn - Expert Rehabilitation Courses & Certification",
  description: "Professional physiotherapy courses and certification for therapists and students. Enhance your rehabilitation skills with expert-led programs.",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      afterSignInUrl="/courses"
      afterSignUpUrl="/courses"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      {/* Script to set session storage flag after authentication */}
      <Script id="clerk-auth-handler" strategy="afterInteractive">
        {`
          if (window.Clerk) {
            window.Clerk.addListener(({ user }) => {
              if (user) {
                // Set a flag in session storage to indicate successful sign-in or sign-up
                sessionStorage.setItem('clerk:justAuthenticated', 'true');
              }
            });
          }
        `}
      </Script>
      
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          {/* Add ClerkRedirects to handle post-authentication redirect */}
          <ClerkRedirects />
        </div>
      </ThemeProvider>

      <SanityLive />
    </ClerkProvider>
  );
}
