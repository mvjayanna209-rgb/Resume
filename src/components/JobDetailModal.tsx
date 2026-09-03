import { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Banknote, 
  Phone, 
  MessageCircle, 
  Navigation, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Users, 
  FileCheck2, 
  Gift, 
  AlertCircle 
} from 'lucide-react';
import { Job, JobSeekerProfile } from '../types';
import BrandBadge from './BrandBadge';
import { playPopSound, playSuccessSound } from '../utils/audio';

interface JobDetailModalProps {
  job: Job | null;
  seekerProfile: JobSeekerProfile;
  hasApplied: boolean;
  onClose: () => void;
  onApply: (job: Job, note?: string) => void;
}

export default function JobDetailModal({
  job,
  seekerProfile,
  hasApplied,
  onClose,
  onApply,
}: JobDetailModalProps) {
  const [customNote, setCustomNote] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  if (!job) return null;

  const handleApply = () => {
    setIsApplying(true);
    playPopSound(520, 0.05);
    setTimeout(() => {
      onApply(job, customNote);
      setIsApplying(false);
      playSuccessSound();
    }, 400);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello ${job.employerName}, I am interested in the "${job.title}" part-time opening at ${job.brand} (${job.locality}) on QuickShift.\n\nMy Details:\n• Name: ${seekerProfile.name}\n• Location: ${seekerProfile.locality}, ${seekerProfile.city}\n• Languages: ${seekerProfile.spokenLanguages.join(', ')}\n• Available: Immediate\n\nPlease let me know when I can come for the walk-in interview.`
    );
    window.open(`https://wa.me/${job.employerWhatsApp}?text=${message}`, '_blank');
  };

  const handleOpenMaps = () => {
    const query = encodeURIComponent(`${job.brand} ${job.locality} ${job.city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-zinc-900 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-zinc-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header: Brand, Title, Badges */}
        <div className="flex items-start gap-4 pr-10">
          <BrandBadge brand={job.brand} size="lg" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-xl text-white">{job.brand}</span>
              {job.isVerifiedEmployer && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 bg-sky-950/80 border border-sky-700/60 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  Verified Employer
                </span>
              )}
              {job.instantHiring && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-950/80 border border-amber-500/50 px-2.5 py-0.5 rounded-full">
                  <Zap className="w-3 h-3 fill-amber-300 text-amber-300" />
                  Walk-in Today
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-zinc-100 mt-1">
              {job.title}
            </h2>
            <p className="text-sm text-zinc-400 mt-0.5">{job.company}</p>
          </div>
        </div>

        {/* Wage & Timing Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-emerald-500/20 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Banknote className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-2xl text-emerald-400">
                  ₹{job.salaryAmount.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-zinc-400 font-medium">
                  {job.salaryType === 'hourly' ? '/ hour' : job.salaryType === 'daily' ? '/ day' : '/ month'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                {job.dailyCashPayout ? '⚡ Daily Cash Payout Option' : 'Weekly Direct Bank Transfer'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-indigo-500/20 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-zinc-400">{job.shiftTiming} Shift</p>
              <p className="text-sm font-semibold text-zinc-200 mt-0.5">{job.shiftHoursText}</p>
              <p className="text-[11px] text-zinc-500">{job.vacancies} open slots</p>
            </div>
          </div>
        </div>

        {/* Location & Navigation */}
        <div className="mt-5 p-4 rounded-2xl bg-zinc-950/50 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white">{job.locality}, {job.city}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{job.address}</p>
              <p className="text-[11px] font-mono text-sky-400 mt-1">
                📍 {job.distanceKm} km away from your location
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenMaps}
            className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sky-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10 shrink-0 self-end sm:self-center"
          >
            <Navigation className="w-3.5 h-3.5 text-sky-400" />
            <span>Open in Maps</span>
          </button>
        </div>

        {/* Walk-in Instructions (Critical for newcomers who need instant work) */}
        {job.walkInInstructions && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200">
            <div className="flex items-center gap-2 font-semibold text-sm text-amber-300">
              <AlertCircle className="w-4 h-4" />
              <span>Direct Walk-in Hiring Instructions:</span>
            </div>
            <p className="text-xs text-amber-100/90 mt-1.5 leading-relaxed">
              {job.walkInInstructions}
            </p>
          </div>
        )}

        {/* Job Description */}
        <div className="mt-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400 mb-2">
            About This Shift
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Requirements & Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
              <FileCheck2 className="w-4 h-4 text-sky-400" />
              <span>What You Need</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-300">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
              <li className="flex items-start gap-2 text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 shrink-0 mt-0.5" />
                <span>Languages: {job.languagesRequired.join(', ')}</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>Shift Perks & Benefits</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-300">
              {job.perks.map((perk, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Store Manager & Recruiter Contact */}
        <div className="mt-6 p-4 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-zinc-500 uppercase">Hiring In-Charge</span>
            <p className="text-sm font-bold text-zinc-100">{job.employerName}</p>
            <p className="text-xs text-zinc-400 font-mono">{job.employerPhone}</p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`tel:${job.employerPhone}`}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-white/10"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>Call Manager</span>
            </a>

            <button
              onClick={handleWhatsApp}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>Chat WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Apply Section */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-zinc-400 w-full sm:w-auto">
            <span>Applying as: </span>
            <span className="font-semibold text-white">{seekerProfile.name}</span>
            <span className="text-zinc-600"> • </span>
            <span>{seekerProfile.phone}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleApply}
              disabled={hasApplied || isApplying}
              className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${
                hasApplied
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 cursor-default'
                  : 'bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-sky-500/25 border border-sky-400/40'
              }`}
            >
              {hasApplied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Applied Successfully</span>
                </>
              ) : isApplying ? (
                <span>Submitting Application...</span>
              ) : (
                <>
                  <span>1-Click Instant Apply</span>
                  <Zap className="w-4 h-4 fill-current" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
