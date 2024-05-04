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
      },
    });
  },
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
/*  */
