import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { createLink, type LinkComponent } from "@tanstack/react-router";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import React from "react";

interface MainSidebarLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  iconName: IconName;
  label: string;
}

const MainSidebarLink = React.forwardRef<
  HTMLAnchorElement,
  MainSidebarLinkProps
>(({ iconName, className, label, ...props }, ref) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a ref={ref} {...props} className={cn(className)}>
          <DynamicIcon name={iconName} />
          <span>{label}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

const CreatedLinkComponent = createLink(MainSidebarLink);

export const MainAppSidebarItem: LinkComponent<typeof MainSidebarLink> = (
  props
) => {
  return <CreatedLinkComponent preload={"intent"} {...props} />;
};
