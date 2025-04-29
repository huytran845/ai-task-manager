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

// Types
import type { Models } from "appwrite";

const InboxPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);

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
        taskCount={20}
      />
      <Page>
        <PageHeader>
          <PageTitle>Inbox</PageTitle>
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
          {!showTaskForm && (
            <TaskCreateButton onClick={() => setShowTaskForm(true)} />
          )}
          {!showTaskForm && <TaskEmptyState type="inbox" />}
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
