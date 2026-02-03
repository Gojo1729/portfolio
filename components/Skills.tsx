"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Wrench, Brain, Database } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

interface SkillCategoryProps {
  title: string;
  skills: string[];
  icon: React.ReactNode;
  delay: number;
}

function SkillCategory({ title, skills, icon, delay }: SkillCategoryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700 hover:border-primary-500/50 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary-500/10 rounded-xl">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: delay + index * 0.05 }}
            className="px-4 py-2 bg-dark-700/50 hover:bg-primary-500/20 text-dark-200 hover:text-primary-300 rounded-lg text-sm font-medium transition-all duration-300 cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-primary-400">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-4" />
          <p className="text-dark-400 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to
            life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCategory
            title="Frontend"
            skills={skills.frontend}
            icon={<Code2 className="text-primary-400" size={24} />}
            delay={0}
          />
          <SkillCategory
            title="Backend"
            skills={skills.backend}
            icon={<Server className="text-primary-400" size={24} />}
            delay={0.1}
          />
          <SkillCategory
            title="AI / ML"
            skills={skills.ml}
            icon={<Brain className="text-primary-400" size={24} />}
            delay={0.2}
          />
          <SkillCategory
            title="Vector Databases"
            skills={skills.vectordb}
            icon={<Database className="text-primary-400" size={24} />}
            delay={0.3}
          />
          <SkillCategory
            title="Tools & Infrastructure"
            skills={skills.tools}
            icon={<Wrench className="text-primary-400" size={24} />}
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}
