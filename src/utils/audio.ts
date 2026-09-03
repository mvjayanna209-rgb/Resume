// Micro-interaction sound synthesizer using Web Audio API

let audioCtx: AudioContext | null = null;
let soundEnabled = false;

export const toggleSound = (enabled?: boolean) => {
  soundEnabled = enabled !== undefined ? enabled : !soundEnabled;
  return soundEnabled;
};

export const isSoundEnabled = () => soundEnabled;

export const playPopSound = (freq = 600, duration = 0.04) => {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Graceful fallback
  }
};

export const playSuccessSound = () => {
  if (!soundEnabled) return;
  setTimeout(() => playPopSound(520, 0.08), 0);
  setTimeout(() => playPopSound(660, 0.09), 90);
  setTimeout(() => playPopSound(880, 0.12), 190);
};
