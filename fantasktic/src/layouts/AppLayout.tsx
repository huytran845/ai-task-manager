// Node Modules
import { Outlet, useNavigation, useLoaderData } from "react-router";
import { cn } from "@/lib/utils";

// Components
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import AppSideBar from "@/components/AppSideBar";
import { ProjectProvider } from "@/contexts/ProjectContext";

// Types
import { AppLoaderData } from "@/routes/loaders/appLoader";

// The main layout for the main application.
const AppLayout = () => {
  const navigation = useNavigation();
  const { projects } = useLoaderData<AppLoaderData>();
  const isLoading = navigation.state === "loading" && !navigation.formData; // Sets isLoading state when user navigates pages, but not when it's from form submission.

  return (
    <ProjectProvider projects={projects}>
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

      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            toast: "!bg-primary/85",
            title: "text-lg",
            description: "text-base",
          },
        }}
      />
    </ProjectProvider>
  );
};

export default AppLayout;
