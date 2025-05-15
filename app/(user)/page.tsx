import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import FAQ from "@/components/landing/FAQ";
import Testimonials from "@/components/landing/Testimonials";
import TrendingCourses from "@/components/landing/TrendingCourses";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCourses } from "@/sanity/lib/courses/getCourses";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function LandingPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <TrendingCourses courses={courses} />
      <div className="text-center py-12">
        <Link href="/courses">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Browse All Courses
          </Button>
        </Link>
      </div>
      <FAQ />
      <Testimonials />
    </div>
  );
}
