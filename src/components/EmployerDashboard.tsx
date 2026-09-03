import { useState } from 'react';
import { 
  Briefcase, 
  PlusCircle, 
  Users, 
  Clock, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  ShieldCheck, 
  Sparkles,
  MapPin,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Job, JobApplication, IndianCity } from '../types';
import BrandBadge from './BrandBadge';
import { playPopSound, playSuccessSound } from '../utils/audio';

interface EmployerDashboardProps {
  jobs: Job[];
  applications: JobApplication[];
  onOpenPostJob: () => void;
  onUpdateApplicationStatus: (appId: string, status: JobApplication['status']) => void;
  currentCity: IndianCity;
}

export default function EmployerDashboard({
  jobs,
  applications,
  onOpenPostJob,
  onUpdateApplicationStatus,
  currentCity,
}: EmployerDashboardProps) {
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'applicants' | 'listings'>('applicants');

  const filteredApplications = selectedJobFilter === 'all'
    ? applications
    : applications.filter(a => a.jobId === selectedJobFilter);

  const handleStatusChange = (appId: string, status: JobApplication['status']) => {
    playPopSound(600, 0.05);
    onUpdateApplicationStatus(appId, status);
    if (status === 'hired' || status === 'trial_scheduled') {
      playSuccessSound();
    }
  };

  const handleWhatsAppApplicant = (app: JobApplication) => {
    const text = encodeURIComponent(
      `Hello ${app.seekerName}, this is regarding your part-time shift application for "${app.jobTitle}" at ${app.company} on QuickShift. We would like to invite you for a 20-minute walk-in briefing and shift trial. When are you available today?`
    );
    window.open(`https://wa.me/${app.seekerPhone.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Metrics & Post CTA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-white/10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
              Employer Hiring Hub
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              📍 {currentCity}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            Fill Shifts In Under 2 Hours
          </h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Post urgent morning, evening, or weekend part-time shifts for your store. Candidates nearby will receive instant notifications and can walk in today.
          </p>
        </div>

        <button
          onClick={onOpenPostJob}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm flex items-center gap-2.5 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all shrink-0"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Post Part-Time Shift</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/70 border border-white/5">
          <span className="text-xs font-mono text-zinc-400">Active Shifts</span>
          <div className="text-2xl font-bold font-display text-white mt-1">{jobs.length}</div>
          <span className="text-[10px] text-emerald-400 font-mono">Across {currentCity}</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/70 border border-white/5">
          <span className="text-xs font-mono text-zinc-400">Total Applicants</span>
          <div className="text-2xl font-bold font-display text-sky-400 mt-1">{applications.length}</div>
          <span className="text-[10px] text-zinc-400 font-mono">Real-time incoming</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/70 border border-white/5">
          <span className="text-xs font-mono text-zinc-400">Shift Trials Fixed</span>
          <div className="text-2xl font-bold font-display text-indigo-400 mt-1">
            {applications.filter(a => a.status === 'trial_scheduled').length}
          </div>
          <span className="text-[10px] text-zinc-400 font-mono">Walking in today</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/70 border border-white/5">
          <span className="text-xs font-mono text-zinc-400">Candidates Hired</span>
          <div className="text-2xl font-bold font-display text-emerald-400 mt-1">
            {applications.filter(a => a.status === 'hired').length}
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">Working this week</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('applicants')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'applicants'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Applicants Review ({applications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'listings'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Active Store Postings ({jobs.length})</span>
          </button>
        </div>

        {activeTab === 'applicants' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 font-mono hidden sm:inline">Filter by Shift:</span>
            <select
              value={selectedJobFilter}
              onChange={(e) => setSelectedJobFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-200 focus:outline-none"
            >
              <option value="all">All Shifts</option>
              {jobs.map(j => (
                <option key={j.id} value={j.id}>{j.brand} — {j.title.slice(0, 25)}...</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Tab 1: Applicants List */}
      {activeTab === 'applicants' && (
        <div className="space-y-3">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 p-6 rounded-3xl bg-zinc-900/40 border border-white/5">
              <Users className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-zinc-200">No applicants yet for this shift</h3>
              <p className="text-xs text-zinc-500 mt-1">Nearby candidates will appear here as soon as they tap 1-Click Apply.</p>
            </div>
          ) : (
            filteredApplications.map((app) => (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                {/* Candidate & Job Info */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold font-display text-lg shrink-0">
                    {app.seekerName.slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-base">{app.seekerName}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                        {app.matchScore}% Match
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">
                        {app.seekerPhone}
                      </span>
                    </div>

                    <p className="text-xs text-sky-400 mt-0.5">
                      Applied for: <span className="font-semibold text-zinc-200">{app.jobTitle}</span> ({app.company})
                    </p>

                    <div className="flex items-center gap-3 text-xs text-zinc-400 mt-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        {app.locality}
                      </span>
                      <span>•</span>
                      <span>Languages: {app.seekerLanguages.join(', ')}</span>
                      <span>•</span>
                      <span className="text-zinc-500 font-mono">{app.appliedAt}</span>
                    </div>

                    {app.notes && (
                      <p className="text-xs text-amber-200/90 bg-amber-950/30 p-2 rounded-lg mt-2 border border-amber-500/20">
                        Candidate Note: "{app.notes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Candidate Action Buttons & Status */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                  {/* WhatsApp Direct */}
                  <button
                    onClick={() => handleWhatsAppApplicant(app)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5"
                    title="Send WhatsApp Invitation"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>

                  <a
                    href={`tel:${app.seekerPhone}`}
                    className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-sky-400" />
                    <span>Call</span>
                  </a>

                  {/* Status Progression Buttons */}
                  {app.status === 'applied' && (
                    <button
                      onClick={() => handleStatusChange(app.id, 'trial_scheduled')}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Invite for Trial</span>
                    </button>
                  )}

                  {app.status === 'trial_scheduled' && (
                    <button
                      onClick={() => handleStatusChange(app.id, 'hired')}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm Hired</span>
                    </button>
                  )}

                  {app.status === 'hired' && (
                    <span className="px-3.5 py-2 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Hired & Active</span>
                    </span>
                  )}

                  {app.status !== 'rejected' && app.status !== 'hired' && (
                    <button
                      onClick={() => handleStatusChange(app.id, 'rejected')}
                      className="p-2 rounded-xl bg-zinc-800 hover:bg-rose-950/40 text-zinc-500 hover:text-rose-400 transition-colors"
                      title="Decline Candidate"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Employer Job Listings */}
      {activeTab === 'listings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <BrandBadge brand={job.brand} size="sm" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{job.brand}</h4>
                      <p className="text-[11px] text-zinc-400">{job.locality}</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 text-[11px] font-mono border border-emerald-500/30">
                    {job.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-semibold text-zinc-100 text-sm mt-1">{job.title}</h3>
                <p className="text-xs text-zinc-400 mt-1">{job.shiftHoursText}</p>

                <div className="mt-3 flex items-center justify-between text-xs p-2.5 rounded-xl bg-zinc-950">
                  <span className="text-zinc-400">Pay Rate</span>
                  <span className="font-bold text-emerald-400">
                    ₹{job.salaryAmount} {job.salaryType === 'hourly' ? '/hr' : '/day'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono">
                  {applications.filter(a => a.jobId === job.id).length} Applicants Received
                </span>

                <button
                  onClick={() => {
                    setSelectedJobFilter(job.id);
                    setActiveTab('applicants');
                  }}
                  className="text-sky-400 hover:text-sky-300 font-semibold"
                >
                  View Applicants →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
