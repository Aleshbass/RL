import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import Footer from "@/components/Footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rehabifylearn.com'),
  title: {
    default: "RehabifyLearn - Expert Rehabilitation Courses & Certification",
    template: "%s | RehabifyLearn"
  },
  description: "RehabifyLearn offers professional physiotherapy courses and certification for therapists and undergraduates. Enhance your rehabilitation skills with expert-led programs.",
  keywords: [
    "physiotherapy courses", 
    "rehabilitation training", 
    "physical therapy certification", 
    "physiotherapy education", 
    "online rehab courses", 
    "professional development",
    "physio certification",
    "rehabilitation techniques"
  ],
  authors: [{ name: "RehabifyLearn Team" }],
  creator: "RehabifyLearn",
  publisher: "RehabifyLearn",
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rehabifylearn.com',
    siteName: 'RehabifyLearn',
    title: 'RehabifyLearn - Expert Rehabilitation Courses & Certification',
    description: 'Professional physiotherapy courses and certification for therapists and students. Enhance your rehabilitation skills with expert-led programs.',
    images: [
      {
        url: 'https://rehabifylearn.com/image/og-image.webp',
        width: 1536,
        height: 1024,
        alt: 'RehabifyLearn - Expert Rehabilitation Courses'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RehabifyLearn - Expert Rehabilitation Courses & Certification',
    description: 'Professional physiotherapy courses and certification for therapists and students. Enhance your rehabilitation skills with expert-led programs.',
    images: ['https://rehabifylearn.com/image/og-image.webp'],
    creator: '@rehabifylearn'
  },
  alternates: {
    canonical: 'https://rehabifylearn.com',
    languages: {
      'en-US': 'https://rehabifylearn.com/en-US',
    }
  },
  verification: {
    // Add your Google Search Console verification code when available
    google: 'google-site-verification-code',
  }
};

config.autoAddCss = false; // Tell Font Awesome to skip adding CSS automatically since we imported the CSS above

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/Pally-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/fonts/Pally-Medium.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/fonts/Pally-Bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
