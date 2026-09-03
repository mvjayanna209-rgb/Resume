import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  PlusCircle, 
  MapPin, 
  Banknote, 
  Clock, 
  Users, 
  ShieldCheck, 
  Zap,
  Check 
} from 'lucide-react';
import { Job, JobCategory, ShiftTiming, SalaryType, IndianCity } from '../types';
import { CITIES_CONFIG } from '../data/mockJobs';
import { playSuccessSound } from '../utils/audio';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (newJob: Job) => void;
  currentCity: IndianCity;
}

const AVAILABLE_LANGUAGES = ['Kannada', 'English', 'Hindi', 'Tamil', 'Telugu'];

export default function PostJobModal({
  isOpen,
  onClose,
  onAddJob,
  currentCity,
}: PostJobModalProps) {
  const [brand, setBrand] = useState('Trends');
  const [customBrand, setCustomBrand] = useState('');
  const [title, setTitle] = useState('Customer Service & Trial Room Associate');
  const [category, setCategory] = useState<JobCategory>('retail');
  const [locality, setLocality] = useState(CITIES_CONFIG[currentCity]?.localities[0] || 'Koramangala 5th Block');
  const [address, setAddress] = useState('100 Feet Road, Near Metro Pillar 84');
  const [salaryType, setSalaryType] = useState<SalaryType>('hourly');
  const [salaryAmount, setSalaryAmount] = useState(150);
  const [shiftTiming, setShiftTiming] = useState<ShiftTiming>('evening');
  const [shiftHoursText, setShiftHoursText] = useState('5:00 PM – 10:00 PM (5 hrs)');
  const [instantHiring, setInstantHiring] = useState(true);
  const [dailyCashPayout, setDailyCashPayout] = useState(false);
  const [vacancies, setVacancies] = useState(4);
  const [languagesRequired, setLanguagesRequired] = useState<string[]>(['Kannada', 'English', 'Hindi']);
  const [employerName, setEmployerName] = useState('Ramesh Gowda (Store Manager)');
  const [employerPhone, setEmployerPhone] = useState('+91 98450 11223');
  const [employerWhatsApp, setEmployerWhatsApp] = useState('919845011223');
  const [description, setDescription] = useState('Assist shoppers on the floor, manage trial room queues, fold and arrange garments. Ideal for students and newcomers needing evening income.');
  const [walkInInstructions, setWalkInInstructions] = useState('Walk directly to store billing counter between 2 PM to 5 PM with Aadhaar card copy.');

  if (!isOpen) return null;

  const toggleLang = (lang: string) => {
    if (languagesRequired.includes(lang)) {
      setLanguagesRequired(languagesRequired.filter(l => l !== lang));
    } else {
      setLanguagesRequired([...languagesRequired, lang]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalBrand = brand === 'Other' ? (customBrand || 'Retail Store') : brand;

    const newJob: Job = {
      id: `job-${Date.now()}`,
      title,
      company: `${finalBrand} India Pvt. Ltd.`,
      brand: finalBrand,
      category,
      city: currentCity,
      locality,
      address,
      distanceKm: Number((Math.random() * 2 + 0.5).toFixed(1)),
      salaryType,
      salaryAmount: Number(salaryAmount),
      shiftTiming,
      shiftHoursText,
      instantHiring,
      dailyCashPayout,
      vacancies: Number(vacancies),
      languagesRequired,
      requirements: ['Punctual & polite customer service', 'Age 18+', 'Basic communication skills'],
      perks: ['Free meal/snacks on shift', 'Overtime incentive', 'Flexible schedule'],
      employerName,
      employerPhone,
      employerWhatsApp: employerWhatsApp.replace(/\D/g, ''),
      isVerifiedEmployer: true,
      isFeatured: true,
      postedTime: 'Just now',
      description,
      status: 'active',
      walkInInstructions,
    };

    onAddJob(newJob);
    playSuccessSound();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-zinc-900 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-zinc-100 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              Post a Part-Time Shift
            </h2>
            <p className="text-xs text-zinc-400">
              Connect with nearby candidates in {currentCity} within 60 seconds
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Brand & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-400 font-mono block mb-1">Company / Store Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-sky-500"
              >
                <option value="Trends">Trends (Reliance Retail)</option>
                <option value="KFC">KFC (Devyani / Yum!)</option>
                <option value="Domino's">Domino's Pizza (Jubilant)</option>
                <option value="Pizza Hut">Pizza Hut (Sapphire Foods)</option>
                <option value="Zudio">Zudio (Tata Trent)</option>
                <option value="D-Mart">D-Mart (Avenue Supermarts)</option>
                <option value="Blinkit">Blinkit Dark Store</option>
                <option value="Zepto">Zepto Delivery Hub</option>
                <option value="Chai Point">Chai Point Cafe</option>
                <option value="PVR Cinemas">PVR INOX Cinemas</option>
                <option value="Decathlon">Decathlon Sports</option>
                <option value="Other">Custom Local Store / Cafe</option>
              </select>
              {brand === 'Other' && (
                <input
                  type="text"
                  placeholder="Enter Store Name"
                  value={customBrand}
                  onChange={(e) => setCustomBrand(e.target.value)}
                  className="mt-2 w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-white/10 text-white"
                />
              )}
            </div>

            <div>
              <label className="text-zinc-400 font-mono block mb-1">Shift Job Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Evening Store Associate / Kitchen Crew"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Category & Locality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-400 font-mono block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as JobCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-sky-500"
              >
                <option value="restaurant">Restaurant & Food Outlet</option>
                <option value="retail">Retail & Fashion Store</option>
                <option value="delivery">Delivery & Courier</option>
                <option value="supermarket">Supermarket & Grocery</option>
                <option value="mall">Mall & Multiplex</option>
                <option value="warehouse">Warehouse & Packing</option>
                <option value="event">Event & Catering</option>
                <option value="security">Security & Front Desk</option>
                <option value="customer_support">Customer Support / Billing</option>
              </select>
            </div>

            <div>
              <label className="text-zinc-400 font-mono block mb-1">Locality in {currentCity}</label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-sky-500"
              >
                {CITIES_CONFIG[currentCity]?.localities.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Full Address */}
          <div>
            <label className="text-zinc-400 font-mono block mb-1">Exact Store Address / Landmark</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Near Jyoti Nivas College, 5th Block Koramangala"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Pay & Shift Timing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-zinc-400 font-mono block mb-1">Pay Rate (₹)</label>
              <div className="flex gap-1.5">
                <input
                  type="number"
                  required
                  min={80}
                  value={salaryAmount}
                  onChange={(e) => setSalaryAmount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                />
                <select
                  value={salaryType}
                  onChange={(e) => setSalaryType(e.target.value as SalaryType)}
                  className="px-2 rounded-xl bg-zinc-950 border border-white/10 text-white"
                >
                  <option value="hourly">/hr</option>
                  <option value="daily">/day</option>
                  <option value="monthly">/mo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-zinc-400 font-mono block mb-1">Shift Slot</label>
              <select
                value={shiftTiming}
                onChange={(e) => setShiftTiming(e.target.value as ShiftTiming)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-sky-500"
              >
                <option value="morning">Morning Shift</option>
                <option value="afternoon">Afternoon Shift</option>
                <option value="evening">Evening Shift</option>
                <option value="night">Night Shift</option>
                <option value="weekend">Weekend Only</option>
              </select>
            </div>

            <div>
              <label className="text-zinc-400 font-mono block mb-1">Shift Hours Text</label>
              <input
                type="text"
                value={shiftHoursText}
                onChange={(e) => setShiftHoursText(e.target.value)}
                placeholder="5:00 PM – 10:00 PM"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white"
              />
            </div>
          </div>

          {/* Quick Toggles: Daily Cash & Instant Walk-in */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-zinc-950 border border-white/10">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="font-semibold text-white">Instant Walk-in Hiring</span>
                <p className="text-[11px] text-zinc-400">Candidates can walk into store today</p>
              </div>
              <input
                type="checkbox"
                checked={instantHiring}
                onChange={(e) => setInstantHiring(e.target.checked)}
                className="w-4 h-4 rounded text-sky-500 bg-zinc-800"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="font-semibold text-emerald-400">Daily Cash Payout Available</span>
                <p className="text-[11px] text-zinc-400">High response rate from newcomers</p>
              </div>
              <input
                type="checkbox"
                checked={dailyCashPayout}
                onChange={(e) => setDailyCashPayout(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-500 bg-zinc-800"
              />
            </label>
          </div>

          {/* Spoken Languages Required */}
          <div>
            <label className="text-zinc-400 font-mono block mb-1.5">Languages Required for this shift:</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_LANGUAGES.map(lang => {
                const active = languagesRequired.includes(lang);
                return (
                  <button
                    type="button"
                    key={lang}
                    onClick={() => toggleLang(lang)}
                    className={`px-3 py-1 rounded-xl border text-xs font-semibold flex items-center gap-1.5 ${
                      active
                        ? 'bg-sky-500/20 border-sky-500/50 text-sky-300'
                        : 'bg-zinc-950 border-white/10 text-zinc-400'
                    }`}
                  >
                    {active && <Check className="w-3 h-3 text-sky-400" />}
                    <span>{lang}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-400 font-mono block mb-1">Manager / Recruiter Name</label>
              <input
                type="text"
                required
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono block mb-1">WhatsApp Number (with 91)</label>
              <input
                type="text"
                required
                value={employerWhatsApp}
                onChange={(e) => setEmployerWhatsApp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white"
              />
            </div>
          </div>

          {/* Walk-in note */}
          <div>
            <label className="text-zinc-400 font-mono block mb-1">Walk-in Directions / Gate Instructions</label>
            <input
              type="text"
              value={walkInInstructions}
              onChange={(e) => setWalkInInstructions(e.target.value)}
              placeholder="e.g. Ask for Store Manager at counter between 3 PM to 6 PM with Aadhaar"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white"
            />
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
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Shift Live</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
