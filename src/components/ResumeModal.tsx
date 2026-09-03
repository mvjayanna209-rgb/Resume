import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase,
  Code,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS } from '../data/portfolioData';
import { playPopSound, playSuccessSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import ProfilePhoto from './ProfilePhoto';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    playPopSound(600, 0.04);
    window.print();
  };

  const handleCopyText = () => {
    playSuccessSound();
    const resumePlain = `
MV JAYANNA
Software Engineer
Email: ${PERSONAL_INFO.email} | Location: ${PERSONAL_INFO.location} | Phone: ${PERSONAL_INFO.phone}

SUMMARY
${PERSONAL_INFO.summary}

PROJECTS:
QuickShift — Part-Time Job Finder Platform (March 2026 – Aug 2026)
Full-stack web app | Node.js, TypeScript, JavaScript, MySQL, HTML/CSS
- Built a full-stack job portal in Node.js connecting job seekers with employers, with a normalized MySQL schema for listings, applicants, and employer accounts.
- Used TypeScript for key modules to add type safety and reduce runtime errors across the search and filtering logic.
- Implemented location-based search and multi-filter job discovery (role, pay, shift type) using SQL queries and server-side filtering logic.
- Designed and built REST-style endpoints to connect the front end with the Node.js backend for listings, applications, and employer accounts.
- Designed a responsive UI (HTML/CSS/JavaScript) that adapts cleanly across desktop and mobile breakpoints.
- Optimized search response time and streamlined navigation to reduce clicks from search to application.
- Tested core flows manually across devices and screen sizes to catch layout and usability issues before finalizing.

Super Cipher — Cryptography System (Feb 2025 – May 2025)
Security-focused platform | Next.js, TypeScript, and Tailwind CSS
Live Demo: https://super-ciper-cryptography-ir3de173v-mvjayanna209-rgbs-projects.vercel.app/
- Developed a hybrid cryptography platform combining multiple encryption algorithms (symmetric + asymmetric) for file protection.
- Designed a responsive, user-friendly dashboard for encrypting, decrypting, and managing files.
- Focused on secure data transmission and confidentiality throughout the encryption pipeline.
- Structured the codebase into clear modules (encryption, auth, file handling, UI) for maintainability.

EDUCATION:
Bachelor of Engineering — Computer Science & Engineering (2022 – 2026)
Shree Devi Institute of Technology, Mangalore | CGPA: 8.2 / 10

Pre-University College (PUC) (2018 – 2020)
Padua PU College, Mangalore | 71%

KEY SKILLS:
Languages: Python, Core Java, JavaScript, TypeScript, Tailwind CSS
Web & Backend: HTML, CSS, Node.js, REST APIs
Data & Persistence: MySQL, JDBC, Database Design
Tools & Practices: Git, Debugging, Responsive Web Design, Unit-level Testing
Foundations: Data Structures, Object-Oriented Programming, Problem Solving

CORE STRENGTHS:
- Quick learner: comfortable picking up new languages, frameworks, and codebases with minimal ramp-up time.
- Strong problem-solving foundation from consistent practice with data structures and algorithms.
- Team player who communicates clearly and collaborates well in project-based and group settings.
    `.trim();

    navigator.clipboard.writeText(resumePlain);
    setCopied(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:m-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity print:hidden"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0f111a] border border-white/15 shadow-2xl z-10 text-left p-6 sm:p-12 print:bg-white print:text-black print:border-none print:shadow-none print:max-h-none print:p-8"
        >
          {/* Action Bar (Close, Print, Copy) */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 print:hidden">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Official Curriculum Vitae
              </span>
              <span className="text-xs font-mono text-zinc-500">
                Updated September 2026
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors"
                title="Copy formatted resume text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-xs font-mono text-sky-400 flex items-center gap-1.5 transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors ml-2"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Resume Document */}
          <div className="space-y-8 font-sans print:text-black">
            
            {/* Header / Contact Info */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10 print:border-gray-300">
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight uppercase print:text-black">
                  MV JAYANNA
                </h1>
                <p className="text-sm font-semibold text-sky-400 tracking-wider font-mono mt-1 uppercase print:text-gray-800">
                  Software Engineer
                </p>
                
                <div className="mt-3 flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-1 text-xs font-mono text-zinc-400 print:text-gray-700">
                  <span>{PERSONAL_INFO.email}</span>
                  <span>•</span>
                  <span>{PERSONAL_INFO.location}</span>
                  <span>•</span>
                  <span>{PERSONAL_INFO.phone}</span>
                </div>
              </div>

              {/* Resume Portrait Photo */}
              <div className="shrink-0">
                <ProfilePhoto size="md" rounded="2xl" showStatus={false} borderGlow={false} interactive={false} />
              </div>
            </div>

            {/* Summary Section */}
            <div>
              <h2 className="text-xs font-bold font-mono tracking-widest text-sky-400 uppercase mb-2 print:text-black">
                SUMMARY
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed print:text-gray-800">
                {PERSONAL_INFO.summary}
              </p>
            </div>

            {/* Projects Section */}
            <div>
              <h2 className="text-xs font-bold font-mono tracking-widest text-sky-400 uppercase mb-4 print:text-black">
                PROJECTS
              </h2>

              <div className="space-y-6">
                {/* QuickShift */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="text-sm sm:text-base font-bold text-white print:text-black">
                      QuickShift — Part-Time Job Finder Platform
                    </h3>
                    <span className="text-xs font-mono text-zinc-400 print:text-gray-600">
                      March 2026 – Aug 2026
                    </span>
                  </div>
                  <p className="text-xs font-mono text-sky-400/90 mb-2 print:text-gray-700">
                    Full-stack web app | Node.js, TypeScript, JavaScript, MySQL, HTML/CSS
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300 print:text-gray-800 leading-relaxed">
                    <li>Built a full-stack job portal in Node.js connecting job seekers with employers, with a normalized MySQL schema for listings, applicants, and employer accounts.</li>
                    <li>Used TypeScript for key modules to add type safety and reduce runtime errors across the search and filtering logic.</li>
                    <li>Implemented location-based search and multi-filter job discovery (role, pay, shift type) using SQL queries and server-side filtering logic.</li>
                    <li>Designed and built REST-style endpoints to connect the front end with the Node.js backend for listings, applications, and employer accounts.</li>
                    <li>Designed a responsive UI (HTML/CSS/JavaScript) that adapts cleanly across desktop and mobile breakpoints.</li>
                    <li>Optimized search response time and streamlined navigation to reduce clicks from search to application.</li>
                    <li>Tested core flows manually across devices and screen sizes to catch layout and usability issues before finalizing.</li>
                  </ul>
                </div>

                {/* Super Cipher */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="text-sm sm:text-base font-bold text-white print:text-black">
                      Super Cipher — Cryptography System
                    </h3>
                    <span className="text-xs font-mono text-zinc-400 print:text-gray-600">
                      Feb 2025 – May 2025
                    </span>
                  </div>
                  <p className="text-xs font-mono text-sky-400/90 mb-1 print:text-gray-700">
                    Security-focused platform | Next.js, TypeScript, and Tailwind CSS
                  </p>
                  <p className="text-xs font-mono text-zinc-400 mb-2 print:text-gray-600">
                    Live Demo: <a href="https://super-ciper-cryptography-ir3de173v-mvjayanna209-rgbs-projects.vercel.app/" target="_blank" rel="noreferrer" className="text-sky-400 underline print:text-black">super-ciper-cryptography.vercel.app</a>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300 print:text-gray-800 leading-relaxed">
                    <li>Developed a hybrid cryptography platform combining multiple encryption algorithms (symmetric + asymmetric) for file protection.</li>
                    <li>Designed a responsive, user-friendly dashboard for encrypting, decrypting, and managing files.</li>
                    <li>Focused on secure data transmission and confidentiality throughout the encryption pipeline.</li>
                    <li>Structured the codebase into clear modules (encryption, auth, file handling, UI) for maintainability.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div>
              <h2 className="text-xs font-bold font-mono tracking-widest text-sky-400 uppercase mb-3 print:text-black">
                EDUCATION
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm print:text-black">
                      Bachelor of Engineering — Computer Science & Engineering
                    </h3>
                    <p className="text-zinc-400 print:text-gray-700">
                      Shree Devi Institute of Technology, Mangalore | <strong className="text-emerald-400 print:text-black">CGPA: 8.2 / 10</strong>
                    </p>
                  </div>
                  <span className="font-mono text-zinc-400 print:text-gray-600">
                    2022 – 2026
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm print:text-black">
                      Pre-University College (PUC)
                    </h3>
                    <p className="text-zinc-400 print:text-gray-700">
                      Padua PU College, Mangalore | <strong>71%</strong>
                    </p>
                  </div>
                  <span className="font-mono text-zinc-400 print:text-gray-600">
                    2018 – 2020
                  </span>
                </div>
              </div>
            </div>

            {/* Key Skills Section */}
            <div>
              <h2 className="text-xs font-bold font-mono tracking-widest text-sky-400 uppercase mb-3 print:text-black">
                KEY SKILLS
              </h2>
              
              <div className="space-y-2 text-xs text-zinc-300 print:text-gray-800">
                <p><strong className="text-white print:text-black font-semibold">Languages:</strong> Python, Core Java, JavaScript, TypeScript, Tailwind CSS</p>
                <p><strong className="text-white print:text-black font-semibold">Web & Backend:</strong> HTML, CSS, Node.js, REST APIs</p>
                <p><strong className="text-white print:text-black font-semibold">Data & Persistence:</strong> MySQL, JDBC, Database Design</p>
                <p><strong className="text-white print:text-black font-semibold">Tools & Practices:</strong> Git, Debugging, Responsive Web Design, Unit-level Testing</p>
                <p><strong className="text-white print:text-black font-semibold">Foundations:</strong> Data Structures, Object-Oriented Programming, Problem Solving</p>
              </div>
            </div>

            {/* Core Strengths */}
            <div>
              <h2 className="text-xs font-bold font-mono tracking-widest text-sky-400 uppercase mb-3 print:text-black">
                CORE STRENGTHS
              </h2>
              
              <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300 print:text-gray-800">
                <li><strong className="text-white print:text-black">Quick learner</strong> — comfortable picking up new languages, frameworks, and codebases with minimal ramp-up time.</li>
                <li><strong className="text-white print:text-black">Strong problem-solving foundation</strong> from consistent practice with data structures and algorithms.</li>
                <li><strong className="text-white print:text-black">Team player</strong> who communicates clearly and collaborates well in project-based and group settings.</li>
              </ul>
            </div>

          </div>

          {/* Footer Callout */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 print:hidden">
            <span className="text-xs font-mono text-zinc-400">
              Direct contact: {PERSONAL_INFO.email}
            </span>
            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-white text-zinc-950 font-bold text-xs flex items-center gap-2 hover:bg-zinc-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save to PDF</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
