// Node Modules
import { Outlet } from "react-router";

// Components
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppSideBar from "@/components/AppSideBar";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <AppSideBar />
        <SidebarTrigger />
        <div>AppLayout</div>
        <Outlet />
      </TooltipProvider>
    </SidebarProvider>
  );
};

export default AppLayout;
