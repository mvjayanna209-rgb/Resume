import { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Sparkles, 
  Zap, 
  Banknote, 
  Clock, 
  Bookmark, 
  FileText, 
  Filter, 
  SlidersHorizontal, 
  CheckCircle2, 
  Calendar,
  AlertCircle,
  QrCode,
  Building2,
  Utensils,
  ShoppingBag,
  Bike,
  Store,
  Package,
  Shield,
  PartyPopper,
  Headset
} from 'lucide-react';
import { 
  Job, 
  JobSeekerProfile, 
  JobApplication, 
  JobCategory, 
  ShiftTiming, 
  IndianCity 
} from '../types';
import { CATEGORIES_DATA, CITIES_CONFIG } from '../data/mockJobs';
import JobCard from './JobCard';
import { playPopSound } from '../utils/audio';

interface JobSeekerDashboardProps {
  jobs: Job[];
  seekerProfile: JobSeekerProfile;
  applications: JobApplication[];
  savedJobIds: string[];
  currentCity: IndianCity;
  currentLocality: string;
  onChangeLocality: (loc: string) => void;
  onToggleSave: (jobId: string) => void;
  onQuickApply: (job: Job) => void;
  onSelectJob: (job: Job) => void;
  onOpenAIMatcher: () => void;
  onOpenDigitalPass: () => void;
}

export default function JobSeekerDashboard({
  jobs,
  seekerProfile,
  applications,
  savedJobIds,
  currentCity,
  currentLocality,
  onChangeLocality,
  onToggleSave,
  onQuickApply,
  onSelectJob,
  onOpenAIMatcher,
  onOpenDigitalPass,
}: JobSeekerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'shifts' | 'applications' | 'saved'>('shifts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>('all');
  const [selectedShift, setSelectedShift] = useState<ShiftTiming>('all');
  const [onlyInstantHiring, setOnlyInstantHiring] = useState(false);
  const [onlyDailyCash, setOnlyDailyCash] = useState(false);
  const [maxDistance, setMaxDistance] = useState<number>(10); // km
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'nearest' | 'salary' | 'recent'>('nearest');

  // Filtered & Sorted Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // City matching
      if (job.city !== currentCity) return false;

      // Category filter
      if (selectedCategory !== 'all' && job.category !== selectedCategory) return false;

      // Shift filter
      if (selectedShift !== 'all' && job.shiftTiming !== selectedShift) return false;

      // Instant Hiring filter
      if (onlyInstantHiring && !job.instantHiring) return false;

      // Daily Cash filter
      if (onlyDailyCash && !job.dailyCashPayout) return false;

      // Distance radius filter
      if (job.distanceKm > maxDistance) return false;

      // Language filter
      if (selectedLanguage !== 'all' && !job.languagesRequired.includes(selectedLanguage)) return false;

      // Search query (matches title, brand, description, or locality)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesBrand = job.brand.toLowerCase().includes(query);
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesLoc = job.locality.toLowerCase().includes(query);
        const matchesDesc = job.description.toLowerCase().includes(query);
        if (!matchesBrand && !matchesTitle && !matchesLoc && !matchesDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'nearest') return a.distanceKm - b.distanceKm;
      if (sortBy === 'salary') return b.salaryAmount - a.salaryAmount;
      return 0;
    });
  }, [
    jobs, 
    currentCity, 
    selectedCategory, 
    selectedShift, 
    onlyInstantHiring, 
    onlyDailyCash, 
    maxDistance, 
    selectedLanguage, 
    searchQuery, 
    sortBy
  ]);

  const savedJobs = useMemo(() => {
    return jobs.filter(j => savedJobIds.includes(j.id));
  }, [jobs, savedJobIds]);

  const handleCategoryClick = (catId: JobCategory) => {
    playPopSound(600, 0.03);
    setSelectedCategory(catId);
  };

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 p-6 sm:p-8 border border-white/10 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-400 text-xs font-mono font-semibold">
                Welcome to {currentCity}, {seekerProfile.name.split(' ')[0]}
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                📍 {currentLocality}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
              Nearby Part-Time Jobs at <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">Trends, KFC, Domino’s & Retail</span>
            </h1>

            <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
              Find instant evening, morning, or weekend shifts within walking distance. Support your daily food and room expenses while preparing for long-term opportunities.
            </p>

            {/* Quick stats banner */}
            <div className="flex items-center gap-4 mt-4 text-xs font-mono text-zinc-400 flex-wrap">
              <span className="flex items-center gap-1.5 text-zinc-200">
                <Zap className="w-4 h-4 text-amber-400" />
                <strong className="text-white">{jobs.filter(j => j.instantHiring).length}</strong> Instant Walk-in Shifts
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-zinc-200">
                <Banknote className="w-4 h-4 text-emerald-400" />
                <strong className="text-white">{jobs.filter(j => j.dailyCashPayout).length}</strong> Daily Cash Payouts
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-zinc-200">
                <Clock className="w-4 h-4 text-indigo-400" />
                Flexible 4–5 Hour Shifts
              </span>
            </div>
          </div>

          {/* AI Shift Matcher & Pass Card Trigger */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenAIMatcher}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI For Best Shift</span>
            </button>

            <button
              onClick={onOpenDigitalPass}
              className="px-5 py-3 rounded-2xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors"
            >
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>Show QuickShift Pass</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation: Shifts vs Applications Tracker vs Saved */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('shifts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'shifts'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span>Nearby Shifts</span>
            <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-md bg-zinc-800 text-zinc-300">
              {filteredJobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'applications'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span>My Applications</span>
            {applications.length > 0 && (
              <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-md bg-emerald-500 text-black font-bold">
                {applications.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span>Saved Shifts</span>
            <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-md bg-zinc-800 text-zinc-300">
              {savedJobs.length}
            </span>
          </button>
        </div>

        {/* Sort selector */}
        {activeTab === 'shifts' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 font-mono hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'nearest' | 'salary' | 'recent')}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 focus:outline-none"
            >
              <option value="nearest">Nearest First (GPS)</option>
              <option value="salary">Highest Pay (₹)</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
        )}
      </div>

      {/* View 1: Nearby Shifts Listings */}
      {activeTab === 'shifts' && (
        <div className="space-y-5">
          {/* Search and Locality Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by store (e.g. Trends, KFC), role, or area..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-zinc-900/90 border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Locality in City */}
            <div className="md:col-span-3">
              <select
                value={currentLocality}
                onChange={(e) => onChangeLocality(e.target.value)}
                className="w-full px-3.5 py-3 rounded-2xl bg-zinc-900/90 border border-white/10 text-xs text-zinc-200 focus:outline-none focus:border-sky-500"
              >
                {CITIES_CONFIG[currentCity]?.localities.map(loc => (
                  <option key={loc} value={loc}>📍 {loc}</option>
                ))}
              </select>
            </div>

            {/* Distance Radius */}
            <div className="md:col-span-3">
              <select
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full px-3.5 py-3 rounded-2xl bg-zinc-900/90 border border-white/10 text-xs text-zinc-200 focus:outline-none focus:border-sky-500"
              >
                <option value={2}>🚶 Walking Distance (&lt; 2 km)</option>
                <option value={5}>🛵 Short Commute (&lt; 5 km)</option>
                <option value={10}>🚌 City Zone (&lt; 10 km)</option>
                <option value={30}>🌆 Entire {currentCity}</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Pills Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            {/* Instant walk-in toggle */}
            <button
              onClick={() => setOnlyInstantHiring(!onlyInstantHiring)}
              className={`px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 shrink-0 transition-colors ${
                onlyInstantHiring
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Instant Walk-in Today</span>
            </button>

            {/* Daily Cash toggle */}
            <button
              onClick={() => setOnlyDailyCash(!onlyDailyCash)}
              className={`px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 shrink-0 transition-colors ${
                onlyDailyCash
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                  : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              <Banknote className="w-3.5 h-3.5" />
              <span>Daily Cash Payout</span>
            </button>

            {/* Shift Timing dropdown */}
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value as ShiftTiming)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 shrink-0 focus:outline-none"
            >
              <option value="all">Any Shift Time</option>
              <option value="morning">Morning (6 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
              <option value="evening">Evening (5 PM - 10 PM)</option>
              <option value="night">Night (9 PM - 2 AM)</option>
              <option value="weekend">Weekend Only</option>
            </select>

            {/* Language filter */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 shrink-0 focus:outline-none"
            >
              <option value="all">All Languages</option>
              <option value="Kannada">Kannada Spoken</option>
              <option value="Hindi">Hindi Spoken</option>
              <option value="English">English Spoken</option>
              <option value="Tamil">Tamil Spoken</option>
              <option value="Telugu">Telugu Spoken</option>
            </select>

            {/* Reset filters if any applied */}
            {(onlyInstantHiring || onlyDailyCash || selectedShift !== 'all' || selectedCategory !== 'all' || selectedLanguage !== 'all') && (
              <button
                onClick={() => {
                  setOnlyInstantHiring(false);
                  setOnlyDailyCash(false);
                  setSelectedShift('all');
                  setSelectedCategory('all');
                  setSelectedLanguage('all');
                  setMaxDistance(10);
                }}
                className="text-[11px] text-zinc-400 hover:text-white underline shrink-0 px-2"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Category Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES_DATA.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-semibold shrink-0 transition-all border ${
                    isSelected
                      ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/20'
                      : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border-white/5'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Job Cards Grid */}
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl bg-zinc-900/40 border border-white/5">
              <AlertCircle className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-zinc-200">No matching shifts within {maxDistance} km</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                Try widening your distance radius or clearing the filters to discover shifts across other areas in {currentCity}.
              </p>
              <button
                onClick={() => {
                  setMaxDistance(30);
                  setSelectedCategory('all');
                  setSelectedShift('all');
                  setOnlyInstantHiring(false);
                  setOnlyDailyCash(false);
                  setSelectedLanguage('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/40 text-xs font-semibold"
              >
                Show All Shifts in {currentCity}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  seekerProfile={seekerProfile}
                  isSaved={savedJobIds.includes(job.id)}
                  hasApplied={applications.some(a => a.jobId === job.id)}
                  onToggleSave={onToggleSave}
                  onQuickApply={onQuickApply}
                  onSelectJob={onSelectJob}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* View 2: Application Tracking Pipeline */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">Your Active Applications</h3>
              <p className="text-xs text-zinc-400">Track interview progress, trial shifts, and hiring confirmation</p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-xl bg-sky-950 text-sky-400 border border-sky-600/30">
              {applications.length} Submitted
            </span>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl bg-zinc-900/40 border border-white/5">
              <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-zinc-200">No applications submitted yet</h3>
              <p className="text-xs text-zinc-500 mt-1">Tap "Quick Apply" on any shift card to apply in 1 second.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => {
                const step = app.status === 'hired' ? 4 : app.status === 'trial_scheduled' ? 3 : app.status === 'reviewed' ? 2 : 1;
                return (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-base">{app.jobTitle}</h4>
                          <span className="text-xs text-sky-400 font-semibold">• {app.company}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {app.locality} • {app.salaryText} • {app.shiftHoursText}
                        </p>
                      </div>

                      <span className="text-xs text-zinc-500 font-mono">
                        Applied: {app.appliedAt}
                      </span>
                    </div>

                    {/* Progress Pipeline */}
                    <div className="pt-2">
                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        <div className={`p-2 rounded-xl border ${step >= 1 ? 'bg-sky-950/80 border-sky-500 text-sky-300 font-semibold' : 'bg-zinc-950 border-white/5 text-zinc-600'}`}>
                          1. Applied
                        </div>
                        <div className={`p-2 rounded-xl border ${step >= 2 ? 'bg-sky-950/80 border-sky-500 text-sky-300 font-semibold' : 'bg-zinc-950 border-white/5 text-zinc-600'}`}>
                          2. Reviewed
                        </div>
                        <div className={`p-2 rounded-xl border ${step >= 3 ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300 font-bold' : 'bg-zinc-950 border-white/5 text-zinc-600'}`}>
                          3. Shift Trial
                        </div>
                        <div className={`p-2 rounded-xl border ${step >= 4 ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold' : 'bg-zinc-950 border-white/5 text-zinc-600'}`}>
                          4. Hired!
                        </div>
                      </div>
                    </div>

                    {app.status === 'trial_scheduled' && (
                      <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs flex items-center justify-between">
                        <span>🎉 The store manager invited you for an in-person briefing & shift trial!</span>
                        <span className="font-semibold underline cursor-pointer">View Store Details</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* View 3: Saved Shifts */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
            <h3 className="font-bold text-white text-base">Your Bookmarked Shifts</h3>
            <p className="text-xs text-zinc-400">Shifts you have saved for later review</p>
          </div>

          {savedJobs.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl bg-zinc-900/40 border border-white/5">
              <Bookmark className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-zinc-200">No saved shifts yet</h3>
              <p className="text-xs text-zinc-500 mt-1">Click the bookmark icon on any job card to save it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  seekerProfile={seekerProfile}
                  isSaved={true}
                  hasApplied={applications.some(a => a.jobId === job.id)}
                  onToggleSave={onToggleSave}
                  onQuickApply={onQuickApply}
                  onSelectJob={onSelectJob}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
