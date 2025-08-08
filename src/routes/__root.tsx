import { DDragonService } from "@/api/metadata";
import { MainAppSidebar } from "@/components/sidebar/MainAppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { authClient } from "@/lib/auth-client";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface Context {
  queryClient: QueryClient;
  auth: typeof authClient;
}

export const Route = createRootRouteWithContext<Context>()({
  loader: DDragonService.loadMetadata,
  staleTime: 0,
  shouldReload: false,
  component: Component,
});

function Component() {
  return (
    <SidebarProvider>
      <MainAppSidebar />
      <main className={"flex w-full flex-col flex-1 justify-stretch"}>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
