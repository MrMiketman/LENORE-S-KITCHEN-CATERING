import { useEffect, useRef, useState } from "react";
import audioAsset from "@/assets/06_i_want_you.mp3.asset.json";

/** Starting level: 10% of full volume, by request. */
const DEFAULT_VOLUME = 0.1;

/**
 * Small fixed-corner music player. Autoplays as soon as the browser allows;
 * if autoplay is blocked until a visitor interaction, it starts on the first
 * click, tap, or keypress. Mounted once in the root route so the track keeps
 * playing across page navigation. The visitor can adjust the level with the
 * slider; it always opens at 10%.
 */
export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [muted, setMuted] = useState(false);

  // Apply the chosen level (and the default on first render).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

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

  const onVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value);
    setVolume(Number.isFinite(next) ? next : DEFAULT_VOLUME);
    if (next > 0) setMuted(false);
  };

  const percent = Math.round((muted ? 0 : volume) * 100);

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
      <div className="flex shrink-0 items-center gap-2 border-l border-gold/30 pl-3">
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute music" : "Mute music"}
          aria-pressed={muted}
          className="flex h-6 w-6 shrink-0 items-center justify-center text-ivory/70 transition-colors hover:text-gold"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
            <path
              d="M4 9v6h3.5L12 19V5L7.5 9H4z"
              className="fill-current"
            />
            {muted ? (
              <path
                d="M16 9.5l5 5M21 9.5l-5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M15.5 8.5a4.5 4.5 0 0 1 0 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={onVolumeChange}
          onPointerDown={() => setMuted(false)}
          aria-label="Music volume"
          aria-valuetext={`${percent} percent`}
          title={`Volume: ${percent}%`}
          className="h-4 w-16 shrink-0 cursor-pointer accent-gold"
        />
      </div>
    </div>
  );
}
