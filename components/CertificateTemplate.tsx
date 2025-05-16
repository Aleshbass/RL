"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Course, Student } from "@/sanity.types";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas";

interface CertificateTemplateProps {
  course: Course;
  student: Student;
}

export function CertificateTemplate({
  course,
  student,
}: CertificateTemplateProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  // Current date formatted for display
  const currentDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    
    setIsDownloading(true);
    try {
      // Insert a delay to ensure all styles are applied and images are fully loaded
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get the element to capture
      const element = certificateRef.current;
      
      // Force all images to load
      const images = Array.from(element.querySelectorAll('img'));
      await Promise.all(
        images.map(img => {
          // Set crossOrigin to anonymous
          img.crossOrigin = "anonymous";
          
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
            // Force reload
            const currentSrc = img.src;
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            setTimeout(() => { img.src = currentSrc; }, 10);
          });
        })
      );
      
      // Capture the certificate with better options
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          // Fix styles in cloned document
          const clonedElement = clonedDoc.querySelector('.certificate-card');
          if (clonedElement) {
            Array.from(clonedElement.querySelectorAll('img')).forEach(img => {
              img.style.visibility = 'visible';
              img.crossOrigin = 'anonymous';
              img.style.objectFit = 'contain';
            });
          }
        }
      });
      
      // Convert to image and trigger download
      const imgData = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${student.firstName}-${student.lastName}-${course.title}-certificate.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading certificate:", error);
      alert("There was an error downloading your certificate. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };
  
  const shareCertificate = async () => {
    setIsSharing(true);
    try {
      // In a real implementation, this could generate a shareable URL
      // or open a share dialog with the certificate details
      alert(`Share your certificate for ${course.title} from your account dashboard.`);
    } catch (error) {
      console.error("Error sharing certificate:", error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      <Card ref={certificateRef} className="certificate-card w-full relative overflow-hidden p-1 bg-gradient-to-br from-white to-secondary-honeydew">
        <div className="absolute inset-0 rounded-lg bg-[url('/images/certificate-bg.svg')] opacity-5"></div>
        <div className="absolute inset-0 border-[1px] border-rehabify-core/10 rounded-lg"></div>
        
        {/* Border Elements */}
        <div className="absolute top-1 left-1 w-10 h-10 border-t border-l border-rehabify-core opacity-40 rounded-tl"></div>
        <div className="absolute top-1 right-1 w-10 h-10 border-t border-r border-rehabify-core opacity-40 rounded-tr"></div>
        <div className="absolute bottom-1 left-1 w-10 h-10 border-b border-l border-rehabify-core opacity-40 rounded-bl"></div>
        <div className="absolute bottom-1 right-1 w-10 h-10 border-b border-r border-rehabify-core opacity-40 rounded-br"></div>
        
        {/* Card Content */}
        <div className="p-6 sm:p-8 lg:p-10 relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex-shrink-0">
              <Image 
                src="/logo/cert-logo.png" 
                alt="Rehabify Learn Logo" 
                width={180}
                height={60}
                className="object-contain" 
                priority
                unoptimized={true}
              />
            </div>
            
            <div className="text-center sm:text-right">
              <h2 className="text-xl sm:text-2xl font-bold text-rehabify-core tracking-wide">COURSE</h2>
              <h2 className="text-xl sm:text-2xl font-bold text-rehabify-core tracking-wide">CERTIFICATE</h2>
            </div>
          </div>
          
          {/* Certificate Content */}
          <div className="text-center py-6 space-y-4">
            <div className="my-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                {student.firstName} {student.lastName}
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 mt-2">has successfully completed</p>
              <div className="h-0.5 w-48 bg-rehabify-core/10 mx-auto my-4"></div>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-rehabify-core mb-4">
              {course.title}
            </h3>
            
            <p className="text-lg sm:text-xl text-gray-700">a non-credit course authorized by Rehabify Learn</p>
          </div>
          
          {/* Footer with Signature and Seal */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6">
            {/* Signature */}
            <div className="text-center sm:text-left">
              <div className="mb-2 inline-block border-b border-gray-400 pb-1">
                <span className="text-2xl font-signature text-gray-800">Ademola Abass</span>
              </div>
              <p className="text-base text-gray-700">Ademola Abass</p>
              <p className="text-sm text-gray-500">Co-founder of Rehabify</p>
            </div>
            
            {/* Certificate Seal */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <div className="absolute inset-0 rounded-full border border-rehabify-core/20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed border-rehabify-core/30 animate-spin-slow"></div>
                <Image 
                  src="/logo/cert-logo.png" 
                  alt="Certificate Seal" 
                  width={60} 
                  height={20} 
                  className="object-contain"
                  unoptimized={true}
                />
              </div>
            </div>
          </div>
          
          {/* Footer note */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-600">
              Rehabify Learn hereby confirms the successful completion of the above-mentioned course on {currentDate}.
            </p>
          </div>
        </div>
      </Card>
      
      {/* Certificate Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button
          size="lg"
          onClick={downloadCertificate}
          disabled={isDownloading}
          className="min-w-[200px] w-fit bg-rehabify-core hover:bg-rehabify-alt text-white"
        >
          <FontAwesomeIcon icon={faDownload} className="w-4 h-4 mr-2" />
          {isDownloading ? "Downloading..." : "Download Certificate"}
        </Button>

        <Button
          size="lg"
          onClick={shareCertificate}
          disabled={isSharing}
          variant="outline"
          className="min-w-[200px] w-fit border-rehabify-core text-rehabify-core hover:bg-rehabify-core/10"
        >
          <FontAwesomeIcon icon={faShareAlt} className="w-4 h-4 mr-2" />
          {isSharing ? "Sharing..." : "Share Certificate"}
        </Button>
      </div>
    </div>
  );
}