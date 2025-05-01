// Node Modules
import { Outlet } from "react-router";

// Components
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import AppSideBar from "@/components/AppSideBar";

const AppLayout = () => {
  return (
    <>
      <SidebarProvider>
        <TooltipProvider>
          <AppSideBar />

          <main className="flex-1">
            <Outlet />
          </main>
        </TooltipProvider>
      </SidebarProvider>

      <Toaster position="top-center" />
    </>
  );
};

export default AppLayout;
