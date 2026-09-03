import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Smartphone, 
  Mail, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  KeyRound, 
  RefreshCw, 
  UserCheck, 
  Building2, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Phone,
  User
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AuthUser, UserRole, IndianCity } from '../types';
import { playPopSound, playSuccessSound } from '../utils/audio';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: AuthUser) => void;
  defaultRole?: UserRole;
}

type AuthMethod = 'mobile' | 'email';
type MobileStep = 'enter-phone' | 'enter-otp';
type EmailMode = 'password' | 'otp';

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  defaultRole = 'seeker',
}: LoginModalProps) {
  const [method, setMethod] = useState<AuthMethod>('mobile');
  const [role, setRole] = useState<UserRole>(defaultRole === 'admin' ? 'seeker' : defaultRole);
  
  // Mobile states
  const [mobileNumber, setMobileNumber] = useState('9886012345');
  const [mobileStep, setMobileStep] = useState<MobileStep>('enter-phone');
  const [seekerName, setSeekerName] = useState('Vijay Kumar');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('4321');
  const [otpCountdown, setOtpCountdown] = useState(30);
  const [showSimulatedSms, setShowSimulatedSms] = useState(false);
  const [mobileError, setMobileError] = useState<string | null>(null);

  // Email states
  const [emailAddress, setEmailAddress] = useState('vijay.k@gmail.com');
  const [password, setPassword] = useState('Password@123');
  const [showPassword, setShowPassword] = useState(false);
  const [emailMode, setEmailMode] = useState<EmailMode>('password');
  const [emailOtpDigits, setEmailOtpDigits] = useState(['', '', '', '']);
  const [generatedEmailOtp, setGeneratedEmailOtp] = useState('5824');
  const [showSimulatedEmailToast, setShowSimulatedEmailToast] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  // OTP inputs refs
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const emailOtpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mobileStep === 'enter-otp' && otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [mobileStep, otpCountdown]);

  if (!isOpen) return null;

  // Handle Mobile Send OTP
  const handleSendMobileOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setMobileError(null);

    const cleaned = mobileNumber.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      setMobileError('Please enter a valid 10-digit Indian mobile number');
      playPopSound(300, 0.08);
      return;
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setMobileStep('enter-otp');
    setOtpDigits(['', '', '', '']);
    setOtpCountdown(30);
    setShowSimulatedSms(true);
    playPopSound(700, 0.05);

    // Focus first box
    setTimeout(() => {
      otpInputRefs.current[0]?.focus();
    }, 150);
  };

  // Handle OTP digit change
  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = val.slice(-1);
    setOtpDigits(newDigits);

    if (val && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleAutoFillMobileOtp = () => {
    const chars = generatedOtp.split('');
    setOtpDigits(chars);
    playPopSound(800, 0.04);
  };

  // Verify Mobile OTP
  const handleVerifyMobileOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setMobileError(null);
    const entered = otpDigits.join('');

    if (entered.length < 4) {
      setMobileError('Please enter the complete 4-digit code');
      playPopSound(300, 0.08);
      return;
    }

    if (entered !== generatedOtp && entered !== '4321') {
      setMobileError('Invalid OTP code. Please enter the correct code shown in the SMS alert');
      playPopSound(250, 0.1);
      return;
    }

    // Success!
    completeLogin({
      id: `user-${Date.now()}`,
      name: seekerName.trim() || 'QuickShift Member',
      loginMethod: 'mobile',
      phone: mobileNumber.replace(/\D/g, ''),
      role: role,
      isVerified: true,
      city: 'Bengaluru' as IndianCity,
      locality: 'Koramangala 5th Block',
      createdAt: new Date().toISOString(),
    });
  };

  // Handle Email Login
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);

    if (!emailAddress.includes('@') || !emailAddress.includes('.')) {
      setEmailError('Please enter a valid email address');
      playPopSound(300, 0.08);
      return;
    }

    if (emailMode === 'password') {
      if (password.length < 4) {
        setEmailError('Password must be at least 4 characters');
        playPopSound(300, 0.08);
        return;
      }

      // Name extraction
      const derivedName = emailAddress.split('@')[0]
        .replace(/[._]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

      completeLogin({
        id: `user-${Date.now()}`,
        name: seekerName || derivedName || 'QuickShift Member',
        loginMethod: 'email',
        email: emailAddress.trim(),
        role: role,
        isVerified: true,
        city: 'Bengaluru' as IndianCity,
        locality: 'Koramangala 5th Block',
        createdAt: new Date().toISOString(),
      });
    } else {
      // Email OTP check
      const entered = emailOtpDigits.join('');
      if (entered.length < 4) {
        setEmailError('Please enter the 4-digit code sent to your email');
        return;
      }
      if (entered !== generatedEmailOtp && entered !== '5824') {
        setEmailError('Invalid verification code');
        return;
      }

      completeLogin({
        id: `user-${Date.now()}`,
        name: seekerName || 'Email Verified User',
        loginMethod: 'email',
        email: emailAddress.trim(),
        role: role,
        isVerified: true,
        city: 'Bengaluru' as IndianCity,
        locality: 'Koramangala 5th Block',
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleSendEmailOtp = () => {
    if (!emailAddress.includes('@')) {
      setEmailError('Please enter a valid email address first');
      return;
    }
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedEmailOtp(code);
    setEmailMode('otp');
    setShowSimulatedEmailToast(true);
    playPopSound(700, 0.05);
  };

  const handleAutoFillEmailOtp = () => {
    setEmailOtpDigits(generatedEmailOtp.split(''));
    playPopSound(800, 0.04);
  };

  const completeLogin = (user: AuthUser) => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#818cf8', '#34d399', '#f472b6']
      });
    } catch {}

    playSuccessSound();
    onLogin(user);
    onClose();
  };

  // Demo 1-click accounts
  const handleQuickDemoLogin = (preset: 'seeker' | 'employer' | 'admin') => {
    playPopSound(600, 0.04);
    if (preset === 'seeker') {
      completeLogin({
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
      });
    } else if (preset === 'employer') {
      completeLogin({
        id: 'employer-priya',
        name: 'Priya Sharma (Trends HR)',
        loginMethod: 'email',
        email: 'priya.trends@reliance.com',
        phone: '9845098765',
        role: 'employer',
        isVerified: true,
        city: 'Bengaluru',
        locality: 'Indiranagar 100ft Rd',
        createdAt: '2026-02-15',
      });
    } else {
      completeLogin({
        id: 'admin-safety',
        name: 'Safety & Trust Admin',
        loginMethod: 'email',
        email: 'admin@quickshift.in',
        phone: '9800011223',
        role: 'admin',
        isVerified: true,
        city: 'Bengaluru',
        locality: 'MG Road Hub',
        createdAt: '2026-01-01',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-zinc-900 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-zinc-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-display text-white">
                Log In to QuickShift
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Instant Access
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Sign in with your Mobile Number (OTP) or Email Address
            </p>
          </div>
        </div>

        {/* Simulated SMS Alert Banner */}
        {showSimulatedSms && mobileStep === 'enter-otp' && (
          <div className="mb-5 p-3 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-zinc-900 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between shadow-lg animate-in slide-in-from-top-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                📩 <strong>SMS Alert:</strong> Your QuickShift OTP is <strong className="font-mono text-white text-sm bg-emerald-900/60 px-1.5 py-0.5 rounded">{generatedOtp}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={handleAutoFillMobileOtp}
              className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-[11px] transition-colors"
            >
              Auto-fill
            </button>
          </div>
        )}

        {/* Simulated Email Notification Toast */}
        {showSimulatedEmailToast && emailMode === 'otp' && (
          <div className="mb-5 p-3 rounded-2xl bg-gradient-to-r from-indigo-950/80 to-zinc-900 border border-indigo-500/40 text-indigo-200 text-xs flex items-center justify-between shadow-lg animate-in slide-in-from-top-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>
                📧 <strong>Inbox:</strong> Code sent to {emailAddress}: <strong className="font-mono text-white text-sm bg-indigo-900/60 px-1.5 py-0.5 rounded">{generatedEmailOtp}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={handleAutoFillEmailOtp}
              className="px-2.5 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-[11px] transition-colors"
            >
              Auto-fill
            </button>
          </div>
        )}

        {/* Choose Method: Mobile or Email */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-950 rounded-2xl border border-white/10 mb-5">
          <button
            type="button"
            onClick={() => {
              playPopSound(500, 0.04);
              setMethod('mobile');
              setMobileError(null);
            }}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              method === 'mobile'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobile (SMS OTP)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPopSound(500, 0.04);
              setMethod('email');
              setEmailError(null);
            }}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              method === 'email'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email Address</span>
          </button>
        </div>

        {/* Role Selector: Seeker vs Employer */}
        <div className="mb-5">
          <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
            Logging in as:
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                playPopSound(600, 0.04);
                setRole('seeker');
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                role === 'seeker'
                  ? 'bg-sky-500/15 border-sky-500/50 text-white ring-1 ring-sky-500/30'
                  : 'bg-zinc-950/60 border-white/10 text-zinc-400 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <UserCheck className={`w-4 h-4 ${role === 'seeker' ? 'text-sky-400' : 'text-zinc-500'}`} />
                <span className="font-bold text-xs">Job Seeker</span>
              </div>
              <p className="text-[10px] text-zinc-400">
                College students, newcomers looking for shifts
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                playPopSound(600, 0.04);
                setRole('employer');
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                role === 'employer'
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-white ring-1 ring-emerald-500/30'
                  : 'bg-zinc-950/60 border-white/10 text-zinc-400 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Building2 className={`w-4 h-4 ${role === 'employer' ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span className="font-bold text-xs">Store / Employer</span>
              </div>
              <p className="text-[10px] text-zinc-400">
                Trends, KFC, Domino’s, retail managers
              </p>
            </button>
          </div>
        </div>

        {/* METHOD 1: MOBILE NUMBER OTP FLOW */}
        {method === 'mobile' && (
          <div>
            {mobileStep === 'enter-phone' ? (
              <form onSubmit={handleSendMobileOtp} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1.5">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-500" />
                    <input
                      type="text"
                      value={seekerName}
                      onChange={(e) => setSeekerName(e.target.value)}
                      placeholder="e.g. Vijay Kumar"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-white/15 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1.5">
                    Mobile Number
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-950 border border-white/15 text-xs text-zinc-300 font-mono">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <div className="relative flex-1">
                      <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-500" />
                      <input
                        type="tel"
                        maxLength={10}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="10-digit mobile number"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-white/15 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-sky-500 transition-colors"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    We will send a 4-digit SMS OTP to verify your account
                  </p>
                </div>

                {mobileError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{mobileError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <span>Send OTP via SMS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyMobileOtp} className="space-y-4">
                <div className="p-3 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-sky-400" />
                    <span className="text-xs text-zinc-300">
                      Code sent to: <strong className="font-mono text-white">+91 {mobileNumber}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileStep('enter-phone')}
                    className="text-xs text-sky-400 hover:underline font-medium"
                  >
                    Change
                  </button>
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-2 text-center">
                    Enter 4-Digit Verification Code
                  </label>
                  <div className="flex items-center justify-center gap-3">
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { otpInputRefs.current[index] = el; }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-14 rounded-2xl bg-zinc-950 border-2 border-white/20 focus:border-sky-500 text-center text-xl font-bold font-mono text-white focus:outline-none transition-all focus:scale-105"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs px-1">
                  <button
                    type="button"
                    onClick={handleAutoFillMobileOtp}
                    className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-fill OTP ({generatedOtp})</span>
                  </button>

                  <div className="text-zinc-400">
                    {otpCountdown > 0 ? (
                      <span>Resend in {otpCountdown}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSendMobileOtp()}
                        className="text-sky-400 hover:underline font-semibold flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Resend Code</span>
                      </button>
                    )}
                  </div>
                </div>

                {mobileError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{mobileError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify & Sign In</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* METHOD 2: EMAIL FLOW */}
        {method === 'email' && (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-zinc-300 block mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-500" />
                <input
                  type="text"
                  value={seekerName}
                  onChange={(e) => setSeekerName(e.target.value)}
                  placeholder="e.g. Vijay Kumar"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-white/15 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-300 block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-500" />
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="name@gmail.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-white/15 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
            </div>

            {/* Email Mode Toggle: Password vs OTP */}
            <div className="flex items-center justify-between text-xs px-1">
              <span className="text-zinc-400">Authentication mode:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEmailMode('password')}
                  className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                    emailMode === 'password'
                      ? 'bg-zinc-800 text-sky-400 font-bold'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Password
                </button>
                <span className="text-zinc-600">•</span>
                <button
                  type="button"
                  onClick={handleSendEmailOtp}
                  className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                    emailMode === 'otp'
                      ? 'bg-zinc-800 text-sky-400 font-bold'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Email Code (OTP)
                </button>
              </div>
            </div>

            {emailMode === 'password' ? (
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-950 border border-white/15 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-2 text-center">
                  Enter 4-Digit Email Code
                </label>
                <div className="flex items-center justify-center gap-3">
                  {emailOtpDigits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { emailOtpInputRefs.current[index] = el; }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!/^\d*$/.test(val)) return;
                        const newDigits = [...emailOtpDigits];
                        newDigits[index] = val.slice(-1);
                        setEmailOtpDigits(newDigits);
                        if (val && index < 3) {
                          emailOtpInputRefs.current[index + 1]?.focus();
                        }
                      }}
                      className="w-12 h-14 rounded-2xl bg-zinc-950 border-2 border-white/20 focus:border-sky-500 text-center text-xl font-bold font-mono text-white focus:outline-none transition-all"
                    />
                  ))}
                </div>
                <div className="text-center mt-2">
                  <button
                    type="button"
                    onClick={handleAutoFillEmailOtp}
                    className="text-xs text-sky-400 hover:underline font-medium"
                  >
                    Auto-fill Email OTP ({generatedEmailOtp})
                  </button>
                </div>
              </div>
            )}

            {emailError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{emailError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sign In with Email</span>
            </button>
          </form>
        )}

        {/* Quick Demo Logins Footer */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Quick 1-Click Demo Accounts:
            </span>
            <span className="text-[10px] text-zinc-500">Test immediately</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-left">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('seeker')}
              className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800/90 border border-white/10 hover:border-sky-500/40 transition-all text-left group"
            >
              <div className="text-xs font-bold text-white group-hover:text-sky-300 truncate">
                Vijay Kumar
              </div>
              <div className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono">
                <span>📱 +91 98860</span>
              </div>
              <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-semibold">
                Job Seeker
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('employer')}
              className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800/90 border border-white/10 hover:border-emerald-500/40 transition-all text-left group"
            >
              <div className="text-xs font-bold text-white group-hover:text-emerald-300 truncate">
                Priya (Trends)
              </div>
              <div className="text-[10px] text-zinc-400 flex items-center gap-1 truncate font-mono">
                <span>✉️ reliance.com</span>
              </div>
              <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                Employer
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800/90 border border-white/10 hover:border-purple-500/40 transition-all text-left group"
            >
              <div className="text-xs font-bold text-white group-hover:text-purple-300 truncate">
                Admin
              </div>
              <div className="text-[10px] text-zinc-400 flex items-center gap-1 truncate font-mono">
                <span>🛡️ quickshift.in</span>
              </div>
              <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">
                Safety Admin
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
