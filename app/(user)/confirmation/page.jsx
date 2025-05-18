import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import getCourseBySlug from '@/sanity/lib/courses/getCourseBySlug';
import { urlFor } from '@/sanity/lib/image';
import dynamic from 'next/dynamic';

// Load the OrderConfirmationPage component dynamically to avoid type issues
const OrderConfirmationPage = dynamic(
  () => import('@/components/OrderConfirmationPage'),
  { ssr: true, loading: () => <p className="p-8 text-center">Loading confirmation...</p> }
);

// Using JSX instead of TSX to avoid the typing issues
export default async function ConfirmationPage(props) {
  // Extract searchParams safely
  const searchParams = props.searchParams || {};
  const courseSlug = searchParams.courseSlug;
  const reference = searchParams.reference;
  
  if (!courseSlug || !reference) {
    redirect('/');
  }
  
  // Check authentication
  const { userId } = await auth();
  if (!userId) redirect('/');
  
  // Get course data
  const course = await getCourseBySlug(courseSlug);
  if (!course) redirect('/courses');
  
  // Transform course data for client component
  const courseData = {
    title: course.title || 'Course',
    description: course.description || '',
    imageUrl: course.image ? urlFor(course.image).url() : '',
    instructor: course.instructor ? {
      name: course.instructor.name || 'Instructor',
    } : null,
    price: course.price || 0,
    slug: course.slug?.current || '',
    image: !!course.image
  };

  // Return the confirmation page with course data and reference
  return <OrderConfirmationPage course={courseData} reference={reference} />;
}
