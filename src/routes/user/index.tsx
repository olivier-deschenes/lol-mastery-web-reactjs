import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
}
