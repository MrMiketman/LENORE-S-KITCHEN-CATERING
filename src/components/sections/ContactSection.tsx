import { MapPin, Phone } from "lucide-react";
import { PageHeading, PricingNotice } from "@/components/site/blocks";
import { InquiryForm, type FieldDef } from "@/components/site/InquiryForm";
import { business } from "@/content/site";


const contactFields: FieldDef[] = [
  { name: "name", label: "Full name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "subject", label: "Inquiry type", type: "select", options: ["Catering inquiry", "Menu & pricing", "General question", "Other"] },
  { name: "message", label: "Message", type: "textarea", required: true, full: true },
];

export function ContactSection() {
  return (
    <div id="contact" className="scroll-mt-20">
      <PageHeading
        eyebrow="Contact"
        title="Let’s Start Planning."
        intro="Have a catering question or planning a gathering? Get in touch with Lenore’s Kitchen Catering."
      />
      <section className="py-16 md:py-24">
        <div className="container-site grid gap-14 md:grid-cols-12">
          <aside className="space-y-10 md:col-span-4">
            <div>
              <p className="eyebrow flex items-center gap-2 text-gold"><Phone className="size-4" /> For catering, call</p>
              <a href={business.phoneHref} className="mt-3 block font-serif text-4xl hover:text-gold">{business.phoneDisplay}</a>
            </div>
            <div>
              <p className="eyebrow flex items-center gap-2 text-gold"><MapPin className="size-4" /> Location</p>
              <p className="mt-3 font-serif text-2xl">{business.location}</p>
              <p className="mt-1 text-sm text-muted-foreground">Serving {business.serviceArea}</p>
            </div>
            <PricingNotice />
          </aside>
          <div className="md:col-span-7 md:col-start-6">
            <InquiryForm fields={contactFields} submitLabel="Send Message" />
          </div>
        </div>
      </section>
    </div>
  );
}
