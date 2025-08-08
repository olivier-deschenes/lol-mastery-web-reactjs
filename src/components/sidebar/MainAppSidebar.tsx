import { MainAppSidebarFooter } from "@/components/sidebar/footer/MainAppSidebarFooter";
import { MainAppSidebarItem } from "@/components/sidebar/MainAppSidebarItem";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { MedalIcon } from "lucide-react";

type Props = {};

export const MainAppSidebar = ({}: Props) => {
  return (
    <Sidebar>
      <SidebarHeader className={"flex gap-2 flex-row p-5 text-gray-300"}>
        <MedalIcon className={"w-5"} />
        <h1 className={"font-bold"}>ChampionsMastery.lol</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <MainAppSidebarItem iconName={"home"} to={"/"} label={"Home"} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Matches</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <MainAppSidebarItem
                iconName={"binoculars"}
                to={"/$platform"}
                params={{
                  platform: "euw1",
                }}
                label={"Multilookup"}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Masteries</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <MainAppSidebarItem
                iconName={"binoculars"}
                to={"/mastery"}
                search={{
                  c: "",
                  mSort: "desc",
                  fs: [],
                  s: [],
                  cSort: null,
                  hs: null,
                }}
                label={"Multilookup"}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className={"mt-auto"}>
          <Separator className={"my-3"} />
          <SidebarGroupContent>
            <SidebarMenu>
              <MainAppSidebarItem
                iconName={"shield"}
                to={"/privacy"}
                label={"Privacy Policy V2"}
              />
              <MainAppSidebarItem
                iconName={"list-checks"}
                to={"/terms"}
                label={"Terms of Service"}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <MainAppSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
};
