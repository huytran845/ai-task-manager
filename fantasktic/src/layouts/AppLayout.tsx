// Node Modules
import { Outlet } from "react-router";

// Components
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSideBar from "@/components/AppSideBar";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarTrigger />
      <div>AppLayout</div>
      <Outlet />
    </SidebarProvider>
  );
};

export default AppLayout;
