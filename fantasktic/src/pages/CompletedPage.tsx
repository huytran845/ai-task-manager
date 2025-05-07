// Node Modules
import { useFetcher, useLoaderData } from "react-router";

// Components
import Head from "@/components/Head";
import TopAppBar from "@/components/TopAppBar";
import { Page, PageHeader, PageTitle, PageList } from "@/components/Page";
import TaskEmptyState from "@/components/TaskEmptyState";
import TaskCard from "@/components/TaskCard";
import TaskCardSkeleton from "@/components/TaskCardSkeleton";

// Assets
import { CheckCircle2Icon } from "lucide-react";

// Types
import type { Models } from "appwrite";

const CompletedPage = () => {
  const iconSize = 16;
  const fetcher = useFetcher();
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <Head
        title="Completed Tasks - Fantasktic To-Do List and Project Management App"
        metaContent="This page lists all tasks that have been marked completed by the user."
      />
      <TopAppBar
        title="Completed"
        taskCount={tasks.total}
      />
      <Page>
        <PageHeader>
          <PageTitle>Completed</PageTitle>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CheckCircle2Icon size={iconSize} /> {tasks.total} tasks
          </div>
        </PageHeader>

        <PageList>
          {tasks.documents.map(
            ({ $id, completed, dueDate, projectId, taskContent }) => (
              <TaskCard
                key={$id}
                id={$id}
                completed={completed}
                dueDate={dueDate}
                projectId={projectId}
                taskContent={taskContent}
              />
            ),
          )}

          {fetcher.state !== "idle" && <TaskCardSkeleton />}

          {!tasks.total && <TaskEmptyState type="completed" />}
        </PageList>
      </Page>
    </>
  );
};

export default CompletedPage;
