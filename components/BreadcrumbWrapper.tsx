"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";

interface BreadcrumbWrapperProps {
  mobileBreadcrumbSegments: {
    title: string;
    href: string;
  }[];
  desktopBreadcrumbSegments: {
    title: string;
    href: string;
  }[];
}

export default function BreadcrumbWrapper({
  mobileBreadcrumbSegments,
  desktopBreadcrumbSegments,
}: BreadcrumbWrapperProps) {
  return (
    <>
      {/* Mobile breadcrumb (hidden on desktop) */}
      <div className="md:hidden">
        <Breadcrumb 
          segments={mobileBreadcrumbSegments} 
          className="text-sm text-white backdrop-blur-sm bg-black/30 w-fit px-4 py-2 rounded-md [&_a]:text-white [&_svg]:text-white" 
        />
      </div>
      
      {/* Desktop breadcrumb (hidden on mobile) */}
      <div className="hidden md:block">
        <Breadcrumb 
          segments={desktopBreadcrumbSegments} 
          className="text-sm text-white backdrop-blur-sm bg-black/30 w-fit px-4 py-2 rounded-md [&_a]:text-white [&_svg]:text-white" 
        />
      </div>
    </>
  );
}
