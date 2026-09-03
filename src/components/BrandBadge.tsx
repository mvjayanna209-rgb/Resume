interface BrandBadgeProps {
  brand: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function BrandBadge({ brand, className = '', size = 'md' }: BrandBadgeProps) {
  const sizeMap = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-bold',
  };

  // Authentic styling inspired by real retail and QSR chains in India
  const getBrandDetails = (name: string) => {
    switch (name.toLowerCase()) {
      case 'trends':
        return {
          bg: 'bg-gradient-to-br from-red-600 to-red-800 text-white',
          border: 'border-red-500/30',
          text: 'TRENDS',
          short: 'TR',
        };
      case 'kfc':
        return {
          bg: 'bg-gradient-to-br from-red-700 to-rose-900 text-white font-black',
          border: 'border-red-500/40',
          text: 'KFC',
          short: 'KFC',
        };
      case "domino's":
      case 'dominos':
        return {
          bg: 'bg-gradient-to-br from-blue-700 to-indigo-900 text-white font-black',
          border: 'border-blue-400/40',
          text: "DOMINO'S",
          short: 'DOM',
        };
      case 'pizza hut':
        return {
          bg: 'bg-gradient-to-br from-red-600 to-amber-700 text-white font-extrabold',
          border: 'border-red-500/30',
          text: 'PIZZA HUT',
          short: 'PH',
        };
      case 'zudio':
        return {
          bg: 'bg-gradient-to-br from-zinc-900 to-black text-amber-400 font-black',
          border: 'border-amber-400/40',
          text: 'ZUDIO',
          short: 'ZUD',
        };
      case 'd-mart':
      case 'dmart':
        return {
          bg: 'bg-gradient-to-br from-emerald-600 to-green-800 text-white font-black',
          border: 'border-emerald-400/40',
          text: 'D-MART',
          short: 'DM',
        };
      case 'blinkit':
        return {
          bg: 'bg-gradient-to-br from-amber-400 to-yellow-500 text-zinc-950 font-black',
          border: 'border-amber-400/60',
          text: 'BLINKIT',
          short: 'BLK',
        };
      case 'zepto':
        return {
          bg: 'bg-gradient-to-br from-purple-600 to-indigo-900 text-white font-black',
          border: 'border-purple-400/40',
          text: 'ZEPTO',
          short: 'ZPT',
        };
      case 'chai point':
        return {
          bg: 'bg-gradient-to-br from-amber-700 to-amber-950 text-amber-200 font-extrabold',
          border: 'border-amber-500/30',
          text: 'CHAI PT',
          short: 'CP',
        };
      case 'pvr cinemas':
      case 'pvr':
        return {
          bg: 'bg-gradient-to-br from-yellow-500 to-amber-600 text-black font-black',
          border: 'border-yellow-400/50',
          text: 'PVR',
          short: 'PVR',
        };
      case 'decathlon':
        return {
          bg: 'bg-gradient-to-br from-sky-600 to-blue-800 text-white font-black',
          border: 'border-sky-400/40',
          text: 'DECATHLON',
          short: 'DEC',
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-zinc-800 to-zinc-900 text-sky-400 font-bold',
          border: 'border-zinc-700',
          text: name.slice(0, 4).toUpperCase(),
          short: name.slice(0, 2).toUpperCase(),
        };
    }
  };

  const details = getBrandDetails(brand);

  return (
    <div
      className={`rounded-xl ${details.bg} border ${details.border} shadow-md flex items-center justify-center tracking-wider shrink-0 select-none ${sizeMap[size]} ${className}`}
      title={brand}
    >
      <span className="font-mono">{size === 'sm' ? details.short : details.short}</span>
    </div>
  );
}
