"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Mobile Background Image */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="https://res.cloudinary.com/dubeogufg/image/upload/v1747274627/rehabifylearn_img_z9syii.webp"
          alt="Healthcare Professional"
          fill
          className="object-cover object-center"
          priority
          fetchPriority="high"
        />
        {/* Dark overlay for better text visibility on mobile */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Desktop Background */}
      <div className="absolute inset-0 hidden md:block bg-[#fdf9f1] dark:bg-gradient-to-br dark:from-primary/10 dark:via-background dark:to-background" />
      
      <div className="container mx-auto px-4 relative max-w-5xl md:max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white md:text-foreground dark:text-secondary-honeydew">
              Transform Your Skills with{" "}
              <AnimatePresence mode="wait">
                <motion.span 
                  className="inline-block bg-gradient-to-r from-white to-pink-200 dark:from-rehabify-core dark:to-rehabify-alt bg-clip-text text-transparent relative md:bg-gradient-to-r md:from-rehabify-core md:to-rehabify-alt"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Rehabify Learn
                  <motion.div 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-white to-pink-200 dark:from-rehabify-core dark:to-rehabify-alt rounded-full md:from-rehabify-core md:to-rehabify-alt"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                </motion.span>
              </AnimatePresence>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 md:text-muted-foreground dark:text-secondary-honeydew/90 mb-8">
              Join thousands of students learning from industry experts. High-quality courses designed to help you excel in your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/courses">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-rehabify-core to-rehabify-alt text-white hover:opacity-90"
                >
                  Explore Courses
                </Button>
              </Link>
              <Link href="/my-courses">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-primary text-primary-foreground border-none hover:bg-primary/90 md:bg-transparent md:text-rehabify-core md:dark:text-secondary-honeydew md:border-rehabify-core md:dark:border-secondary-honeydew md:hover:bg-rehabify-core/10 md:dark:hover:bg-secondary-honeydew/10 md:hover:text-rehabify-core md:dark:hover:text-secondary-honeydew"
                >
                  My Learning Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop Hero Image */}
          <div className="hidden md:block relative h-[500px] w-full max-w-xl mx-auto">
            <Image
              src="https://res.cloudinary.com/dubeogufg/image/upload/v1747274627/rehabifylearn_img_z9syii.webp"
              alt="Healthcare Professional"
              fill
              className="object-cover object-center rounded-2xl"
              priority
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </div>
  );
}