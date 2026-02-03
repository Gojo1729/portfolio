"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { personal, stats } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About <span className="text-primary-400">Me</span>
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">
                A passionate developer who loves building scalable systems
              </h3>
              <p className="text-dark-400 leading-relaxed max-w-3xl mx-auto">
                {personal.bio}
              </p>
            </div>

            {/* Info Grid */}
            <div className="flex flex-wrap justify-center gap-6 py-4">
              <div className="flex items-center gap-3 px-6 py-3 bg-dark-800/50 rounded-xl border border-dark-700">
                <div className="p-2 bg-primary-500/10 rounded-lg">
                  <MapPin className="text-primary-400" size={20} />
                </div>
                <div>
                  <p className="text-dark-500 text-sm">Location</p>
                  <p className="text-dark-200">{personal.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-dark-800/50 rounded-xl border border-dark-700">
                <div className="p-2 bg-primary-500/10 rounded-lg">
                  <Briefcase className="text-primary-400" size={20} />
                </div>
                <div>
                  <p className="text-dark-500 text-sm">Role</p>
                  <p className="text-dark-200">{personal.title}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 bg-dark-800/50 rounded-xl border border-dark-700"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <p className="text-2xl md:text-3xl font-bold text-primary-400">
                    {stat.value}
                  </p>
                  <p className="text-dark-500 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
