"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Breadcrumb } from "../ui/breadcrumb";

export default function AboutUs() {
  return (
    <div>
      {/* Hero Section with background image */}
      <div className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: 'url("https://res.cloudinary.com/dubeogufg/image/upload/v1747302176/May_15_2025_10_41_54_AM_myrwny.png")'
      }}>
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Additional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-rehabify-core/30 to-rehabify-alt/30" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Breadcrumb - Desktop only */}
          <div className="absolute top-0 left-0 right-0 py-6 hidden md:block">
            <Breadcrumb 
              segments={[
                { title: "Home", href: "/" },
                { title: "About Us", href: "/about" }
              ]}
              className="text-white hover:text-white/90 text-base font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            />
          </div>
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            >
              About Rehabify Learn
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white max-w-2xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] font-medium"
            >
              Empowering healthcare professionals through innovative online
              education
            </motion.p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-xl border border-border bg-secondary-honeydew dark:bg-rehabify-alt/10"
          >
            <h2 className="text-2xl font-bold mb-4 text-rehabify-core">Our Mission</h2>
            <p className="text-rehabify-core/80">
              To provide accessible, high-quality continuing education for
              healthcare professionals, enabling them to stay current with the
              latest practices and deliver better patient care.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-xl border border-border bg-secondary-fairy dark:bg-rehabify-core/10"
          >
            <h2 className="text-2xl font-bold mb-4 text-rehabify-core">Our Vision</h2>
            <p className="text-rehabify-core/80">
              To become the leading online platform for healthcare professional
              education, fostering a community of lifelong learners dedicated to
              excellence in patient care.
            </p>
          </motion.div>
        </div>

        {/* Dynamic Island Section */}
        <div className="mb-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl bg-gradient-to-br from-rehabify-core/5 to-rehabify-alt/10 p-8 md:p-12 overflow-hidden border border-border"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6 text-rehabify-core">Collaborative Learning Environment</h2>
                <p className="text-lg text-rehabify-core/80 mb-6">
                  At Rehabify Learn, we believe in the power of collaboration and shared knowledge. Our platform brings together healthcare professionals from diverse backgrounds to learn, grow, and excel together.
                </p>
                <p className="text-lg text-rehabify-core/80">
                  Join our community of passionate physiotherapists, occupational therapists, and other healthcare specialists who are committed to advancing their skills and improving patient outcomes.
                </p>
              </div>
              <div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dubeogufg/image/upload/v1747296767/ChatGPT_Image_May_15_2025_09_08_20_AM_voar87.webp"
                  alt="Two physiotherapists smiling at each other"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description:
                  "Commitment to providing the highest quality educational content",
                icon: "🎯",
              },
              {
                title: "Innovation",
                description: "Embracing new technologies and teaching methods",
                icon: "💡",
              },
              {
                title: "Accessibility",
                description:
                  "Making education available to professionals everywhere",
                icon: "🌍",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-xl border border-border text-center ${index === 0 ? 'bg-secondary-fairy dark:bg-rehabify-core/10' : index === 1 ? 'bg-[#e6eafe] dark:bg-rehabify-highlight/10' : 'bg-[#fef3e6] dark:bg-rehabify-alt/20'}`}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-rehabify-core">{value.title}</h3>
                <p className="text-rehabify-core/80">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}