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

// The primary task page that displays all of the user's uncompleted tasks.
const InboxPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const iconSize = 16;
  const fetcher = useFetcher();
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <Head
        title="Your Inbox - Fantasktic To-Do List and Project Management App"
        metaContent="The inbox that houses all the user's tasks that they've created."
      />
      <TopAppBar
        title="Inbox"
        taskCount={tasks.total}
      />
      <Page>
        <PageHeader>
          <PageTitle>Inbox</PageTitle>

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

          {/* Display the skeleton when fetching data. */}
          {fetcher.state !== "idle" && <TaskCardSkeleton />}

          {!showTaskForm && (
            <TaskCreateButton onClick={() => setShowTaskForm(true)} />
          )}

          {/* If there are no tasks and the user isn't making a new one, show the empty state. */}
          {!tasks.total && !showTaskForm && <TaskEmptyState type="inbox" />}

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

export default InboxPage;
