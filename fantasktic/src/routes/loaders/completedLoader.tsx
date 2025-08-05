// Node Modules
import { databases, Query } from "@/lib/appwrite";

// Custom Modules
import { getUserId } from "@/lib/utils";

// Types
import type { LoaderFunction } from "react-router";

// Env Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getTasks = async () => {
  try {
    return await databases.listDocuments(APPWRITE_DATABASE_ID, "tasks", [
      Query.equal("userId", getUserId()), // Gets tasks that pertains to the current user.
      Query.equal("completed", true), // Gets complete tasks.
      Query.orderDesc("$updatedAt"), // Order tasks by last updated.
    ]);
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving completed tasks!");
  }
};

const completedTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();
  return { tasks };
};

export default completedTaskLoader;
