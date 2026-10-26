import { createFileRoute, redirect } from "@tanstack/react-router";

// Site is a one-pager; old URLs permanently redirect to their section.
export const Route = createFileRoute("/media")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "media", statusCode: 301 });
  },
});
