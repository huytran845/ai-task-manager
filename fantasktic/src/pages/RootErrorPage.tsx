// Node Modules
import { isRouteErrorResponse, useRouteError, Link } from "react-router";

// Components
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Assets
import { pageNotFound } from "@/assets";
import { HomeIcon, InboxIcon } from "lucide-react";

const RootErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />

      <div className="grow container flex flex-col justify-center items-center pt-32 pb-12">
        <h1 className="text-2xl font-semibold text-center sm:text-4xl">
          {isRouteErrorResponse(error)
            ? "Hello, this page doesn't exist!"
            : "Something went wrong."}
        </h1>

        <p className="text-muted-foreground max-w-[55ch] text-center mt-4 mb-6 sm:text-lg">
          {isRouteErrorResponse(error)
            ? "Let's return to the app and get your tasks managed."
            : "This error is on our task list. Please try again later."}
        </p>

        <div className="flex gap-2">
          <Button asChild>
            <Link to="/">
              <HomeIcon /> Return Home
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
          >
            <Link to="/app/inbox">
              <InboxIcon /> View Inbox
            </Link>
          </Button>
        </div>

        <figure className="mt-10">
          <img
            src={pageNotFound}
            width={560}
            height={373}
            alt="404 Page Not Found!"
          />
        </figure>
      </div>

      <Footer />
    </div>
  );
};

export default RootErrorPage;
