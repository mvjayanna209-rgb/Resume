import { ArrowUp, Heart, Github, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playPopSound } from '../utils/audio';

export default function Footer() {
  const scrollToTop = () => {
    playPopSound(500, 0.04);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#06070a] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <span className="text-2xl font-black font-display text-white tracking-tight">
              MV JAYANNA
            </span>
            <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
              Software Engineer & Full-Stack Developer • Karnataka, India
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-sky-400 hover:border-sky-500/30 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-pink-400 hover:border-pink-500/30 transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-amber-400 hover:border-amber-500/30 transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="ml-4 p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10 transition-all active:scale-95 flex items-center gap-1.5 text-xs font-mono"
              title="Return to top of page"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">TOP</span>
            </button>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} MV Jayanna. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-600">Built with React 19, TypeScript, Tailwind & Motion</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
