// Node Modules
import { Helmet, HelmetProvider } from "@dr.pogodin/react-helmet";
import React from "react";

// Types
type HeadProps = {
  title: string;
};

const Head: React.FC<HeadProps> = ({ title }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </HelmetProvider>
  );
};

export default Head;
