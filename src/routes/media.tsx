import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CateringCta, PageHeading } from "@/components/site/blocks";
import { business } from "@/content/site";
import { mediaItems, type MediaItem } from "@/content/gallery";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: pageMeta(
      "Video Gallery | Lenore’s Kitchen Catering",
      "Watch videos from Lenore’s Kitchen Catering, an off-premise catering company in Chicago.",
    ),
  }),
  component: Media,
});

type SlotState = "idle" | "playing" | "pending";

function MediaSlot({ item }: { item: MediaItem }) {
  const [state, setState] = useState<SlotState>("idle");

  return (
    <figure>
      <div className="relative aspect-[9/16] overflow-hidden bg-ink">
        <img
          src={item.poster}
          alt={state === "playing" ? "" : item.alt}
          width={316}
          height={563}
          loading="lazy"
          className={state === "pending" ? "h-full w-full object-cover opacity-25" : "h-full w-full object-cover"}
        />
        {state === "idle" && (
          <button
            type="button"
            onClick={() => setState(item.src ? "playing" : "pending")}
            aria-label={`Play ${item.label.toLowerCase()}`}
            className="group absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-overlay/70 transition-colors group-hover:bg-overlay/90">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-6 w-6 fill-ivory">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
        {state === "pending" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-serif text-lg text-ivory">This video is coming soon.</p>
            <p className="text-sm text-ivory/85">
              Call{" "}
              <a href={business.phoneHref} className="underline underline-offset-4">
                {business.phoneDisplay}
              </a>{" "}
              to see it today.
            </p>
            <button type="button" onClick={() => setState("idle")} className="eyebrow border-b border-gold pb-1 text-ivory">
              Back
            </button>
          </div>
        )}
        {state === "playing" && item.src && (
          <video
            controls
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            aria-label={`Lenore’s Kitchen ${item.label.toLowerCase()}`}
          >
            <source src={`${item.src}#t=0.5`} type="video/mp4" />
            Your browser does not support video playback.{" "}
            <a href={item.src} className="underline underline-offset-4">Open this video</a>.
          </video>
        )}
      </div>
      <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
        <span className="eyebrow text-muted-foreground">{item.label}</span>
        {item.src ? (
          <a
            href={item.src}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow inline-flex items-center gap-2 border-b border-gold pb-1 text-ink"
          >
            Open {item.label.toLowerCase()} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="eyebrow text-muted-foreground">Coming soon</span>
        )}
      </figcaption>
    </figure>
  );
}

function Media() {
  return (
    <>
      <PageHeading eyebrow="Media" title="Video Gallery." intro="Moments from Lenore’s Kitchen, as shared on our original website." />
      <section className="py-16 md:py-24">
        <div className="container-site grid gap-10 md:grid-cols-3">
          {mediaItems.map((item) => (
            <MediaSlot key={item.label} item={item} />
          ))}
        </div>
      </section>
      <CateringCta />
    </>
  );
}
