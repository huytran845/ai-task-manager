// Node Modules
import { cn } from "@/lib/utils";
import React, { useCallback, useRef, useState } from "react";
import { useLoaderData, useFetcher } from "react-router";

// Components
import Head from "@/components/Head";
import { Button } from "@/components/ui/button";
import TopAppBar from "@/components/TopAppBar";
import ProjectFormDialog from "@/components/ProjectFormDialog";
import { Page, PageTitle, PageHeader, PageList } from "@/components/Page";
import ProjectCard from "@/components/ProjectCard";
import ProjectSearchField from "@/components/ProjectSearchField";

// Assets
import { PlusIcon } from "lucide-react";

// Constants
const SEARCH_TIMEOUT_DELAY = 500;

// Types
import type { Models } from "appwrite";
import type { SearchState } from "@/components/ProjectSearchField";

type DataType = {
  projects: Models.DocumentList<Models.Document>;
};

const ProjectsPage = () => {
  const fetcher = useFetcher();
  const fetcherData = fetcher.data as DataType;
  const loaderData = useLoaderData() as DataType;
  const { projects } = fetcherData || loaderData;
  const [searchingState, setSearchingState] = useState<SearchState>("idle");

  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleProjectSearch = useCallback(
    (searchEvent: React.ChangeEvent<HTMLInputElement>) => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      const submitTarget = searchEvent.currentTarget.form;

      searchTimeout.current = setTimeout(async () => {
        setSearchingState("searching");
        await fetcher.submit(submitTarget);
        setSearchingState("idle");
      }, SEARCH_TIMEOUT_DELAY);

      setSearchingState("loading");
    },
    [],
  );

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

          <fetcher.Form
            method="get"
            action="/app/projects"
          >
            <ProjectSearchField
              handleChange={handleProjectSearch}
              searchingState={searchingState}
            />
          </fetcher.Form>
        </PageHeader>

        <PageList>
          <div className="h-8 pb-1.5 mb-1.5 flex items-center border-b">
            <div className="text-sm">{projects.total} Projects</div>
          </div>

          <div className={cn(searchingState === "searching" && "opacity-25")}>
            {projects.documents.map((project) => (
              <ProjectCard
                key={project.$id}
                project={project}
              />
            ))}

            {projects.total === 0 && (
              <div className="h-14 flex justify-center items-center text-muted-foreground">
                No Projects Found!
              </div>
            )}
          </div>
        </PageList>
      </Page>
    </>
  );
};

export default ProjectsPage;
