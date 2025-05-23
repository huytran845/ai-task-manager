// Node Modules
import { useState } from "react";
import { useFetcher } from "react-router";

// Components
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import ProjectForm from "@/components/ProjectForm";

// Types
import type { Project } from "@/types";
import React from "react";

type ProjectFormDialogProps = {
  defaultFormData?: Project;
  children: React.ReactNode;
  method: "POST" | "PUT";
};

const ProjectFormDialog: React.FC<ProjectFormDialogProps> = ({
  defaultFormData,
  children,
  method,
}) => {
  const fetcher = useFetcher();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      modal
    >
      <DialogTitle className="hidden">Create your project!</DialogTitle>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="p-0 border-0 !rounded-xl"
        aria-describedby={undefined}
      >
        <ProjectForm
          mode={method === "POST" ? "create" : "edit"}
          defaultFormData={defaultFormData}
          onCancel={() => setOpen(false)}
          onSubmit={async (data) => {
            setOpen(false);

            await fetcher.submit(JSON.stringify(data), {
              action: "/app/projects",
              method,
              encType: "application/json",
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
