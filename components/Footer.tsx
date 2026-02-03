"use client";

import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Twitter, Mail } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

export default function Footer() {
  const { personal, social, navigation } = portfolioData;
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github size={18} />, href: social.github, label: "GitHub" },
    { icon: <Linkedin size={18} />, href: social.linkedin, label: "LinkedIn" },
    { icon: <Twitter size={18} />, href: social.twitter, label: "Twitter" },
    { icon: <Mail size={18} />, href: `mailto:${personal.email}`, label: "Email" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
            >
              {personal.name.split(" ")[0]}
              <span className="text-white">.</span>
            </a>
            <p className="mt-4 text-dark-400 text-sm leading-relaxed">
              {personal.title} passionate about building exceptional digital
              experiences. Let&apos;s create something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-dark-800 hover:bg-primary-500 text-dark-400 hover:text-white rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            <p className="mt-4 text-dark-400 text-sm">{personal.email}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-dark-500 text-sm">
            &copy; {currentYear} {personal.name}. All rights reserved.
          </p>
          <p className="text-dark-500 text-sm flex items-center gap-1">
            Made with <Heart className="text-red-500" size={14} /> using Next.js
            & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
