import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  Instagram, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';
import { playPopSound, playSuccessSound } from '../utils/audio';

interface ContactProps {
  initialProjectType?: string;
}

export default function Contact({ initialProjectType = '' }: ContactProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: initialProjectType || 'Full-Stack Engineering Role'
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    playSuccessSound();
    setCopiedField(fieldName);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#818cf8', '#eab308']
    });

    setTimeout(() => {
      setCopiedField(null);
    }, 2200);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playPopSound(700, 0.05);
    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      playSuccessSound();

      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#818cf8', '#34d399', '#fde047']
      });

      // Clear after submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          projectType: 'Full-Stack Engineering Role'
        });
      }, 500);
    }, 900);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
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
            <MessageSquare className="w-3.5 h-3.5" />
            <span>START A CONVERSATION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight"
          >
            Let's work together.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-base sm:text-lg text-zinc-400 max-w-xl"
          >
            Have an open software engineering role, a technical challenge, or an ambitious web project in mind? Reach out directly.
          </motion.p>
        </div>

        {/* Contact Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* Left Column: Direct Info, Copy Buttons, Social Links (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick direct cards */}
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-4 shadow-xl">
              <h3 className="text-lg font-bold font-display text-white mb-2">
                Direct Contact Points
              </h3>

              {/* Email Card with 1-click copy */}
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-white/5 hover:border-sky-500/30 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase block">Email</span>
                    <a 
                      href={`mailto:${PERSONAL_INFO.email}`} 
                      className="text-sm font-medium text-white hover:text-sky-400 transition-colors truncate block"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                  className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
                  title="Copy email to clipboard"
                  id="copy-email-btn"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone Card with 1-click copy */}
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-white/5 hover:border-sky-500/30 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-500 uppercase block">Phone / WhatsApp</span>
                    <a 
                      href={`tel:${PERSONAL_INFO.phone}`} 
                      className="text-sm font-medium text-white hover:text-indigo-400 transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                  className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
                  title="Copy phone to clipboard"
                  id="copy-phone-btn"
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-white/5 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase block">Location</span>
                  <span className="text-sm font-medium text-white">
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Channels Card */}
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-4 shadow-xl">
              <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400">
                Network & Repositories
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-zinc-900 border border-white/5 hover:border-white/20 text-zinc-300 hover:text-white flex flex-col items-center justify-center gap-1.5 transition-all group active:scale-95"
                  id="contact-social-github"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono">GitHub</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-zinc-900 border border-white/5 hover:border-sky-500/30 text-zinc-300 hover:text-sky-400 flex flex-col items-center justify-center gap-1.5 transition-all group active:scale-95"
                  id="contact-social-linkedin"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono">LinkedIn</span>
                </a>

                <a
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-zinc-900 border border-white/5 hover:border-pink-500/30 text-zinc-300 hover:text-pink-400 flex flex-col items-center justify-center gap-1.5 transition-all group active:scale-95"
                  id="contact-social-instagram"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono">Instagram</span>
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-10 rounded-3xl bg-zinc-900/70 border border-white/10 backdrop-blur-xl shadow-2xl relative">
              
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white">
                    Transmission Received
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md">
                    Thank you for reaching out. Your message has been logged. I will respond to your email at <strong className="text-sky-400 font-mono">{formData.email || 'your inbox'}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono font-semibold"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Henderson"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-sky-400 text-white placeholder:text-zinc-600 text-sm focus:outline-none transition-colors"
                        id="contact-name-input"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-sky-400 text-white placeholder:text-zinc-600 text-sm focus:outline-none transition-colors"
                        id="contact-email-input"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type / Role Category */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Subject / Topic of Interest
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-sky-400 text-white text-sm focus:outline-none transition-colors"
                      id="contact-project-select"
                    >
                      <option value="Full-Stack Engineering Role">Full-Time Software Engineer Role</option>
                      <option value="Contract / Freelance Project">Contract Web Application / API Project</option>
                      <option value="Technical Collaboration / Hackathon">Technical Collaboration / Open Source</option>
                      <option value="General Technical Inquiry">General Discussion / Tech Inquiries</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Message / Project Scope *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the opportunity, technical stack, or project goals..."
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-sky-400 text-white placeholder:text-zinc-600 text-sm focus:outline-none transition-colors resize-none"
                      id="contact-message-input"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 disabled:opacity-50"
                    id="contact-submit-btn"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Transmitting Message...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message Directly</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-500 pt-2">
                    <Sparkles className="w-3 h-3 text-sky-400" />
                    <span>Average response time: within 24 hours</span>
                  </div>
                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
