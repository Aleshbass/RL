"use server";

import { getStudentByClerkId } from "@/sanity/lib/student/getStudentByClerkId";
import { getCourseProgress } from "@/sanity/lib/lessons/getCourseProgress";
import getCourseById from "@/sanity/lib/courses/getCourseById";

export async function getCertificateAction(clerkId: string, courseId: string) {
  try {
    // Get student data
    const student = await getStudentByClerkId(clerkId);
    if (!student?.data) {
      throw new Error("Student not found");
    }

    // Get course progress
    const progress = await getCourseProgress(clerkId, courseId);
    if (progress.courseProgress !== 100) {
      return null;
    }

    // Get course data
    const course = await getCourseById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Get the latest completion date from the completed lessons
    const latestCompletion = progress.completedLessons.reduce(
      (latest: Date | null, current: { completedAt?: string }) => {
        const currentDate = new Date(current.completedAt || "");
        return !latest || currentDate > latest ? currentDate : latest;
      },
      null as Date | null
    );

    if (!latestCompletion) {
      throw new Error("No completion date found");
    }

    return {
      student: student.data,
      course,
      completionDate: latestCompletion,
    };
  } catch (error) {
    console.error("Error getting certificate data:", error);
    return null;
  }
}