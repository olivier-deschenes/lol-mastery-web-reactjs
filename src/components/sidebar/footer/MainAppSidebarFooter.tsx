import { authClient } from "@/lib/auth-client";
import { LoggedInMainAppSidebarFooter } from "@/components/sidebar/footer/LoggedInMainAppSidebarFooter";
import { LoggedOutMainAppSidebarFooter } from "@/components/sidebar/footer/LoggedOutMainAppSidebarFooter";

export function MainAppSidebarFooter() {
  const { data } = authClient.useSession();

  if (data?.user) {
    return <LoggedInMainAppSidebarFooter />;
  } else {
    return <LoggedOutMainAppSidebarFooter />;
  }
}
