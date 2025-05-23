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
import type { ProjectForm } from "@/types";
import type { Models } from "appwrite";

const createProject = async (data: ProjectForm) => {
  let project: Models.Document | null = null;

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
      const aiGenTasks = JSON.parse((await getAiResponse(taskGenPrompt)) || "");
      console.log(aiGenTasks);
    } catch (err) {
      console.log("Error generating tasks: ", err);
    }
  }

  return redirect(`/app/projects/${project?.$id}`);
};

const projectAction: ActionFunction = async ({ request }) => {
  const method = request.method;
  const data = (await request.json()) as ProjectForm;

  if (method === "POST") {
    return await createProject(data);
  }

  return null;
};

export default projectAction;
