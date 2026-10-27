import { useEffect, useRef, useState } from "react";
import audioAsset from "@/assets/06_i_want_you.mp3.asset.json";

/**
 * Small fixed-corner music player. Autoplays as soon as the browser allows;
 * if autoplay is blocked until a visitor interaction, it starts on the first
 * click, tap, or keypress. Mounted once in the root route so the track keeps
 * playing across page navigation.
 */
export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const attempt = () => {
      const p = audio.play();
      if (p) p.then(() => setPlaying(true)).catch(() => {});
    };

    // Try immediately; if the browser blocks it, wait for the first
    // interaction gesture (pointerdown / keydown / touchend / click).
    attempt();
    const events = ["pointerdown", "keydown", "touchend", "click"] as const;
    const armed: (() => void)[] = [];
    const onGesture = () => {
      armed.forEach((off) => off());
      if (audio.paused) attempt();
    };
    for (const evt of events) {
      const off = () => window.removeEventListener(evt, onGesture);
      window.addEventListener(evt, onGesture, { once: true, passive: true });
      armed.push(off);
    }
    return () => armed.forEach((off) => off());
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 border border-gold/60 bg-overlay/90 py-2 pl-3 pr-4 text-ivory shadow-lg backdrop-blur-sm">
      <audio
        ref={audioRef}
        src={audioAsset.url}
        preload="auto"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold text-ivory transition-colors hover:bg-gold/20"
      >
        {playing ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-4 w-4 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <div className="leading-tight">
        <p className="eyebrow text-gold">Now playing</p>
        <p className="text-sm">I Want You</p>
      </div>
    </div>
  );
}
