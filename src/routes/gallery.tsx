import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeading } from "@/components/site/blocks";
import { PhotoGrid } from "@/components/site/PhotoGrid";
import { Button } from "@/components/ui/button";
import { allPhotos, galleryCollections } from "@/content/gallery";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: pageMeta(
      "Catering Photo Gallery | Lenore’s Kitchen Catering",
      "Photographs of buffets, platters, desserts and event setups from Lenore’s Kitchen Catering in Chicago.",
    ),
  }),
  component: Gallery,
});

function Gallery() {
  const [active, setActive] = useState<string>("all");
  const photos = active === "all" ? allPhotos : allPhotos.filter((p) => p.collection === active);
  return (
    <>
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
            <Button asChild variant="editorial" size="xl"><Link to="/media">Watch Our Videos</Link></Button>
            <Button asChild variant="editorial-outline" size="xl"><Link to="/contact">Plan Your Event</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
