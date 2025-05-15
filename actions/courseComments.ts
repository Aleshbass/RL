'use server'

import { client } from "@/sanity/lib/adminClient";
import { getStudentByClerkId } from "@/sanity/lib/student/getStudentByClerkId";

export async function addCourseComment({ courseId, clerkId, text }: { courseId: string; clerkId: string; text: string }) {
  const student = await getStudentByClerkId(clerkId);
  if (!student?.data?._id) throw new Error("Student not found");
  const comment = {
    _type: "object",
    user: { _type: "reference", _ref: student.data._id },
    text,
    createdAt: new Date().toISOString(),
  };
  return client.patch(courseId)
    .setIfMissing({ comments: [] })
    .insert("after", "comments[-1]", [comment])
    .commit();
}

export async function removeCourseComment({ courseId, commentKey }: { courseId: string; commentKey: string }) {
  return client.patch(courseId)
    .unset([`comments[_key=="${commentKey}"]`])
    .commit();
}
