// Node Modules
import { databases } from "@/lib/appwrite";

// Custom Modules
import { getUserId } from "@/lib/utils";

// Env Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// Types
import type { LoaderFunction } from "react-router";

// GetProject fetches the desired project based on the provided projectId.
const getProject = async (projectId: string) => {
  try {
    const project = await databases.getDocument(
      APPWRITE_DATABASE_ID,
      "projects",
      projectId,
    );

    // Check if user has ownership of the project before returning.
    if (project.userId !== getUserId()) {
      throw new Error(
        "Unauthorized: Current user doesn't match requested project owner.",
      );
    }

    return project;
  } catch (getProjectError) {
    console.log("Error occurred while getting project: ", getProjectError);

    if (getProjectError instanceof Error) {
      throw new Error(getProjectError.message);
    }

    throw new Error("Error getting project");
  }
};

const projectDetailsLoader: LoaderFunction = async ({ params }) => {
  const { projectId } = params as { projectId: string };

  const project = await getProject(projectId);

  return { project };
};

export default projectDetailsLoader;
