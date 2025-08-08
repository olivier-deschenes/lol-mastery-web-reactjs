import { RiotPlatformSelect } from "@/components/PlatformSelect";

import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$platform")({
  component: RouteComponent,
});

function RouteComponent() {
  const platform = Route.useParams().platform;
  const navigate = Route.useNavigate();

  return (
    <div className={"flex flex-col flex-1"}>
      <div className={"text-white bg-sidebar p-2.5"}>
        <RiotPlatformSelect
          value={platform}
          onChange={(platform) => {
            navigate({
              to: ".",
              params: (params) => ({ ...params, platform: platform }),
            });
          }}
          className={"w-fit"}
        />
      </div>
      <div className={"flex flex-col flex-1 p-5"}>
        <Outlet key={platform} />
      </div>
    </div>
  );
}
