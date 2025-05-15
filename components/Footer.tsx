"use client";

import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const team = [
  {
    id: 1,
    name: "Ademola Abass",
    designation: "Co-Founder | Lead Instructor",
    image: 'https://res.cloudinary.com/dubeogufg/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1747271142/Ademola_profile_glt1ot.jpg',
  },
  {
    id: 2,
    name: "Mary Akinwola",
    designation: "Co-Founder | Course Director",
    image: "https://res.cloudinary.com/dubeogufg/image/upload/v1743173455/cpd/Mary_o5sjrw.jpg",
  },
  {
    id: 3,
    name: "Emmanuella Otu",
    designation: "Software Engineer | Data Analyst",
    image: "https://res.cloudinary.com/dubeogufg/image/upload/v1747271135/Ella_xuuknt.webp",
  },
  {
    id: 4,
    name: "Paul Francis",
    designation: "Lead Software Engineer",
    image: "https://res.cloudinary.com/dubeogufg/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1747271134/IMG_6276_wir5ht.webp",
  },
];

const footerLinks = [
  { title: "About Us", href: "#" },
  { title: "Contact", href: "#" },
  { title: "Privacy Policy", href: "#" },
  { title: "Terms of Service", href: "#" },
];

export default function Footer() {
  return (
    <motion.footer 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative mt-20"
    >
      <div className="mx-auto w-full max-w-7xl px-6 pb-6">
        <motion.div 
          className="rounded-3xl bg-black p-8 md:p-12 shadow-2xl transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Section */}
            <div className="flex flex-col justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-sky-500 to-purple-500 bg-clip-text text-transparent">
                  Start Your Learning Journey Today
                </h2>
                <p className="mt-4 text-gray-300 max-w-md">
                  Join our community of learners and unlock your potential with expert-led courses and interactive learning experiences.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                {footerLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-between gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Meet Our Team</h3>
                <div className="flex flex-wrap gap-2">
                  <AnimatedTooltip items={team} />
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex justify-center gap-6 md:justify-start">
                <motion.a
                  href="https://www.instagram.com/rehabify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-pink-500 hover:text-pink-400 transition-colors"
                >
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/company/rehabify/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-500 hover:text-blue-400 transition-colors"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </motion.a>
                <motion.a
                  href="https://x.com/Rehabify_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faXTwitter} size="2x" />
                </motion.a>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                <p className="text-sm text-gray-400">
                  © 2025 RehabifyLearn. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-3 left-10 w-[30%] h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
          <div className="absolute -top-3 right-10 w-[30%] h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
          <div className="absolute -bottom-3 left-20 w-[20%] h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div className="absolute -bottom-3 right-20 w-[20%] h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
        </motion.div>
      </div>
    </motion.footer>
  );
}