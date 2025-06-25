// Node Modules
import { databases, Query } from "@/lib/appwrite";
import { startOfToday, startOfTomorrow } from "date-fns";
import { redirect } from "react-router";

// Custom Modules
import { getUserId } from "@/lib/utils";

// Env Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// Types
import type { LoaderFunction } from "react-router";
import type { Models } from "appwrite";

export type AppLoaderData = {
  projects: Models.DocumentList<Models.Document>;
};

const getProjects = async () => {
  try {
    return await databases.listDocuments(APPWRITE_DATABASE_ID, "projects", [
      Query.select(["$id", "name", "colorName", "colorHex", "$createdAt"]),
      Query.orderDesc("$createdAt"),
      Query.limit(100),
      Query.equal("userId", getUserId()),
    ]);
  } catch (getProjectError) {
    console.log("Error occurred getting projects: ", getProjectError);
    throw new Error("Error occurred getting projects");
  }
};

const appLoader: LoaderFunction = async () => {
  const userId = getUserId();

  if (!userId) return redirect("/login");

  const projects = await getProjects();

  return { projects };
};

export default appLoader;
