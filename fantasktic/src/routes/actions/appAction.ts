// Custom Modules
import { databases } from "@/lib/appwrite";
import { generateID, getUserId } from "@/lib/utils";

// Types
import type { ActionFunction } from "react-router";
import type { Task } from "@/types";

// Env Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const createTask = async (data: Task) => {
  try {
    return await databases.createDocument(
      APPWRITE_DATABASE_ID,
      "67ff2319000aa4a0313b", // This is the collection ID for tasks
      generateID(),
      { ...data, userId: getUserId() },
    );
  } catch (createTaskError) {
    console.log(createTaskError);
  }
};

const appAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as Task;

  if (request.method === "POST") {
    return await createTask(data);
  }
};

export default appAction;
