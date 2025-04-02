import { Calendar, CheckCircle, Circle, MoreVertical } from "lucide-react";
import React from "react";

export default function SubtaskList({ task }) {
  const priorityColors = {
    high: "bg-red-500 text-white",
    medium: "bg-yellow-500 text-white",
    low: "bg-green-500 text-white",
  };
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg shadow-md bg-light-card border border-light-border dark:bg-dark-card dark:border-dark-border min-w-96 transition hover:shadow-lg">
      <div className="flex items-center gap-3">
        {task.completed ? (
          <CheckCircle className="text-green-500 w-5 h-5" />
        ) : (
          <Circle className="text-gray-400 w-5 h-5" />
        )}

        <div className="flex flex-col">
          <span className="font-semibold text-light-foreground dark:text-dark-foreground">
            {task.title}
          </span>
          <span className="text-sm text-light-secondary dark:text-dark-muted">
            {task.description}
          </span>

          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
              <Calendar className="w-4 h-4" />
              <span>{task.dueDate}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`px-2 py-1 text-xs font-bold rounded-full ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>

        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
