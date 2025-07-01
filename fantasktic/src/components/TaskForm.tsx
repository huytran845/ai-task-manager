// Node Modules
import React, { useState, useEffect, useCallback } from "react";
import * as chrono from "chrono-node";

// Custom Modules
import { formatCustomDate, getTaskDateColor, cn } from "@/lib/utils";

// Components
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

// Hooks
import { useProjects } from "@/contexts/ProjectContext";

// Assets
import {
  CalendarIcon,
  XIcon,
  InboxIcon,
  ChevronDownIcon,
  HashIcon,
  SendHorizonalIcon,
  CheckIcon,
} from "lucide-react";

// Types
import type { ClassValue } from "clsx";
import type { TaskForm } from "@/types";
import { Models } from "appwrite";

type TaskFormProps = {
  defaultFormData?: TaskForm;
  className?: ClassValue;
  mode: "create" | "edit";
  onCancel?: () => void;
  onSubmit?: (formData: TaskForm) => void;
};

const DEFAULT_FORM_DATA: TaskForm = {
  taskContent: "",
  dueDate: null,
  projectId: null,
};

const TaskForm: React.FC<TaskFormProps> = ({
  defaultFormData = DEFAULT_FORM_DATA,
  className,
  mode,
  onCancel,
  onSubmit,
}) => {
  const projects = useProjects();

  const [dateOpen, setDateOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [taskContent, setTaskContent] = useState(defaultFormData.taskContent);
  const [dueDate, setDueDate] = useState(defaultFormData.dueDate);

  const [projectId, setProjectId] = useState(defaultFormData.projectId);
  const [projectName, setProjectName] = useState("");
  const [projectColorHex, setProjectColorHex] = useState("");

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (projectId) {
      const { name, colorHex } = projects?.documents.find(
        ({ $id }) => projectId === $id,
      ) as Models.Document;

      setProjectName(name);
      setProjectColorHex(colorHex);
    }
  }, [projects, projectId]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      taskContent: taskContent,
      dueDate: dueDate,
      projectId: projectId,
    }));
  }, [taskContent, dueDate, projectId]);

  useEffect(() => {
    const chronoParsed = chrono.parse(taskContent);

    if (chronoParsed.length) {
      const lastDate = chronoParsed[chronoParsed.length - 1];
      setDueDate(lastDate.date());
    }
  }, [taskContent]);

  const handleSumbit = useCallback(() => {
    if (!taskContent) return;

    if (onSubmit) onSubmit(formData);

    setTaskContent("");
    setDueDate(null);
  }, [taskContent, onSubmit, formData]);

  return (
    <Card className={cn("focus-within:border-foreground/30", className)}>
      <CardContent className="p-2 -mb-2">
        <Textarea
          className="!border-0 !ring-0 mb-2 p-1"
          placeholder="After getting the groceries, take a walk in the park."
          autoFocus
          value={taskContent}
          onInput={(taskInputEvent) =>
            setTaskContent(taskInputEvent.currentTarget.value)
          }
          onKeyDown={(keyEvent) => {
            if (keyEvent.key === "Enter") {
              keyEvent.preventDefault();

              handleSumbit();
            }
          }} // Prevents user from using next line, and binds it to submit instead.
        />

        <div className="ring-1 ring-border rounded-md max-w-max">
          <Popover
            modal
            open={dateOpen}
            onOpenChange={setDateOpen}
          >
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setDateOpen((prev) => !prev)}
                className={cn(getTaskDateColor(dueDate, false))}
              >
                <CalendarIcon />
                {dueDate ? formatCustomDate(dueDate) : "Due Date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                disabled={{ before: new Date() }}
                selected={dueDate ? new Date(dueDate) : undefined}
                initialFocus
                onSelect={(selected) => {
                  setDueDate(selected || null);
                  setDateOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>

          {dueDate && (
            <Tooltip
              delayDuration={400}
              disableHoverableContent
            >
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2 -ms-2 mt-1"
                  aria-label="Remove Due Date"
                  onClick={() => setDueDate(null)}
                >
                  <XIcon />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Remove Due Date</TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>

      <Separator className="m-0 p-0" />

      <CardFooter className="-mt-2 flex justify-between items-center gap-2 p-2">
        <Popover
          modal
          open={searchOpen}
          onOpenChange={setSearchOpen}
        >
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((prev) => !prev)}
              className="max-w-max"
            >
              {projectName ? (
                <HashIcon color={projectColorHex} />
              ) : (
                <InboxIcon />
              )}

              <span className="truncate">{projectName || "Inbox"}</span>

              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-[240px] p-0"
            align="start"
            side="bottom"
          >
            <Command>
              <CommandInput placeholder="Search for your project..." />

              <CommandList>
                <ScrollArea>
                  <CommandEmpty>No projects found.</CommandEmpty>

                  <CommandGroup>
                    {projects?.documents.map(({ $id, name, colorHex }) => (
                      <CommandItem
                        key={$id}
                        onSelect={(selectedValue) => {
                          setProjectName(
                            selectedValue === projectName ? "" : name,
                          );
                          setProjectId(
                            selectedValue === projectName ? null : $id,
                          );
                          setProjectColorHex(
                            selectedValue === projectName
                              ? undefined
                              : colorHex,
                          );
                          setSearchOpen(false);
                        }}
                      >
                        <HashIcon color={colorHex} /> {name}
                        {projectName === name && (
                          <CheckIcon className="ms-auto" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            <span className="max-md:hidden">Cancel</span> <XIcon />
          </Button>

          <Button
            disabled={!taskContent}
            onClick={() => handleSumbit()}
          >
            <span className="max-md:hidden">
              {mode === "create" ? "Add Task" : "Save Changes"}
            </span>
            <SendHorizonalIcon />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskForm;
