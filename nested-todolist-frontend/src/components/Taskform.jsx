import React, { useState } from "react";

export default function TaskForm({ onSubmit, initialData, onClose }) {
  const [task, setTask] = useState(
    initialData || {
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white dark:bg-dark-card rounded-lg shadow-md space-y-4 w-full max-w-md"
    >
      <h2 className="text-xl font-bold text-light-foreground dark:text-dark-foreground">
        {initialData ? "Edit Task" : "Add New Task"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-light-foreground dark:text-dark-foreground">
          Task Title
        </label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          placeholder="Enter task title"
          className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-light-foreground dark:text-dark-foreground">
          Task Description
        </label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="3"
          className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-light-foreground dark:text-dark-foreground">
          Due Date
        </label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-light-foreground dark:text-dark-foreground">
          Priority
        </label>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground"
        >
          <option value="high">🔥 High</option>
          <option value="medium">⚡ Medium</option>
          <option value="low">🌱 Low</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-md hover:bg-blue-600 transition"
        >
          {initialData ? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  );
}
