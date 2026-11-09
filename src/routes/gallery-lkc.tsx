import { createFileRoute } from "@tanstack/react-router";
import gallerySpace from "@/assets/gallery-space.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/blocks";
import { business } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/gallery-lkc")({
  head: () => ({
    meta: pageMeta(
      "Gallery LKC | Art Gallery & Event Space by Lillia Key",
      "Gallery LKC, opened in 2022 by Lillia Key, is an upscale art gallery and event space on Chicago’s South Side.",
    ),
  }),
  component: GalleryLkc,
});

function GalleryLkc() {
  return (
    <>
      <section className="bg-ink pb-20 pt-24 text-ivory md:pb-28 md:pt-36">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="eyebrow text-gold">Gallery LKC · Est. 2022</p>
            <h1 className="mt-6 text-5xl leading-[1.05] md:text-7xl">Art, Gathering & Community on Chicago’s South Side.</h1>
          </Reveal>
          <Reveal delay={150} className="space-y-6 leading-relaxed text-ivory/75 md:col-span-4 md:col-start-9 md:pt-20">
            <p>In 2022, Ms. Lillia Key — founder of Lenore’s Kitchen Catering — opened Gallery LKC, an upscale art gallery and event space located on the south side of Chicago.</p>
            <Button asChild variant="editorial-light" size="xl">
              <a href={business.galleryLkcUrl} target="_blank" rel="noreferrer">Visit gallerylkc.com</a>
            </Button>
          </Reveal>
        </div>
      </section>
      <figure>
        <img src={gallerySpace} alt="Representative image of an upscale gallery event space" width={1600} height={1072} loading="lazy" className="h-[75vh] min-h-[420px] w-full object-cover" />
        <figcaption className="container-site py-3 text-xs text-muted-foreground">Representative image — not a photograph of Gallery LKC.</figcaption>
      </figure>
      <section className="py-24 md:py-32">
        <Reveal className="container-site max-w-3xl text-center">
          <SectionLabel center>A broader vision</SectionLabel>
          <p className="mt-8 font-serif text-3xl leading-snug md:text-4xl">
            Gallery LKC extends the same spirit behind Lenore’s Kitchen — creativity, gathering, and a little extra — into a space for art and events.
          </p>
          <p className="mt-8 text-muted-foreground">For exhibitions, events and booking details, please visit the official Gallery LKC website.</p>
          <Button asChild variant="editorial" size="xl" className="mt-10">
            <a href={business.galleryLkcUrl} target="_blank" rel="noreferrer">Explore Gallery LKC</a>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
