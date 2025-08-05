// Node Modules
import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router";

// Components
import Head from "@/components/Head";
import TopAppBar from "@/components/TopAppBar";
import { Button } from "@/components/ui/button";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import TaskCardSkeleton from "@/components/TaskCardSkeleton";
import ProjectActionMenu from "@/components/ProjectActionMenu";
import TaskCreateButton from "@/components/TaskCreateButton";
import TaskEmptyState from "@/components/TaskEmptyState";
import { Page, PageHeader, PageTitle, PageList } from "@/components/Page";

// Assets
import { MoreHorizontalIcon } from "lucide-react";

// Types
import type { Models } from "appwrite";

// The ProjectDetailsPage is the main page of a project, listing the project name and all of its associated tasks.
const ProjectDetailsPage = () => {
  const fetcher = useFetcher();
  const { project } = useLoaderData<{ project: Models.Document }>();
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

  // Get the tasks of the project that aren't completed.
  const projectTasks = project.tasks.filter(
    (taskInstance: Models.Document) => !taskInstance.completed,
  ) as Models.Document[];

  // Order tasks chronologically by their dueDate, tasks with the earliest dueDates appear first.
  projectTasks.sort((a, b) => {
    return a.dueDate - b.dueDate;
  });

  return (
    <>
      <Head
        title={
          project.name + " - Fantasktic To-Do List and Project Management App"
        }
        metaContent={
          "The home page of your choosen project " +
          project.name +
          " and all of its tasks."
        }
      />
      <TopAppBar title={project.name} />
      <Page>
        <PageHeader>
          <div className="flex items-center gap-2">
            <PageTitle>{project.name}</PageTitle>
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
                className="w-8 h-8 shrink-0"
                aria-label="More Actions"
              >
                <MoreHorizontalIcon />
              </Button>
            </ProjectActionMenu>
          </div>
        </PageHeader>

        <PageList>
          {projectTasks.map(({ $id, taskContent, completed, dueDate }) => (
            <TaskCard
              key={$id}
              id={$id}
              completed={completed}
              dueDate={dueDate}
              taskContent={taskContent}
              projectId={project}
            />
          ))}

          {/* Display skeleton for user to represent loading when fetching data. */}
          {fetcher.state !== "idle" && <TaskCardSkeleton />}

          {!showTaskForm && (
            <TaskCreateButton onClick={() => setShowTaskForm(true)} />
          )}

          {/* If no tasks, and form isn't open show empty state. */}
          {!projectTasks.length && !showTaskForm && (
            <TaskEmptyState type="project" />
          )}

          {showTaskForm && (
            <TaskForm
              className="mt-1"
              mode="create"
              defaultFormData={{
                taskContent: "",
                dueDate: null,
                projectId: project.$id,
              }}
              onCancel={() => setShowTaskForm(false)}
              onSubmit={(formData) => {
                fetcher.submit(JSON.stringify(formData), {
                  action: "/app",
                  method: "POST",
                  encType: "application/json",
                });
              }}
            />
          )}
        </PageList>
      </Page>
    </>
  );
};

export default ProjectDetailsPage;
