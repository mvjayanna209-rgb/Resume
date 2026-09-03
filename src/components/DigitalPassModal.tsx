import { 
  X, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Languages, 
  Bike, 
  Download,
  Share2
} from 'lucide-react';
import { JobSeekerProfile } from '../types';
import { playPopSound } from '../utils/audio';

interface DigitalPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  seekerProfile: JobSeekerProfile;
}

export default function DigitalPassModal({
  isOpen,
  onClose,
  seekerProfile,
}: DigitalPassModalProps) {
  if (!isOpen) return null;

  const handleShare = () => {
    playPopSound(700, 0.05);
    if (navigator.share) {
      navigator.share({
        title: `${seekerProfile.name} - QuickShift Verified Job Seeker ID`,
        text: `Check out my verified part-time job seeker profile in ${seekerProfile.city} on QuickShift. Ready for immediate shifts.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('QuickShift Pass link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-zinc-900 border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl my-auto text-zinc-100 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Digital ID Card Container */}
        <div className="relative rounded-2xl bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 p-6 border border-sky-500/30 shadow-xl overflow-hidden mt-4">
          {/* Top Banner */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-1.5 text-left">
              <span className="font-display font-black text-lg text-white">Quick<span className="text-sky-400">Shift</span></span>
              <span className="text-[10px] font-mono uppercase bg-sky-950 border border-sky-600/40 text-sky-400 px-1.5 py-0.5 rounded">
                Verified Seeker
              </span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Profile Photo / Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 rounded-2xl p-1 bg-gradient-to-tr from-sky-400 to-indigo-600 mb-3">
              <div className="w-full h-full rounded-xl bg-zinc-900 flex items-center justify-center font-display font-black text-2xl text-white">
                {seekerProfile.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-zinc-950 border border-emerald-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
              </div>
            </div>

            <h3 className="font-bold text-lg text-white font-display">
              {seekerProfile.name}
            </h3>
            <p className="text-xs text-sky-400 font-mono mt-0.5">
              ID: QS-{seekerProfile.id.slice(-6).toUpperCase()}
            </p>

            <div className="flex items-center gap-1 text-xs text-zinc-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{seekerProfile.locality}, {seekerProfile.city}</span>
            </div>
          </div>

          {/* Details Table */}
          <div className="mt-5 space-y-2 text-xs text-left bg-zinc-950/60 p-3.5 rounded-xl border border-white/5">
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-zinc-500 font-mono">Status</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Ready to Join Today
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-zinc-500 font-mono">Languages</span>
              <span className="text-zinc-200 font-medium">
                {seekerProfile.spokenLanguages.join(', ')}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-zinc-500 font-mono">Transport / DL</span>
              <span className="text-zinc-200">
                {seekerProfile.hasTwoWheeler ? 'Bike + Driving License' : 'Walking / Metro Commute'}
              </span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-zinc-500 font-mono">Preferred Shifts</span>
              <span className="text-sky-300 font-medium capitalize">
                {seekerProfile.preferredShifts.join(', ')}
              </span>
            </div>
          </div>

          {/* Simulated QR Code for Instant Counter Scan */}
          <div className="mt-5 p-3 rounded-xl bg-white text-black flex flex-col items-center justify-center">
            <div className="flex items-center justify-center p-2 bg-zinc-100 rounded-lg">
              <QrCode className="w-28 h-28 text-zinc-900" />
            </div>
            <p className="text-[10px] font-mono text-zinc-700 mt-1 font-semibold">
              SCAN AT STORE COUNTER FOR INSTANT VERIFICATION
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold flex items-center justify-center gap-2 text-zinc-200 border border-white/10"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Pass</span>
          </button>

          <button
            onClick={() => {
              window.print();
            }}
            className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-semibold flex items-center justify-center gap-2 text-white shadow-lg shadow-sky-600/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save / Print</span>
          </button>
        </div>
      </div>
    </div>
  );
}
