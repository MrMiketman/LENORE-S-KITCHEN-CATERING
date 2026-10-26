import { createFileRoute, redirect } from "@tanstack/react-router";

// Site is a one-pager; old URLs permanently redirect to their section.
export const Route = createFileRoute("/gallery-lkc")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "gallery-lkc", statusCode: 301 });
  },
});
