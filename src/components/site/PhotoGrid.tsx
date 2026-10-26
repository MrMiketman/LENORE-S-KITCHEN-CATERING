import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type Photo = { src: string; alt: string };

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <ul className="columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-4">
        {photos.map((p, i) => (
          <li key={p.src} className="mb-3 break-inside-avoid md:mb-4">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden bg-muted"
              aria-label={`Open photo ${i + 1} of ${photos.length}`}
            >
              <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="img-zoom block w-full" />
            </button>
          </li>
        ))}
      </ul>
      {index !== null && <Lightbox photos={photos} index={index} setIndex={setIndex} />}
    </>
  );
}

function Lightbox({
  photos,
  index,
  setIndex,
}: {
  photos: Photo[];
  index: number;
  setIndex: (i: number | null) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const n = photos.length;
  const go = useCallback((d: number) => setIndex((index + d + n) % n), [index, n, setIndex]);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      prevFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, setIndex]);

  const p = photos[index];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${n}`}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-overlay/95 animate-in fade-in duration-300"
      onClick={(e) => e.target === e.currentTarget && setIndex(null)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <img key={p.src} src={p.src} alt={p.alt} className="max-h-[82vh] max-w-[92vw] object-contain animate-in fade-in duration-500" />
      <p className="eyebrow absolute bottom-6 left-1/2 -translate-x-1/2 text-taupe">
        {index + 1} / {n}
      </p>
      <button ref={closeRef} type="button" onClick={() => setIndex(null)} aria-label="Close photo" className="absolute right-4 top-4 p-3 text-ivory hover:text-gold">
        <X className="size-7" />
      </button>
      <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-ivory hover:text-gold md:left-6">
        <ChevronLeft className="size-9" />
      </button>
      <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-ivory hover:text-gold md:right-6">
        <ChevronRight className="size-9" />
      </button>
    </div>
  );
}
