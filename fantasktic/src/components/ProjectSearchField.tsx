// Node Modules
import { cn } from "@/lib/utils";

// Components
import { Input } from "@/components/ui/input";

// Assets
import { Loader2Icon, SearchIcon } from "lucide-react";
import React from "react";

// Types
export type SearchState = "idle" | "loading" | "searching";

type ProjectSearchFieldProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  searchingState: SearchState;
};

// ProjectSearchfield Component is a search field that accepts a handleChange function for when the user types in the Input component, and a searchingState to properly telegraph the current state of the search.
const ProjectSearchField: React.FC<ProjectSearchFieldProps> = ({
  handleChange,
  searchingState,
}) => {
  const iconSize = 18;

  return (
    <div className="relative">
      <SearchIcon
        size={iconSize}
        className="absolute top-1/2 -translate-y-1/2 left-2 text-muted-foreground pointer-events-none"
      />
      <Input
        type="text"
        name="q"
        placeholder="Search projects..."
        className="px-8"
        onChange={handleChange}
      />
      <Loader2Icon
        size={iconSize}
        className={cn(
          "absolute top-2 right-2 text-muted-foreground pointer-events-none hidden",
          searchingState !== "idle" && "block animate-spin",
        )}
      />
    </div>
  );
};

export default ProjectSearchField;
