// Node Modules
import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";
import { useFetcher, useLocation } from "react-router";

// Custom Modules
import {
  formatCustomDate,
  getTaskDateColor,
  truncateString,
} from "@/lib/utils";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
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
import { Task } from "@/types";

type TaskCardProps = {
  id: string;
  completed: boolean;
  dueDate: Date;
  projectId: Models.Document | null;
  taskContent: string;
};

// The TaskCard Component is what houses a Task's information and displays it to the user.
const TaskCard: React.FC<TaskCardProps> = ({
  id,
  completed,
  dueDate,
  projectId,
  taskContent,
}) => {
  const iconSize: number = 14;
  const taskCharLength: number = 40;
  const location = useLocation();
  const fetcher = useFetcher();
  const fetcherTask = fetcher.json as Task; // Fetches data from the closest loader getting current page's task.
  const task: Task = {
    ...{ id, taskContent, completed, dueDate, projectId },
    ...fetcherTask,
  }; // Using spread syntax to merge the new and existing data to ensure no missing data occurs.
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Memoize completeTask to efficiently mark complete if user decides to complete/undo a task multiple times.
  const handleCompleteTask = useCallback(
    async (completed: boolean) => {
      return await fetcher.submit(JSON.stringify({ id: task.id, completed }), {
        action: "/app",
        method: "PUT",
        encType: "application/json",
      });
    },
    [task.id],
  );

  return (
    <>
      {/* Only show the task card if it isn't currently being edited. */}
      {!showTaskForm && (
        <div className="group/card relative flex gap-4 border-b-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "group/button rounded-full w-5 h-5 mt-2",
              task.completed && "bg-border",
            )}
            role="checkbox"
            aria-checked={task.completed}
            aria-label={`Mark task as ${task.completed ? "incomplete" : "complete"}`}
            aria-describedby="task-content"
            onClick={async () => {
              await handleCompleteTask(!task.completed);

              if (!task.completed) {
                toast.success("Your task has been marked complete!", {
                  action: {
                    label: "Undo",
                    onClick: () => {
                      handleCompleteTask(false); // Pre-ES6 use handleCompleteTask.bind(null, false) to pass the argument to handler function.
                    },
                  },
                });
              } else {
                toast.error("Your task was marked uncomplete!", {
                  action: {
                    label: "Undo",
                    onClick: () => {
                      handleCompleteTask(true);
                    },
                  },
                });
              }
            }}
          >
            <CheckIcon
              strokeWidth={4}
              className={cn(
                "!w-5 !h-4 text-muted-foreground group-hover/button:opacity-100 transition-opacity",
                task.completed ? "opacity-100" : "opacity-0",
              )}
            />
          </Button>

          <Card className="rounded-none flex w-full py-2 space-y-1.5 border-none">
            <CardContent className="p-0">
              <p
                id="task-content"
                className={cn(
                  "text-sm max-md:me-16",
                  task.completed && "text-muted-foreground line-through",
                )}
              >
                {task.taskContent}
              </p>
            </CardContent>
            <CardFooter className="p-0 flex gap-4">
              {task.dueDate && location.pathname !== "app/today" && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs text-muted-foreground",
                    getTaskDateColor(task.dueDate, task.completed),
                  )}
                >
                  <CalendarDaysIcon size={iconSize} />{" "}
                  {formatCustomDate(task.dueDate)}
                </div>
              )}

              {location.pathname !== "/app/inbox" &&
                location.pathname !== `/app/projects/${projectId?.$id}` && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground ms-auto">
                    <div className="truncate text-right">
                      {task.projectId?.name || "Inbox"}
                    </div>
                    {task.projectId ? (
                      <HashIcon
                        size={iconSize}
                        color={task.projectId.colorHex}
                      />
                    ) : (
                      <InboxIcon
                        size={iconSize}
                        className="text-muted-foreground"
                      />
                    )}
                  </div>
                )}
            </CardFooter>
          </Card>

          <div className="absolute top-1.5 right-0 bg-background ps-1 shadow-[-10px_0_5px_hsl(var(--background))] flex items-center gap-1 opacity-0 group-hover/card:opacity-100 focus-within:opacity-100 max-md:opacity-100">
            {/* Only allow the user to edit the task if it's not marked as complete. */}
            {!task.completed && (
              <Tooltip delayDuration={400}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 text-muted-foreground mt-1"
                    aria-label="Edit Task"
                    onClick={() => setShowTaskForm(true)} // If user wants to edit show the taskForm on page instead of the taskCard.
                  >
                    <EditIcon />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Edit Task</TooltipContent>
              </Tooltip>
            )}
            {/* If user wants to delete the task a dialog will popup for confirmation. */}
            <AlertDialog>
              <Tooltip delayDuration={400}>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 text-muted-foreground mt-1"
                      aria-label="Delete Task"
                    >
                      <Trash2Icon />
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>

                <TooltipContent>Delete Task</TooltipContent>
              </Tooltip>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this task?</AlertDialogTitle>

                  <AlertDialogDescription>
                    The "{truncateString(task.taskContent, taskCharLength)}"
                    task is about to be{" "}
                    <span className="text-red-500/70">permanently</span>{" "}
                    deleted. Confirm?
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600/60"
                    onClick={() => {
                      fetcher.submit(JSON.stringify({ id: task.id }), {
                        action: "/app",
                        method: "DELETE",
                        encType: "application/json",
                      });
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}

      {/* Triggers if user chooses to edit a task, and the form contains all the current task data. */}
      {showTaskForm && (
        <TaskForm
          className="my-1"
          defaultFormData={{
            ...task,
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

            setShowTaskForm(false); // Closes task form after edit.
          }}
        />
      )}
    </>
  );
};

export default TaskCard;
