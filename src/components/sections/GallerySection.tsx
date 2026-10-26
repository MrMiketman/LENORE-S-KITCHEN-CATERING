import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeading } from "@/components/site/blocks";
import { PhotoGrid } from "@/components/site/PhotoGrid";
import { Button } from "@/components/ui/button";
import { allPhotos, galleryCollections } from "@/content/gallery";
import { cn } from "@/lib/utils";


export function GallerySection() {
  const [active, setActive] = useState<string>("all");
  const photos = active === "all" ? allPhotos : allPhotos.filter((p) => p.collection === active);
  return (
    <div id="gallery" className="scroll-mt-20">
      <PageHeading eyebrow="Gallery" title="From Our Tables." intro="A look at buffets, platters, desserts and event setups from Lenore’s Kitchen." />
      <section className="py-14 md:py-20">
        <div className="container-site">
          <div role="tablist" aria-label="Gallery collections" className="mb-10 flex flex-wrap gap-x-6 gap-y-3">
            {[{ id: "all", title: "All" }, ...galleryCollections].map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={active === c.id}
                onClick={() => setActive(c.id)}
                className={cn("eyebrow border-b pb-1 transition-colors", active === c.id ? "border-gold text-ink" : "border-transparent text-muted-foreground hover:text-ink")}
              >
                {c.title}
              </button>
            ))}
          </div>
          <PhotoGrid key={active} photos={photos} />
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            <Button asChild variant="editorial" size="xl"><Link to="/" hash="media">Watch Our Videos</Link></Button>
            <Button asChild variant="editorial-outline" size="xl"><Link to="/" hash="contact">Plan Your Event</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
