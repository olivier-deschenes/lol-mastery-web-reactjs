import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/$region")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={"h-screen w-screen flex flex-col"}>
      <div
        className={"flex bg-blue-400 w-full"}
        style={{ height: `var(--nav-height)` }}
      >
        <h1>test</h1>
      </div>
      <div
        className={"flex  bg-red-400 overflow-scroll"}
        style={{ height: `var(--body-height)` }}
      >
        <Outlet />
      </div>
    </div>
  );
}
