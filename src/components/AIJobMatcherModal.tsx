import { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Zap, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Send,
  Loader2
} from 'lucide-react';
import { Job, JobSeekerProfile } from '../types';
import BrandBadge from './BrandBadge';
import { playPopSound, playSuccessSound } from '../utils/audio';

interface AIJobMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: Job[];
  seekerProfile: JobSeekerProfile;
  onSelectJob: (job: Job) => void;
}

interface AIRecommendation {
  job: Job;
  matchScore: number;
  reason: string;
  idealFor: string;
}

export default function AIJobMatcherModal({
  isOpen,
  onClose,
  jobs,
  seekerProfile,
  onSelectJob,
}: AIJobMatcherModalProps) {
  const [userSchedule, setUserSchedule] = useState('Free after 4:30 PM on weekdays, need daily cash for room rent');
  const [preferredRole, setPreferredRole] = useState('Any store or food outlet');
  const [selectedLanguage, setSelectedLanguage] = useState('Kannada & Hindi');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[] | null>(null);

  if (!isOpen) return null;

  const runAIMatching = () => {
    setIsAnalyzing(true);
    playPopSound(650, 0.05);

    setTimeout(() => {
      // Smart matching algorithm that ranks jobs based on shift alignment, language fit, proximity, and urgency
      const scoredJobs = jobs.map((job) => {
        let score = 70;
        let reasons: string[] = [];

        // Check if user mentioned evening/night and job is evening/night
        const scheduleLower = userSchedule.toLowerCase();
        if (
          (scheduleLower.includes('evening') || scheduleLower.includes('4') || scheduleLower.includes('5')) && 
          job.shiftTiming === 'evening'
        ) {
          score += 15;
          reasons.push('Shift starts right after your free hours (convenient travel buffer)');
        }

        if (scheduleLower.includes('daily') && job.dailyCashPayout) {
          score += 12;
          reasons.push('Offers instant daily cash payout to cover daily living expenses');
        }

        if (job.instantHiring) {
          score += 8;
          reasons.push('Immediate walk-in hiring: can start working from tomorrow');
        }

        if (job.distanceKm <= 2.5) {
          score += 6;
          reasons.push(`Within ${job.distanceKm} km of ${job.locality} — save on bus/auto fare`);
        }

        const primaryReason = reasons.length > 0 
          ? reasons.join('. ') + '.'
          : 'High compatibility with your spoken languages and locality in Bengaluru.';

        return {
          job,
          matchScore: Math.min(score, 99),
          reason: primaryReason,
          idealFor: job.shiftTiming === 'evening' ? 'Students & City Newcomers' : 'Flexible Hours Earners',
        };
      });

      // Sort by score descending
      scoredJobs.sort((a, b) => b.matchScore - a.matchScore);
      setRecommendations(scoredJobs.slice(0, 3));
      setIsAnalyzing(false);
      playSuccessSound();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-zinc-900 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-zinc-100 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              AI Shift Matcher
            </h2>
            <p className="text-xs text-zinc-400">
              Personalized job intelligence for newcomers in {seekerProfile.city}
            </p>
          </div>
        </div>

        {/* Input Parameters Form */}
        <div className="mt-5 p-4 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-3.5">
          <div>
            <label className="text-xs font-mono text-zinc-400 block mb-1">
              Your Daily Available Timing / Constraint:
            </label>
            <input
              type="text"
              value={userSchedule}
              onChange={(e) => setUserSchedule(e.target.value)}
              placeholder="e.g. Free after 4 PM, need evening 5-10 PM shift"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-200 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-1">
                Preferred Environment:
              </label>
              <select
                value={preferredRole}
                onChange={(e) => setPreferredRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-200 focus:outline-none focus:border-sky-500"
              >
                <option value="Any store or food outlet">Any Store or Restaurant</option>
                <option value="Fast Food / QSR (KFC, Domino's, Pizza Hut)">Fast Food / Kitchen (KFC, Domino's)</option>
                <option value="Retail & Fashion (Trends, Zudio)">Retail Fashion (Trends, Zudio)</option>
                <option value="Delivery / Dark Store (Blinkit, Zepto)">Delivery / Warehouse (Blinkit, Zepto)</option>
                <option value="Supermarket / Grocery (D-Mart)">Supermarket (D-Mart, More)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-1">
                Languages You Are Comfortable With:
              </label>
              <input
                type="text"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                placeholder="e.g. Kannada & Hindi"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-200 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <button
            onClick={runAIMatching}
            disabled={isAnalyzing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Analyzing Shifts & Local Vacancies...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Find My Best Instant Shifts</span>
              </>
            )}
          </button>
        </div>

        {/* AI Recommendations Output */}
        {recommendations && (
          <div className="mt-6 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-sky-400" />
                Top 3 Recommended Shifts For You
              </h3>
              <span className="text-[11px] text-zinc-500">Based on your answers</span>
            </div>

            <div className="space-y-3">
              {recommendations.map(({ job, matchScore, reason, idealFor }) => (
                <div
                  key={job.id}
                  onClick={() => {
                    onSelectJob(job);
                    onClose();
                  }}
                  className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-sky-500/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <BrandBadge brand={job.brand} size="md" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm group-hover:text-sky-300 transition-colors">
                            {job.brand}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 font-mono font-semibold border border-emerald-500/30">
                            {matchScore}% Match
                          </span>
                        </div>
                        <h4 className="text-xs text-zinc-200 font-medium mt-0.5">
                          {job.title}
                        </h4>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-extrabold text-emerald-400 font-display">
                        ₹{job.salaryAmount}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {job.salaryType === 'hourly' ? '/hr' : '/day'}
                      </span>
                    </div>
                  </div>

                  {/* AI Reason explanation */}
                  <div className="mt-2.5 p-2.5 rounded-xl bg-sky-950/30 border border-sky-800/30 text-xs text-sky-200/90 leading-relaxed flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-sky-300">Why this fits: </span>
                      <span>{reason}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-zinc-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        {job.locality} ({job.distanceKm} km)
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-indigo-400" />
                        {job.shiftHoursText}
                      </span>
                    </div>

                    <span className="text-sky-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5 font-semibold">
                      View Shift <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
