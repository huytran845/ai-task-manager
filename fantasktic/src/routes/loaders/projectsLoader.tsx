// Node Modules
import { databases, Query } from "@/lib/appwrite";

// Custom Modules
import { getUserId } from "@/lib/utils";

// Env Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// Types
import type { LoaderFunction } from "react-router";

// The getProjects function is the primary data fetching function for the projects page.
// It accepts a query as type string, and searches the projects based on defined parameters.
const getProjects = async (query: string) => {
  try {
    return await databases.listDocuments(APPWRITE_DATABASE_ID, "projects", [
      Query.select(["$id", "name", "colorName", "colorHex", "$createdAt"]), // Returns these attributes when fetching.
      Query.contains("name", query), // Gets projects that match the name in the query, returns all projects if empty.
      Query.equal("userId", getUserId()), // Only retrieve projects owned by the current user.
      Query.orderDesc("$createdAt"), // Ordered by creation date, with the earliest coming first.
    ]);
  } catch (getProjectsError) {
    console.log(getProjectsError);
    throw new Error("Error getting projects");
  }
};

// projectsLoader fetches projects based on a request when it gets called.
const projectsLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url); // Parse the request url.
  const query = url.searchParams.get("q") || ""; // Extracts query from "q", no query is an empty string.
  const projects = await getProjects(query); // Calls the fetch function with the query.

  return { projects };
};

export default projectsLoader;
