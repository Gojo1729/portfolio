"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Folder, Play, X } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  featured: boolean;
  videoDemo?: string;
}

function VideoModal({ videoUrl, onClose }: { videoUrl: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full bg-dark-900 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-dark-800/80 hover:bg-dark-700 rounded-full text-white transition-colors"
          aria-label="Close video"
        >
          <X size={24} />
        </button>
        <video
          src={videoUrl}
          controls
          autoPlay
          className="w-full aspect-video"
        >
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onPlayVideo }: { project: Project; index: number; onPlayVideo: (url: string) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_LENGTH = 120;
  const isLongDescription = project.description.length > MAX_LENGTH;
  const displayDescription = isExpanded || !isLongDescription
    ? project.description
    : project.description.slice(0, MAX_LENGTH).trim();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-dark-800/50 rounded-2xl overflow-hidden border border-dark-700 hover:border-primary-500/50 transition-all duration-500 hover:transform hover:-translate-y-2"
    >
      {/* Project Header with Icon */}
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-primary-500/10 rounded-lg">
            <Folder className="text-primary-400" size={28} />
          </div>
          <div className="flex items-center gap-2">
            {project.videoDemo && (
              <motion.button
                onClick={() => onPlayVideo(project.videoDemo!)}
                className="flex items-center gap-1 px-3 py-1 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white text-xs font-medium rounded-full transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={12} fill="currentColor" />
                Demo
              </motion.button>
            )}
            {project.featured && (
              <span className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-2">
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-dark-400 text-sm mb-4">
          {displayDescription}
          {isLongDescription && !isExpanded && (
            <>
              ...{" "}
              <button
                onClick={() => setIsExpanded(true)}
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                more
              </button>
            </>
          )}
          {isLongDescription && isExpanded && (
            <>
              {" "}
              <button
                onClick={() => setIsExpanded(false)}
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                less
              </button>
            </>
          )}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-dark-700/50 text-dark-300 rounded text-xs"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-dark-500 text-xs">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { projects } = portfolioData;
  const [showAll, setShowAll] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projects" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-primary-400">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-4" />
          <p className="text-dark-400 max-w-2xl mx-auto">
            A collection of projects I&apos;ve built that showcase my skills and
            passion for development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onPlayVideo={setActiveVideo}
            />
          ))}
        </div>

        {/* Show More Button */}
        {projects.length > 6 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-dark-800 hover:bg-dark-700 text-white rounded-lg font-medium transition-all duration-300 border border-dark-700 hover:border-primary-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? "Show Less" : "View All Projects"}
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal videoUrl={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
