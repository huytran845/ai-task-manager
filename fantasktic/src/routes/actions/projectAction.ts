// Node Modules
import { redirect } from "react-router";

// Custom Modules
import { databases } from "@/lib/appwrite";
import getAiResponse from "@/lib/geminiAI";
import { generateID, getUserId } from "@/lib/utils";

// Environment Variables
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// Types
import type { ActionFunction } from "react-router";
import type { ProjectForm, Project } from "@/types";
import type { Models } from "appwrite";

type aiGenTask = {
  taskContent: string;
  dueDate: Date | null;
};

const createProject = async (data: ProjectForm) => {
  let project: Models.Document | null = null;
  let aiGeneratedTasks: aiGenTask[] = [];

  const aiTaskGen = data.aiTaskGen;
  const taskGenPrompt = data.taskGenPrompt;

  try {
    project = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      "projects",
      generateID(),
      {
        name: data.name,
        colorName: data.colorName,
        colorHex: data.colorHex,
        userId: getUserId(),
      },
    );
  } catch (err) {
    console.log("Error creating project: ", err);
  }

  // Generate tasks using AI if option was selected
  if (aiTaskGen) {
    try {
      aiGeneratedTasks = JSON.parse((await getAiResponse(taskGenPrompt)) || "");
    } catch (err) {
      console.log("Error generating tasks: ", err);
    }
  }

  // If any tasks were generated, map each to a promise to store the task in the database
  if (aiGeneratedTasks.length) {
    const promises = aiGeneratedTasks.map((task) => {
      return databases.createDocument(
        APPWRITE_DATABASE_ID,
        "tasks",
        generateID(),
        {
          ...task,
          projectId: project?.$id,
          userId: getUserId(),
        },
      );
    });

    try {
      await Promise.all(promises);
    } catch (err) {
      console.log("Error storing project tasks: ", err);
    }
  }

  return redirect(`/app/projects/${project?.$id}`);
};

const deleteProject = async (data: Project) => {
  const documentId = data.id;

  if (!documentId) throw new Error("No project found with provided id.");

  try {
    await databases.deleteDocument(
      APPWRITE_DATABASE_ID,
      "projects",
      documentId,
    );
  } catch (deleteProjectError) {
    console.log("Error occurred deleting project: ", deleteProjectError);
  }
};

const projectAction: ActionFunction = async ({ request }) => {
  const method = request.method;
  const data = (await request.json()) as ProjectForm;

  if (method === "POST") {
    return await createProject(data);
  }

  if (method === "DELETE") {
    return await deleteProject(data);
  }

  return null;
};

export default projectAction;
