"use client";

import { CourseCard } from "@/components/CourseCard";
import { GetCoursesQueryResult } from "@/sanity.types";

interface TrendingCoursesProps {
  courses: GetCoursesQueryResult;
}

export default function TrendingCourses({ courses }: TrendingCoursesProps) {
  return (
    <section className="py-16 bg-[#fdf9f1] dark:bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 dark:from-secondary-honeydew dark:to-secondary-honeydew/80 bg-clip-text text-transparent">
            Trending Courses
          </h2>
          <p className="text-lg text-muted-foreground dark:text-secondary-honeydew/90 max-w-2xl">
            Discover our most popular courses and start learning today
          </p>
        </div>
        
        <div className="relative">
          <div className="flex overflow-x-auto pb-4 gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {courses.map((course) => (
              <div key={course._id} className="flex-none w-[280px] h-full snap-start">
                <CourseCard
                  course={course}
                  href={`/courses/${course.slug}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}