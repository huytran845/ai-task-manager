// Components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ProjectFormDialog from "@/components/ProjectFormDialog";
import ProjectDeleteButton from "@/components/ProjectDeleteButton";

// Assets
import { EditIcon } from "lucide-react";

// Types
import type { Project } from "@/types";
import type { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

// ProjectActionMenu will inherit the DropdownMenu properties so that the dropdown menu can be modified from other components, while also taking in form data relating to the project format.
interface ProjectActionMenuProps extends DropdownMenuContentProps {
  defaultFormData: Project;
}

// ProjectActionMenu is a component that acts as a dropdown for individual projects, and provides options to the user to edit or delete the current project the dropdown was opened from.
// It has children to act as the trigger for the popout, props for configuring the properties of radix's dropdownMenu component, and defaultformData to properly reference which project is being edited/deleted.
const ProjectActionMenu: React.FC<ProjectActionMenuProps> = ({
  children,
  defaultFormData,
  ...props
}) => {
  return (
    // Setting modal to false so that dropdownMenu doesn't interfere with dialog text boxes.
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>

      <DropdownMenuContent {...props}>
        <DropdownMenuItem asChild>
          <ProjectFormDialog
            method="PUT"
            defaultFormData={defaultFormData}
          >
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start px-2"
            >
              <EditIcon /> Edit
            </Button>
          </ProjectFormDialog>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <ProjectDeleteButton defaultFormData={defaultFormData} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectActionMenu;
