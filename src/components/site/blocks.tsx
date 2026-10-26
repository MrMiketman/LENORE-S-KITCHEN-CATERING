import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business } from "@/content/site";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function PageHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="border-b border-border pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h1 className="mt-6 max-w-5xl text-5xl leading-[1.05] md:text-7xl">{title}</h1>
          {intro && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionLabel({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className="gold-rule" />
      <p className={cn("eyebrow", light ? "text-taupe" : "text-muted-foreground")}>{children}</p>
    </div>
  );
}

export function ArrowLink({ to, children }: { to: "/about" | "/catering" | "/gallery" | "/contact" | "/media" | "/gallery-lkc"; children: ReactNode }) {
  return (
    <Link to={to} className="eyebrow group inline-flex items-center gap-3 border-b border-gold pb-1 text-ink">
      {children} <span className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  );
}

export function PricingNotice({ className }: { className?: string }) {
  return (
    <aside
      role="note"
      className={cn("border-l-2 border-gold bg-paper px-6 py-5 text-sm leading-relaxed md:text-base", className)}
    >
      <p>
        <strong className="font-medium">Please note:</strong> Menus currently found on the internet may not reflect
        current offerings or pricing. Please call Lenore’s Kitchen Catering at{" "}
        <a href={business.phoneHref} className="font-medium underline underline-offset-4">{business.phoneDisplay}</a>{" "}
        for current menu information and pricing.
      </p>
    </aside>
  );
}

export function CateringCta({
  title = "Let’s Make Your Next Gathering Extraordinary.",
  copy = "Planning an event? Connect with Lenore’s Kitchen Catering to discuss your catering needs and obtain current information.",
}: { title?: string; copy?: string }) {
  return (
    <section className="bg-ink py-24 text-ivory md:py-36">
      <Reveal className="container-site text-center">
        <SectionLabel light>
          <span>Plan with us</span>
        </SectionLabel>
        <h2 className="mx-auto mt-8 max-w-4xl text-4xl leading-tight md:text-6xl">{title}</h2>
        <p className="mx-auto mt-6 max-w-xl text-ivory/75">{copy}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="editorial-light" size="xl">
            <a href={business.phoneHref}><Phone /> Call About Catering</a>
          </Button>
          <Button asChild variant="editorial-ghost-light" size="xl">
            <Link to="/contact">Send an Inquiry</Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
