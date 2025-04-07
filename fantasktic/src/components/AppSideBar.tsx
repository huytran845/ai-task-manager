// Node Modules
import { Link } from "react-router";

// Components
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { Collapsible } from "@/components/ui/collapsible";
import Logo from "@/components/Logo";
import { UserButton } from "@clerk/clerk-react";

// Assets
import { CirclePlus } from "lucide-react";

// Constants
import { SIDEBAR_LINKS } from "@/constants";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          to="/app/index"
          className="p-2"
        >
          <Logo />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Task Creation Button */}
              <SidebarMenuItem>
                <SidebarMenuButton className="!text-primary">
                  <CirclePlus /> Add Task
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Sidebar Options */}
              {SIDEBAR_LINKS.map((link, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link to={link.href}>
                      <link.icon />
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>

                  <SidebarMenuBadge>0</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <UserButton
          showName
          appearance={{
            elements: {
              rootBox: "user-root-box",
              userButtonTrigger: "user-button-trigger",
              userButtonBox: "user-button-box",
              userButtonOuterIdentifier: "user-button-outer-identifier",
              popoverBox: "user-pop-over-box",
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
