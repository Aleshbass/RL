"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Course, Student } from "@/sanity.types";
import { CertificateTemplate } from "./CertificateTemplate";

interface CourseCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  student: Student;
  completionDate: Date;
}

export function CourseCompletionModal({
  isOpen,
  onClose,
  course,
  student,
  completionDate,
}: CourseCompletionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-fit">
        <DialogHeader>
          <DialogTitle>Course Completion Certificate</DialogTitle>
        </DialogHeader>
        <div className="overflow-auto max-h-[85vh]">
          <CertificateTemplate
            course={course}
            student={student}
            completionDate={completionDate}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}