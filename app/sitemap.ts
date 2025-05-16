import { MetadataRoute } from 'next';
import { getCourses } from '@/sanity/lib/courses/getCourses';

// Define the Course type interface
interface Course {
  slug: string;
  _id: string;
  title: string;
  // Use a more specific index signature for better type safety
  [key: string]: string | number | boolean | object | undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rehabifylearn.com';
  
  // Get all courses for dynamic URLs
  const courses = await getCourses();
  
  // Core static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/my-courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ] as MetadataRoute.Sitemap;

  // Generate URLs for all courses
  const courseUrls = courses.map((course: Course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  })) as MetadataRoute.Sitemap;

  return [...staticPages, ...courseUrls];
}
