// Node Modules
import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { startOfToday } from "date-fns";

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

// The TodayPage contains all the tasks that are due today.
const TodayPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const iconSize = 16;
  const fetcher = useFetcher();
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <Head
        title="Today's Tasks - Fantasktic To-Do List and Project Management App"
        metaContent="The page that lists all tasks that are due today based on the user's timezone."
      />
      <TopAppBar
        title="Today"
        taskCount={tasks.total}
      />
      <Page>
        <PageHeader>
          <PageTitle>Today</PageTitle>

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

          {!tasks.total && !showTaskForm && <TaskEmptyState type="today" />}

          {/* The Taskform that is displayed on this page will post new tasks, but with the dueDate listed as today. */}
          {showTaskForm && (
            <TaskForm
              className="mt-1"
              mode="create"
              defaultFormData={{
                taskContent: "",
                dueDate: startOfToday(),
                projectId: null,
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

export default TodayPage;
