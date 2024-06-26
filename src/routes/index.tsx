import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: () => {
    throw redirect({
      to: "/mastery",
      search: {
        c: "",
        mSort: "desc",
        fs: [],
        s: [],
        cSort: null,
        hs: null,
      },
    });
  },
});

function Index() {
  return <div />;
}
