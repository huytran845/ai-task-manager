// Node Modules
import { useState, useEffect } from "react";
import { useLocation, useFetcher } from "react-router";
import { startOfToday } from "date-fns";

// Components
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import TaskForm from "@/components/TaskForm";

// Types
import type { PropsWithChildren } from "react";
import React from "react";

// The TaskFormDialog Component houses the taskForm for users to either create tasks or edit them based on where this component is called.
const TaskFormDialog: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const fetcher = useFetcher();
  const [open, setOpen] = useState(false);

  // This useEffect provides the user with the ability to open the "add task dialog" with the "q" key press.
  // @returns event cleanup function to prevent memory leaks.
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === "q") {
        const target = event.target as HTMLElement;

        if (target.localName === "textarea") return;

        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, []);

  return (
    <Dialog
      modal
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTitle className="hidden">Create your Task!</DialogTitle>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        onInteractOutside={(event) => {
          event?.preventDefault();
        }}
        aria-describedby={undefined}
        className="p-0 border-0 !rounded-xl"
      >
        <TaskForm
          defaultFormData={{
            taskContent: "",
            dueDate: location.pathname === "/app/today" ? startOfToday() : null,
            projectId: null,
          }}
          mode="create"
          onCancel={() => setOpen(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData), {
              action: "/app",
              method: "POST",
              encType: "application/json",
            });

            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
