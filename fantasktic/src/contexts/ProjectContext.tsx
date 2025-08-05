// Node Modules
import React, { createContext, useContext } from "react";

// Types
import type { Models } from "appwrite";

// Define the props expected by the ProjectProvider component.
// Projects are a list of documents representing all the projects.
// The children are any nested components that will utilize the context.
type ProjectProviderProps = {
  projects: Models.DocumentList<Models.Document>;
  children: React.ReactNode;
};

// Create a new context for project data.
// It defaults to null until the provider sets a value.
const ProjectContext =
  createContext<Models.DocumentList<Models.Document> | null>(null);

// Define the provider component that supplies data to the context.
export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  projects,
  children,
}) => {
  return (
    // Wraps children with the provider so useProjects can provide context to any descendants.
    <ProjectContext.Provider value={projects}>
      {children}
    </ProjectContext.Provider>
  );
};

// Export as a hook to access project data without importing the ProjectContext.
export const useProjects = () => useContext(ProjectContext);
