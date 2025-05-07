// Node Modules
import { databases, Query } from "@/lib/appwrite";
import { startOfToday, startOfTomorrow } from "date-fns";

// Custom Modules
import { getUserId } from "@/lib/utils";

// Types
import type { LoaderFunction } from "react-router";

// Env Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getTasks = async () => {
  try {
    return await databases.listDocuments(APPWRITE_DATABASE_ID, "tasks", [
      Query.equal("userId", getUserId()), // Gets tasks that pertains to the current user
      Query.equal("completed", false), // Gets incomplete tasks
      Query.and([
        // Gets the tasks ranging from after today but before tomorrow with precise ISO format
        Query.greaterThanEqual("dueDate", startOfToday().toISOString()),
        Query.lessThan("dueDate", startOfTomorrow().toISOString()),
      ]),
    ]);
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving tasks from today!");
  }
};

const todayTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();
  return { tasks };
};

export default todayTaskLoader;
