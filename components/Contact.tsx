"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { social } = portfolioData;

  const socialLinks = [
    { icon: <Github size={24} />, href: social.github, label: "GitHub" },
    { icon: <Linkedin size={24} />, href: social.linkedin, label: "LinkedIn" },
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center"
        >
          <p className="text-dark-400 text-lg mb-6">Connect with me on</p>
          <div className="flex justify-center gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-dark-800 hover:bg-primary-500 text-dark-400 hover:text-white rounded-xl border border-dark-700 hover:border-primary-500 transition-all duration-300 flex items-center gap-3"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
