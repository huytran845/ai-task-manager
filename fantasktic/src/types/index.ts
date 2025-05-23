// Types utilized in application
type Project = {
  id: string | null;
  name: string;
  colorName: string;
  colorHex: string;
};

type ProjectForm = {
  id: string | null;
  name: string;
  colorName: string;
  colorHex: string;
  aiTaskGen: boolean;
  taskGenPrompt: string;
};

type Task = {
  id?: string;
  taskContent: string;
  dueDate: Date | null;
  completed?: boolean;
  projectId: Project | null;
  userId: string;
};

type TaskForm = {
  id?: string;
  taskContent: string;
  dueDate: Date | null;
  completed?: boolean;
  projectId: string | null;
};

export type { Project, ProjectForm, Task, TaskForm };
