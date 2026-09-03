import { useState } from 'react';
import { 
  Zap, 
  MapPin, 
  Navigation, 
  Sparkles, 
  QrCode, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Monitor, 
  User, 
  Briefcase, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { UserRole, IndianCity } from '../types';
import { CITIES_CONFIG } from '../data/mockJobs';
import { playPopSound, toggleSound, isSoundEnabled } from '../utils/audio';

interface NavbarProps {
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  currentCity: IndianCity;
  onChangeCity: (city: IndianCity) => void;
  currentLocality: string;
  onChangeLocality: (locality: string) => void;
  onOpenAIMatcher: () => void;
  onOpenDigitalPass: () => void;
  onOpenProfile: () => void;
  appliedCount: number;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
}

export default function Navbar({
  currentRole,
  onChangeRole,
  currentCity,
  onChangeCity,
  currentLocality,
  onChangeLocality,
  onOpenAIMatcher,
  onOpenDigitalPass,
  onOpenProfile,
  appliedCount,
  isMobileFrame,
  onToggleMobileFrame,
}: NavbarProps) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
    if (nextState) playPopSound(700, 0.05);
  };

  const handleRoleClick = (role: UserRole) => {
    playPopSound(600, 0.04);
    onChangeRole(role);
  };

  const handleCitySelect = (city: IndianCity) => {
    playPopSound(550, 0.04);
    onChangeCity(city);
    const firstLocality = CITIES_CONFIG[city]?.localities[0] || '';
    onChangeLocality(firstLocality);
    setShowCityDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => handleRoleClick('seeker')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl text-white tracking-tight">
                  Quick<span className="text-sky-400">Shift</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-950 border border-sky-500/30 text-sky-300 font-semibold uppercase">
                  Part-Time
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono hidden md:inline">
                Instant Walk-in Shifts for Newcomers
              </span>
            </div>
          </div>

          {/* City & Locality Selector */}
          <div className="relative">
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{currentCity}</span>
              <ChevronDown className="w-3 h-3 text-zinc-500" />
            </button>

            {showCityDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-2xl bg-zinc-900 border border-white/15 p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-[10px] font-mono uppercase text-zinc-500 px-2 py-1">
                  Select Active City
                </div>
                {(Object.keys(CITIES_CONFIG) as IndianCity[]).map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between ${
                      city === currentCity
                        ? 'bg-sky-500/20 text-sky-300 font-bold'
                        : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <span>{city}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {CITIES_CONFIG[city].state}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Role Switcher Tabs */}
        <div className="hidden lg:flex items-center bg-zinc-900/90 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => handleRoleClick('seeker')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentRole === 'seeker'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Job Seeker</span>
            {appliedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-zinc-950 font-mono text-[10px] flex items-center justify-center font-bold">
                {appliedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleRoleClick('employer')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentRole === 'employer'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Employer Hub</span>
          </button>

          <button
            onClick={() => handleRoleClick('admin')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentRole === 'admin'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin & Safety</span>
          </button>
        </div>

        {/* Right Utility Buttons */}
        <div className="flex items-center gap-2">
          {/* AI Matcher Trigger */}
          <button
            onClick={onOpenAIMatcher}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500/20 to-purple-500/20 hover:from-sky-500/30 hover:to-purple-500/30 border border-sky-500/30 text-sky-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            title="Get AI Job Recommendations based on your free hours"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span className="hidden sm:inline">AI Shift Match</span>
          </button>

          {/* QuickShift Pass */}
          <button
            onClick={onOpenDigitalPass}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="View Your Digital ID Card for Store Walk-in"
          >
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Worker Pass</span>
          </button>

          {/* Profile Edit */}
          <button
            onClick={onOpenProfile}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white transition-colors"
            title="Profile & Preferences"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white transition-colors"
            title={soundOn ? 'Sound FX On' : 'Sound FX Muted'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mobile Preview Frame Toggle */}
          <button
            onClick={onToggleMobileFrame}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white transition-colors hidden sm:flex"
            title={isMobileFrame ? 'Switch to Full Web View' : 'Preview as Mobile Phone App'}
          >
            {isMobileFrame ? <Monitor className="w-4 h-4 text-sky-400" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Role Switcher Bar */}
      <div className="flex lg:hidden items-center justify-between bg-zinc-900/90 p-1 rounded-xl border border-white/10 mt-2.5">
        <button
          onClick={() => handleRoleClick('seeker')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1 ${
            currentRole === 'seeker'
              ? 'bg-sky-500 text-white'
              : 'text-zinc-400'
          }`}
        >
          <span>Job Seeker</span>
          {appliedCount > 0 && (
            <span className="w-3.5 h-3.5 rounded-full bg-white text-zinc-950 font-mono text-[9px] flex items-center justify-center font-bold">
              {appliedCount}
            </span>
          )}
        </button>

        <button
          onClick={() => handleRoleClick('employer')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
            currentRole === 'employer'
              ? 'bg-emerald-500 text-white'
              : 'text-zinc-400'
          }`}
        >
          Employer
        </button>

        <button
          onClick={() => handleRoleClick('admin')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
            currentRole === 'admin'
              ? 'bg-purple-600 text-white'
              : 'text-zinc-400'
          }`}
        >
          Admin
        </button>
      </div>
    </header>
  );
}
