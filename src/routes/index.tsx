import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={"flex flex-1 justify-center items-center"}>
      <Link
        to={"/$platform/s/$id"}
        params={{ id: "OlivierDeschênes#00008", platform: "euw1" }}
        className={"text-slate-300"}
      >
        OlivierDeschênes#00008
      </Link>
    </div>
  );
}
