// Node Modules
import { databases, Query } from "@/lib/appwrite";

// Custom Modules
import { getUserId } from "@/lib/utils";

// Env Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// Types
import type { LoaderFunction } from "react-router";

const getProjects = async (query: string) => {
  try {
    return await databases.listDocuments(APPWRITE_DATABASE_ID, "projects", [
      Query.select(["$id", "name", "colorName", "colorHex", "$createdAt"]),
      Query.contains("name", query),
      Query.equal("userId", getUserId()),
      Query.orderDesc("$createdAt"),
    ]);
  } catch (getProjectsError) {
    console.log(getProjectsError);
    throw new Error("Error getting projects");
  }
};

const projectsLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const projects = await getProjects(query);

  return { projects };
};

export default projectsLoader;
