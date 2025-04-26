// Node Modules
import { useState } from "react";

// Components
import Head from "@/components/Head";
import TopAppBar from "@/components/TopAppBar";
import { Page, PageHeader, PageTitle, PageList } from "@/components/Page";
import TaskCreateButton from "@/components/TaskCreateButton";
import TaskEmptyState from "@/components/TaskEmptyState";
import TaskForm from "@/components/TaskForm";

const InboxPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);

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
          {!showTaskForm && <TaskCreateButton />}
          {!showTaskForm && <TaskEmptyState type="inbox" />}
          {showTaskForm && (
            <TaskForm
              className="mt-1"
              mode="create"
            />
          )}
        </PageList>
      </Page>
    </>
  );
};

export default InboxPage;
