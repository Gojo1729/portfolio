"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { personal, social } = portfolioData;

  const contactInfo = [
    { icon: <Mail size={24} />, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
    { icon: <Phone size={24} />, label: "Phone", value: personal.phone, href: `tel:${personal.phone}` },
    { icon: <MapPin size={24} />, label: "Location", value: personal.location, href: null },
  ];

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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-primary-400">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-4" />
          <p className="text-dark-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you!
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-3 gap-6 mb-12"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-dark-800/50 rounded-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 group"
            >
              <div className="p-4 bg-primary-500/10 rounded-full text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all mb-4">
                {info.icon}
              </div>
              <p className="text-dark-500 text-sm mb-1">{info.label}</p>
              {info.href ? (
                <a
                  href={info.href}
                  className="text-dark-200 hover:text-primary-400 transition-colors font-medium"
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-dark-200 font-medium">{info.value}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-dark-400 mb-6">Or connect with me on</p>
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
                transition={{ delay: 0.6 + index * 0.1 }}
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
