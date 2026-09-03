import { motion } from 'motion/react';
import { 
  GraduationCap, 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  Code,
  Zap,
  Users,
  Compass
} from 'lucide-react';
import { PERSONAL_INFO, STRENGTHS } from '../data/portfolioData';
import { playPopSound } from '../utils/audio';
import ProfilePhoto from './ProfilePhoto';

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
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
            <Compass className="w-3.5 h-3.5" />
            <span>ENGINEERING IDENTITY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight"
          >
            About & Ethos
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-base text-zinc-400 max-w-xl"
          >
            Bridging theoretical computer science foundations with pragmatic full-stack execution.
          </motion.p>
        </div>

        {/* Two-Column Grid: Profile Visual Card + Story Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Profile Visual / Monogram Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full"
          >
            <div className="relative group rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* Background ambient lighting in card */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Profile Avatar Portrait */}
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-5">
                  <ProfilePhoto size="lg" rounded="2xl" showStatus={true} interactive={true} />
                </div>

                {/* Name & Title */}
                <h3 className="text-2xl font-bold font-display text-white">
                  MV Jayanna
                </h3>
                <p className="text-sm text-sky-400 font-mono mt-0.5">
                  Software Engineer
                </p>

                {/* Location & Institution Tags */}
                <div className="mt-4 flex flex-col gap-2 w-full text-xs font-mono text-zinc-400">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/80 border border-white/5">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      Location
                    </span>
                    <span className="text-zinc-400">Chikkamagaluru, India</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/80 border border-white/5">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                      Education
                    </span>
                    <span className="text-zinc-400">B.E. CSE (CGPA 8.2)</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/80 border border-white/5">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      Contact
                    </span>
                    <span className="text-zinc-400 truncate max-w-[140px]" title={PERSONAL_INFO.email}>
                      mvjayanna209@gmail.com
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="mt-5 w-full p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 text-xs font-mono flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Ready for Full-Time Roles</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Narrative & Core Strengths (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Story Text Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-4">
              <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-400" />
                Engineering Journey & Mission
              </h3>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                I am a software engineer with hands-on, project-based experience building full-stack web applications using 
                <strong className="text-white font-semibold"> Java, Python, JavaScript, TypeScript, and Node.js</strong>. 
                I possess a strong foundation in data structures, object-oriented design, and relational databases (MySQL), complemented by practical exposure to REST APIs, authentication schemes, and responsive UI engineering.
              </p>

              <p className="text-zinc-400 text-sm leading-relaxed">
                Whether it is modeling normalized 3NF schemas for high-traffic job portals like <strong className="text-zinc-200">QuickShift</strong> or architecting client-side hybrid encryption pipelines in <strong className="text-zinc-200">Super Cipher</strong>, I am comfortable owning a feature end to end — from conceptual schema design and backend logic to a polished, pixel-precise frontend.
              </p>

              {/* Education Highlights */}
              <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-xs font-mono">
                <div>
                  <span className="text-zinc-500 uppercase">Degree:</span>
                  <span className="text-zinc-200 block font-semibold">B.E. Computer Science & Engineering</span>
                  <span className="text-zinc-400">{PERSONAL_INFO.institution}</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-zinc-500 uppercase">Academic Score:</span>
                  <span className="text-emerald-400 block font-semibold text-sm">CGPA: 8.2 / 10</span>
                  <span className="text-zinc-400">Graduating 2026</span>
                </div>
              </div>
            </div>

            {/* Core Strengths Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STRENGTHS.map((strength, index) => (
                <motion.div
                  key={strength.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/15 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {strength.badge}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 group-hover:text-sky-400 transition-colors" />
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                    {strength.title}
                  </h4>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                    {strength.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>

        {/* Animated Statistics Row */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {PERSONAL_INFO.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-sky-500/30 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group"
            >
              <div className="text-3xl sm:text-4xl font-black font-display text-white group-hover:text-sky-400 transition-colors flex items-baseline">
                {stat.value}
                {stat.suffix && <span className="text-base font-normal text-zinc-400 ml-0.5">{stat.suffix}</span>}
              </div>
              <div className="mt-2">
                <div className="text-xs sm:text-sm font-semibold text-zinc-200">{stat.label}</div>
                <div className="text-[11px] font-mono text-zinc-400 mt-0.5">{stat.detail}</div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
