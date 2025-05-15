"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
import { LinkedinIcon, TwitterIcon } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Ademola Abass",
     role: "Co-Founder of Rehabify & Rehabify Learn",
    bio: "Visionary leader and physical therapy expert who transformed rehabilitation practices into accessible digital solutions, pioneering the Rehabify platform to bridge healthcare gaps.",
    image: "https://res.cloudinary.com/dubeogufg/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1747271142/Ademola_profile_glt1ot.jpg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    name: "Mary Akinwola",
    role: "Co-Founder of Rehabify & Rehabify Learn",
    bio: "Educational innovator who revolutionized healthcare training through research-backed methodologies, now bringing her expertise to create transformative learning experiences at Rehabify Learn.",
    image: "https://res.cloudinary.com/dubeogufg/image/upload/v1743173455/cpd/Mary_o5sjrw.jpg",
    social: {
      linkedin: "https://linkedin.com"
    }
  },
  {
    name: "Paul Francis",
    role: "Lead Software Engineer Rehabify & Rehabify Learn",
    bio: "Tech visionary who combines software engineering expertise with deep rehabilitation knowledge to build intuitive digital platforms that enhance healthcare education and delivery.",
    image: "https://res.cloudinary.com/dubeogufg/image/upload/v1747299545/IMG_0114_crksjl.webp",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    name: "Emmanuella Otu",
    role: "Software Engineer Rehabify & Rehabify Learn",
    bio: "Engineering wizard with a passion for creating seamless digital experiences, now contributing to the Rehabify Learn platform to empower rehabilitation education.",
    image: "https://res.cloudinary.com/dubeogufg/image/upload/v1747271135/Ella_xuuknt.webp",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  }
];

export default function Team() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-4 border border-border flex flex-col h-full"
            >
              <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="text-center flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-rehabify-core font-medium mb-2 text-sm">{member.role}</p>
                <p className="text-muted-foreground mb-3 text-sm line-clamp-4">{member.bio}</p>
                
                <div className="flex justify-center gap-2 mt-auto pt-2">
                  {member.social.linkedin && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                  {member.social.twitter && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                        <TwitterIcon className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}