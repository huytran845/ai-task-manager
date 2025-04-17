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
import { eventNames } from "process";

const TaskFormDialog: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const fetcher = useFetcher();
  const [open, setOpen] = useState(false);

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
