import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]');
      setIsHovered(!!clickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision small core dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-sky-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovered ? 0 : 1,
          opacity: 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Smooth outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 border border-sky-400/60 mix-blend-screen"
        animate={{
          x: position.x,
          y: position.y,
          width: isHovered ? 52 : 28,
          height: isHovered ? 52 : 28,
          backgroundColor: isHovered ? 'rgba(56, 189, 248, 0.12)' : 'rgba(56, 189, 248, 0.02)',
          borderColor: isHovered ? 'rgba(56, 189, 248, 0.9)' : 'rgba(56, 189, 248, 0.45)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 220, mass: 0.2 }}
      />
    </>
  );
}
