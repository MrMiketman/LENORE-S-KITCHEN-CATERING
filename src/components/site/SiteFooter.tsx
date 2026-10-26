import { Link } from "@tanstack/react-router";
import { business, mainNav } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-ivory">
      <div className="container-site grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-3xl">{business.name}</p>
          <span className="gold-rule my-6" />
          <p className="max-w-sm font-serif text-lg italic text-taupe">“{business.motto}”</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow mb-5 text-gold">Explore</p>
          <ul className="space-y-3 text-sm">
            {mainNav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-ivory/80 hover:text-ivory">{n.label}</Link>
              </li>
            ))}
            <li><Link to="/gallery-lkc" className="text-ivory/80 hover:text-ivory">Gallery LKC</Link></li>
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="eyebrow mb-5 text-gold">For Catering</p>
          <a href={business.phoneHref} className="font-serif text-3xl hover:text-gold">
            {business.phoneDisplay}
          </a>
          <p className="mt-3 text-sm text-ivory/70">{business.location}</p>
          <p className="mt-1 text-sm text-ivory/70">Serving {business.serviceArea}</p>
          <div className="mt-6 flex gap-5 text-sm">
            <a href={business.galleryLkcUrl} target="_blank" rel="noreferrer" className="text-ivory/80 underline-offset-4 hover:underline">
              gallerylkc.com
            </a>
            <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="text-ivory/80 underline-offset-4 hover:underline">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-site py-6 text-xs text-ivory/60">
          © {year} {business.name} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
