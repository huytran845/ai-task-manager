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
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { UserButton } from "@clerk/clerk-react";
import Logo from "@/components/Logo";
import TaskFormDialog from "@/components/TaskFormDialog";

// Assets
import { CirclePlus, Plus, ChevronRight } from "lucide-react";

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
                <TaskFormDialog>
                  <SidebarMenuButton className="!text-primary">
                    <CirclePlus /> Add Task
                  </SidebarMenuButton>
                </TaskFormDialog>
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

        {/* All Projects */}
        <Collapsible
          defaultOpen
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <CollapsibleTrigger>
                <ChevronRight className="me-2 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                Projects
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            <Tooltip
              delayDuration={400}
              disableHoverableContent
            >
              <TooltipTrigger asChild>
                <SidebarGroupAction aria-label="Add Project">
                  <Plus />
                </SidebarGroupAction>
              </TooltipTrigger>

              <TooltipContent side="right">Add Project</TooltipContent>
            </Tooltip>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <p className="text-muted-foreground text-sm p-2 pl-4">
                      Empty... press + to add projects!
                    </p>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
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
