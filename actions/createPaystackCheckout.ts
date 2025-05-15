"use server";

import { initializePaystackTransaction } from "@/lib/paystack";
import baseUrl from "@/lib/baseUrl";

import { urlFor } from "@/sanity/lib/image";
import getCourseById from "@/sanity/lib/courses/getCourseById";
import { createStudentIfNotExists } from "@/sanity/lib/student/createStudentIfNotExists";
import { clerkClient } from "@clerk/nextjs/server";
import { createEnrollment } from "@/sanity/lib/student/createEnrollment";

export async function createPaystackCheckout(courseId: string, userId: string) {
  try {
    // 1. Query course details from Sanity
    const course = await getCourseById(courseId);
    const clerkUser = await (await clerkClient()).users.getUser(userId);
    const { emailAddresses, firstName, lastName, imageUrl } = clerkUser;
    const email = emailAddresses[0]?.emailAddress;

    if (!emailAddresses || !email) {
      throw new Error("User details not found");
    }

    if (!course) {
      throw new Error("Course not found");
    }

    // mid step - create a user in sanity if it doesn't exist
    const user = await createStudentIfNotExists({
      clerkId: userId,
      email: email || "",
      firstName: firstName || email,
      lastName: lastName || "",
      imageUrl: imageUrl || "",
    });

    if (!user) {
      throw new Error("User not found");
    }

    // 2. Validate course data and prepare price for Paystack
    if (!course.price && course.price !== 0) {
      throw new Error("Course price is not set");
    }
    const priceInKobo = Math.round(course.price * 100); // 1 NGN = 100 Kobo

    // if course is free, create enrollment and redirect to course page (BYPASS PAYSTACK CHECKOUT)
    if (priceInKobo === 0) {
      await createEnrollment({
        studentId: user._id,
        courseId: course._id,
        paymentId: "free",
        amount: 0,
      });

      return { url: `/courses/${course.slug?.current}` };
    }

    const { title, description, image, slug } = course;

    if (!title || !description || !image || !slug) {
      throw new Error("Course data is incomplete");
    }

    // 3. Create and configure Paystack Transaction
    const callback_url = `https://rehabifylearn.com/courses/${slug.current}`;
    const metadata = {
      courseId: course._id,
      userId: userId,
      courseTitle: title,
    };

    const paystackRes = await initializePaystackTransaction({
      email,
      amount: priceInKobo,
      callback_url,
      metadata,
    });

    if (!paystackRes.status || !paystackRes.data?.authorization_url) {
      throw new Error("Failed to initialize Paystack transaction");
    }

    // 4. Return Paystack authorization URL for client redirect
    return { url: paystackRes.data.authorization_url };
  } catch (error) {
    console.error("Error in createPaystackCheckout:", error);
    throw new Error("Failed to create Paystack checkout session");
  }
}
