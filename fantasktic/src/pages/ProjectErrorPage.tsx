// Components
import Head from "@/components/Head";
import TopAppBar from "@/components/TopAppBar";

// Assets
import { pageNotFound } from "@/assets";

// ProjectErrorPage is displayed when user navigates to a project id that doesn't exist.
const ProjectErrorPage = () => {
  return (
    <>
      <Head
        title="Project Not Found!"
        metaContent="An error page for when an invalid project id page is being shown or linked to."
      />

      <TopAppBar title="Project Not Found!" />

      <div className="grow container flex flex-col justify-center items-center">
        <figure className="mt-10">
          <img
            src={pageNotFound}
            alt="404, Page not found"
            width={360}
          />
        </figure>

        <h1 className="text-2xl font-semibold text-center mt-4 mb-2">
          Project Not Found!
        </h1>
        <p className="text-muted-foreground max-w-[40ch] text-center">
          Oh no! There's no project that matches this ID. Please navigate back
          to your other projects, and select a valid project!
        </p>
      </div>
    </>
  );
};

export default ProjectErrorPage;
