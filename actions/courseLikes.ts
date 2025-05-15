'use server'

import { client } from "@/sanity/lib/adminClient";
import { getStudentByClerkId } from "@/sanity/lib/student/getStudentByClerkId";

export async function likeCourse({ courseId, clerkId }: { courseId: string; clerkId: string }) {
  const student = await getStudentByClerkId(clerkId);
  if (!student?.data?._id) throw new Error("Student not found");
  const like = {
    _type: "object",
    user: { _type: "reference", _ref: student.data._id },
    createdAt: new Date().toISOString(),
  };
  return client.patch(courseId)
    .setIfMissing({ likes: [] })
    .insert("after", "likes[-1]", [like])
    .commit();
}

export async function unlikeCourse({ courseId, clerkId }: { courseId: string; clerkId: string }) {
  const student = await getStudentByClerkId(clerkId);
  if (!student?.data?._id) throw new Error("Student not found");
  return client.patch(courseId)
    .unset([`likes[user._ref=="${student.data._id}"]`])
    .commit();
}
