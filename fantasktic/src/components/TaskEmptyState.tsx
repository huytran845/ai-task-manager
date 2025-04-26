// Assets
import {
  todayTaskEmptyState,
  inboxTaskEmptyState,
  upcomingTaskEmptyState,
  completedTaskEmptyState,
  projectTaskEmptyState,
} from "@/assets";
import React from "react";

// Types
type EmptyStateType = "today" | "inbox" | "upcoming" | "completed" | "project";

interface TaskEmptyStateProps {
  type?: EmptyStateType;
}

interface EmptyStateContent {
  img?: {
    src: string;
    width: number;
    height: number;
  };
  title: string;
  description: string;
}

const emptyStates: Record<EmptyStateType, EmptyStateContent> = {
  today: {
    img: {
      src: todayTaskEmptyState,
      width: 226,
      height: 260,
    },
    title: "What would you like to complete today?",
    description:
      "By default, tasks created here will be due today. Click + to add a task!",
  },
  inbox: {
    img: {
      src: inboxTaskEmptyState,
      width: 344,
      height: 260,
    },
    title: "What’s on your mind?",
    description:
      "Capture tasks that don’t have a specific category. Click + to add a task.",
  },
  upcoming: {
    img: {
      src: upcomingTaskEmptyState,
      width: 208,
      height: 260,
    },
    title: "Plan ahead with upcoming tasks!",
    description:
      "Tasks added here will be due in the future. Click + to schedule a task.",
  },
  completed: {
    img: {
      src: completedTaskEmptyState,
      width: 231,
      height: 260,
    },
    title: "Good Job! You've done all these tasks!",
    description:
      "All tasks you’ve completed will appear here. Keep up the great work!",
  },
  project: {
    img: {
      src: projectTaskEmptyState,
      width: 228,
      height: 260,
    },
    title: "Let’s build something amazing!",
    description:
      "Add tasks specific to this project. Click + to start planning.",
  },
};

const TaskEmptyState: React.FC<TaskEmptyStateProps> = ({ type = "today" }) => {
  const { img, title, description } = emptyStates[type];

  return (
    <div className="max-w-[360px] mx-auto flex flex-col items-center text-center">
      {img && (
        <figure>
          <img
            src={img.src}
            width={img.width}
            height={img.height}
            alt=""
          />
        </figure>
      )}

      <div className="mt-4 mb-2">{title}</div>
      <p className="text-sm text-muted-foreground px-4">{description}</p>
    </div>
  );
};

export default TaskEmptyState;
