import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { PageHeading, PricingNotice, SectionLabel } from "@/components/site/blocks";
import { InquiryForm, type FieldDef } from "@/components/site/InquiryForm";
import { business } from "@/content/site";
import { pick } from "@/content/gallery";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/catering")({
  head: () => ({
    meta: pageMeta(
      "Catering Services in Chicagoland | Lenore’s Kitchen Catering",
      "Off-premise catering for corporations, government offices, schools, churches and celebrations across Chicagoland and Northwest Indiana. Call for current menus.",
    ),
  }),
  component: Catering,
});

export const cateringFields: FieldDef[] = [
  { name: "name", label: "Full name", required: true },
  { name: "email", label: "Email address", type: "email", required: true },
  { name: "phone", label: "Phone number", type: "tel", required: true },
  { name: "eventType", label: "Event type", type: "select", required: true, options: ["Corporate / organizational", "Government office", "School", "Church / faith-based", "Family celebration", "Other"] },
  { name: "eventDate", label: "Event date", type: "date", required: true },
  { name: "guests", label: "Estimated number of guests", type: "number", required: true },
  { name: "requirements", label: "Catering requirements", type: "textarea", full: true },
  { name: "details", label: "Additional details", type: "textarea", full: true },
];

const clients = ["Corporations", "Government offices", "Schools", "Churches", "And more"];

function Catering() {
  return (
    <>
      <PageHeading
        eyebrow="Catering"
        title="Catering That Brings People Together."
        intro="Discover Lenore’s Kitchen Catering and let’s discuss the right approach for your gathering."
      />

      <section className="py-20 md:py-28">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <SectionLabel>Off-premise catering</SectionLabel>
            <h2 className="mt-8 text-4xl leading-tight md:text-5xl">Decades of preparing food — and gatherings — with care.</h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-5 md:col-start-8 md:pt-14">
            <p>Lenore’s Kitchen is an off-premise catering company founded by Lillia Key 34 years ago. What began as food for friends and family grew through a church commercial kitchen into a facility of its own, serving not only soul food but love and respect.</p>
            <p>We bring the food to you — wherever your event takes place across {business.serviceArea}.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-20 text-ivory md:py-28">
        <div className="container-site">
          <SectionLabel light>Corporate & organizational catering</SectionLabel>
          <h2 className="mt-8 max-w-3xl text-4xl leading-tight md:text-5xl">Trusted by organizations across the Chicagoland–Northwest Indiana area.</h2>
          <ul className="mt-14 grid grid-cols-2 gap-px bg-ivory/10 md:grid-cols-5">
            {clients.map((c) => (
              <li key={c} className="bg-ink px-6 py-8 font-serif text-2xl">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-site grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[pick(2, 3), pick(3, 6), pick(10, 5), pick(6, 7), pick(4, 3), pick(1, 6), pick(10, 6), pick(2, 7)].map((src, i) => (
            <div key={src} className={`overflow-hidden bg-muted ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}>
              <img src={src} alt="Food prepared and presented by Lenore’s Kitchen Catering" loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel>Menus & pricing</SectionLabel>
            <h2 className="mt-8 text-4xl leading-tight md:text-5xl">Current menus are shared by phone.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Menus change with the seasons and with each event, so we don’t publish menus or prices online. Call to hear current offerings and receive pricing for your gathering.
            </p>
            <Button asChild variant="editorial" size="xl" className="mt-8">
              <a href={business.phoneHref}><Phone /> Call {business.phoneDisplay}</a>
            </Button>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-16">
            <PricingNotice />
          </div>
        </div>
      </section>

      <section id="inquiry" className="py-20 md:py-28">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel>Catering inquiry</SectionLabel>
            <h2 className="mt-8 text-4xl leading-tight">Tell us about your event.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              For the fastest answer, call <a href={business.phoneHref} className="text-ink underline underline-offset-4">{business.phoneDisplay}</a>.
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <InquiryForm fields={cateringFields} submitLabel="Request Catering Information" />
          </div>
        </div>
      </section>
    </>
  );
}
