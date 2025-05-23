// Node Modules
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useCallback } from "react";

// Components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

// Assets
import { CircleIcon, ChevronDownIcon, CheckIcon, BotIcon } from "lucide-react";

// Constants
import { PROJECT_COLORS } from "@/constants";

const DEFAULT_PROJECT_NAME = "Untitled";
const DEFAULT_PROJECT_COLOR_NAME = "Slate";
const DEFAULT_PROJECT_COLOR_HEX = "#64748b";

const DEFAULT_FORM_DATA: Project = {
  id: null,
  name: DEFAULT_PROJECT_NAME,
  colorName: DEFAULT_PROJECT_COLOR_NAME,
  colorHex: DEFAULT_PROJECT_COLOR_HEX,
};

// Types
import type { Project, ProjectForm } from "@/types";

type ProjectFormProps = {
  defaultFormData?: Project;
  mode: "create" | "edit";
  onCancel?: () => void;
  onSubmit?: (formData: ProjectForm) => void;
};

const ProjectForm: React.FC<ProjectFormProps> = ({
  defaultFormData = DEFAULT_FORM_DATA,
  mode,
  onCancel = () => {},
  onSubmit,
}) => {
  const [projectName, setProjectName] = useState<string>(defaultFormData.name);
  const [projectNameCharCount, setProjectNameCharCount] = useState<number>(
    defaultFormData.name.length,
  );
  const [colorName, setColorName] = useState<string>(defaultFormData.colorName);
  const [colorHex, setColorHex] = useState<string>(defaultFormData.colorHex);
  const [openColor, setOpenColor] = useState<boolean>(false);
  const [aiTaskGen, setAiTaskGen] = useState<boolean>(false);
  const [taskGenPrompt, setTaskGenPrompt] = useState<string>("");
  const [formData, setFormData] = useState<ProjectForm>({
    ...defaultFormData,
    aiTaskGen: aiTaskGen,
    taskGenPrompt: taskGenPrompt,
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: projectName,
      colorName: colorName,
      colorHex: colorHex,
      aiTaskGen: aiTaskGen,
      taskGenPrompt: taskGenPrompt,
    }));
  }, [projectName, colorName, colorHex, aiTaskGen, taskGenPrompt]);

  const handleSubmit = useCallback(() => {
    if (onSubmit) onSubmit(formData);
  }, [onSubmit, formData]);

  const handleKeySubmit = useCallback(
    (
      keyPressEvent: React.KeyboardEvent<
        HTMLInputElement | HTMLTextAreaElement
      >,
    ) => {
      if (keyPressEvent.key === "Enter" && !keyPressEvent.shiftKey) {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>{mode === "create" ? "Add Project" : "Edit"}</CardTitle>
      </CardHeader>
      <Separator className="-mt-7 -mb-7" />
      <CardContent className="p-4 grid grid-cols-1 gap-2">
        <div>
          <Label htmlFor="projectName">Name</Label>
          <Input
            type="text"
            id="projectName"
            className="mt-3 mb-1"
            onInput={(inputEvent) => {
              setProjectName(inputEvent.currentTarget.value);
              setProjectNameCharCount(inputEvent.currentTarget.value.length);
            }}
            placeholder="Untitled"
            value={projectName}
            maxLength={120}
            onKeyDown={handleKeySubmit}
          />

          <div
            className={cn(
              "text-xs text-muted-foreground max-w-max ms-auto",
              projectNameCharCount >= 110 && "text-destructive",
            )}
          >
            {projectNameCharCount}/120
          </div>
        </div>

        <div>
          <Label htmlFor="color">Color</Label>

          <Popover
            modal
            open={openColor}
            onOpenChange={setOpenColor}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full mt-3"
                id="color"
              >
                <CircleIcon fill={colorHex} />
                {colorName}
                <ChevronDownIcon className="ms-auto" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              side="bottom"
              className="p-0 w-[478px] max-sm:w-[360px]"
            >
              <Command>
                <CommandInput placeholder="Search color..." />
                <CommandList>
                  <ScrollArea>
                    <CommandEmpty>Color not found.</CommandEmpty>

                    <CommandGroup>
                      {PROJECT_COLORS.map(({ name, hex }) => (
                        <CommandItem
                          key={name}
                          value={`${name}=${hex}`}
                          onSelect={(value) => {
                            const [selectedName, selectedHex] =
                              value.split("=");
                            setColorName(selectedName);
                            setColorHex(selectedHex);
                            setOpenColor(false);
                          }}
                        >
                          <CircleIcon fill={hex} />
                          {name}

                          {colorName === name && (
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
        </div>

        {mode === "create" && (
          <div className="border rounded-md mt-6">
            <div className="flex items-center gap-3 py-2 px-3">
              <BotIcon className="text-muted-foreground shrink-0" />

              <div className="space-y-0.5 me-auto">
                <Label
                  htmlFor="ai_generate"
                  className="block text-sm"
                >
                  AI Task Generator
                </Label>
                <p className="text-xs text-muted-foreground">
                  Have AI generate tasks for you by providing a prompt.
                </p>
              </div>

              <Switch
                id="ai_generate"
                onCheckedChange={setAiTaskGen}
              />
            </div>

            {aiTaskGen && (
              <Textarea
                autoFocus
                placeholder="Describe your project. What is the main goal it will complete?"
                className="border-none"
                value={taskGenPrompt}
                onChange={(promptEvent) =>
                  setTaskGenPrompt(promptEvent.currentTarget.value)
                }
                onKeyDown={handleKeySubmit}
              />
            )}
          </div>
        )}
      </CardContent>
      <Separator className="-mt-7 -mb-7" />
      <CardFooter className="flex justify-end gap-3 p-4">
        <Button
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          disabled={!projectName || (aiTaskGen && !taskGenPrompt)}
          onClick={handleSubmit}
        >
          {mode === "create" ? "Create" : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectForm;
