import gallerySpace from "@/assets/gallery-space.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/blocks";
import { business } from "@/content/site";


export function GalleryLkcSection() {
  return (
    <div id="gallery-lkc" className="scroll-mt-20">
      <section className="bg-ink pb-20 pt-24 text-ivory md:pb-28 md:pt-32">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="eyebrow text-gold">Gallery LKC · Est. 2022</p>
            <h2 className="mt-6 text-5xl leading-[1.05] md:text-7xl">Art, Gathering & Community on Chicago’s South Side.</h2>
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
    </div>
  );
}
