"use client";

import { urlFor } from "@/sanity/lib/image";

// Define a type for Sanity image references
interface SanityImageRef {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  [key: string]: unknown;
}

interface CourseStructuredDataProps {
  course: {
    _id: string;
    title: string;
    description?: string;
    slug?: string;
    price?: number;
    instructor?: {
      name?: string;
      photo?: SanityImageRef;
      bio?: string;
    };
    image?: SanityImageRef;
    category?: {
      name?: string;
    };
  };
}

export function CourseStructuredData({ course }: CourseStructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description || "A professional rehabilitation course on RehabifyLearn",
    provider: {
      "@type": "Organization",
      name: "RehabifyLearn",
      sameAs: "https://rehabifylearn.com"
    },
    ...(course.instructor?.name && {
      author: {
        "@type": "Person",
        name: course.instructor.name,
        ...(course.instructor?.bio && { description: course.instructor.bio })
      }
    }),
    ...(course.price !== undefined && { 
      offers: {
        "@type": "Offer",
        price: course.price,
        priceCurrency: "NGN",
        availability: "https://schema.org/InStock"
      }
    }),
    url: `https://rehabifylearn.com/courses/${course.slug}`,
    ...(course.image && { 
      image: urlFor(course.image).url() 
    }),
    ...(course.category?.name && { 
      courseCode: course.category.name 
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
