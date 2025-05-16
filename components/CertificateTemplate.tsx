"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Award, CheckCircle, ShieldCheck } from "lucide-react";
import { Course, Student } from "@/sanity.types";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";

interface CertificateTemplateProps {
  course: Course;
  student: Student;
  completionDate: Date;
}

export function CertificateTemplate({
  course,
  student,
  completionDate,
}: CertificateTemplateProps) {
  const [isLoading, setIsLoading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const downloadPDF = async () => {
    if (!certificateRef.current) return;

    setIsLoading(true);
    try {
      const canvas = await html2canvas(certificateRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1000, 700],
      });

      pdf.addImage(imgData, "PNG", 0, 0, 1000, 700);
      pdf.save(
        `${student.firstName}-${student.lastName}-${course.title}-certificate.pdf`
      );
    } catch (error) {
      console.error("Error downloading certificate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8 w-full">
      {/* Certificate Container */}
      <div
        ref={certificateRef}
        className="relative w-full max-w-4xl mx-auto bg-white p-14 shadow-xl border border-gray-200 rounded-lg overflow-hidden"
        style={{
          aspectRatio: "1.43/1",
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z%22 fill=%22%23f0f4fa%22 fill-opacity=%220.4%22 fill-rule=%22evenodd%22/%3E%3C/svg%3E')",
        }}
      >
        {/* Certificate Border */}
        <div className="absolute inset-0 border-[12px] border-double border-blue-50 rounded-lg pointer-events-none"></div>
        
        {/* Decorative Corner Elements */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-blue-600 opacity-30 rounded-tl-lg"></div>
        <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-blue-600 opacity-30 rounded-tr-lg"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-blue-600 opacity-30 rounded-bl-lg"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-blue-600 opacity-30 rounded-br-lg"></div>

        {/* Certificate Badge - Top Center */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
          <Award className="w-16 h-16 text-blue-600/20" />
        </div>

        {/* Header with Logos */}
        <div className="flex justify-between items-center mb-14 mt-4 relative z-10">
          {/* Organization Logo (Left) */}
          <div className="w-40 h-16 bg-gradient-to-r from-blue-50 to-white flex items-center justify-center rounded border border-gray-100">
            <Image 
              src="https://res.cloudinary.com/dubeogufg/image/upload/v1747237202/Untitled_design_16_leqab3.png" 
              alt="Organization Logo" 
              className="max-h-full max-w-full object-contain" 
              width={160}
              height={64}
            />
          </div>

          {/* Course/Certificate Logo (Right) */}
          <div className="w-40 h-16 bg-gradient-to-l from-blue-50 to-white flex items-center justify-center rounded border border-gray-100">
            <ShieldCheck className="w-10 h-10 text-blue-700" />
          </div>
        </div>

        {/* Certificate Content */}
        <div className="text-center mb-14 relative z-10">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-600 mb-2 font-medium">RehabifyLearn Presents</p>
            <h1 className="text-2xl font-bold text-gray-700 mb-3 tracking-wider">
              CERTIFICATE OF COMPLETION
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto"></div>
          </div>

          <p className="text-xl text-gray-600 mb-4">This certifies that</p>

          <h2 className="text-5xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            {student.firstName} {student.lastName}
          </h2>

          <p className="text-xl text-gray-600 mb-4">has successfully completed the course</p>
          
          <h3 className="text-3xl font-bold text-blue-600 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            {course.title}
          </h3>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-lg text-gray-600">Completed on {formatDate(completionDate)}</p>
          </div>
        </div>
        
        {/* Signature */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="text-center">
            <div className="w-48 h-0.5 bg-gray-400"></div>
            <p className="mt-2 text-lg">Dr. Ademola Abass</p>
            <p className="text-sm text-gray-500">Co-Founder Rehabify</p>
          </div>
        </div>
        
        {/* Certificate ID */}
        <div className="absolute bottom-4 left-0 w-full text-center">
          <p className="text-sm text-gray-400 font-mono">
            Certificate ID: {course._id.slice(0, 8)}-{student._id.slice(0, 8)}
          </p>
        </div>
      </div>

      {/* Download Button */}
      <Button
        size="lg"
        onClick={downloadPDF}
        disabled={isLoading}
        className="min-w-[200px] w-fit bg-primary hover:bg-primary/90"
      >
        <FileDown className="w-4 h-4 mr-2" />
        {isLoading ? "Generating..." : "Download Certificate"}
      </Button>
    </div>
  );
}