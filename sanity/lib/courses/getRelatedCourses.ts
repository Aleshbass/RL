import { defineQuery } from "groq";
import { sanityFetch } from "../live";
import { GetCoursesQueryResult } from "@/sanity.types";

export async function getRelatedCourses(courseId: string, categoryId: string, limit: number = 3): Promise<GetCoursesQueryResult> {
  const getRelatedCoursesQuery = defineQuery(`*[_type == "course" && _id != $courseId && category._ref == $categoryId][0...$limit] {
    ...,
    "slug": slug.current,
    "category": category->{...},
    "instructor": instructor->{...}
  }`);

  const courses = await sanityFetch({
    query: getRelatedCoursesQuery,
    params: { courseId, categoryId, limit },
  });

  return courses.data;
}