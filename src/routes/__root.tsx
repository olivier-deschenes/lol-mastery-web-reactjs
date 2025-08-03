import {
  createRootRouteWithContext,
  Link,
  LinkComponent,
  Outlet,
} from "@tanstack/react-router";

import { QueryClient } from "@tanstack/react-query";
import { cn } from "../lib/utils";
import {
  ComponentProps,
  ForwardRefExoticComponent,
  PropsWithChildren,
  RefAttributes,
} from "react";
import { ListChecks, LucideProps, MedalIcon, ScrollText } from "lucide-react";
import { fetchMetadata } from "@/queries/getMetadata";
import { IDType, MasteryType } from "@/api/mastery/types";

interface Context {
  queryClient: QueryClient;
}

type NavigationItemProps = ComponentProps<LinkComponent<"a">> & {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const NavigationItem = ({
  Icon,
  className,
  children,
  ...props
}: PropsWithChildren<NavigationItemProps>) => {
  return (
    <li className={cn("", className)}>
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
        <span>{children}</span>
      </Link>
    </li>
  );
};

export const Route = createRootRouteWithContext<Context>()({
  loader: async () => {
    const data = await fetchMetadata();

    const version = data.LOL_LATEST_VESION;

    return {
      ...data,
      urls: {
        getProfileIconUrl: (profileIconId: IDType["profile_icon_id"]) =>
          `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`,
        getChampionFullImage: (
          fullImage: MasteryType["champion"]["image"]["full"]
        ) =>
          `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${fullImage}`,
      },
    };
  },
  component: () => (
    <div className={"flex flex-col gap-5"}>
      <nav className={"flex w-full p-3 border-b"}>
        <header>
          <Link to={"/"}>
            <h1
              className={
                "text-3xl font-bold text-primary flex gap-1.5 items-center"
              }
            >
              <MedalIcon />
              ChampionMastery.lol
            </h1>
          </Link>
        </header>
        <ul className={"flex gap-2.5 font-mono ml-auto"}>
          <NavigationItem Icon={ScrollText} to={"/privacy"}>
            Privacy Policy
          </NavigationItem>
          <NavigationItem Icon={ListChecks} to={"/terms"}>
            Terms of Service
          </NavigationItem>
        </ul>
      </nav>
      <main className={"flex w-full h-full"}>
        <Outlet />
      </main>
    </div>
  ),
});
