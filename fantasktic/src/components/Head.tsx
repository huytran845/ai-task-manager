// Node Modules
import { Helmet } from "@dr.pogodin/react-helmet"; // Dr.Pogodin's Helmet module has the updated library for React 19
import React from "react";

// Types
type HeadProps = {
  title: string;
  metaContent: string;
};

// Head component that accepts a title and metaContent for better SEO.
const Head: React.FC<HeadProps> = ({ title, metaContent }) => {
  // Utilizing Helmet module to update the tab name based on the user's current page.
  return (
    <Helmet title={title}>
      <meta
        name="description"
        content={metaContent}
      />
    </Helmet>
  );
};

export default Head;
