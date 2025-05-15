"use client";

import { useState } from "react";
import { Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCompletionModal } from "@/components/CourseCompletionModal";
import { getCertificateAction } from "@/app/actions/getCertificateAction";
import { Course, Student } from "@/sanity.types";

interface CourseCompletionBadgeProps {
  clerkId: string;
  courseId: string;
  progress: number;
}

export function CourseCompletionBadge({
  clerkId,
  courseId,
  progress,
}: CourseCompletionBadgeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certificateData, setCertificateData] = useState<{
    student: Student;
    course: Course;
    completionDate: Date;
  } | null>(null);

  const handleViewCertificate = async () => {
    const data = await getCertificateAction(clerkId, courseId);
    if (data) {
      setCertificateData(data);
      setIsModalOpen(true);
    }
  };

  if (progress !== 100) return null;

  return (
    <>
      <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 dark:bg-emerald-500/20 rounded-full p-2">
            <Award className="w-6 h-6 text-emerald-700 dark:text-emerald-500" />
          </div>
          <div>
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-300">Course Completed!</h3>
            <p className="text-sm text-emerald-700 dark:text-emerald-400">View and download your certificate</p>
          </div>
        </div>
        <Button
          onClick={handleViewCertificate}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          View Certificate
        </Button>
      </div>

      {certificateData && (
        <CourseCompletionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          course={certificateData.course}
          student={certificateData.student}
          completionDate={certificateData.completionDate}
        />
      )}
    </>
  );
}