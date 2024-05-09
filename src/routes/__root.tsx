import {
  createRootRouteWithContext,
  Link,
  LinkComponent,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { LucideProps, MedalIcon, Settings, Swords } from "lucide-react";
import {
  ComponentProps,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import { cn } from "../lib/utils";
import { QueryClient } from "@tanstack/react-query";

type NavigationItemProps = ComponentProps<LinkComponent<"a">> & {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
};

const NavigationItem = ({
  Icon,
  label,
  className,
  ...props
}: NavigationItemProps) => {
  return (
    <div
      className={cn("flex group p-1.5 w-full border-b text-white", className)}
    >
      <Link
        {...props}
        className={cn(
          "active-focus:bg-primary active-focus:text-white",
          "px-3 py-1.5 rounded-md flex flex-1 text-black"
        )}
      >
        <div className={"flex justify-center items-center"}>
          <Icon className={"mr-1.5"} size={16} />
        </div>
        <span>{label}</span>
      </Link>
    </div>
  );
};

interface Context {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<Context>()({
  component: () => (
    <div className={"flex"}>
      <nav className={"flex flex-col bg-gray-50 max-h-screen h-screen hidden"}>
        <div className={"p-1.5 border-r border-b"}>
          <div className={"p-5 rounded-md bg-primary text-white flex flex-1"}>
            <h1 className={"text-2xl font-bold"}>ChampionMastery.lol</h1>
          </div>
        </div>
        <div className={"flex flex-col flex-1 border-r"}>
          <NavigationItem label={"Mastery"} to="/mastery" Icon={MedalIcon} />
          <NavigationItem label={"Match"} to="/matchs" Icon={Swords} />
          <NavigationItem
            label={"Settings"}
            to="/matchs"
            Icon={Settings}
            className={"mt-auto"}
          />
        </div>
      </nav>
      <main className={"flex w-full h-full max-h-screen overflow-y-auto"}>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
});
