import { createFileRoute, Link } from "@tanstack/react-router";
import { homepagePhoto } from "@/content/photography";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { ArrowLink, CateringCta, SectionLabel } from "@/components/site/blocks";
import { business } from "@/content/site";
import { pick } from "@/content/gallery";
import { pageMeta } from "@/lib/seo";

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
  { src: pick(7, 10), alt: "Tiered fruit and charcuterie display on a draped buffet table", caption: "Buffet displays", cls: "md:col-span-4 aspect-[3/4]" },
  { src: pick(10, 8), alt: "Assorted desserts and pastries arranged across a catered table", caption: "Sweets & pastries", cls: "md:col-span-5 aspect-[4/3] md:mt-24" },
  { src: pick(5, 3), alt: "Long catered buffet line set in a bright event hall", caption: "Event service", cls: "md:col-span-3 aspect-[3/4] md:-mt-10" },
];

const preview = [pick(7, 20), pick(10, 3), pick(6, 3), pick(10, 0), pick(5, 6), pick(7, 6)];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[max(600px,92svh)] flex-col overflow-hidden bg-ink text-ivory md:block md:h-[92svh]">
        <img src={homepagePhoto.src} alt={homepagePhoto.alt} width={homepagePhoto.width} height={homepagePhoto.height} className="absolute inset-0 h-full w-full object-cover object-[20%_50%]" />
        <div className="hero-scrim absolute inset-0" />
        <div className="container-site relative flex flex-1 items-end pb-16 pt-28 md:h-full md:items-center md:justify-end md:pb-0 md:pt-0">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-gold">Lenore’s Kitchen Catering Inc. · Chicago</p>
            <h1 className="mt-6 text-5xl leading-[1.03] md:text-7xl">Where Every Gathering Becomes Something Extraordinary.</h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ivory/80">
              Thoughtful catering, heartfelt hospitality, and a tradition of going the extra mile.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="editorial-light" size="xl"><Link to="/catering">Explore Our Catering</Link></Button>
              <Button asChild variant="editorial-ghost-light" size="xl"><Link to="/about">Our Story</Link></Button>
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
            <Button asChild variant="editorial-light" size="xl" className="mt-10"><Link to="/catering">Explore Catering</Link></Button>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-36">
        <div className="container-site grid items-center gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img src={business.founderPhoto} alt="Lillia Key, founder of Lenore’s Kitchen Catering" loading="lazy" className="h-full w-full object-cover object-top" />
            </div>
          </Reveal>
          <Reveal delay={150} className="md:col-span-6 md:col-start-7">
            <SectionLabel>Our story & legacy</SectionLabel>
            <h2 className="mt-8 text-4xl leading-tight md:text-5xl">A Vision Rooted in Family. A Legacy Built on Service.</h2>
            <div className="mt-6 space-y-5 leading-relaxed text-muted-foreground">
              <p>Growing up in Chicago’s Englewood community, Lillia Key watched her mother, grandmother and great-aunts throw fabulous family parties — and absorbed everything she could about cooking and entertaining.</p>
              <p>In college she fine-tuned those skills cooking for her neighborhood and planning parties in major downtown hotels. The home-based business grew into her church’s commercial kitchen, then its own facility, serving not only soul food but love and respect.</p>
            </div>
            <div className="mt-8"><ArrowLink to="/about">Read Our Story</ArrowLink></div>
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


      {/* Media preview */}
      <section className="py-24 md:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <SectionLabel>From our events</SectionLabel>
              <h2 className="mt-6 text-4xl md:text-5xl">The Gallery</h2>
            </Reveal>
            <Button asChild variant="editorial-outline" size="xl"><Link to="/gallery">View Our Gallery</Link></Button>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
            {preview.map((src, i) => (
              <Link key={src} to="/gallery" className={`group overflow-hidden bg-muted ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"} ${i === 0 ? "md:col-span-2" : ""}`}>
                <img src={src} alt={`Lenore’s Kitchen catering photo ${i + 1}`} loading="lazy" className="img-zoom h-full w-full object-cover" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CateringCta />
    </>
  );
}
