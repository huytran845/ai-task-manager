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
import { redirect } from "react-router";

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

/* Generates a unique ID by combining current time and a random number
This function creates an identifier using the current time in miliseconds (converted to a base-36 string)
and then concatenated wtih a random number.
The resulting base-36 string is sliced to remove unnecessary characters.

@retruns {string} the unique identifying string */

export function generateID() {
  return Math.random().toString(36).slice(8) + Date.now().toString(36);
}

/* If there is no user ID in the local storage, then we return to the auth sync page to renavigate the user. Otherwise returns the user ID. */
export function getUserId(): string {
  const clerkUserId = localStorage.getItem("clerkUserId");

  if (!clerkUserId) {
    redirect("/auth-sync");
    return "";
  }

  return clerkUserId;
}
