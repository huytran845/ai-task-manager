// Node Modules
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Components
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { SidebarTrigger } from "@/components/ui/sidebar";
import KeyBinds from "@/components/KeyBinds";
import React from "react";

// Types
type TopAppBarProps = {
  title: string;
  taskCount?: number;
};

// TopAppBar Component displays the title of the page and the taskCounts while also providing access to the sideAppBar.
const TopAppBar: React.FC<TopAppBarProps> = ({ title, taskCount }) => {
  const [showTitle, setShowTitle] = useState(false);

  // This useEffect runs once to add a scroll event listener to decide whether to display the title or not.
  useEffect(() => {
    const listener = () => setShowTitle(window.scrollY > 70); // Shows the title when window is above 70 pixels

    listener(); // Calls listener for inital mount.
    window.addEventListener("scroll", listener); // Adds event listener to the scroll to know when the window is scrolling.

    return () => window.removeEventListener("scroll", listener); // Removes listener when component unmounts for cleanup.
  }, []);

  return (
    <div
      className={cn(
        "sticky z-40 bg-background top-0 h-14 flex items-center justify-between px-4",
        showTitle && "border-b",
      )}
    >
      <Tooltip
        delayDuration={400}
        disableHoverableContent
      >
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>

        <TooltipContent className="flex items-center">
          <p>Toggle Sidebar</p>

          <KeyBinds keyBindsList={["Ctrl", "B"]} />
        </TooltipContent>
      </Tooltip>

      <div
        className={cn(
          "max-w-[480px] mx-auto text-center transition-[transform,opacity]",
          showTitle ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        )}
      >
        <h1 className="font-semibold truncate">{title}</h1>

        {Boolean(taskCount) && (
          <div className="text-xs text-muted-foreground">{taskCount} tasks</div>
        )}
      </div>
    </div>
  );
};

export default TopAppBar;
