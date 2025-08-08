import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { RefreshCcw, UserCircle2 } from "lucide-react";
import { useState } from "react";

export function LoggedOutMainAppSidebarFooter() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    authClient.signIn
      .social({
        provider: "github",
        callbackURL: import.meta.env.VITE_BASE_URL,
      })
      .catch(() => setLoading(false));
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={handleLogin} disabled={loading}>
          {loading ? (
            <RefreshCcw className={"animate-spin"} />
          ) : (
            <UserCircle2 />
          )}
          {loading ? "Logging in" : "Login"}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
