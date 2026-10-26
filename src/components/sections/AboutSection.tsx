import { Reveal } from "@/components/site/Reveal";
import { PageHeading, SectionLabel } from "@/components/site/blocks";
import { business, milestones, storySections } from "@/content/site";
import { pick } from "@/content/gallery";


export function AboutSection() {
  return (
    <div id="about" className="scroll-mt-20">
      <PageHeading eyebrow="The Story Behind Lenore’s Kitchen" title="A Passion for Cooking. A Heart for Community." />

      <section className="py-20 md:py-28">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="sticky top-28">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img src={business.founderPhoto} alt="Lillia Key, founder of Lenore’s Kitchen Catering" className="h-full w-full object-cover object-top" />
              </div>
              <p className="eyebrow mt-4 text-muted-foreground">Lillia Key, Founder</p>
            </div>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            {storySections.map((s, i) => (
              <Reveal key={s.title} as="article" className="border-t border-border py-10 first:border-t-0 first:pt-0">
                <p className="eyebrow text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 text-3xl">{s.title}</h2>
                <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground">
                  {s.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="container-site">
          <SectionLabel>Milestones</SectionLabel>
          <ol className="mt-10 grid gap-px bg-border md:grid-cols-5">
            {milestones.map((m) => (
              <li key={m.when} className="bg-paper p-6 md:p-8">
                <p className="font-serif text-2xl">{m.when}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="grid md:grid-cols-3">
        {[pick(2, 4), pick(3, 4), pick(4, 5)].map((src) => (
          <div key={src} className="aspect-[4/3] overflow-hidden"><img src={src} alt="Lenore’s Kitchen catered food display" loading="lazy" className="h-full w-full object-cover" /></div>
        ))}
      </section>

      <section className="py-24 md:py-32">
        <Reveal className="container-site text-center">
          <span className="gold-rule mx-auto" />
          <p className="mx-auto mt-8 max-w-3xl font-serif text-3xl italic leading-snug md:text-5xl">
            “The difference between ordinary and extraordinary is that little bit extra!”
          </p>
          <p className="eyebrow mt-6 text-muted-foreground">The motto of Ms. Key and Lenore’s Kitchen Catering</p>
        </Reveal>
      </section>
    </div>
  );
}
