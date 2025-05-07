// Node Modules
import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router";

// Components
import Head from "@/components/Head";
import TopAppBar from "@/components/TopAppBar";
import { Page, PageHeader, PageTitle, PageList } from "@/components/Page";
import TaskCreateButton from "@/components/TaskCreateButton";
import TaskEmptyState from "@/components/TaskEmptyState";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import TaskCardSkeleton from "@/components/TaskCardSkeleton";

// Assets
import { CircleIcon } from "lucide-react";

// Types
import type { Models } from "appwrite";

const UpcomingPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const iconSize = 16;
  const fetcher = useFetcher();
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <Head
        title="Upcoming Tasks - Fantasktic To-Do List and Project Management App"
        metaContent="Upcoming tasks that users have created will appear here."
      />
      <TopAppBar
        title="Upcoming"
        taskCount={tasks.total}
      />
      <Page>
        <PageHeader>
          <PageTitle>Upcoming</PageTitle>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CircleIcon size={iconSize} /> {tasks.total} tasks
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

          {!showTaskForm && (
            <TaskCreateButton onClick={() => setShowTaskForm(true)} />
          )}

          {!tasks.total && !showTaskForm && <TaskEmptyState type="upcoming" />}

          {showTaskForm && (
            <TaskForm
              className="mt-1"
              mode="create"
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

export default UpcomingPage;
