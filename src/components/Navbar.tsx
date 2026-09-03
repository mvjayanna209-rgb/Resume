import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  FileText, 
  Terminal, 
  Volume2, 
  VolumeX, 
  Clock, 
  Sparkles,
  ArrowUpRight,
  Github
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playPopSound, toggleSound, isSoundEnabled } from '../utils/audio';
import ProfilePhoto from './ProfilePhoto';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenCommand: () => void;
}

export default function Navbar({ onOpenResume, onOpenCommand }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(isSoundEnabled());
  const [timeString, setTimeString] = useState('');
  const [activeSection, setActiveSection] = useState('hero');

  // Live IST (Karnataka) clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTimeString(now.toLocaleTimeString('en-US', options) + ' IST');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30;
      setScrolled(isScrolled);

      // Section tracking
      const sections = ['hero', 'about', 'projects', 'experience', 'skills', 'services', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundActive(newState);
    if (newState) playPopSound(700, 0.08);
  };

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Work', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    playPopSound(500, 0.03);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="main-navbar" 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-[#08090d]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/60' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Monogram & Name */}
          <a 
            href="#hero" 
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-3 group focus:outline-none"
            id="nav-brand-link"
          >
            <div className="relative">
              <ProfilePhoto size="sm" rounded="2xl" showStatus={true} interactive={false} borderGlow={false} />
            </div>

            <div className="flex flex-col">
              <span className="font-display font-bold text-white text-sm sm:text-base tracking-tight group-hover:text-sky-300 transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[11px] font-mono text-zinc-400 tracking-wide flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Available for Roles
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-900/60 backdrop-blur-md border border-white/10 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                  }`}
                  id={`nav-link-${link.id}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/15"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Utilities: Clock, Audio, Command Menu, Resume */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Live Clock Indicator */}
            {timeString && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/50 border border-white/5 text-[11px] font-mono text-zinc-400" title="Local Time in Karnataka, India">
                <Clock className="w-3 h-3 text-sky-400" />
                <span>{timeString}</span>
              </div>
            )}

            {/* Sound FX Toggle */}
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded-full border transition-all duration-200 ${
                soundActive 
                  ? 'bg-sky-500/10 border-sky-500/40 text-sky-400' 
                  : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:text-white'
              }`}
              title={soundActive ? "Mute interactive audio feedback" : "Enable subtle interaction sound effects"}
              aria-label="Sound Toggle"
              id="nav-sound-toggle"
            >
              {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                playPopSound(600, 0.04);
                onOpenCommand();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-white/10 text-xs text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-200"
              title="Open Command Palette (Cmd + K)"
              id="nav-command-btn"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-mono text-[11px]">⌘K</span>
            </button>

            {/* GitHub Profile Icon Button */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-zinc-900/50 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all duration-200"
              title="View GitHub Profile (mvjayanna209)"
              aria-label="GitHub Profile"
              id="nav-github-btn"
            >
              <Github className="w-3.5 h-3.5" />
            </a>

            {/* Resume Button */}
            <button
              onClick={() => {
                playPopSound(650, 0.04);
                onOpenResume();
              }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all duration-200 active:scale-95"
              id="nav-resume-btn"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => {
                playPopSound(600, 0.04);
                onOpenResume();
              }}
              className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-medium"
            >
              CV
            </button>
            <button
              onClick={() => {
                playPopSound(450, 0.03);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-[#0a0c13]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="flex items-center justify-between py-2 text-base font-medium text-zinc-300 hover:text-sky-400 transition-colors border-b border-white/5"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-600" />
                </a>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Github className="w-4 h-4 text-sky-400" />
                  GitHub Profile (@mvjayanna209)
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
                >
                  <FileText className="w-4 h-4" />
                  View & Download Resume
                </button>

                <div className="flex items-center justify-between px-2 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    {timeString}
                  </span>
                  <button
                    onClick={handleSoundToggle}
                    className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-zinc-800 border border-white/10"
                  >
                    {soundActive ? <Volume2 className="w-3.5 h-3.5 text-sky-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                    <span>{soundActive ? 'Sound On' : 'Muted'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
