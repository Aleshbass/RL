"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't show footer on individual course pages
  // This checks if the path is like /courses/[slug] but not /courses
  const shouldHideFooter = pathname.includes('/courses/') && !pathname.endsWith('/courses');
  
  if (shouldHideFooter) {
    return null;
  }
  
  return <Footer />;
}
