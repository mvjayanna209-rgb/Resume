import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Banknote, 
  MessageCircle, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck,
  Users
} from 'lucide-react';
import { Job, JobSeekerProfile } from '../types';
import BrandBadge from './BrandBadge';
import { playPopSound, playSuccessSound } from '../utils/audio';

interface JobCardProps {
  key?: React.Key;
  job: Job;
  seekerProfile: JobSeekerProfile;
  isSaved: boolean;
  hasApplied: boolean;
  onToggleSave: (jobId: string) => void;
  onQuickApply: (job: Job) => void;
  onSelectJob: (job: Job) => void;
}

export default function JobCard({
  job,
  seekerProfile,
  isSaved,
  hasApplied,
  onToggleSave,
  onQuickApply,
  onSelectJob,
}: JobCardProps) {
  const [isApplying, setIsApplying] = useState(false);

  // Calculate Match Score based on languages, category preference, and shift timing
  const calculateMatchScore = (): number => {
    let score = 70; // baseline
    // Language overlap
    const langMatchCount = job.languagesRequired.filter(lang => 
      seekerProfile.spokenLanguages.includes(lang)
    ).length;
    score += langMatchCount * 7;

    // Shift preference
    if (seekerProfile.preferredShifts.includes(job.shiftTiming)) {
      score += 12;
    }

    // Proximity bonus
    if (job.distanceKm <= 2) {
      score += 8;
    } else if (job.distanceKm <= 5) {
      score += 4;
    }

    return Math.min(score, 98);
  };

  const matchScore = calculateMatchScore();

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasApplied) return;
    setIsApplying(true);
    playPopSound(580, 0.05);
    setTimeout(() => {
      onQuickApply(job);
      setIsApplying(false);
      playSuccessSound();
    }, 300);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound(isSaved ? 400 : 750, 0.04);
    onToggleSave(job.id);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound(650, 0.04);
    const message = encodeURIComponent(
      `Hello ${job.employerName}, I found your part-time opening for "${job.title}" at ${job.brand} (${job.locality}) on QuickShift. I am currently in ${seekerProfile.locality}, speak ${seekerProfile.spokenLanguages.join(', ')}, and am available for immediate walk-in. Could we discuss?`
    );
    window.open(`https://wa.me/${job.employerWhatsApp}?text=${message}`, '_blank');
  };

  return (
    <div
      onClick={() => onSelectJob(job)}
      className="group relative rounded-2xl bg-zinc-900/80 hover:bg-zinc-900 border border-white/10 hover:border-sky-500/40 p-5 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-sky-500/10 flex flex-col justify-between"
      id={`job-card-${job.id}`}
    >
      {/* Top Bar: Brand, Title, Badges, Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <BrandBadge brand={job.brand} size="md" />
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-white text-base group-hover:text-sky-300 transition-colors">
                  {job.brand}
                </span>
                {job.isVerifiedEmployer && (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-sky-400 bg-sky-950/60 border border-sky-800/50 px-1.5 py-0.2 rounded-md" title="Verified Employer Business">
                    <ShieldCheck className="w-3 h-3 text-sky-400" />
                    Verified
                  </span>
                )}
                {job.instantHiring && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded-full animate-pulse">
                    <Zap className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                    Walk-in Today
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{job.company}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* AI Match percentage */}
            <div 
              className="flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400"
              title="Personalized match score based on languages, shift time, and location"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>{matchScore}% Match</span>
            </div>

            {/* Bookmark button */}
            <button
              onClick={handleSaveClick}
              className={`p-2 rounded-xl border transition-colors ${
                isSaved 
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
                  : 'bg-zinc-800/60 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save shift'}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 fill-amber-400" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Job Title */}
        <h3 className="font-semibold text-zinc-100 text-lg group-hover:text-sky-400 transition-colors line-clamp-2 leading-snug">
          {job.title}
        </h3>

        {/* Locality & Distance Pill */}
        <div className="flex items-center gap-3 text-xs text-zinc-400 mt-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1 text-zinc-300 font-medium">
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>{job.locality}</span>
          </span>
          <span className="text-zinc-600">•</span>
          <span className="inline-flex items-center gap-1 font-mono text-sky-400 bg-sky-950/40 px-2 py-0.5 rounded-md border border-sky-800/30">
            {job.distanceKm} km away
          </span>
          {job.vacancies > 1 && (
            <>
              <span className="text-zinc-600">•</span>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Users className="w-3 h-3 text-zinc-500" />
                <span>{job.vacancies} vacancies</span>
              </span>
            </>
          )}
        </div>

        {/* Salary & Payout Badge */}
        <div className="mt-3.5 p-2.5 rounded-xl bg-zinc-950/70 border border-white/5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Banknote className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-extrabold text-lg text-emerald-400">
                  ₹{job.salaryAmount.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-zinc-400 font-medium">
                  {job.salaryType === 'hourly' ? '/ hr' : job.salaryType === 'daily' ? '/ day' : '/ month'}
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono">
                {job.dailyCashPayout ? '⚡ Daily Cash Payout Available' : 'Weekly Direct Bank Transfer'}
              </p>
            </div>
          </div>

          {job.dailyCashPayout && (
            <span className="text-[10px] font-bold text-amber-300 bg-amber-950/50 border border-amber-500/30 px-2 py-0.5 rounded-md shrink-0">
              Daily Cash
            </span>
          )}
        </div>

        {/* Shift Timings */}
        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-300">
          <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="font-medium text-zinc-200">{job.shiftHoursText}</span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
            {job.shiftTiming}
          </span>
        </div>

        {/* Spoken Languages Required */}
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-zinc-500">Languages:</span>
          {job.languagesRequired.map(lang => (
            <span 
              key={lang}
              className={`text-[10px] px-2 py-0.5 rounded-full border ${
                seekerProfile.spokenLanguages.includes(lang)
                  ? 'bg-sky-950/70 border-sky-500/40 text-sky-300 font-medium'
                  : 'bg-zinc-800 border-white/5 text-zinc-400'
              }`}
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
        <span className="text-[11px] text-zinc-500 font-mono">
          {job.postedTime}
        </span>

        <div className="flex items-center gap-2">
          {/* WhatsApp Direct Contact */}
          <button
            onClick={handleWhatsAppClick}
            className="px-3 py-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors active:scale-95"
            title="Chat directly with store manager on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
            <span>WhatsApp</span>
          </button>

          {/* Quick 1-Click Apply */}
          <button
            onClick={handleApplyClick}
            disabled={hasApplied || isApplying}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
              hasApplied
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 cursor-default'
                : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-md shadow-sky-500/20 border border-sky-400/40'
            }`}
          >
            {hasApplied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Applied</span>
              </>
            ) : isApplying ? (
              <span>Applying...</span>
            ) : (
              <>
                <span>Quick Apply</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
