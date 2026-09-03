import React, { useState } from 'react';
import { 
  X, 
  User, 
  MapPin, 
  Languages, 
  Clock, 
  Check, 
  Upload, 
  Save, 
  FileText 
} from 'lucide-react';
import { JobSeekerProfile, IndianCity, ShiftTiming } from '../types';
import { CITIES_CONFIG } from '../data/mockJobs';
import { playSuccessSound } from '../utils/audio';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: JobSeekerProfile;
  onSaveProfile: (updated: JobSeekerProfile) => void;
}

const AVAILABLE_LANGUAGES = ['Kannada', 'English', 'Hindi', 'Tamil', 'Telugu'];
const AVAILABLE_SHIFTS: { id: ShiftTiming; label: string }[] = [
  { id: 'morning', label: 'Morning (6 AM – 12 PM)' },
  { id: 'afternoon', label: 'Afternoon (12 PM – 5 PM)' },
  { id: 'evening', label: 'Evening (5 PM – 10 PM)' },
  { id: 'night', label: 'Night (9 PM – 2 AM)' },
  { id: 'weekend', label: 'Weekend Only' },
];

export default function ProfileModal({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}: ProfileModalProps) {
  const [formData, setFormData] = useState<JobSeekerProfile>(profile);
  const [resumeUploaded, setResumeUploaded] = useState(!!profile.resumeFileName);

  if (!isOpen) return null;

  const handleCityChange = (city: IndianCity) => {
    const firstLocality = CITIES_CONFIG[city]?.localities[0] || '';
    setFormData({
      ...formData,
      city,
      locality: firstLocality,
    });
  };

  const toggleLanguage = (lang: string) => {
    const exists = formData.spokenLanguages.includes(lang);
    setFormData({
      ...formData,
      spokenLanguages: exists
        ? formData.spokenLanguages.filter(l => l !== lang)
        : [...formData.spokenLanguages, lang],
    });
  };

  const toggleShift = (shift: ShiftTiming) => {
    const exists = formData.preferredShifts.includes(shift);
    setFormData({
      ...formData,
      preferredShifts: exists
        ? formData.preferredShifts.filter(s => s !== shift)
        : [...formData.preferredShifts, shift],
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        resumeFileName: file.name,
      });
      setResumeUploaded(true);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    playSuccessSound();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-zinc-900 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-zinc-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              Job Seeker Profile
            </h2>
            <p className="text-xs text-zinc-400">
              Customize your locality, languages, and shift availability
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-400 font-mono block mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono block mb-1">WhatsApp / Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* City & Locality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-400 font-mono block mb-1">Current City</label>
              <select
                value={formData.city}
                onChange={(e) => handleCityChange(e.target.value as IndianCity)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-sky-500"
              >
                {Object.keys(CITIES_CONFIG).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-zinc-400 font-mono block mb-1">Locality / Area</label>
              <select
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-sky-500"
              >
                {CITIES_CONFIG[formData.city]?.localities.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Languages Spoken (Crucial for Indian city customer service) */}
          <div>
            <label className="text-zinc-400 font-mono block mb-2">
              Languages You Can Speak with Customers:
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_LANGUAGES.map(lang => {
                const isSelected = formData.spokenLanguages.includes(lang);
                return (
                  <button
                    type="button"
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className={`px-3 py-1.5 rounded-xl border transition-colors flex items-center gap-1.5 font-medium ${
                      isSelected
                        ? 'bg-sky-500/20 border-sky-500/50 text-sky-300'
                        : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-sky-400" />}
                    <span>{lang}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preferred Shifts */}
          <div>
            <label className="text-zinc-400 font-mono block mb-2">
              Preferred Shift Timings:
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SHIFTS.map(shift => {
                const isSelected = formData.preferredShifts.includes(shift.id);
                return (
                  <button
                    type="button"
                    key={shift.id}
                    onClick={() => toggleShift(shift.id)}
                    className={`px-3 py-1.5 rounded-xl border transition-colors flex items-center gap-1.5 font-medium ${
                      isSelected
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                        : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-indigo-400" />}
                    <span>{shift.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Transport / DL Status */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-zinc-200">Own 2-Wheeler / Driving License</p>
              <p className="text-[11px] text-zinc-500">Qualifies you for higher daily delivery & dark store gigs</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.hasTwoWheeler}
                onChange={(e) => setFormData({ ...formData, hasTwoWheeler: e.target.checked, hasDrivingLicense: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Bio for Employers */}
          <div>
            <label className="text-zinc-400 font-mono block mb-1">
              Short Introduction / Status for Employers:
            </label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-sky-500 resize-none"
            />
          </div>

          {/* Resume Upload Box */}
          <div>
            <label className="text-zinc-400 font-mono block mb-1">
              Resume / Aadhaar Summary (Optional):
            </label>
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-dashed border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" />
                <span className="text-zinc-300">
                  {formData.resumeFileName || 'Upload 1-page CV or Aadhaar copy'}
                </span>
              </div>
              <label className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 cursor-pointer text-xs font-semibold">
                <span>Browse</span>
                <input type="file" accept=".pdf,.doc,.docx,image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
