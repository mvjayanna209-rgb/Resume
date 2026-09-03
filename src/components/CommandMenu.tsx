import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Terminal, 
  FileText, 
  Send, 
  ExternalLink, 
  Code, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Copy,
  Layers,
  Briefcase,
  Github
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playPopSound, playSuccessSound, toggleSound, isSoundEnabled } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export default function CommandMenu({ isOpen, onClose, onOpenResume }: CommandMenuProps) {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          onClose(); // In App.tsx this triggers toggle
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'quickshift',
      title: 'QuickShift — Part-Time Job Portal',
      category: 'Projects',
      action: () => {
        const el = document.getElementById('projects');
        el?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
      icon: <Briefcase className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'supercipher',
      title: 'Super Cipher — Hybrid Cryptography Platform',
      category: 'Projects',
      action: () => {
        window.open('https://super-ciper-cryptography-ir3de173v-mvjayanna209-rgbs-projects.vercel.app/', '_blank');
        onClose();
      },
      icon: <ExternalLink className="w-4 h-4 text-emerald-400" />
    },
    {
      id: 'github',
      title: 'Open GitHub Profile (@mvjayanna209)',
      category: 'Profile',
      action: () => {
        window.open(PERSONAL_INFO.github, '_blank');
        onClose();
      },
      icon: <Github className="w-4 h-4 text-white" />
    },
    {
      id: 'resume',
      title: 'View & Print Resume (Curriculum Vitae)',
      category: 'Profile',
      action: () => {
        onClose();
        onOpenResume();
      },
      icon: <FileText className="w-4 h-4 text-amber-400" />
    },
    {
      id: 'copy-email',
      title: `Copy Email (${PERSONAL_INFO.email})`,
      category: 'Contact',
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        playSuccessSound();
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
        onClose();
      },
      icon: <Copy className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 'copy-phone',
      title: `Copy Phone (${PERSONAL_INFO.phone})`,
      category: 'Contact',
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.phone);
        playSuccessSound();
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
        onClose();
      },
      icon: <Copy className="w-4 h-4 text-purple-400" />
    },
    {
      id: 'contact-section',
      title: 'Jump to Contact & Let\'s Work Together',
      category: 'Navigation',
      action: () => {
        const el = document.getElementById('contact');
        el?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
      icon: <Send className="w-4 h-4 text-rose-400" />
    },
    {
      id: 'sound',
      title: isSoundEnabled() ? 'Disable UI Sound Effects' : 'Enable UI Sound Effects',
      category: 'Preferences',
      action: () => {
        toggleSound();
        playPopSound(700, 0.05);
        onClose();
      },
      icon: isSoundEnabled() ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-sky-400" />
    }
  ];

  const filteredActions = actions.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Command Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl rounded-2xl bg-[#0f121d] border border-white/20 shadow-2xl overflow-hidden z-10"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
            <Search className="w-5 h-5 text-zinc-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or jump to project..."
              className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none font-mono"
            />
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-white/10">
              ESC
            </span>
          </div>

          {/* Action List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredActions.length > 0 ? (
              filteredActions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    playPopSound(600, 0.03);
                    item.action();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-800/80 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-900 border border-white/5 group-hover:border-white/20">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-zinc-200 group-hover:text-white block">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-zinc-600 group-hover:text-sky-400">
                    ↵ Execute
                  </span>
                </button>
              ))
            ) : (
              <div className="py-8 text-center text-xs font-mono text-zinc-500">
                No matching commands found. Try "Resume", "QuickShift", or "Email".
              </div>
            )}
          </div>

          {/* Command Footer */}
          <div className="px-4 py-2 bg-zinc-950/70 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>MV Jayanna • Developer Terminal</span>
            <div className="flex items-center gap-2">
              <span>↑↓ Navigate</span>
              <span>•</span>
              <span>ESC Close</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
