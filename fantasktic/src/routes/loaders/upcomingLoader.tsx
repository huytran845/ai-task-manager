// Node Modules
import { databases, Query } from "@/lib/appwrite";
import { startOfToday } from "date-fns";

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
      Query.isNotNull("dueDate"), // Get tasks with due dates
      Query.greaterThan("dueDate", startOfToday().toISOString()), // Filter tasks that's due after today
      Query.orderAsc("dueDate"), // Sort by due dates in ascending order
    ]);
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving upcoming tasks!");
  }
};

const upcomingTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();
  return { tasks };
};

export default upcomingTaskLoader;
