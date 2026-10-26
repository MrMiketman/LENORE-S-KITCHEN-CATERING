import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { business, mainNav } from "@/content/site";
import { cn } from "@/lib/utils";
import lkcRose from "@/assets/lkc-rose.png.asset.json";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          overHero
            ? "bg-transparent text-ivory"
            : "border-b border-border bg-ivory/95 text-ink backdrop-blur",
        )}
      >
        <div className="container-site flex h-20 items-center justify-between gap-6">
          <Link to="/" className="flex flex-col leading-none" aria-label={`${business.name} home`}>
            <span className="font-serif text-2xl md:text-[1.7rem]">Lenore’s Kitchen</span>
            <span className={cn("eyebrow mt-1 text-[0.58rem]", overHero ? "text-taupe" : "text-gold")}>
              Catering Inc. · Chicago
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="eyebrow relative py-2 opacity-85 transition-opacity hover:opacity-100 data-[status=active]:opacity-100 data-[status=active]:after:absolute data-[status=active]:after:inset-x-0 data-[status=active]:after:-bottom-0.5 data-[status=active]:after:h-px data-[status=active]:after:bg-gold"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant={overHero ? "editorial-light" : "editorial"} size="xl" className="h-11 px-5">
              <Link to="/contact">Inquire About Catering</Link>
            </Button>
          </nav>

          <button
            type="button"
            className="p-2 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-ivory pt-24 lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site flex h-full flex-col pb-10">
          <ul className="flex flex-col border-t border-border">
            {[...mainNav, { to: "/gallery-lkc", label: "Gallery LKC" } as const].map((item) => (
              <li key={item.to} className="border-b border-border">
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-serif text-3xl text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Button asChild variant="editorial" size="xl">
              <Link to="/contact" onClick={() => setOpen(false)}>Inquire About Catering</Link>
            </Button>
            <Button asChild variant="editorial-outline" size="xl">
              <a href={business.phoneHref}>
                <Phone /> {business.phoneDisplay}
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
