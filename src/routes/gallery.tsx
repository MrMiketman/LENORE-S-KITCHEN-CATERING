import { createFileRoute, redirect } from "@tanstack/react-router";

// Site is a one-pager; old URLs permanently redirect to their section.
export const Route = createFileRoute("/gallery")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "gallery", statusCode: 301 });
  },
});
