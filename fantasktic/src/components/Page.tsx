// Types
import type { PropsWithChildren } from "react";

// Page component houses other components, and just acts as the shell for a page.
const Page: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="container md:max-w-[768px]">{children}</div>;
};

// PageHeader is the upper portion of the page, and acts as a container for the upper part.
const PageHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="pt-2 pb-3 space-y-2 md:px-4 lg:px-10">{children}</div>;
};

// PageTitle houses text to display within the header, or anywhere it's imported.
const PageTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return <h1 className="text-2xl font-semibold">{children}</h1>;
};

// PageList component acts as the body of the Page.
// It acts similarly to a list component housing multiple children like list items.
const PageList: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="pt-2 pb-20 md:px-4 lg:px-10">{children}</div>;
};

export { Page, PageHeader, PageTitle, PageList };
