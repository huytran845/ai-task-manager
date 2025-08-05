// Components
import { Button } from "@/components/ui/button";

// Assets
import { CirclePlusIcon } from "lucide-react";
import React from "react";

// Types
/* The Omit utility type removes the specified properties from an object type.
   It will take the two arguments, the object type and the key to remove.
   In this case it will remove the className attribute so that styles can be applied internally instead of externally. */
type TaskCreateButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
>;

// Component TaskCreateButton was separately declared so that it can be styled here and exported to all the different pages.
const TaskCreateButton: React.FC<TaskCreateButtonProps> = (props) => {
  return (
    <Button
      variant="link"
      className="w-full justify-start mb-4 px-0"
      {...props}
    >
      <CirclePlusIcon /> Add Task
    </Button>
  );
};

export default TaskCreateButton;
