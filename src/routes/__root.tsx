import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MusicPlayer } from "@/components/site/MusicPlayer";
import { Button } from "@/components/ui/button";
import { business } from "@/content/site";

function NotFoundComponent() {
  return (
    <section className="flex min-h-[80vh] items-center pt-24">
      <div className="container-site text-center">
        <p className="eyebrow text-gold">Page not found</p>
        <h1 className="mt-6 text-5xl md:text-7xl">This table hasn’t been set.</h1>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Button asChild variant="editorial" size="xl"><Link to="/">Return Home</Link></Button>
          <Button asChild variant="editorial-outline" size="xl"><Link to="/contact">Contact Us</Link></Button>
        </div>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again, or call us at {business.phoneDisplay}.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button variant="editorial" size="xl" onClick={() => { router.invalidate(); reset(); }}>Try again</Button>
          <Button asChild variant="editorial-outline" size="xl"><a href="/">Go home</a></Button>
        </div>
      </div>
    </div>
  );
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: business.name,
  servesCuisine: "Soul food",
  telephone: "+1-773-633-7999",
  founder: { "@type": "Person", name: business.founder },
  address: { "@type": "PostalAddress", addressLocality: "Chicago", addressRegion: "IL", postalCode: "60643", addressCountry: "US" },
  areaServed: ["Chicagoland", "Northwest Indiana"],
  sameAs: [business.facebookUrl],
  slogan: business.motto,
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lenore’s Kitchen Catering Inc. | Chicago Catering" },
      { name: "description", content: "Chicago off-premise catering founded by Lillia Key." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/favicon.png" },
      { rel: "apple-touch-icon", type: "image/png", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(orgJsonLd) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
      <MusicPlayer />
    </QueryClientProvider>
  );
}
