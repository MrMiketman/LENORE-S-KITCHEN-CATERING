import { createFileRoute } from "@tanstack/react-router";
import { CateringCta, PageHeading } from "@/components/site/blocks";
import { mediaItems } from "@/content/gallery";
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

function Media() {
  return (
    <>
      <PageHeading eyebrow="Media" title="Video Gallery." intro="Moments from Lenore’s Kitchen, as shared on our original website." />
      <section className="py-16 md:py-24">
        <div className="container-site grid gap-10 md:grid-cols-3">
          {mediaItems.map((item) => (
            <figure key={item.src}>
              <div className="aspect-[9/16] overflow-hidden bg-ink">
                {item.kind === "photo" ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={316}
                    height={563}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video controls preload="metadata" playsInline className="h-full w-full object-cover" aria-label={`Lenore’s Kitchen ${item.label.toLowerCase()}`}>
                    <source src={`${item.src}#t=0.5`} type="video/mp4" />
                    Your browser does not support video playback.{" "}
                    <a href={item.src} className="underline underline-offset-4">Open this video</a>.
                  </video>
                )}
              </div>
              <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
                <span className="eyebrow text-muted-foreground">{item.label}</span>
                <a
                  href={item.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow inline-flex items-center gap-2 border-b border-gold pb-1 text-ink"
                >
                  Open {item.label.toLowerCase()} <span aria-hidden="true">↗</span>
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <CateringCta />
    </>
  );
}
