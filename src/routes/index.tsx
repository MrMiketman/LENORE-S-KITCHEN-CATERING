import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-buffet.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { ArrowLink, CateringCta, SectionLabel } from "@/components/site/blocks";
import { business } from "@/content/site";
import { pick } from "@/content/gallery";
import { pageMeta } from "@/lib/seo";
import { AboutSection } from "@/components/sections/AboutSection";
import { CateringSection } from "@/components/sections/CateringSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { MediaSection } from "@/components/sections/MediaSection";
import { GalleryLkcSection } from "@/components/sections/GalleryLkcSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta(
      "Lenore’s Kitchen Catering Inc. | Chicago Catering",
      "Discover Lenore’s Kitchen Catering, a Chicago catering company founded by Lillia Key and serving clients across Chicagoland and Northwest Indiana.",
    ),
  }),
  component: Home,
});

const signature = [
  { src: pick(1, 4), alt: "Tiered fruit and charcuterie display on a draped buffet table", caption: "Buffet displays", cls: "md:col-span-4 aspect-[3/4]" },
  { src: pick(4, 6), alt: "Assorted desserts and pastries arranged across a catered table", caption: "Sweets & pastries", cls: "md:col-span-5 aspect-[4/3] md:mt-24" },
  { src: pick(3, 3), alt: "Long catered buffet line set in a bright event hall", caption: "Event service", cls: "md:col-span-3 aspect-[3/4] md:-mt-10" },
];


function Home() {
  return (
    <>
      {/* Hero */}
      <section id="home" className="relative h-[92svh] min-h-[600px] overflow-hidden bg-ink text-ivory">
        <img src={heroImg} alt="Candlelit catered buffet with chafing dishes, salads and fruit" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-[20%_50%]" />
        <div className="hero-scrim absolute inset-0" />
        <div className="container-site relative flex h-full items-end pb-16 md:items-center md:justify-end md:pb-0">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-gold">Lenore’s Kitchen Catering Inc. · Chicago</p>
            <h1 className="mt-6 text-5xl leading-[1.03] md:text-7xl">Where Every Gathering Becomes Something Extraordinary.</h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ivory/80">
              Thoughtful catering, heartfelt hospitality, and a tradition of going the extra mile.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="editorial-light" size="xl"><Link to="/" hash="catering">Explore Our Catering</Link></Button>
              <Button asChild variant="editorial-ghost-light" size="xl"><Link to="/" hash="about">Our Story</Link></Button>
            </div>
            <p className="mt-10 border-t border-ivory/20 pt-5 font-serif text-base italic text-taupe">“{business.motto}”</p>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 md:py-36">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <SectionLabel>Since our beginning</SectionLabel>
            <h2 className="mt-8 text-4xl leading-tight md:text-6xl">More Than Catering. A Tradition of Bringing People Together.</h2>
          </Reveal>
          <Reveal delay={150} className="space-y-6 text-lg leading-relaxed text-muted-foreground md:col-span-5 md:col-start-8 md:pt-16">
            <p>
              Rooted in family traditions and shaped by a lifelong passion for cooking and entertaining, Lenore’s Kitchen
              has grown into an off-premise catering business serving organizations and communities across Chicagoland
              and Northwest Indiana.
            </p>
            <p>Founded by Lillia Key 34 years ago, it began with food for friends and family — and a gift for party foods and planning learned from the women in her family.</p>
            <ArrowLink to="/about">Discover Our Story</ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* Signature photography */}
      <section className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-12 md:gap-8">
            {signature.map((s, i) => (
              <Reveal key={s.src} delay={i * 120} as="figure" className={s.cls.split(" ").filter((c) => c.startsWith("md:")).join(" ")}>
                <div className={`group overflow-hidden bg-muted ${s.cls.split(" ").filter((c) => c.startsWith("aspect")).join(" ")}`}>
                  <img src={s.src} alt={s.alt} loading="lazy" className="img-zoom h-full w-full object-cover" />
                </div>
                <figcaption className="eyebrow mt-4 text-muted-foreground">{s.caption}</figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Catering experience */}
      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden">
          <img src={pick(7, 5)} alt="Catered banquet buffet set along a hall with draped linens" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="bg-ink-2 px-6 py-20 text-ivory md:px-16 md:py-32">
          <Reveal className="max-w-lg">
            <SectionLabel light>The catering experience</SectionLabel>
            <h2 className="mt-8 text-4xl leading-tight md:text-5xl">Made for Gathering. Remembered for the Experience.</h2>
            <p className="mt-6 leading-relaxed text-ivory/75">
              From professional gatherings to celebrations with family and friends, Lenore’s Kitchen brings thoughtful
              preparation and warm hospitality to the table — serving corporations, government offices, schools,
              churches, and more.
            </p>
            <Button asChild variant="editorial-light" size="xl" className="mt-10"><Link to="/" hash="catering">Explore Catering</Link></Button>
          </Reveal>
        </div>
      </section>

      {/* Community */}
      <section className="bg-ink py-24 text-ivory md:py-36">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <SectionLabel light>Community & purpose</SectionLabel>
            <h2 className="mt-8 text-4xl leading-tight md:text-6xl">Good Food. Meaningful Work. A Stronger Community.</h2>
          </Reveal>
          <Reveal delay={150} className="space-y-6 leading-relaxed text-ivory/75 md:col-span-5 md:col-start-8 md:pt-14">
            <p>
              Beyond catering, Ms. Key is the founder of <span className="text-ivory">The Key Works Association</span>, a
              separate non-profit organization offering culinary training, food distribution, and job placement services
              for underprivileged youth, ex-offenders, and lower-income families.
            </p>
            <p>It continues a dream that began when the business first grew: to provide employment opportunities to residents of the Englewood community.</p>
          </Reveal>
        </div>
      </section>

      <AboutSection />
      <CateringSection />
      <GallerySection />
      <MediaSection />
      <GalleryLkcSection />
      <CateringCta />
      <ContactSection />
    </>
  );
}
