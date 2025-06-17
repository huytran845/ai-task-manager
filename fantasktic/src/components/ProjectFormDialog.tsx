// Node Modules
import { useState } from "react";
import { useFetcher } from "react-router";

// Custom Modules
import { truncateString } from "@/lib/utils";

// Components
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { toast } from "sonner";
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

            const fetchPromise = async () => {
              await fetcher.submit(JSON.stringify(data), {
                action: "/app/projects",
                method,
                encType: "application/json",
              });

              return data as ProjectForm;
            };

            toast.promise(fetchPromise, {
              loading: `${method === "POST" ? "Creating" : "Updating"} Project...`,
              success: (data: ProjectForm) => {
                return `Project ${truncateString(data.name, 32)} ${data.aiTaskGen ? "and its generated tasks " : ""} has been ${method === "POST" ? "created" : "updated"}!`;
              },
              error: "Error occurred during project fetch!",
              duration: 4000,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
