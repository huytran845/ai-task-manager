// Node Modules
import { cn } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";
import { useLoaderData, useFetcher } from "react-router";

// Components
import Head from "@/components/Head";
import { Button } from "@/components/ui/button";
import TopAppBar from "@/components/TopAppBar";
import ProjectFormDialog from "@/components/ProjectFormDialog";
import { Page, PageTitle, PageHeader, PageList } from "@/components/Page";
import ProjectCard from "@/components/ProjectCard";

// Assets
import { PlusIcon } from "lucide-react";

// Types
import type { Models } from "appwrite";

type DataType = {
  projects: Models.DocumentList<Models.Document>;
};

const ProjectsPage = () => {
  const loaderData = useLoaderData() as DataType;
  const { projects } = loaderData;

  return (
    <>
      <Head
        title="My Projects - Fantasktic To-Do List and Project Management App"
        metaContent="The projects page houses all the user created projects along with its associated tasks."
      />

      <TopAppBar title="My Projects" />

      <Page>
        <PageHeader>
          <div className="flex items-center gap-2">
            <PageTitle>My Projects</PageTitle>

            <ProjectFormDialog method="POST">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8"
                aria-label="Create a project"
              >
                <PlusIcon />
              </Button>
            </ProjectFormDialog>
          </div>
        </PageHeader>

        <PageList>
          <div className="h-8 pb-1.5 mb-1.5 flex items-center border-b">
            <div className="text-sm">{projects.total} Projects</div>
          </div>

          <div className="">
            {projects.documents.map((project) => (
              <ProjectCard
                key={project.$id}
                project={project}
              />
            ))}
          </div>
        </PageList>
      </Page>
    </>
  );
};

export default ProjectsPage;
