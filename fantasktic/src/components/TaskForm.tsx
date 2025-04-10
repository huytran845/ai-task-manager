// Node Modules
import { useState } from "react";

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

// Assets
import {
  CalendarIcon,
  XIcon,
  InboxIcon,
  ChevronDownIcon,
  HashIcon,
  SendHorizonalIcon,
} from "lucide-react";

const TaskForm = () => {
  const [dateOpen, setDateOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Card className="focus-within:border-foreground/30">
      <CardContent className="p-2 -mb-2">
        <Textarea
          className="!border-0 !ring-0 mb-2 p-1"
          placeholder="After getting the groceries, take a walk in the park."
          autoFocus
        />

        <div className="ring-1 ring-border rounded-md max-w-max">
          <Popover
            modal
            open={dateOpen} // Note that this makes the modal only close and open by clicking on the name, if the x icon does nothing else revert it back
          >
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setDateOpen((prev) => !prev)}
              >
                <CalendarIcon /> Due Date
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                disabled={{ before: new Date() }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

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
              >
                <XIcon />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Remove Due Date</TooltipContent>
          </Tooltip>
        </div>
      </CardContent>

      <Separator className="m-0 p-0" />

      <CardFooter className="-mt-2 flex justify-between items-center gap-2 p-2">
        <Popover
          modal
          open={searchOpen}
        >
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={false}
              onClick={() => setSearchOpen((prev) => !prev)}
              className="max-w-max"
            >
              <InboxIcon /> Inbox <ChevronDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-[240px] p-0"
            align="start"
          >
            <Command>
              <CommandInput placeholder="Search for your project..." />

              <CommandList>
                <ScrollArea>
                  <CommandEmpty>No projects found.</CommandEmpty>

                  <CommandGroup>
                    <CommandItem>
                      <HashIcon /> Project 1
                    </CommandItem>

                    <CommandItem>
                      <HashIcon /> Project 2
                    </CommandItem>

                    <CommandItem>
                      <HashIcon /> Project 3
                    </CommandItem>

                    <CommandItem>
                      <HashIcon /> Project 4
                    </CommandItem>

                    <CommandItem>
                      <HashIcon /> Project 5
                    </CommandItem>

                    <CommandItem>
                      <HashIcon /> Project 6
                    </CommandItem>

                    <CommandItem>
                      <HashIcon /> Project 7
                    </CommandItem>

                    <CommandItem>
                      <HashIcon /> Project 8
                    </CommandItem>

                    <CommandItem>
                      <HashIcon /> Project 9
                    </CommandItem>

                    <CommandItem>
                      <HashIcon /> Project 10
                    </CommandItem>

                    <CommandItem>
                      <HashIcon /> Project 11
                    </CommandItem>

                    <CommandItem>
                      <HashIcon /> Project 12
                    </CommandItem>
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <span className="max-md:hidden">Cancel</span> <XIcon />
          </Button>

          <Button>
            <span className="max-md:hidden">Add Task</span>{" "}
            <SendHorizonalIcon />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskForm;
