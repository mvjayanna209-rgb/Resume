import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowDown, 
  ArrowUpRight, 
  Terminal, 
  Code2, 
  ShieldCheck, 
  Database, 
  Send,
  Download,
  Github
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playPopSound } from '../utils/audio';
import ProfilePhoto from './ProfilePhoto';

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "Full-Stack Web Engineer",
    "Scalable Backend Architect",
    "Cryptography Platform Developer",
    "Relational Database Optimizer"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollToSection = (id: string) => {
    playPopSound(500, 0.04);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        
        {/* Top Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 shadow-lg shadow-black/40 mb-8 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
            Available for Software Engineering Roles
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-xs font-mono text-sky-400">
            Chikkamagaluru & Mangalore, India
          </span>
        </motion.div>

        {/* Featured Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 group"
        >
          <ProfilePhoto size="lg" rounded="3xl" showStatus={true} interactive={true} borderGlow={true} />
        </motion.div>

        {/* Huge Headline: Name & Identity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 max-w-4xl"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-[1.05]">
            MV JAYANNA
          </h1>

          <div className="h-10 sm:h-12 flex items-center justify-center">
            <span className="text-zinc-400 text-lg sm:text-2xl font-mono mr-2">&gt;</span>
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4 }}
              className="text-lg sm:text-2xl lg:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400"
            >
              {roles[roleIndex]}
            </motion.span>
          </div>
        </motion.div>

        {/* Short Professional Introduction */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed text-balance"
        >
          Full-stack software engineer crafting resilient web applications, robust REST APIs, normalized relational databases, and cryptographic systems.
        </motion.p>

        {/* Key Quick Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 flex flex-wrap justify-center items-center gap-2 max-w-xl text-xs font-mono text-zinc-400"
        >
          <span className="px-2.5 py-1 rounded-md bg-zinc-900/60 border border-white/5 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-sky-400" /> TypeScript & Node.js
          </span>
          <span className="px-2.5 py-1 rounded-md bg-zinc-900/60 border border-white/5 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-amber-400" /> MySQL & Schema Design
          </span>
          <span className="px-2.5 py-1 rounded-md bg-zinc-900/60 border border-white/5 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Cryptography & Security
          </span>
          <span className="px-2.5 py-1 rounded-md bg-zinc-900/60 border border-white/5 flex items-center gap-1.5 text-indigo-300">
            SDIT Mangalore (CGPA 8.2)
          </span>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary CTA: View Projects */}
          <button
            onClick={() => scrollToSection('projects')}
            className="group relative px-8 py-4 rounded-xl bg-white text-zinc-950 font-bold text-sm tracking-wide shadow-xl shadow-white/10 hover:bg-zinc-100 hover:shadow-2xl hover:shadow-sky-500/20 active:scale-95 transition-all duration-200 flex items-center gap-2"
            id="hero-cta-projects"
          >
            <span>View Projects</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>

          {/* Secondary CTA: Contact Me */}
          <button
            onClick={() => scrollToSection('contact')}
            className="group px-7 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-white font-semibold text-sm tracking-wide border border-white/15 hover:border-white/30 backdrop-blur-md active:scale-95 transition-all duration-200 flex items-center gap-2"
            id="hero-cta-contact"
          >
            <Send className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Contact Me</span>
          </button>

          {/* GitHub Profile Link */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/90 text-zinc-300 hover:text-white font-medium text-sm border border-white/10 hover:border-sky-500/40 backdrop-blur-md active:scale-95 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-sky-500/10"
            id="hero-cta-github"
          >
            <Github className="w-4 h-4 text-sky-400" />
            <span>GitHub Profile</span>
          </a>

          {/* Resume Quick Trigger */}
          <button
            onClick={() => {
              playPopSound(650, 0.04);
              onOpenResume();
            }}
            className="px-6 py-4 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 text-zinc-300 hover:text-white font-medium text-sm border border-white/5 hover:border-white/15 transition-all duration-200 flex items-center gap-2"
            id="hero-cta-resume"
          >
            <Download className="w-4 h-4 text-zinc-400" />
            <span>Resume</span>
          </button>
        </motion.div>

        {/* Minimal Terminal Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 w-full max-w-lg p-3 rounded-xl bg-black/40 border border-white/5 backdrop-blur-md text-left font-mono text-xs text-zinc-400 flex items-center justify-between shadow-2xl"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-sky-400" />
            <span className="text-zinc-500">$</span>
            <span className="text-zinc-300">curl -s https://mvjayanna.dev/status</span>
          </div>
          <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
            200 OK
          </span>
        </motion.div>

        {/* Scroll down prompt */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="mt-12 cursor-pointer text-zinc-500 hover:text-zinc-300 transition-colors flex flex-col items-center gap-1 text-xs font-mono"
          onClick={() => scrollToSection('about')}
        >
          <span>EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 text-sky-400" />
        </motion.div>

      </div>
    </section>
  );
}
