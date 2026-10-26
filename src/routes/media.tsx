import { createFileRoute } from "@tanstack/react-router";
import { CateringCta, PageHeading } from "@/components/site/blocks";
import { videoGallery } from "@/content/gallery";
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
          {videoGallery.map((src, i) => (
            <figure key={src}>
              <div className="aspect-[9/16] overflow-hidden bg-ink">
                <video controls preload="metadata" playsInline className="h-full w-full object-cover" aria-label={`Lenore’s Kitchen video ${i + 1}`}>
                  <source src={`${src}#t=0.5`} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>
              <figcaption className="eyebrow mt-4 text-muted-foreground">Video {String(i + 1).padStart(2, "0")}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <CateringCta />
    </>
  );
}
