import { useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import { Camera, Sparkles, Upload, User } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playPopSound, playSuccessSound } from '../utils/audio';

interface ProfilePhotoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  rounded?: 'full' | '2xl' | '3xl';
  showStatus?: boolean;
  interactive?: boolean;
  borderGlow?: boolean;
}

export default function ProfilePhoto({
  size = 'lg',
  className = '',
  rounded = '2xl',
  showStatus = true,
  interactive = true,
  borderGlow = true,
}: ProfilePhotoProps) {
  const [imgSrc, setImgSrc] = useState<string>('/image.jpg');
  const [isHovered, setIsHovered] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check localStorage for any cached custom photo upload
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mvj_custom_profile_photo');
      if (saved) {
        setImgSrc(saved);
        setLoadFailed(false);
      }
    } catch {
      // Ignore local storage errors
    }
  }, []);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
    hero: 'w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60',
  };

  const roundedClasses = {
    full: 'rounded-full',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setImgSrc(base64);
        setLoadFailed(false);
        playSuccessSound();
        try {
          localStorage.setItem('mvj_custom_profile_photo', base64);
        } catch {
          // localStorage full or restricted
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = (e: MouseEvent) => {
    e.stopPropagation();
    playPopSound(600, 0.04);
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hidden file input for direct photo updating */}
      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileUpload} 
      />

      {/* Decorative gradient border aura */}
      <div 
        className={`relative p-1 ${roundedClasses[rounded]} ${
          borderGlow 
            ? 'bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-500 shadow-2xl shadow-sky-500/25' 
            : 'border border-white/20'
        }`}
      >
        <div 
          className={`relative overflow-hidden bg-zinc-950 ${sizeClasses[size]} ${roundedClasses[rounded]}`}
        >
          {!loadFailed ? (
            <img
              src={imgSrc}
              alt="MV Jayanna — Software Engineer"
              referrerPolicy="no-referrer"
              onError={() => {
                // If /image.jpg fails, check fallback
                setLoadFailed(true);
              }}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            /* Fallback Stylized Portrait representing MV Jayanna (Dark Suit, White Shirt, Tie, Beard) */
            <div className="w-full h-full bg-gradient-to-b from-zinc-800 to-zinc-950 flex flex-col items-center justify-end p-2 relative">
              <svg viewBox="0 0 100 110" className="w-full h-full text-zinc-300">
                {/* Background glow */}
                <circle cx="50" cy="40" r="30" fill="rgba(56, 189, 248, 0.15)" />
                {/* Hair */}
                <path d="M 30 35 C 30 15, 70 15, 70 35 C 74 38, 72 45, 68 45 C 65 30, 35 30, 32 45 C 28 45, 26 38, 30 35 Z" fill="#18181b" />
                {/* Face & Ears */}
                <path d="M 33 38 C 33 55, 67 55, 67 38 C 70 42, 68 48, 65 48 C 65 58, 35 58, 35 48 C 32 48, 30 42, 33 38 Z" fill="#d4a373" />
                {/* Beard and Mustache */}
                <path d="M 35 46 C 42 50, 58 50, 65 46 C 65 59, 58 64, 50 64 C 42 64, 35 59, 35 46 Z" fill="#1c1917" />
                <path d="M 43 47 C 47 45, 53 45, 57 47 C 55 49, 45 49, 43 47 Z" fill="#09090b" />
                {/* White Collared Shirt */}
                <polygon points="50,60 38,72 42,85 50,88 58,85 62,72" fill="#ffffff" />
                {/* Black Tie */}
                <polygon points="48,68 52,68 53,95 50,105 47,95" fill="#09090b" />
                {/* Suit Blazer / Jacket */}
                <path d="M 20 110 L 25 72 L 38 72 L 46 88 L 46 110 Z" fill="#09090b" stroke="#27272a" strokeWidth="0.5" />
                <path d="M 80 110 L 75 72 L 62 72 L 54 88 L 54 110 Z" fill="#09090b" stroke="#27272a" strokeWidth="0.5" />
              </svg>

              {/* Monogram tag */}
              <div className="absolute bottom-1 px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[9px] font-mono text-sky-400">
                MV JAYANNA
              </div>
            </div>
          )}

          {/* Interactive photo replacement overlay on hover */}
          {interactive && isHovered && (
            <div 
              onClick={triggerUpload}
              className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center cursor-pointer transition-all duration-200 text-white"
              title="Click to change or upload photo"
            >
              <Camera className="w-5 h-5 text-sky-400 mb-1 animate-bounce" />
              <span className="text-[10px] font-mono tracking-wider text-zinc-300">
                Update Photo
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Online / Available Status Beacon */}
      {showStatus && (
        <div 
          className="absolute -bottom-1 -right-1 flex items-center justify-center p-1 rounded-full bg-zinc-950 border border-white/20 shadow-lg"
          title="Status: Available for Software Engineer roles"
        >
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-zinc-950"></span>
          </span>
        </div>
      )}
    </div>
  );
}
