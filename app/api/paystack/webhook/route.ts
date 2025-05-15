import { NextResponse } from "next/server";
import { createEnrollment } from "@/sanity/lib/student/createEnrollment";
import { getStudentByClerkId } from "@/sanity/lib/student/getStudentByClerkId";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY ;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Optionally, verify signature here if you set up Paystack webhook secret
    // const signature = req.headers.get("x-paystack-signature");
    // TODO: Add signature verification for extra security

    if (body.event === "charge.success") {
      const data = body.data;
      const metadata = data.metadata || {};
      const courseId = metadata.courseId;
      const userId = metadata.userId;
      const amount = data.amount / 100; // Convert from kobo to NGN
      const paymentId = data.reference;

      if (!courseId || !userId) {
        return new NextResponse("Missing courseId or userId in metadata", { status: 400 });
      }

      // Get student by Clerk ID
      const student = await getStudentByClerkId(userId);
      if (!student || !student.data || !student.data._id) {
        return new NextResponse("Student not found", { status: 404 });
      }

      // Create enrollment
      await createEnrollment({
        studentId: student.data._id,
        courseId,
        paymentId,
        amount,
      });
    }

    return new NextResponse("Webhook received", { status: 200 });
  } catch (error) {
    console.error("Paystack webhook error:", error);
    return new NextResponse("Webhook error", { status: 500 });
  }
}
