import { createFileRoute, redirect } from "@tanstack/react-router";

// Site is a one-pager; old URLs permanently redirect to their section.
export const Route = createFileRoute("/about")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "about", statusCode: 301 });
  },
});
