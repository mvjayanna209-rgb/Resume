import { motion } from 'motion/react';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ExternalLink,
  Milestone
} from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-sky-400 mb-3"
          >
            <Milestone className="w-3.5 h-3.5" />
            <span>TRAJECTORY & MILESTONES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight"
          >
            Experience & Education
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl"
          >
            A chronological timeline of production engineering, project ownership, and rigorous academic milestones.
          </motion.p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-zinc-800 ml-4 sm:ml-8 space-y-12 sm:space-y-16">
          
          {EXPERIENCES.map((item, index) => {
            const isEdu = item.type === 'Education';
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="relative pl-6 sm:pl-10 group"
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[19px] top-1.5 w-9 h-9 rounded-full bg-[#08090d] border-2 border-zinc-700 group-hover:border-sky-400 flex items-center justify-center transition-colors shadow-xl">
                  {isEdu ? (
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                  ) : (
                    <Briefcase className="w-4 h-4 text-sky-400" />
                  )}
                </div>

                {/* Timeline Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md shadow-xl space-y-4">
                  
                  {/* Top Metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-zinc-800 text-sky-400 border border-white/5 inline-block mb-1">
                        {item.type}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-sky-300 transition-colors">
                        {item.role}
                      </h3>
                      <div className="text-sm font-medium text-zinc-300 flex items-center gap-2 mt-0.5">
                        <span className="text-sky-400">{item.organization}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-xl border border-white/5 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Summary / Description */}
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet achievements directly from resume */}
                  <div className="space-y-2 pt-2">
                    {item.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400/80 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills tags */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-zinc-950/80 border border-white/5 text-xs font-mono text-zinc-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1.5 ml-auto transition-colors"
                      >
                        <span>Verified Live URL</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
