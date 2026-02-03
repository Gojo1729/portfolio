"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar, MapPin } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`flex flex-col md:flex-row gap-4 md:gap-8 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline dot */}
      <div className="hidden md:flex flex-col items-center">
        <div className="w-4 h-4 bg-primary-500 rounded-full shadow-lg shadow-primary-500/50" />
        <div className="w-0.5 h-full bg-dark-700" />
      </div>

      {/* Card */}
      <motion.div
        className="flex-1 bg-dark-800/50 rounded-2xl p-6 border border-dark-700 hover:border-primary-500/50 transition-all duration-300 group"
        whileHover={{ y: -5 }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
              {experience.role}
            </h3>
            <div className="flex items-center gap-2 text-primary-400 mt-1">
              <Building2 size={16} />
              <span>{experience.company}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-dark-400 text-sm">
              <Calendar size={14} />
              <span>{experience.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-dark-500 text-sm mt-1">
              <MapPin size={14} />
              <span>{experience.location}</span>
            </div>
          </div>
        </div>

        <p className="text-dark-400 mb-4">{experience.description}</p>

        {/* Highlights */}
        <ul className="space-y-2 mb-4">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-dark-300 text-sm">
              <span className="text-primary-400 mt-1">&#8226;</span>
              {highlight}
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="text-primary-400">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-4" />
          <p className="text-dark-400 max-w-2xl mx-auto">
            My professional journey and the impact I&apos;ve made along the way
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-12">
          {experience.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
