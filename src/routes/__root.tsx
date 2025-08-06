import { DDragonService } from "@/api/metadata";
import { Footer } from "@/components/footer/Footer";
import { Navigation } from "@/components/navigation/Navigation";
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
    <div
      className={
        "flex flex-col min-w-screen min-h-screen divide-gray-800 divide-y-1 bg-black"
      }
    >
      <div className={"h-[5rem]"}>
        <Navigation />
      </div>
      <main
        className={"flex w-full flex-col flex-1 justify-stretch m-5"}
        // style={{ minHeight: "calc(100vh - 5rem - 5rem)" }}
      >
        <Outlet />
      </main>
      <div className={"h-[5rem]"}>
        <Footer />
      </div>
    </div>
  );
}
