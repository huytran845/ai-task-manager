// Node Modules
import { databases, Query } from "@/lib/appwrite";

// Custom Modules
import { getUserId } from "@/lib/utils";

// Env Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// Types
import type { LoaderFunction } from "react-router";

const getProjects = async () => {
  try {
    return await databases.listDocuments(APPWRITE_DATABASE_ID, "projects", [
      Query.select(["$id", "name", "colorName", "colorHex", "$createdAt"]),
      Query.equal("userId", getUserId()),
      Query.orderDesc("$createdAt"),
    ]);
  } catch (getProjectsError) {
    console.log(getProjectsError);
    throw new Error("Error getting projects");
  }
};

const projectsLoader: LoaderFunction = async () => {
  const projects = await getProjects();
  console.log(projects);
  return { projects };
};

export default projectsLoader;
