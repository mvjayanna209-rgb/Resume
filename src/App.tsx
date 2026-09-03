import { useState, useEffect } from 'react';
import { 
  UserRole, 
  Job, 
  JobApplication, 
  JobSeekerProfile, 
  IndianCity,
  AuthUser 
} from './types';
import { 
  INITIAL_JOBS, 
  INITIAL_SEEKER_PROFILE, 
  INITIAL_APPLICATIONS,
  CITIES_CONFIG
} from './data/mockJobs';
import Navbar from './components/Navbar';
import JobSeekerDashboard from './components/JobSeekerDashboard';
import EmployerDashboard from './components/EmployerDashboard';
import AdminDashboard from './components/AdminDashboard';
import JobDetailModal from './components/JobDetailModal';
import AIJobMatcherModal from './components/AIJobMatcherModal';
import DigitalPassModal from './components/DigitalPassModal';
import ProfileModal from './components/ProfileModal';
import PostJobModal from './components/PostJobModal';
import LoginModal from './components/LoginModal';
import { playSuccessSound, playPopSound } from './utils/audio';

export default function App() {
  // Local storage hydrated states
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('quickshift_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('quickshift_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [seekerProfile, setSeekerProfile] = useState<JobSeekerProfile>(() => {
    const saved = localStorage.getItem('quickshift_profile');
    return saved ? JSON.parse(saved) : INITIAL_SEEKER_PROFILE;
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('quickshift_saved_jobs');
    return saved ? JSON.parse(saved) : ['qs-1', 'qs-3'];
  });

  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('quickshift_auth');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      id: 'seeker-vijay',
      name: 'Vijay Kumar',
      loginMethod: 'mobile',
      phone: '9886012345',
      email: 'vijay.k@gmail.com',
      role: 'seeker',
      isVerified: true,
      city: 'Bengaluru',
      locality: 'Koramangala 5th Block',
      createdAt: '2026-03-01',
    };
  });

  const [currentRole, setCurrentRole] = useState<UserRole>('seeker');
  const [currentCity, setCurrentCity] = useState<IndianCity>('Bengaluru');
  const [currentLocality, setCurrentLocality] = useState<string>('Koramangala 5th Block');
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Modal controls
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<Job | null>(null);
  const [isAIMatcherOpen, setIsAIMatcherOpen] = useState(false);
  const [isDigitalPassOpen, setIsDigitalPassOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('quickshift_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('quickshift_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('quickshift_profile', JSON.stringify(seekerProfile));
  }, [seekerProfile]);

  useEffect(() => {
    localStorage.setItem('quickshift_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem('quickshift_auth', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('quickshift_auth');
    }
  }, [authUser]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLogin = (user: AuthUser) => {
    setAuthUser(user);
    setCurrentRole(user.role);
    if (user.city) setCurrentCity(user.city);
    if (user.locality) setCurrentLocality(user.locality);

    if (user.role === 'seeker') {
      setSeekerProfile(prev => ({
        ...prev,
        name: user.name,
        phone: user.phone || prev.phone,
        email: user.email || prev.email,
        city: user.city || prev.city,
        locality: user.locality || prev.locality,
      }));
    }

    const identifier = user.loginMethod === 'mobile' ? `📱 +91 ${user.phone}` : `✉️ ${user.email}`;
    showToast(`Welcome, ${user.name}! Signed in via ${identifier}`);
  };

  const handleLogout = () => {
    setAuthUser(null);
    showToast('Signed out. You can browse shifts as a guest or log in anytime.');
  };

  // Handlers
  const handleToggleSave = (jobId: string) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      const updated = exists ? prev.filter(id => id !== jobId) : [...prev, jobId];
      showToast(exists ? 'Removed from saved shifts' : 'Shift saved to bookmarks!');
      return updated;
    });
  };

  const handleApply = (job: Job, note?: string) => {
    // Check if user is logged in
    if (!authUser) {
      setIsLoginOpen(true);
      showToast('Please sign in with Mobile Number or Email to submit your application');
      return;
    }

    // Check if already applied
    if (applications.some(a => a.jobId === job.id)) {
      showToast('You have already applied for this shift!');
      return;
    }

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      seekerId: seekerProfile.id,
      seekerName: seekerProfile.name,
      seekerPhone: seekerProfile.phone,
      locality: seekerProfile.locality,
      seekerLanguages: seekerProfile.spokenLanguages,
      hasVehicle: seekerProfile.hasTwoWheeler,
      preferredShift: seekerProfile.preferredShifts[0] || 'evening',
      matchScore: 92,
      appliedAt: 'Just now',
      status: 'applied',
      salaryText: `₹${job.salaryAmount} ${job.salaryType === 'hourly' ? '/hr' : '/day'}`,
      shiftHoursText: job.shiftHoursText,
      notes: note || undefined,
    };

    setApplications(prev => [newApp, ...prev]);
    playSuccessSound();
    showToast(`Applied to ${job.brand} (${job.title})! Store manager notified.`);
  };

  const handleAddJob = (newJob: Job) => {
    setJobs(prev => [newJob, ...prev]);
    showToast(`New shift at ${newJob.brand} posted live across ${newJob.city}!`);
  };

  const handleRemoveJob = (jobId: string) => {
    setJobs(prev => prev.filter(j => j.id !== jobId));
    showToast('Listing removed from platform');
  };

  const handleToggleVerifyEmployer = (jobId: string) => {
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return { ...j, isVerifiedEmployer: !j.isVerifiedEmployer };
      }
      return j;
    }));
    showToast('Employer verification status updated');
  };

  const handleUpdateApplicationStatus = (appId: string, status: JobApplication['status']) => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        return { ...a, status };
      }
      return a;
    }));
    showToast(`Applicant status marked as: ${status.replace('_', ' ').toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col selection:bg-sky-500 selection:text-white font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="px-4 py-3 rounded-2xl bg-zinc-900/95 border border-sky-500/50 shadow-2xl text-xs font-semibold text-white flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onChangeRole={setCurrentRole}
        currentCity={currentCity}
        onChangeCity={setCurrentCity}
        currentLocality={currentLocality}
        onChangeLocality={setCurrentLocality}
        onOpenAIMatcher={() => setIsAIMatcherOpen(true)}
        onOpenDigitalPass={() => setIsDigitalPassOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        appliedCount={applications.length}
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
        authUser={authUser}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area: Responsive standard or realistic Mobile Container */}
      <main className={`flex-1 w-full ${isMobileFrame ? 'max-w-md mx-auto my-6 border border-white/20 rounded-[40px] shadow-2xl p-4 bg-zinc-950 overflow-hidden' : 'max-w-7xl mx-auto px-4 sm:px-6 py-6'}`}>
        {currentRole === 'seeker' && (
          <JobSeekerDashboard
            jobs={jobs}
            seekerProfile={seekerProfile}
            applications={applications}
            savedJobIds={savedJobIds}
            currentCity={currentCity}
            currentLocality={currentLocality}
            onChangeLocality={setCurrentLocality}
            onToggleSave={handleToggleSave}
            onQuickApply={(job) => handleApply(job)}
            onSelectJob={(job) => setSelectedJobForDetail(job)}
            onOpenAIMatcher={() => setIsAIMatcherOpen(true)}
            onOpenDigitalPass={() => setIsDigitalPassOpen(true)}
            authUser={authUser}
            onOpenLogin={() => setIsLoginOpen(true)}
          />
        )}

        {currentRole === 'employer' && (
          <EmployerDashboard
            jobs={jobs.filter(j => j.city === currentCity)}
            applications={applications}
            onOpenPostJob={() => setIsPostJobOpen(true)}
            onUpdateApplicationStatus={handleUpdateApplicationStatus}
            currentCity={currentCity}
          />
        )}

        {currentRole === 'admin' && (
          <AdminDashboard
            jobs={jobs.filter(j => j.city === currentCity)}
            onRemoveJob={handleRemoveJob}
            onToggleVerifyEmployer={handleToggleVerifyEmployer}
            currentCity={currentCity}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-zinc-950/80 border-t border-white/5 py-6 px-4 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white">Quick<span className="text-sky-400">Shift</span></span>
            <span>• Verified Part-Time Shifts for City Newcomers</span>
          </div>
          <p className="text-[11px] text-zinc-500">
            Active in Bengaluru, Mysuru, Hyderabad, Chennai & Mumbai. Instant walk-ins at Trends, KFC, Domino’s, Zudio & local stores.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <JobDetailModal
        job={selectedJobForDetail}
        seekerProfile={seekerProfile}
        hasApplied={selectedJobForDetail ? applications.some(a => a.jobId === selectedJobForDetail.id) : false}
        onClose={() => setSelectedJobForDetail(null)}
        onApply={(job, note) => {
          handleApply(job, note);
        }}
      />

      <AIJobMatcherModal
        isOpen={isAIMatcherOpen}
        onClose={() => setIsAIMatcherOpen(false)}
        jobs={jobs.filter(j => j.city === currentCity)}
        seekerProfile={seekerProfile}
        onSelectJob={(job) => {
          setSelectedJobForDetail(job);
        }}
      />

      <DigitalPassModal
        isOpen={isDigitalPassOpen}
        onClose={() => setIsDigitalPassOpen(false)}
        seekerProfile={seekerProfile}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={seekerProfile}
        onSaveProfile={(updated) => {
          setSeekerProfile(updated);
          setCurrentCity(updated.city);
          setCurrentLocality(updated.locality);
          showToast('Profile and preferences updated!');
        }}
      />

      <PostJobModal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
        onAddJob={handleAddJob}
        currentCity={currentCity}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
        defaultRole={currentRole}
      />
    </div>
  );
}
