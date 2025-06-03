// Node Modules
import { Link } from "react-router";

// Components
import { Button } from "@/components/ui/button";
import ProjectActionMenu from "@/components/ProjectActionMenu";

// Assets
import { HashIcon, MoreHorizontalIcon } from "lucide-react";

// Types
import type { Models } from "appwrite";
import React from "react";

type ProjectCardProps = {
  project: Models.Document;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group/card relative h-14 flex items-center gap-3 px-2 rounded-lg hover:bg-secondary">
      <div className="w-full flex gap-3">
        <HashIcon
          size={16}
          color={project.colorHex}
          className="shrink-0 mt-0.5"
        />

        <p className="text-sm truncate max-w-[48ch]">{project.name}</p>
      </div>

      {/* Action Menu */}
      <ProjectActionMenu
        defaultFormData={{
          id: project.$id,
          name: project.name,
          colorName: project.colorName,
          colorHex: project.colorHex,
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="relative z-20 shrink-0 ms-auto opacity-0 group-hover/card:opacity-100 max-md:opacity-100"
          aria-label="More Actions"
        >
          <MoreHorizontalIcon />
        </Button>

        <Link
          to={`/app/projects/${project.$id}`}
          className="absolute inset-0 z-10"
        />
      </ProjectActionMenu>
    </div>
  );
};

export default ProjectCard;
