import { getCourses } from "@/sanity/lib/courses/getCourses";
import { CourseCard } from "@/components/CourseCard";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { GetCoursesQueryResult } from "@/sanity.types";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4">
        <Breadcrumb
          className="mb-6"
          segments={[
            { title: "Home", href: "/" },
            { title: "Courses", href: "/courses" },
          ]}
        />

        <h1 className="text-4xl font-bold mb-8">Available Courses</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: GetCoursesQueryResult[number]) => (
            <CourseCard
              key={course._id}
              course={course}
              href={`/courses/${course.slug}`}
            />
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No courses available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}