"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ConfettiSuccess from "./ConfettiSuccess";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNaira } from "@/lib/utils";

export function OrderConfirmationSkeleton() {
  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card className="overflow-hidden rounded-lg border bg-card shadow-md">
        <div className="p-8 flex flex-col items-center space-y-6">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="w-full">
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-36" />
          </div>
        </div>
      </Card>
    </div>
  );
}

// Define structured course type to replace 'any'
interface CourseData {
  title: string;
  description?: string;
  imageUrl: string;
  instructor: { name: string } | null;
  price: number;
  slug?: string;
  image: boolean;
}

interface OrderConfirmationContentProps {
  course: CourseData;
  reference: string;
}

export function OrderConfirmationContent({ course, reference }: OrderConfirmationContentProps) {
  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card className="overflow-hidden rounded-lg border bg-card shadow-md">
        <div className="p-8 flex flex-col items-center space-y-6">
          <div className="flex justify-center items-center bg-green-100 dark:bg-green-900/30 rounded-full p-3">
            <CheckCircle2 className="h-10 w-10 text-green-500 dark:text-secondary-honeydew" />
          </div>
          
          <h1 className="text-3xl font-bold text-center">Payment Successful!</h1>
          <p className="text-secondary-foreground/70 dark:text-secondary-honeydew">
            Your enrollment has been confirmed.
          </p>
          
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg border border-muted">
            {course.image && (
              <Image
                src={course.imageUrl}
                alt={course.title || "Course"}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
              <div className="p-4 w-full">
                <h2 className="text-xl md:text-2xl font-semibold text-white">{course.title}</h2>
                {course.instructor && (
                  <p className="text-white/80 text-sm md:text-base">
                    Instructor: {course.instructor.name}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="w-full space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Order reference:</span>
              <span className="font-mono text-sm">{reference}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Amount paid:</span>
              <span className="font-semibold">{formatNaira(course.price || 0)}</span>
            </div>
            
            <div className="pt-2">
              <p className="text-sm text-muted-foreground mb-2">Course access:</p>
              <Progress value={100} className="h-2 bg-muted" />
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button asChild size="lg" className="mt-3">
              <Link href={course.slug ? `/courses/${course.slug}` : "/courses"}>
                Start Learning
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function OrderConfirmationPage({ course, reference }: OrderConfirmationContentProps) {
  return (
    <div className="min-h-screen bg-background pt-20">
      <ConfettiSuccess />
      <OrderConfirmationContent course={course} reference={reference} />
    </div>
  );
}
