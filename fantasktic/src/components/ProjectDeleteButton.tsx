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

// ProjectDeleteButton is a component used for deleting the project that this component is used in.
// Upon clicking the button a confirmation dialog will popup allowing the user to confirm their decision.
const ProjectDeleteButton: React.FC<ProjectDeleteButtonProps> = ({
  defaultFormData,
}) => {
  const fetcher = useFetcher();
  const location = useLocation();
  const navigate = useNavigate();
  // Using useCallback to memoize the function so that the function won't constantly be recomputated if used with the same arguments (aka repeat deletes and undo).
  const handleProjectDelete = useCallback(async () => {
    // Navigate to inbox page if deleting project from its project details page.
    if (location.pathname === `/app/projects/${defaultFormData.id}`) {
      navigate("/app/inbox");
    }

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
          return {
            message: "Project deleted",
            description: `Project ${truncateString(defaultFormData.name, 32)} has been successfully deleted!`,
          };
        },
        error: "Error fetching project for deletion!",
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
