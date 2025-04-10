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
  return (
    <Dialog modal>
      <DialogTitle className="hidden">Create your Task!</DialogTitle>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        onInteractOutside={(event) => {
          event?.preventDefault();
        }}
        className="p-0 border-0 !rounded-xl"
      >
        <TaskForm />
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
