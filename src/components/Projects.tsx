import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  Github, 
  ArrowUpRight, 
  Layers, 
  Sparkles,
  ShieldCheck,
  Zap,
  Maximize2
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import ProjectModal from './ProjectModal';
import { playPopSound } from '../utils/audio';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Full-Stack', 'Security & Crypto', 'Systems & Backend'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const handleOpenProject = (project: Project) => {
    playPopSound(600, 0.04);
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-sky-400 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>FEATURED WORKS & LABS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
              Selected Projects
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-xl">
              Production web applications, normalized databases, and cryptographic systems built with architectural rigor.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-md self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playPopSound(500, 0.03);
                  setActiveCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
                id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-white/10 hover:border-sky-500/40 transition-all duration-300 shadow-2xl overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Image / Interactive Preview Card */}
                <div 
                  className="relative h-64 sm:h-72 w-full overflow-hidden bg-zinc-950 cursor-pointer"
                  onClick={() => handleOpenProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  {/* Badges on preview */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-sky-400">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-400">
                      {project.period}
                    </span>
                  </div>

                  {/* Expand Hint Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/30 backdrop-blur-[2px]">
                    <div className="px-4 py-2 rounded-xl bg-white/90 text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-2xl">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Inspect Details & Demo</span>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 
                        onClick={() => handleOpenProject(project)}
                        className="text-2xl font-bold font-display text-white group-hover:text-sky-300 transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm font-mono text-sky-400/90 mb-3">
                      {project.subtitle}
                    </p>

                    <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3 mb-6">
                      {project.description}
                    </p>

                    {/* Key metrics ticker */}
                    <div className="grid grid-cols-2 gap-2 mb-6 text-[11px] font-mono text-zinc-400">
                      {project.metrics.slice(0, 2).map((metric, i) => (
                        <div key={i} className="p-2 rounded-lg bg-zinc-900/70 border border-white/5 truncate">
                          <span className="text-sky-400 mr-1.5">•</span>
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer with Tech Stack & Buttons */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 max-w-sm">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-white/5 text-[11px] font-mono text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-0.5 rounded-md bg-zinc-900/50 text-[11px] font-mono text-zinc-500">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-colors"
                          title="Open Live Vercel Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 transition-colors"
                          title="View Source Code on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleOpenProject(project)}
                        className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-white/10 transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal for detailed inspection */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
}
