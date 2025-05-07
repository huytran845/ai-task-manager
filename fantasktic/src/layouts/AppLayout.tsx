// Node Modules
import { Outlet, useNavigation } from "react-router";
import { cn } from "@/lib/utils";

// Components
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import AppSideBar from "@/components/AppSideBar";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading" && !navigation.formData;

  return (
    <>
      <SidebarProvider>
        <TooltipProvider>
          <AppSideBar />

          <main
            className={cn(
              "flex-1",
              isLoading && "opacity-50 pointer-events-none",
            )}
          >
            <Outlet />
          </main>
        </TooltipProvider>
      </SidebarProvider>

      <Toaster position="top-center" />
    </>
  );
};

export default AppLayout;
