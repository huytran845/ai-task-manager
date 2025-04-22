// Components
import Head from "@/components/Head";
import TopAppBar from "@/components/TopAppBar";

const InboxPage = () => {
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
      <div className="h-[400vh]"></div>
    </>
  );
};

export default InboxPage;
