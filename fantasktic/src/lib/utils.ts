import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Node Modules
import {
  formatRelative,
  isSameYear,
  format,
  isBefore,
  isToday,
  isTomorrow,
  startOfToday,
} from "date-fns";

export function toTitleCase(capitalize: string) {
  return capitalize[0].toUpperCase() + capitalize.slice(1);
}

// Converts date string into a custom format (Ex: "Today", "Tommorow", "dd MMM", etc.)
export function formatCustomDate(date: string | number | Date) {
  const today = new Date();

  // Get relative day string
  const relativeDay = toTitleCase(formatRelative(date, today).split(" at ")[0]);

  // Relative keywords to check
  const relativeDays = [
    "Today",
    "Tomorrow",
    "Yesterday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  if (relativeDays.includes(relativeDay)) {
    return relativeDay;
  }

  if (isSameYear(date, today)) {
    return format(date, "MMM do");
  } else {
    return format(date, "MMM do yyyy");
  }
}

// Returns color class based on due date of task
export function getTaskDateColor(
  dueDate: Date | null,
  completed?: boolean,
): string | undefined {
  if (dueDate === null || completed === undefined) return;

  if (isBefore(dueDate, startOfToday()) && !completed) {
    return "text-red-500";
  }

  if (isToday(dueDate)) {
    return "text-emerald-500";
  }

  if (isTomorrow(dueDate) && !completed) {
    return "text-amber-500";
  }
}
