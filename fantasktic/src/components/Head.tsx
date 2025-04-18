// Node Modules
import { Helmet } from "@dr.pogodin/react-helmet";
import React from "react";

// Types
type HeadProps = {
  title: string;
  metaContent: string;
};

const Head: React.FC<HeadProps> = ({ title, metaContent }) => {
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
