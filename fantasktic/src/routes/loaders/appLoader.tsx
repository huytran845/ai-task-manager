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

type TaskCounts = {
  inboxTasks: number;
  todayTasks: number;
  upcomingTasks: number;
  completedTasks: number;
};

export type AppLoaderData = {
  projects: Models.DocumentList<Models.Document>;
  taskCounts: TaskCounts;
};

// GetProjects queries the database for all projects that belong to the user, with a max limit of 100 projects.
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

// The getTaskCounts function retrieves the number of entries per page on the application for the user.
// Each page of the application gets its own unique query parameters to fetch the correct number for the respective page.
const getTaskCounts = async () => {
  const taskCounts: TaskCounts = {
    // Create a taskCounts object to store all variables for desired pages.
    inboxTasks: 0,
    todayTasks: 0,
    upcomingTasks: 0,
    completedTasks: 0,
  };
  try {
    const { total: totalInboxTasks } = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      "tasks",
      [
        Query.select(["$id"]),
        Query.isNull("projectId"),
        Query.equal("completed", false),
        Query.limit(1), // Limits Query to 1 for efficiency so that not all documents are fetched, but the total attribute is.
        Query.equal("userId", getUserId()),
      ],
    );

    taskCounts.inboxTasks = totalInboxTasks;
  } catch (inboxTaskCountError) {
    console.log(inboxTaskCountError);
    throw new Error("Error occurred getting inbox task counts");
  }

  try {
    const { total: totalTodayTasks } = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      "tasks",
      [
        Query.select(["$id"]),
        Query.and([
          Query.greaterThanEqual("dueDate", startOfToday().toISOString()),
          Query.lessThan("dueDate", startOfTomorrow().toISOString()),
        ]),
        Query.equal("completed", false),
        Query.limit(1),
        Query.equal("userId", getUserId()),
      ],
    );

    taskCounts.todayTasks = totalTodayTasks;
  } catch (todayTaskCountError) {
    console.log(todayTaskCountError);
    throw new Error("Error occurred getting today's task counts");
  }

  try {
    const { total: totalUpcomingTasks } = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      "tasks",
      [
        Query.select(["$id"]),
        Query.isNotNull("dueDate"),
        Query.greaterThan("dueDate", startOfToday().toISOString()),
        Query.equal("completed", false),
        Query.limit(1),
        Query.equal("userId", getUserId()),
      ],
    );

    taskCounts.upcomingTasks = totalUpcomingTasks;
  } catch (upcomingTaskCountError) {
    console.log(upcomingTaskCountError);
    throw new Error("Error occurred getting upcoming task counts");
  }

  try {
    const { total: totalCompletedTasks } = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      "tasks",
      [
        Query.select(["$id"]),
        Query.equal("completed", true),
        Query.limit(1),
        Query.equal("userId", getUserId()),
      ],
    );

    taskCounts.completedTasks = totalCompletedTasks;
  } catch (completedTaskCountError) {
    console.log(completedTaskCountError);
    throw new Error("Error occurred getting completed task counts");
  }

  return taskCounts;
};

const appLoader: LoaderFunction = async () => {
  const userId = getUserId();

  if (!userId) return redirect("/login"); // Checks if user is correct on each data request.

  const projects = await getProjects();
  const taskCounts = await getTaskCounts();

  return { projects, taskCounts };
};

export default appLoader;
