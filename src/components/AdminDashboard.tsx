import { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Trash2, 
  CheckCircle2, 
  BarChart3, 
  TrendingUp, 
  Building2, 
  Users, 
  IndianRupee,
  Search,
  Filter
} from 'lucide-react';
import { Job, IndianCity } from '../types';
import BrandBadge from './BrandBadge';
import { playPopSound, playSuccessSound } from '../utils/audio';

interface AdminDashboardProps {
  jobs: Job[];
  onRemoveJob: (jobId: string) => void;
  onToggleVerifyEmployer: (jobId: string) => void;
  currentCity: IndianCity;
}

export default function AdminDashboard({
  jobs,
  onRemoveJob,
  onToggleVerifyEmployer,
  currentCity,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'moderation' | 'analytics'>('moderation');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter(j => 
    j.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.locality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const averageHourlyPay = Math.round(
    jobs.filter(j => j.salaryType === 'hourly').reduce((acc, j) => acc + j.salaryAmount, 0) /
    (jobs.filter(j => j.salaryType === 'hourly').length || 1)
  );

  const verifiedCount = jobs.filter(j => j.isVerifiedEmployer).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono font-semibold">
              Admin & Trust Safety Portal
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              🛡️ City Operations ({currentCity})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Trust, Verification & Fraud Prevention
          </h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Protect city newcomers from counterfeit postings, verify brick-and-mortar retail employers, and monitor real-time wage parity.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('moderation')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'moderation'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Job Moderation
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'analytics'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            City Analytics
          </button>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">Total Shifts</span>
            <Building2 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white mt-1">{jobs.length}</div>
          <span className="text-[10px] text-emerald-400 font-mono">100% active</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">Verified Stores</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-display text-emerald-400 mt-1">{verifiedCount}</div>
          <span className="text-[10px] text-zinc-400 font-mono">{Math.round((verifiedCount/jobs.length)*100)}% verified</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">Avg Hourly Wage</span>
            <IndianRupee className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-display text-amber-400 mt-1">₹{averageHourlyPay}/hr</div>
          <span className="text-[10px] text-zinc-400 font-mono">Benchmark: ₹120/hr</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">Fraud Alerts</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-display text-rose-400 mt-1">0</div>
          <span className="text-[10px] text-emerald-400 font-mono">All verified</span>
        </div>
      </div>

      {activeTab === 'moderation' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="flex items-center justify-between gap-3 bg-zinc-900/90 p-3 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-zinc-400 ml-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by store name, locality, or role to audit..."
                className="w-full bg-transparent border-none text-xs text-white focus:outline-none"
              />
            </div>
            <span className="text-xs text-zinc-400 font-mono">
              {filteredJobs.length} listings
            </span>
          </div>

          {/* Listings Table */}
          <div className="space-y-2">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <BrandBadge brand={job.brand} size="sm" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm">{job.brand}</span>
                      <span className="text-xs text-zinc-300 font-medium">{job.title}</span>
                      {job.isVerifiedEmployer ? (
                        <span className="text-[10px] px-2 py-0.2 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.2 rounded-md bg-amber-950 text-amber-400 border border-amber-500/30">
                          Pending Verification
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {job.locality} • Manager: {job.employerName} ({job.employerPhone})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => {
                      playPopSound(700, 0.04);
                      onToggleVerifyEmployer(job.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      job.isVerifiedEmployer
                        ? 'bg-zinc-800 text-zinc-300 hover:text-white'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{job.isVerifiedEmployer ? 'Revoke Badge' : 'Verify Store'}</span>
                  </button>

                  <button
                    onClick={() => {
                      playPopSound(400, 0.05);
                      onRemoveJob(job.id);
                    }}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-rose-950/60 text-zinc-400 hover:text-rose-400 transition-colors"
                    title="Remove / Delete Fake Job"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10">
            <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span>Top Hiring Categories in {currentCity}</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Fast Food & Kitchen (KFC, Domino\'s, Pizza Hut)', percent: 35, color: 'bg-rose-500' },
                { name: 'Fashion Retail (Trends, Zudio, Decathlon)', percent: 28, color: 'bg-sky-500' },
                { name: 'Dark Store & Delivery (Blinkit, Zepto)', percent: 22, color: 'bg-amber-500' },
                { name: 'Supermarket Cashier (D-Mart, More)', percent: 15, color: 'bg-emerald-500' },
              ].map((cat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>{cat.name}</span>
                    <span className="font-mono font-semibold">{cat.percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10">
            <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Language Demands by Employers</span>
            </h3>
            <div className="space-y-3">
              {[
                { lang: 'Kannada (Local Customer Interaction)', percent: 85, color: 'bg-yellow-400' },
                { lang: 'Hindi (Kitchen & Delivery Logistics)', percent: 70, color: 'bg-orange-500' },
                { lang: 'English (Malls & Tech Park Cafes)', percent: 55, color: 'bg-indigo-500' },
                { lang: 'Tamil / Telugu (Inter-state Shoppers)', percent: 30, color: 'bg-purple-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>{item.lang}</span>
                    <span className="font-mono font-semibold">{item.percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
