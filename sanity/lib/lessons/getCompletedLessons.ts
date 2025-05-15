import { defineQuery } from "groq";
import { sanityFetch } from "../live";
import { getStudentByClerkId } from "../student/getStudentByClerkId";

export default async function getCompletedLessons(clerkId: string, courseId: string) {
  const student = await getStudentByClerkId(clerkId);

  if (!student?.data?._id) {
    throw new Error("Student not found");
  }

  const completedLessonsQuery = defineQuery(`{
    "completedLessons": *[_type == "lessonCompletion" && student._ref == $studentId && course._ref == $courseId] {
      ...,
      "lesson": lesson->{...},
      "module": module->{...},
      _createdAt
    }
  }`);

  const result = await sanityFetch({
    query: completedLessonsQuery,
    params: { studentId: student.data._id, courseId },
  });

  return result.data;
}