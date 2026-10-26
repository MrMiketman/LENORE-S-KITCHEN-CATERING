import { createFileRoute, redirect } from "@tanstack/react-router";

// Site is a one-pager; old URLs permanently redirect to their section.
export const Route = createFileRoute("/contact")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "contact", statusCode: 301 });
  },
});
