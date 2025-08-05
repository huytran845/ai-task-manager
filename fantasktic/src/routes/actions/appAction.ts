// Custom Modules
import { databases } from "@/lib/appwrite";
import { generateID, getUserId } from "@/lib/utils";

// Types
import type { ActionFunction } from "react-router";
import type { Task } from "@/types";

// Env Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// CreateTask is an async function that will attempt to create a new task in the database.
const createTask = async (data: Task) => {
  try {
    return await databases.createDocument(
      APPWRITE_DATABASE_ID,
      "tasks", // This is the collection ID for tasks
      generateID(),
      { ...data, userId: getUserId() },
    );
  } catch (createTaskError) {
    console.log(createTaskError);
  }
};

// Async function updateTask takes the updated task data and attempts to PUT it into the database.
const updateTask = async (data: Task) => {
  const documentId = data.id; // Extract document id from the data

  if (!documentId) throw new Error("Task id not found!");

  delete data.id; // Deletes the id field from the data after extraction since only the contents need to be updated.

  try {
    return await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      "tasks",
      documentId,
      data,
    );
  } catch (updateTaskError) {
    console.log(updateTaskError);
  }
};

// DeleteTask is will attempt to delete the provided data from the database based on the taskId.
const deleteTask = async (data: Task) => {
  const documentId = data.id;

  if (!documentId) throw new Error("Task Id not found!");

  try {
    await databases.deleteDocument(APPWRITE_DATABASE_ID, "tasks", documentId);
  } catch (deleteTaskError) {
    console.log(deleteTaskError);
  }
};

const appAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as Task;

  if (request.method === "POST") {
    return await createTask(data);
  }

  if (request.method === "PUT") {
    return await updateTask(data);
  }

  if (request.method === "DELETE") {
    return await deleteTask(data);
  }
};

export default appAction;
