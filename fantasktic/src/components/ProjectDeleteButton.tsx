// Node Modules
import { useFetcher, useNavigate, useLocation } from "react-router";
import React, { useCallback } from "react";

// Custom Modules
import { truncateString } from "@/lib/utils";

// Components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Assets
import { Trash2Icon } from "lucide-react";

// Types
import type { Project } from "@/types";

type ProjectDeleteButtonProps = {
  defaultFormData: Project;
};

const ProjectDeleteButton: React.FC<ProjectDeleteButtonProps> = ({
  defaultFormData,
}) => {
  const fetcher = useFetcher();
  const handleProjectDelete = useCallback(async () => {
    try {
      const deletePromise = async () => {
        await fetcher.submit(defaultFormData, {
          action: "/app/projects",
          method: "DELETE",
          encType: "application/json",
        });
      };

      toast.promise(deletePromise, {
        loading: "Deleting Project...",
        success: () => {
          return `Project ${truncateString(defaultFormData.name, 32)} has been deleted!`;
        },
        error: "Error occurred during project fetch!",
        duration: 4000,
      });
    } catch (projectDeleteError) {
      console.log(
        "Error occurred during project deletion! ",
        projectDeleteError,
      );
    }
  }, [defaultFormData]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start px-2 !text-destructive"
        >
          <Trash2Icon /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this project?</AlertDialogTitle>
          <AlertDialogDescription>
            The "{truncateString(defaultFormData.name, 40)}" project and its
            associated tasks are about to be{" "}
            <span className="text-red-500/70">permanently</span> deleted.
            Confirm?{" "}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleProjectDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProjectDeleteButton;
