// Node Modules
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useFetcher } from "react-router";

// Custom Modules
import { formatCustomDate, getTaskDateColor } from "@/lib/utils";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import TaskForm from "@/components/TaskForm";

// Assets
import {
  CheckIcon,
  CalendarDaysIcon,
  HashIcon,
  InboxIcon,
  EditIcon,
  Trash2Icon,
} from "lucide-react";

// Types
import type { Models } from "appwrite";

type TaskCardProps = {
  id: string;
  completed: boolean;
  dueDate: Date;
  projectId: Models.Document | null;
  taskContent: string;
};

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  completed,
  dueDate,
  projectId,
  taskContent,
}) => {
  const iconSize: number = 14;
  const fetcher = useFetcher();
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <>
      {!showTaskForm && (
        <div className="group/card relative flex gap-4 border-b-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "group/button rounded-full w-5 h-5 mt-2",
              completed && "bg-border",
            )}
            role="checkbox"
            aria-checked={completed}
            aria-label={`Mark task as ${completed ? "incomplete" : "complete"}`}
            aria-describedby="task-content"
          >
            <CheckIcon
              strokeWidth={4}
              className={cn(
                "!w-5 !h-4 text-muted-foreground group-hover/button:opacity-100 transition-opacity",
                completed ? "opacity-100" : "opacity-0",
              )}
            />
          </Button>

          <Card className="rounded-none flex w-full py-2 space-y-1.5 border-none">
            <CardContent className="p-0">
              <p
                id="task-content"
                className={cn(
                  "text-sm max-md:me-16",
                  completed && "text-muted-foreground line-through",
                )}
              >
                {taskContent}
              </p>
            </CardContent>
            <CardFooter className="p-0 flex gap-4">
              {dueDate && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs text-muted-foreground",
                    getTaskDateColor(dueDate, completed),
                  )}
                >
                  <CalendarDaysIcon size={iconSize} />{" "}
                  {formatCustomDate(dueDate)}
                </div>
              )}

              <div className="flex items-center gap-1 text-xs text-muted-foreground ms-auto">
                <div className="truncate text-right">
                  {projectId?.name || "Inbox"}
                </div>
                {projectId ? (
                  <HashIcon size={iconSize} />
                ) : (
                  <InboxIcon
                    size={iconSize}
                    className="text-muted-foreground"
                  />
                )}
              </div>
            </CardFooter>
          </Card>

          <div className="absolute top-1.5 right-0 bg-background ps-1 shadow-[-10px_0_5px_hsl(var(--background))] flex items-center gap-1 opacity-0 group-hover/card:opacity-100 focus-within:opacity-100 max-md:opacity-100">
            {!completed && (
              <Tooltip delayDuration={400}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 text-muted-foreground mt-1"
                    aria-label="Edit Task"
                    onClick={() => setShowTaskForm(true)}
                  >
                    <EditIcon />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Edit Task</TooltipContent>
              </Tooltip>
            )}
            <Tooltip delayDuration={400}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 text-muted-foreground mt-1"
                  aria-label="Delete Task"
                >
                  <Trash2Icon />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Delete Task</TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}

      {showTaskForm && (
        <TaskForm
          className="my-1"
          defaultFormData={{
            id,
            taskContent,
            dueDate,
            projectId: projectId && projectId?.$id,
          }}
          mode="edit"
          onCancel={() => setShowTaskForm(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData), {
              action: "/app",
              method: "PUT",
              encType: "application/json",
            });
          }}
        />
      )}
    </>
  );
};

export default TaskCard;
