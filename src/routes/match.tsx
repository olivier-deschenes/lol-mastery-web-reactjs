import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/match")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Match!</h3>
    </div>
  );
}
/*  */
