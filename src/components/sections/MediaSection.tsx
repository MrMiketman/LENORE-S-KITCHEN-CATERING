import { PageHeading } from "@/components/site/blocks";
import { videoGallery } from "@/content/gallery";


export function MediaSection() {
  return (
    <div id="media" className="scroll-mt-20">
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
    </div>
  );
}
