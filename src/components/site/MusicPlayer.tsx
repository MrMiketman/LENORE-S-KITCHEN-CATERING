import { useEffect, useRef, useState } from "react";
import { ChevronDown, Music, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import song from "@/assets/i-want-you.mp3.asset.json";
import { cn } from "@/lib/utils";

const tracks = [
  { title: "I Want You", artist: "Daniel Davis", src: song.url },
];

const fmt = (s: number) =>
  !isFinite(s) ? "0:00" : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [vol, setVol] = useState(0.05);
  const t = tracks[i] ?? tracks[0]!;

  useEffect(() => {
    if (audio.current) audio.current.volume = vol;
  }, [vol]);

  useEffect(() => {
    const a = audio.current;
    if (a && playing) a.play().catch(() => setPlaying(false));
  }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  // Autoplay: browsers only allow sound once a visit has begun, so try straight
  // away and otherwise start the song on the visitor's first tap, click or key.
  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    a.volume = vol;
    let running = false;
    const stop = () => {
      window.removeEventListener("pointerdown", onFirst);
      window.removeEventListener("keydown", onFirst);
    };
    const begin = () => {
      a.play()
        .then(() => {
          running = true;
          stop();
          setPlaying(true);
          setStarted(true);
        })
        .catch(() => {});
    };
    function onFirst(e: Event) {
      if (running || wrap.current?.contains(e.target as Node)) return;
      begin();
    }
    begin();
    window.addEventListener("pointerdown", onFirst);
    window.addEventListener("keydown", onFirst);
    return stop;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    setStarted(true);
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else { a.pause(); setPlaying(false); }
  };
  const skip = (d: number) => setI((v) => (v + d + tracks.length) % tracks.length);

  const PlayBtn = ({ small }: { small?: boolean }) => (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className={cn(
        "relative grid shrink-0 place-items-center rounded-full bg-gold text-ink transition hover:brightness-110",
        small ? "size-9" : "size-11",
      )}
    >
      {!started && <span className="absolute inset-0 animate-ping rounded-full bg-gold/60" aria-hidden />}
      {playing ? <Pause className="relative size-4" /> : <Play className="relative size-4 translate-x-px" />}
    </button>
  );

  const Vinyl = () => (
    <div
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-full border border-ivory/20 bg-[radial-gradient(circle,var(--gold)_18%,var(--ink)_20%,var(--ink-2)_60%,var(--ink)_100%)]",
        playing && "animate-[spin_3s_linear_infinite]",
      )}
      aria-hidden
    >
      <span className="size-1.5 rounded-full bg-ink" />
    </div>
  );

  return (
    <div ref={wrap} className="fixed bottom-4 right-4 z-40 text-ivory">
      <audio
        ref={audio}
        src={t.src}
        preload="auto"
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        onEnded={() => (tracks.length > 1 ? skip(1) : setPlaying(false))}
      />
      {open ? (
        <div className="w-[19rem] rounded-2xl border border-ivory/10 bg-ink/95 p-4 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-3">
            <Vinyl />
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-base leading-tight">{t.title}</p>
              <p className="truncate text-xs text-taupe">{t.artist}</p>
            </div>
            {playing && (
              <div className="flex h-4 items-end gap-0.5" aria-hidden>
                {[0, 1, 2, 3].map((b) => (
                  <span key={b} className="w-0.5 animate-pulse rounded bg-gold" style={{ height: `${40 + ((b * 37) % 60)}%`, animationDelay: `${b * 150}ms` }} />
                ))}
              </div>
            )}
            <button type="button" onClick={() => setOpen(false)} aria-label="Collapse player" className="p-1 text-ivory/60 hover:text-ivory">
              <ChevronDown className="size-4" />
            </button>
          </div>

          <div className="mt-3">
            <input
              type="range" min={0} max={dur || 0} step={0.1} value={time}
              onChange={(e) => { if (audio.current) audio.current.currentTime = +e.target.value; }}
              aria-label="Seek" className="h-1 w-full cursor-pointer accent-[var(--gold)]"
            />
            <div className="mt-1 flex justify-between text-[0.65rem] tabular-nums text-ivory/60">
              <span>{fmt(time)}</span><span>{fmt(dur)}</span>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {tracks.length > 1 && (
                <button type="button" onClick={() => skip(-1)} aria-label="Previous track" className="p-1.5 text-ivory/80 hover:text-ivory"><SkipBack className="size-4" /></button>
              )}
              <PlayBtn />
              {tracks.length > 1 && (
                <button type="button" onClick={() => skip(1)} aria-label="Next track" className="p-1.5 text-ivory/80 hover:text-ivory"><SkipForward className="size-4" /></button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setVol((v) => (v ? 0 : 0.05))} aria-label={vol ? "Mute" : "Unmute"} className="text-ivory/70 hover:text-ivory">
                {vol ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
              </button>
              <input type="range" min={0} max={1} step={0.01} value={vol} onChange={(e) => setVol(+e.target.value)} aria-label="Volume" className="h-1 w-20 cursor-pointer accent-[var(--gold)]" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-full border border-ivory/10 bg-ink/95 py-1.5 pl-1.5 pr-3 shadow-2xl backdrop-blur">
          <PlayBtn small />
          <button type="button" onClick={() => setOpen(true)} aria-label="Expand player" className="flex max-w-40 items-center gap-2 text-xs">
            <Music className={cn("size-3.5 text-gold", playing && "animate-pulse")} />
            <span className="truncate">{t.title}</span>
          </button>
        </div>
      )}
    </div>
  );
}
