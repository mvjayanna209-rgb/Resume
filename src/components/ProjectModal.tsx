import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Layers, 
  Shield, 
  Zap, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Search, 
  Briefcase,
  Copy,
  Check
} from 'lucide-react';
import { Project } from '../types';
import { playPopSound, playSuccessSound } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Interactive Cipher simulator state
  const [plainText, setPlainText] = useState('Confidential transmission from MV Jayanna portfolio');
  const [cipherAlgorithm, setCipherAlgorithm] = useState<'AES-256' | 'RSA-4096'>('AES-256');
  const [encryptedOutput, setEncryptedOutput] = useState('7f9b2c8a14d5e690fa8b21c43d56ef8a9012cd45eb67fe190ac478db2145aa3e');
  const [isCopied, setIsCopied] = useState(false);

  // Interactive QuickShift job filter simulator state
  const [selectedShift, setSelectedShift] = useState<'All' | 'Weekend' | 'Evening' | 'Morning'>('All');
  const [minPay, setMinPay] = useState(25);
  const sampleJobs = [
    { title: 'Full-Stack Web Tutor', employer: 'CodeCamp Academy', shift: 'Weekend', pay: 35, location: 'Remote / Bangalore' },
    { title: 'Frontend Developer (React)', employer: 'Pixel Studio', shift: 'Evening', pay: 30, location: 'Mangalore' },
    { title: 'Backend API Assistant', employer: 'CloudScale Labs', shift: 'Morning', pay: 28, location: 'Remote' },
    { title: 'Database Analyst (MySQL)', employer: 'DataPulse Inc', shift: 'Weekend', pay: 40, location: 'Hybrid' },
  ];

  if (!project) return null;

  const handleSimulateEncrypt = () => {
    playPopSound(720, 0.05);
    const mockHash = plainText
      .split('')
      .map((char: string, i: number) => (char.charCodeAt(0) ^ (i + 42)).toString(16).padStart(2, '0'))
      .join('') + (cipherAlgorithm === 'RSA-4096' ? 'e4f901ab8c7d' : '99ba00');
    setEncryptedOutput(mockHash);
  };

  const handleCopyCipher = () => {
    navigator.clipboard.writeText(encryptedOutput);
    playSuccessSound();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const filteredJobs = sampleJobs.filter(job => {
    const shiftMatch = selectedShift === 'All' || job.shift === selectedShift;
    const payMatch = job.pay >= minPay;
    return shiftMatch && payMatch;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0d0f17] border border-white/15 shadow-2xl z-10 text-left p-6 sm:p-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Area */}
          <div className="space-y-3 pr-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {project.category}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {project.period}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-base sm:text-lg text-sky-400 font-medium">
              {project.subtitle}
            </p>
          </div>

          {/* Action Links (Live Demo & GitHub) */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
              >
                <span>Launch Live Production App</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-medium text-xs sm:text-sm border border-white/10 flex items-center gap-2 transition-colors active:scale-95"
              >
                <Github className="w-4 h-4 text-white" />
                <span>View Repository</span>
              </a>
            )}
          </div>

          {/* Overview & Description */}
          <div className="mt-8 space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
            <p>{project.longDescription}</p>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((metric) => (
              <div
                key={metric}
                className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col justify-center"
              >
                <Zap className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-xs font-semibold text-zinc-200">{metric}</span>
              </div>
            ))}
          </div>

          {/* Interactive Feature Demo if Available */}
          {project.interactiveType === 'cipher' && (
            <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-zinc-900/90 border border-sky-500/30 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-sky-400" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Live Cryptography Simulator
                  </span>
                </div>
                <div className="flex gap-1">
                  {(['AES-256', 'RSA-4096'] as const).map(algo => (
                    <button
                      key={algo}
                      onClick={() => setCipherAlgorithm(algo)}
                      className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-colors ${
                        cipherAlgorithm === algo
                          ? 'bg-sky-500 text-white font-bold'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {algo}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <label className="text-zinc-400 block mb-1">Plaintext Input Buffer:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={plainText}
                      onChange={(e) => setPlainText(e.target.value)}
                      className="flex-1 bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-sky-400"
                    />
                    <button
                      onClick={handleSimulateEncrypt}
                      className="px-3 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold transition-colors"
                    >
                      Encrypt
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Ciphertext Output (Hybrid Pipeline):</label>
                  <div className="p-3 bg-black/80 rounded-lg border border-white/5 text-emerald-400 break-all flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px]">{encryptedOutput}</span>
                    <button
                      onClick={handleCopyCipher}
                      className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex-shrink-0"
                      title="Copy ciphertext"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {project.interactiveType === 'jobFilter' && (
            <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-zinc-900/90 border border-sky-500/30 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-sky-400" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    QuickShift Multi-Filter Engine
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {(['All', 'Weekend', 'Evening', 'Morning'] as const).map(shift => (
                    <button
                      key={shift}
                      onClick={() => setSelectedShift(shift)}
                      className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-colors ${
                        selectedShift === shift
                          ? 'bg-sky-500 text-white font-bold'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {shift}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4 flex items-center gap-3 text-xs font-mono text-zinc-400">
                <span>Min Rate: ${minPay}/hr</span>
                <input
                  type="range"
                  min="20"
                  max="40"
                  value={minPay}
                  onChange={(e) => setMinPay(Number(e.target.value))}
                  className="w-32 accent-sky-500"
                />
              </div>

              <div className="space-y-2">
                {filteredJobs.map(job => (
                  <div
                    key={job.title}
                    className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-white block">{job.title}</span>
                      <span className="text-zinc-400 text-[11px]">{job.employer} • {job.location}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-mono font-bold block">${job.pay}/hr</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-sky-400">{job.shift}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resume Highlights Checklist */}
          <div className="mt-8">
            <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-zinc-400 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" />
              Verified Engineering Deliverables
            </h4>
            <div className="space-y-2.5">
              {project.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Highlights */}
          {project.architectureHighlights && (
            <div className="mt-8 p-5 rounded-2xl bg-zinc-950 border border-white/5">
              <h4 className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-3">
                Architectural Breakdown
              </h4>
              <ul className="space-y-2 text-xs font-mono text-zinc-400">
                {project.architectureHighlights.map((arch, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-sky-400">&gt;</span>
                    <span>{arch}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
