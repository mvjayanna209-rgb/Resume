import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  Server, 
  Database, 
  Cpu, 
  Wrench, 
  Layers,
  Sparkles,
  Terminal
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { playPopSound } from '../utils/audio';

export default function Skills() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages': return <Code className="w-4 h-4 text-sky-400" />;
      case 'Web & Frontend': return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'Backend & Systems': return <Server className="w-4 h-4 text-emerald-400" />;
      case 'Data & Persistence': return <Database className="w-4 h-4 text-amber-400" />;
      case 'Tools & DevOps': return <Wrench className="w-4 h-4 text-purple-400" />;
      default: return <Cpu className="w-4 h-4 text-rose-400" />;
    }
  };

  const currentCategory = SKILL_CATEGORIES[activeCategoryIndex];

  return (
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-sky-400 mb-3"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CORE COMPETENCIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight"
          >
            Technical Arsenal
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl"
          >
            Categorized skill stack across programming languages, full-stack frameworks, database design, and algorithmic systems.
          </motion.p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={cat.category}
                onClick={() => {
                  playPopSound(550, 0.03);
                  setActiveCategoryIndex(idx);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-zinc-800 text-white border-sky-500/50 shadow-lg shadow-sky-500/10'
                    : 'bg-zinc-900/60 text-zinc-400 border-white/5 hover:text-zinc-200 hover:border-white/15'
                }`}
                id={`skill-cat-${idx}`}
              >
                {getCategoryIcon(cat.category)}
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.category}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-white/10 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-zinc-800 border border-white/10">
                  {getCategoryIcon(currentCategory.category)}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    {currentCategory.category}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-mono">
                    {currentCategory.description}
                  </p>
                </div>
              </div>

              <div className="text-xs font-mono text-sky-400 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 self-start sm:self-auto">
                {currentCategory.skills.length} Validated Modules
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentCategory.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/15 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm sm:text-base group-hover:text-sky-300 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-white/5">
                        {skill.categoryBadge}
                      </span>
                    </div>

                    <span className="text-xs font-mono text-zinc-400 font-semibold">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Proficiency Meter */}
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500"
                    />
                  </div>

                  <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Engineering Philosophy Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 text-zinc-400">
            <span className="text-sky-400 block font-semibold mb-1">01 // Type Safety</span>
            Strict TypeScript declarations to capture edge-case bugs at compile time rather than production.
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 text-zinc-400">
            <span className="text-indigo-400 block font-semibold mb-1">02 // Relational Precision</span>
            Normalized schemas and composite indexing to prevent query degradation as records scale.
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 text-zinc-400">
            <span className="text-emerald-400 block font-semibold mb-1">03 // Defense in Depth</span>
            Zero-knowledge client encryption, prepared SQL statements, and input sanitization across all layers.
          </div>
        </div>

      </div>
    </section>
  );
}
